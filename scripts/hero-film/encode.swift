// Encodes a JPEG sequence to a video-only H.264 MP4 with the macOS encoder. No audio track can exist: none is ever added.
// Remotion's bundled ffmpeg does not start on macOS 12 (missing AVFoundation symbol).
// Usage: encode <frames dir> <out.mp4> <width> <height> <fps> <bits per second>
import AVFoundation
import CoreImage
import Foundation

let args = CommandLine.arguments
let (dir, out, width, height, fps, bitrate) = (args[1], args[2], Int(args[3])!, Int(args[4])!, Int32(args[5])!, Int(args[6])!)
let names = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".jpeg") }.sorted()
let url = URL(fileURLWithPath: out)
try? FileManager.default.removeItem(at: url)
let writer = try AVAssetWriter(outputURL: url, fileType: .mp4)
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: width,
  AVVideoHeightKey: height,
  AVVideoColorPropertiesKey: [
    AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
    AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
    AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2,
  ],
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: bitrate,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalKey: 60,
    AVVideoAllowFrameReorderingKey: true,
  ],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
  kCVPixelBufferWidthKey as String: width,
  kCVPixelBufferHeightKey as String: height,
])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)
let context = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
let space = CGColorSpace(name: CGColorSpace.sRGB)!
for (index, name) in names.enumerated() {
  try autoreleasepool {
    while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
    guard var image = CIImage(contentsOf: URL(fileURLWithPath: dir + "/" + name)) else { throw NSError(domain: "unreadable " + name, code: 1) }
    if Int(image.extent.width) != width {
      image = image.applyingFilter("CILanczosScaleTransform", parameters: [kCIInputScaleKey: CGFloat(height) / image.extent.height, kCIInputAspectRatioKey: 1.0])
    }
    var buffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &buffer)
    context.render(image, to: buffer!, bounds: CGRect(x: 0, y: 0, width: width, height: height), colorSpace: space)
    if !adaptor.append(buffer!, withPresentationTime: CMTime(value: CMTimeValue(index), timescale: fps)) { throw writer.error ?? NSError(domain: "append", code: 2) }
  }
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
print(writer.status == .completed ? "OK \(names.count) frames" : "FAILED \(String(describing: writer.error))")
