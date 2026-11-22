# Review captures, 22 November 2026 — page demonstrations

The shared illustrative demonstration now appears in the introduction of Transformation
(organizations selected) and Developers (developers selected). Both scenarios remain available.

Captures use Playwright with Chromium on the local production build. `desktop-1440` is a
1440 × 900 viewport; `tablet` and `phone` emulate iPad Mini and iPhone 13. These are not real
devices or Safari. Nothing in the site uses these review images.

| File suffix | Content |
| --- | --- |
| `first-screen` | The page introduction before scrolling |
| `organizations`, `developers` | Each scenario after advancing through its six steps |
| `full` | The whole page |
| `reduced-motion` | Reduced motion enabled, installation step selected |
| `no-scripts` | JavaScript disabled; both complete scenarios remain in the document |

Additional browser checks cover 1280 × 720, 1024 × 768, 320 × 568 and Pixel 7 landscape,
including both tabs, step controls, keyboard navigation on desktop, reduced motion,
JavaScript disabled, horizontal overflow, duplicate IDs and touch target sizes. Autoplay,
pause/resume, replay and the pause preference across page navigation are checked on desktop.
