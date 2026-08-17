# Botanical Editorial Hero Interaction

## Goal

Refine the existing ancient-tree Hero without replacing its background image or changing the portfolio's routes, top navigation, page transitions, or inner pages. The result should feel like a quiet botanical editorial or museum catalogue while making the four plants clearly discoverable as navigation.

The approved visual reference is `kinsley-hero-botanical-editorial-concept-v3.png`. The implementation must reproduce its hierarchy and restraint in live HTML/CSS/WebGL rather than flattening the mockup into a new background image.

## Scope boundaries

- Keep `/images/tree-aquatic-archive-v3.png` as the Hero background.
- Keep the existing `onEnter(view)` routing contract and overlay transitions.
- Keep the existing top navigation unchanged.
- Do not change About, Experience, Projects, Photography, Contact, or their content.
- Do not add cards, pills, glass panels, large locator circles, glow, or long connector lines.
- Preserve all existing unrelated and uncommitted workspace changes.

## Editorial identity

Remove `Grow things with meaning.` and `OBSERVE / CURATE / CREATE` from the Hero.

The left editorial block contains:

```text
KINSLEY XIE
BRAND · CONTENT · STORYTELLING

EXPLORE THROUGH THE PLANTS
01 ABOUT
02 EXPERIENCE
03 PROJECTS
04 PHOTOGRAPHY
```

- `KINSLEY XIE` uses the existing high-contrast serif stack at a confident but restrained size.
- The subtitle and navigation use the existing minimal sans stack with precise tracking.
- The block occupies enough of the left negative space to balance the tree while retaining generous breathing room.
- `EXPLORE THROUGH THE PLANTS` is a quiet eyebrow above the four-item navigation. No second instruction is added.

## Navigation presentation

The four navigation items form one clear vertical index in the left column. Each item includes only its number, title, and a local 24–36px hairline. No line extends from the navigation toward a plant.

Default state:

- All four items remain legible at first glance.
- Text uses dark charcoal at a restrained opacity.
- Hairlines remain short and local to the navigation column.

Hover or keyboard focus:

- The active item becomes darker and slightly heavier.
- Its hairline extends by approximately 8px.
- The corresponding plant activates.
- The other items become quieter without becoming unreadable.

Hovering or focusing a plant performs the inverse linkage: its matching navigation item activates. Clicking either the navigation item or its plant opens the same existing view.

## Plant affordance and hotspots

Each of the four existing leaf clusters remains a clickable target. Visible plant markers consist only of a tiny 3–4px anchor dot and the matching two-digit number. The full page title is never repeated beside the plant.

The first desktop Hero visit runs one restrained, non-looping discovery cue lasting no more than two seconds: the four plants wake in sequence with a tiny anchor fade, approximately 2% growth, and a mild lift in brightness, then return to rest. The cue never repeats during the same mounted Hero session and is disabled for reduced motion.

Invisible pointer hotspots extend 20–30px beyond each leaf cluster so the interaction does not require pixel-perfect pointing. Entering a hotspot immediately:

- grows the corresponding plant by 2–4%;
- lifts its brightness slightly;
- changes it from high-contrast warm silver gray to the original olive-green photograph;
- reveals its tiny anchor marker;
- activates the matching left navigation item;
- retains the normal pointer cursor without a floating `VIEW 01`–`VIEW 04` label or white rectangular cursor plate.

Default plants use a high-contrast warm silver gray that is immediately distinct from the source olive green. The treatment removes nearly all leaf saturation and lifts the midtones strongly while preserving veins, highlights, shadows, and dimensional detail; leaves must not collapse into flat white silhouettes. The approved color reference is the middle panel labelled `HIGH-CONTRAST SILVER GRAY` in the comparison preview generated on 2026-08-17. Active plants do not receive an artificial tint or saturation boost: the gray cover fades away to reveal the unchanged olive-green pixels in the source photograph. Yellow-green, fluorescent green, neon color, black outlines, rings, rectangular plates, and halos are forbidden.

## Plant isolation

The current radial CSS masks are not sufficiently precise and must be removed.

Use a transparent WebGL effect layer that samples the unchanged Hero photograph. For each plant, combine:

