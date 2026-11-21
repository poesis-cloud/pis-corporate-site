# Hero film

Source of the diagram in the hero of the home page: its film and its two stills.

| Published asset | What it is |
| --- | --- |
| `public/hero/diagram.mp4` | H.264, 1080×900, 24 fps, 18 s, no audio track |
| `public/hero/diagram.webm` | VP8, same picture |
| `public/hero/diagram.webp` | the first frame of the film: the default picture from 720 px, so the film takes over without a jump |
| `public/hero/diagram-portrait.webp` | the same diagram composed for narrow screens, 800×1250, still only |

## What it shows

A diagram that must be understood before it moves, read in one direction:

1. **Your organization**: a lead, a team whose members each carry a role badge, a process.
2. **Modelled with SAF**: a strand of DNA. Each row of the organization enters it at a lit base
   pair and leaves it on the other side. The helix is where the organization is written down,
   not an ornament. The mark at its foot is the real Poesis logo, `public/poesis-logo.png`,
   tinted; it is the only bitmap in the film. The repository holds no vector master of the logo,
   so the mark is never drawn larger than its 256 px source.
3. **Agentic organization**: AI agents carrying the same role badges, a workflow passing from
   agent to agent, a person who oversees at the end of the workflow (indigo), a ticked page for a checked output, and a
   dotted arc returning to the model: it evolves with evidence.

Every frame shows that whole picture. One loop then adds three sentences, named in the `T` table
at the top of `film.html`: the organization is read into the helix and expressed as agents; work
passes from agent to agent, waits for the person, and leaves as a checked output; evidence
returns to the model and travels through it. `draw(t)` is deterministic and the loop closes
exactly. Frame 0 is the picture at rest, and is the still.

## Words are not in the picture

The film and the stills carry no text. Titles and labels are real text, laid over the picture by
`src/pages/index.astro`. Both read their positions from one file, `src/data/hero-diagram.json`:
the film draws each sign where the file says, and the page writes each word where the file
says, as a percentage of the picture. Type is sized in units of the picture's width (`cqw`), so
words and picture scale as one.

After changing a position in that file, render the pictures again; otherwise the words move
and the signs do not.

## Regenerate

```bash
node scripts/hero-film/capture-server.mjs          # serves http://127.0.0.1:4599/
# in a Chromium browser:
#   http://127.0.0.1:4599/?play=1                        preview
#   http://127.0.0.1:4599/?t=0.5                         one frame
#   http://127.0.0.1:4599/?capture=1                     writes out/frames/*.jpeg and out/diagram.png
#   http://127.0.0.1:4599/?capture=still                 writes out/diagram.png only
#   http://127.0.0.1:4599/?capture=still&layout=portrait writes out/diagram-portrait.png

# H.264 with the macOS encoder (no ffmpeg needed)
swift scripts/hero-film/encode.swift scripts/hero-film/out/frames scripts/hero-film/out/diagram.mp4 1080 900 24 560000

# VP8 with any ffmpeg that has libvpx
cat scripts/hero-film/out/frames/frame_*.jpeg | ffmpeg -f image2pipe -r 24 -c:v mjpeg -i pipe:0 -an -r 24 \
  -c:v vp8 -qmin 4 -qmax 42 -crf 10 -deadline good -speed 1 -b:v 540k scripts/hero-film/out/diagram.webm

cwebp -q 84 -m 6 scripts/hero-film/out/diagram.png -o public/hero/diagram.webp
cwebp -q 84 -m 6 scripts/hero-film/out/diagram-portrait.png -o public/hero/diagram-portrait.webp
```

`out/` is ignored by Git. Copy the two films to `public/hero/` when the result is approved.

## How the page uses it

The still is what every visitor gets, with the labels over it. The film is fetched only on a
viewport of 1100 px or more, where the diagram stands beside the words, and when the visitor has
not asked for reduced motion or reduced data. A button pauses it, and the choice is kept for the
session. Below 1100 px the diagram is a still: the wide composition from 720 px, the narrow one
below. Without JavaScript the still and its labels are complete. See the inline script at the
end of `src/pages/index.astro` and the "hero" block of `src/styles/site.css`.

The lower left of the wide picture is left empty on purpose: the page writes a small chat there
(a visitor asks, the agent drafts, the harness leaves its receipt, the visitor decides), and
brings each line forward while the film shows that moment. The lines carry the fractions of the
loop they belong to (`data-from`, `data-to`); keep them inside the `work` phase of the `T` table.

The picture is drawn on the ground colour of the site and its edges are faded by a CSS mask, so
that it sits in the page without the outline of a rectangle. Keep the signs away from the outer
3.5 % of the width and from the top 18 % of the wide picture (9 % of the narrow one).
