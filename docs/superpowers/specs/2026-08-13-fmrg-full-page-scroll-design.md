# FMRG-style full-page scroll design

Date: 2026-08-13  
Status: approved interaction direction, pending written-spec review

## Goal

Bring the scroll rhythm observed on [StudioFMRG](https://fmrg.studio/) into the four portfolio inner pages without redesigning their approved content or layout. The result should feel editorial and restrained: native scrolling, full-viewport pauses, gradual reveals, and the next section covering the previous one.

Hero, persistent navigation, cursor labels, mouse attraction, dialogs, and existing content decisions remain intact.

## Reference findings

The reference uses normal document scrolling rather than wheel hijacking. Its defining behavior is:

- a fixed navigation layer;
- viewport-height sticky scenes;
- text revealed progressively while a scene is held;
- following scenes rising from below and covering earlier scenes;
- stacked full-screen case sections;
- reduced use of scaling, bounce, or decorative parallax.

The portfolio will reproduce this interaction logic, not FMRG's branding, copy, imagery, colours, or exact composition.

## Chosen implementation

Use native `position: sticky` plus one page-scoped scroll-progress controller. Do not use scroll snapping, wheel interception, GSAP, or a replacement smooth-scroll engine.

The controller:

- listens to the existing `.portfolio-overlay__content` scroller;
- updates at most once per animation frame;
- measures only registered scroll scenes;
- writes normalized progress and active-state CSS variables/attributes;
- leaves layout, sticky positioning, reveal curves, and layering to CSS;
- refreshes measurements on page change and resize;
- removes listeners and inline variables when the active inner page changes.

This controller is independent of `ArchiveCursor`: scroll motion must not overwrite `transform` on `[data-attract]` elements. Scene-level wrappers receive scroll transforms; attraction remains on their inner text, image, or plant targets.

## Shared scroll language

### Desktop / fine pointer

- Navigation stays fixed above every scene.
- A standard scene occupies about `150–190svh`; its inner panel is sticky for one viewport below the navigation.
- Entry: opacity `0.2 → 1`, vertical movement no more than `24px`.
- Hold: the primary composition remains still long enough to read.
- Exit: opacity may soften to no less than `0.72`; upward movement no more than `18px`.
- The next scene rises over the earlier scene with an opaque warm-white surface and incremented `z-index`.
- No zoom, elastic easing, rotation, blur, dark overlay, or hard scroll snapping.
- Short separators and existing rules may fade; no new decorative UI is added.

### Mobile / touch

Use short sticky pauses plus natural flow:

- scene tracks are shorter, about `115–130svh`;
- long text is never clipped or forced into a viewport;
- content can continue below the sticky composition naturally;
- Xiaohongshu horizontal scroll-snap remains operational;
- Photography archive and postcard controls retain normal touch behavior;
- no pointer-specific progress effects are required.

### Reduced motion

For `prefers-reduced-motion: reduce`, coarse low-capability layouts, or unsupported sticky behavior:

- remove sticky scene tracks and progress transforms;
- render all sections in their current natural document order;
- retain content, focus order, links, buttons, and dialogs.

## Page mapping

### About

One approximately `150svh` track holds the current portrait-and-copy composition.

1. Portrait settles first.
2. Handwritten `about me` and the copy reveal shortly after.
3. The composition moves upward slightly near the end.
4. Contact rises naturally from below and covers the About surface.

No new copy, biography, or educational information is introduced.

### Experience

The existing intro becomes the opening sticky scene. The three horizontal experience rows then build into one full-screen index:

1. The intro establishes the page.
2. NIO enters first from below.
3. DEWU enters second while NIO remains visible.
4. Xinhua Daily enters last, completing the index.

Rows do not become a timeline or card grid. Their current facts, order, hover preview, and horizontal construction remain unchanged.

### Projects

Projects becomes four consecutive full-screen layers:

1. `Selected work` intro.
2. Xiaohongshu personal-account feature with exactly three 3:4 video visuals and separate caption areas.
3. `In the Act of Becoming` with one unchanged 4:3 film frame.
4. `firefly Big Day` case entry.

Each new layer rises from below and covers the preceding warm-white layer. Existing video focus behavior remains one-large/two-small with an unchanged 3:4 ratio and common lower baseline. The MV does not scale, darken, or gain an overlay. Project dialogs remain outside the scroll-progress system.

### Photography

Photography uses three scenes:

1. Editorial Landing holds while the feature image and opening copy settle.
2. The selected preview spread enters progressively as one scene.
3. `Photo archive` rises as the covering layer and then continues in natural document flow.

The collection remains exactly eight photographs. Opening a postcard freezes the page scroller as it does now; the modal, close button, previous/next buttons, and focus trap do not participate in scene progress.

### Contact

The shared compact dark Contact is not sticky. It enters through normal document flow and visually covers the final light scene. Contact content and links do not receive attraction or scroll-progress transforms.

## Component boundaries

Add one small client component/hook responsible only for scene progress, for example `ScrollSceneController`. Pages declare semantic scene wrappers and stable `data-scroll-scene` attributes. Page-specific CSS controls track height, sticky panels, reveal order, and stacking.

Expected touched surfaces:

- `components/PortfolioOverlay.tsx`: provides the active scroller boundary;
- `components/About.tsx`;
- `components/Experience.tsx`;
- `components/Projects.tsx`;
- `components/Photography.tsx`;
- one new focused scroll-controller component or hook;
- `app/globals.css`.

Do not change Hero, create a new homepage or navigation, restore procedural roots, replace the current router-like page switching, or add a third-party animation dependency.

## Interaction and accessibility

- Native wheel, trackpad, scrollbar, keyboard, and touch scrolling remain available.
- DOM order and visual reading order stay aligned.
- Sticky wrappers do not trap focus.
- When focus moves into an offscreen control, the browser must be able to scroll it into view.
- Existing `VIEW / OPEN / CLOSE / SELECT` labels and native cursor remain.
- Attraction displacement stays independent and restrained.
- Dialog opening suspends or ignores scene updates until the dialog closes.

## Performance

- One passive scroll listener on the active inner-page scroller.
- One `requestAnimationFrame` write cycle.
- Cache scene references; do not query the full DOM every frame.
- Prefer opacity and transform on scene wrappers; avoid layout properties during scroll.
- Use `ResizeObserver` or a resize refresh only for measurement invalidation.
- Do not keep `will-change` on every scene permanently.

## Validation

Validate locally only at desktop and mobile widths:

- all four pages retain their approved content and order;
- desktop scenes hold and cover without scroll jumps or dead zones;
- mobile content remains readable and naturally scrollable;
- Xiaohongshu cards stay 3:4 before and during focus;
- MV remains 4:3 and does not scale or darken;
- Photography shows eight items and its postcard close control remains visible;
- Contact follows each page cleanly;
- mouse attraction and cursor labels remain functional;
- keyboard focus and dialogs work through scene boundaries;
- reduced motion returns to natural document flow;
- `pnpm run build` passes.

No deployment is included.