1. a tight spatial region around the known cluster; and
2. a smooth chroma/luminance selection tuned to the leaf pixels inside that region.

The shader outputs only the selected plant pixels and leaves all other pixels transparent. Smooth thresholds preserve antialiased leaf edges. The spatial and chroma tests must exclude trunk, water, wall, moss outside the plant, and UI. The active tint and scale are applied only to this isolated output.

Acceptance requires visual inspection at the actual desktop crop: no black edge, black circle, rectangular mask boundary, glow, or visible color spill onto bark/background.

## Water ripple

The water effect uses the same transparent WebGL layer and the same source image texture, while the HTML background image remains visible underneath. The effect surface follows the background image's `object-fit: cover` crop and the Hero's existing parallax so the sampled reflection stays aligned.

The water region is bounded by an irregular waterline mask that follows the photograph. It includes the shallow water and lower reflection but excludes the real trunk and all UI. Pointer input outside this region creates no ripple.

On pointer entry, create one ripple immediately. Continued movement creates a new ripple only after both a distance and time threshold are met:

- three visible rings per ripple;
- 160–220px maximum radius at common desktop sizes;
- 1.6–2.0 second lifetime;
- approximately 3–5px peak refraction displacement;
- approximately 18–24% peak light/dark wave contrast;
- new ripple interval of roughly 280–360ms while moving;
- maximum of three concurrently active ripple groups.

The fragment shader radially displaces the sampled water texture and adds a fine warm-gray crest with a weaker cool-gray inner shadow. The effect must be clearly noticeable as soon as the pointer enters the water, but remain photographic: no blue tint, glow, neon, rapid firing, or game-like rings.

The canvas has `pointer-events: none`; navigation and plant hotspots remain fully interactive above it.

## Click transition

Clicking a plant or navigation item locks that item as active, fades away its warm silver-gray cover to reveal the original plant color over 500–700ms, and then calls the existing `onEnter(view)` callback. Use approximately 620ms as the default handoff delay.

Prevent duplicate transitions while the handoff is pending. Under `prefers-reduced-motion`, skip the delay and open the existing view immediately.

## Responsive and fallback behavior

- Desktop and fine-pointer devices receive the full plant-hover and water-refraction experience.
- The four text navigation items remain available at every breakpoint and are the canonical touch fallback.
- Touch and coarse-pointer devices do not create cursor-following ripples or hover-only states.
- On narrow screens, preserve the current photographic crop unless a small positioning adjustment is needed for readability; do not replace the image or force all four spatially separated plants into one portrait crop.
- If WebGL initialization or texture loading fails, keep the unchanged base image and fully functional four-item text navigation. Plants remain clickable through the existing hotspots, without the shader treatment.
- `prefers-reduced-motion` disables the discovery cue, plant scale animation, and ripple animation while preserving navigation and click behavior.

## Implementation boundaries

- Keep `Hero`'s public interface unchanged.
- Isolate rendering and pointer math in a dedicated Hero effects module/component rather than adding shader setup directly to the routing component.
- Reuse the already installed Three.js dependency or a minimal raw WebGL implementation; add no new animation or smooth-scroll dependency.
- Clean up animation frames, textures, listeners, and renderer resources when Hero unmounts.
- Keep the DOM background image as the visual source of truth and accessibility-safe fallback.

## Verification

1. TypeScript and the production build pass.
2. The original background image, top navigation, routes, and all inner pages are unchanged.
3. All four text navigation items open the correct existing view.
4. Navigation-to-plant and plant-to-navigation hover/focus linkage is correct.
5. Plant activation is limited to leaf pixels with no bark/background contamination.
6. Click color transition completes before the existing page handoff on normal-motion devices.
7. Ripples appear only in the water region, show three readable rings, distort the reflection, and never affect the real trunk or UI.
8. At most three ripple groups exist concurrently and sustained pointer movement remains smooth.
9. Keyboard focus makes every navigation item understandable and operable.
10. Touch, reduced-motion, and WebGL-failure fallbacks retain complete navigation.
11. Desktop and mobile layouts are visually inspected in the local preview.
