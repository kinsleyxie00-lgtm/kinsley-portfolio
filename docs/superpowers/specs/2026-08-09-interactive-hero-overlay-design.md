# Interactive Hero Entrance and Overlay Architecture

## Objective

Replace the portfolio's vertically scrolling homepage with a single interactive photographic entrance. The current ancient-tree image becomes the full-screen Hero. Four plants embedded in the photograph act as entrances to About, Experience, Projects, and Photography. Content opens in an in-page overlay without navigation or reload.

The experience should feel like a quiet luxury-brand site and a museum installation: photographic, editorial, spacious, and restrained.

## Scope

This phase implements:

1. the photographic Hero and its four interactive plant entrances;
2. a shared overlay architecture for About, Experience, Projects, Photography, and Contact;
3. direct overlay opening from the minimal top navigation;
4. persistent explored-plant state for the current browser session;
5. desktop and mobile interaction and layout behavior.

This phase does not add assets, deploy the website, create a second homepage or navigation system, or redesign the content itself beyond the layout changes required to present it in overlays.

## Preserved Architecture and Content

- Keep Next.js, React, TypeScript, GSAP, and CSS animation.
- Keep the existing KSX BrandIntro and its replay/reduced-motion behavior.
- Reuse Kinsley's existing About, Experience, Projects, Photography, and Contact content.
- Preserve one Hero, one top navigation, and one application-level content state.
- Retain the existing local-only workflow and production build validation.
- Preserve unrelated working-tree changes.

The previous procedural Three.js root scene is removed from the active Hero path. Three.js may remain installed and available to the project, but the entrance prioritizes the supplied photograph and lightweight React/GSAP interaction.

## Hero Composition

Use `/public/images/tree-aquatic-archive-v3.png` as the full-screen visual source. The image fills the viewport with `object-fit: cover` and uses art-directed positioning per breakpoint so the trunk, four plants, and waterline remain visible.

The initial photograph is low-saturation and slightly softened into warm grayscale. The treatment must retain real bark detail, architectural warmth, and water reflection. No generated particles, fantasy glow, game UI, or decorative 3D geometry appears.

Minimal identity copy remains in the upper-left region where it does not cover a plant. The top navigation remains visually separate and sparse.

Pointer movement produces only restrained image parallax. Reduced-motion users receive a static photograph.

## Plant Entrances

The four hotspot mappings, following the marked source image, are:

| Plant position | Entrance |
| --- | --- |
| Upper trunk | About |
| Center-left trunk | Experience |
| Right branch | Projects |
| Lower waterline | Photography |

Each hotspot uses percentage-based coordinates derived from `/Users/xkx/Desktop/download-1.png`. Desktop and mobile can use separate coordinate/size adjustments, but both must bind to the same visible plants rather than arbitrary screen regions.

Each entrance is a semantic button with a generous invisible hit area and a restrained focus treatment. Labels remain hidden at rest or extremely subtle, then become legible on hover, focus, or touch discovery.

## Plant State and Growth

Each plant has two visual states:

- `dormant`: low-saturation, photographically integrated, and still;
- `grown`: naturally green with a restrained leaf-opening finish.

When a dormant plant is selected:

1. the plant transitions from gray-white to its source green;
2. leaves receive a small scale/clip reveal that reads as organic opening;
3. after approximately 0.8–1.2 seconds, the corresponding overlay opens.

When a grown plant is selected, its overlay opens immediately with the normal overlay transition. Growth is not replayed on every selection.

Explored plant IDs are stored in `sessionStorage`. Closing an overlay or returning to the Hero does not reset them. Navigation-menu entry into a plant-backed section also marks that plant as explored so the Hero and navigation state remain consistent. Contact has no plant state.

The implementation should use the existing source image and CSS masking/cropping where practical. It must not introduce new image assets. If a convincing isolated color reveal cannot be produced from the single photograph without visible seams, the fallback is a restrained whole-scene saturation lift localized through a soft radial mask around the plant.

