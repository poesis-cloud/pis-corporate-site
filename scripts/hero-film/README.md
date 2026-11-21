# Hero film

Source of the background film of the home page and of its posters.

| Published asset | What it is |
| --- | --- |
| `public/hero/seed.mp4` | H.264, 1280×720, 24 fps, 20 s, no audio track |
| `public/hero/seed.webm` | VP8, same picture |
| `public/hero/seed-poster.webp` | still at 74 % of the loop, 1280×720: the default picture for everyone |
| `public/hero/seed-poster-portrait.webp` | the same moment composed for narrow screens, 720×900 |

## What it shows

`film.html` draws every frame with one deterministic function, `draw(t)`. The loop closes
exactly. The mark at the base is the real Poesis logo, `public/poesis-logo.png`, tinted; it is
the only bitmap in the film. The repository holds no vector master of the logo, so the mark is
never drawn larger than its 256 px source.

Seed, planted DNA, growth of roles and agents, outputs, human gates (indigo), evolution loop,
then a new cycle. The faint outline that never fades is the existing organization; what grows
over it is the agentic organization mirroring it.

## Regenerate

```bash
node scripts/hero-film/capture-server.mjs          # serves http://127.0.0.1:4599/
# in a Chromium browser:
#   http://127.0.0.1:4599/?play=1                   preview
#   http://127.0.0.1:4599/?capture=1                writes out/frames/*.jpeg and out/seed-poster.png
#   http://127.0.0.1:4599/?capture=1&layout=portrait   writes out/seed-poster-portrait.png

# H.264 with the macOS encoder (no ffmpeg needed)
swift scripts/hero-film/encode.swift scripts/hero-film/out/frames scripts/hero-film/out/seed.mp4 1280 720 24 650000

# VP8 with any ffmpeg that has libvpx
cat scripts/hero-film/out/frames/frame_*.jpeg | ffmpeg -f image2pipe -r 24 -c:v mjpeg -i pipe:0 -an -r 24 \
  -c:v vp8 -qmin 4 -qmax 42 -crf 10 -deadline good -speed 1 -b:v 620k scripts/hero-film/out/seed.webm

cwebp -q 80 -m 6 scripts/hero-film/out/seed-poster.png -o public/hero/seed-poster.webp
cwebp -q 78 -m 6 scripts/hero-film/out/seed-poster-portrait.png -o public/hero/seed-poster-portrait.webp
```

`out/` is ignored by Git. Copy the four files to `public/hero/` when the result is approved.

## How the page uses it

The poster is what every visitor gets. The film is fetched only on a viewport of 768 px or
more, when the visitor has not asked for reduced motion or reduced data, and a button pauses
it. See the inline script at the end of `src/pages/index.astro`.
