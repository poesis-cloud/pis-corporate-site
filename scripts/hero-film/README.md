# Hero film

Source of the background film of the home page and of its posters.

| Published asset | What it is |
| --- | --- |
| `public/hero/seed.mp4` | H.264, 1280×720, 24 fps, 20 s, no audio track |
| `public/hero/seed.webm` | VP8, same picture |
| `public/hero/seed-poster.webp` | the first frame of the film, 1280×720: the default picture, so the film takes over without a jump |
| `public/hero/seed-poster-portrait.webp` | the same moment composed for narrow screens, 720×900: background and visible still |

## What it shows

`film.html` draws every frame with one deterministic function, `draw(t)`. The loop closes
exactly. The mark at the base is the real Poesis logo, `public/poesis-logo.png`, tinted; it is
the only bitmap in the film. The repository holds no vector master of the logo, so the mark is
never drawn larger than its 256 px source.

The film must be understood at a glance. It opens on the complete picture and uses three signs:
a ringed dot is an AI agent with a role, a person in an indigo ring is a human review where work
waits, a ticked page is a checked output. The home page prints the same signs as a legend.

One cycle: a seed falls and settles into the mark, a double helix rises and roles branch from it,
work flows and waits at each review, evidence travels back to the mark, and the cycle starts
again. The faint outline that never fades is the existing organization; what grows over it is the
agentic organization mirroring it. The phases are named in the `T` table at the top of the script.

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

The still is what every visitor gets. The film is fetched only on a viewport of 1100 px or
more, where it has room beside the words, and when the visitor has not asked for reduced motion or reduced data. A button pauses
it. Below 1100 px the page shows the portrait still instead. See the inline script at the end of `src/pages/index.astro`.

The subject of the picture sits at 77 % of the frame and the frame is positioned at 77 %
(`object-position`), so the subject stays at 77 % of the stage whatever the crop. Keep the two
numbers equal if the composition changes: the legend is placed over the subject from them.