## Overlay State Machine

The page owns one active-view state:

```text
hero | about | experience | projects | photography | contact
```

Only one content overlay may be active. Selecting a plant or menu item sets the active view; closing returns it to `hero`.

The shared overlay shell provides:

- a fixed viewport layer above the Hero;
- a close/back control;
- the current section label and index where applicable;
- an internal content viewport;
- focus entry, focus containment, Escape-to-close, and focus restoration;
- body-scroll locking while open;
- a consistent enter/exit transition.

Browser navigation is not required for this phase: opening an overlay does not change the URL, route, or hash. The app does not refresh and does not scroll the document to a hidden section.

## Content Presentation

Existing content components are adapted for overlay presentation instead of being duplicated.

- About: spacious editorial introduction with restrained profile imagery and short text groupings.
- Experience: timeline or indexed roles presented with generous spacing and small metadata.
- Projects: image-and-text editorial entries using existing project assets/placeholders only.
- Photography: existing photography collection and lightbox behavior adapted to the overlay viewport.
- Contact: minimal contact information and calls to action in the same overlay shell.

Typography uses large negative space, small labels, controlled measure, and asymmetrical editorial grids. Avoid cards, dashboards, résumé-template panels, heavy borders, and dense full-width text.

Long content may scroll inside the overlay only. The underlying portfolio page remains fixed at the Hero and no longer presents a vertical sequence of sections.

## Navigation

The persistent top menu contains:

```text
About / Experience / Projects / Photography / Contact
```

Selecting an item directly opens its overlay. When an overlay is active, the matching item exposes an active state. The menu remains one shared component across Hero and overlays.

On small screens the menu may collapse to a compact control, provided every destination remains directly accessible and no second navigation system is introduced.

## Motion Language

Motion is smooth and quiet:

- soft opacity and clip-path overlay reveals;
- small vertical translations;
- subtle photographic parallax;
- organic plant color and leaf-opening transitions;
- restrained stagger for editorial content.

Avoid particle effects, dramatic camera dives, springy game feedback, glowing portals, excessive depth, or continuous ambient motion. `prefers-reduced-motion` removes parallax and compresses plant/overlay transitions to near-instant state changes.

## Responsive Behavior

Desktop uses the full architectural composition and all five navigation labels. Mobile receives a dedicated crop and hotspot calibration so the four source plants remain selectable. Hit targets are at least 44 CSS pixels, touch activation does not require hover, and overlays use safe-area-aware fixed positioning.

If the mobile viewport cannot display every plant simultaneously without destroying the composition, preserve the tree and hotspots through a controlled wider image crop inside the viewport rather than reverting to vertical portfolio scrolling.

## Failure and Edge Cases

- If session storage is unavailable or malformed, start with all plants dormant and continue normally.
- Rapid repeated plant selections cannot open multiple overlays or interrupt a running growth transition.
- Selecting a different navigation item while an overlay is open transitions through the same shared shell without exposing the Hero between views.
- Closing during an overlay transition resolves to a stable Hero state.
- BrandIntro completion always reveals the Hero, never an overlay automatically.
- Direct keyboard access works for all plant entrances and navigation items.

## Validation

- Verify the Hero uses the supplied current tree image and contains no blue markup.
- Verify all hotspot positions against `/Users/xkx/Desktop/download-1.png` on desktop.
- Verify the upper, center-left, right, and lower plants open About, Experience, Projects, and Photography respectively.
- Verify dormant-to-grown animation completes before the first overlay opening.
- Verify explored plants stay green after closing and after reopening within the session.
- Verify top navigation opens all five overlays directly.
- Verify no route change, refresh, hash jump, or underlying vertical section scroll occurs.
- Verify overlay focus handling, Escape, body lock, and focus restoration.
- Verify desktop, mobile, touch, keyboard, and reduced-motion behavior.
- Verify KSX BrandIntro and existing content remain intact.
- Run the production build and retain local preview only.
