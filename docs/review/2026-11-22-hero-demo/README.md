# Review captures, 22 November 2026 — hero and its two demonstrations

Captures taken with Playwright (Chromium) on a local build of `refonte/saf`, for the review of
the new hero of the home page. They can be deleted once the review is closed: nothing in the
site uses them. Phones and tablets are emulated devices (user agent, touch, pixel ratio), not
resized desktop windows; none is a real Safari.

| Files | What they show |
| --- | --- |
| `desktop-1440--*`, `desktop-1280--*` | Desktop: first screen, the six steps of "For organizations" (`org-step-1` to `6`), the pause in the middle of the answer, both scenarios played to the end (`org-final`, `dev-final`), the developer steps and one chosen by hand (`dev-chip-install`) |
| `tablet-portrait-ipad-mini--*`, `tablet-landscape-ipad-pro-11--*` | Tablet, upright and sideways: first screen and both scenarios at their end |
| `phone-iphone-13--*`, `phone-iphone-se--*` | Phone, upright: first screen (with and without the consent notice), steps of both scenarios, pause |
| `phone-landscape-pixel-7--*` | Phone, sideways: first screen and both scenarios at their end |
| `*--reduced-motion-*` | Reduced motion: the complete picture, no controls |
| `*--no-scripts` | Scripts off: both scenarios, one under the other |
| `home-*-full` | The whole home page at 1440, 820 and 390 px |
