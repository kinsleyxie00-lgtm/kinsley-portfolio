# Hero Sketch Reveal

## Goal

Transform the existing ancient-tree Hero into a sketch-first interactive scene. The default Hero displays a line-art interpretation of the current background photograph. A small circular pointer mask reveals the unchanged original photograph beneath it.

The existing typography, `01–04` navigation, plant hotspots, routes, 620ms page handoff, and continuous masked water refraction remain intact.

## Approved visual direction

- Use the current `/images/tree-aquatic-archive-v3.png` composition without changing its crop or geometry.
- Render the default scene as a light architectural pencil drawing on the same warm off-white used by the rest of the site: `#fffef9`.
- Preserve recognizable fine contour lines and restrained graphite detail. The result must not become a sparse black marker drawing or a dense gray photofilter.
- Keep the current left editorial identity and vertical `01–04` index unchanged.
- Do not restore plant grayscale masks or OptionWheel.

## Circular reveal

- On desktop fine-pointer devices, a small mathematically circular mask follows the pointer.
- The visible photographic core is approximately `180–210px` in diameter at the reference desktop viewport, with responsive clamping for smaller desktop screens.
- The edge uses a wide, soft radial falloff modeled after the Kononenko reference: the transition width is approximately one quarter of the reveal radius.
- Across the falloff, sketch pixels progressively dissolve while the original photographic pixels progressively appear.
- Add only subtle monochrome noise to keep the boundary organic.
- Do not render a border, dark rim, gray halo, glow, shadow, label, or circular water ripple.
- Pointer movement is softly interpolated rather than attached rigidly to the cursor.
- Pointer leave fades the reveal back to the sketch state.

## Pixel alignment

The sketch and photographic layers must use the same source image, viewport dimensions, `object-fit: cover` calculation, and UV transform.

The reveal is a shader mix between two aligned representations of the same sampled texture. It must not use a separately generated photographic crop, independently positioned DOM image, or inset image. The trunk, leaves, rocks, waterline, and reflection therefore remain continuous across the reveal boundary at every viewport size.

## Sketch rendering

Generate the sketch representation at runtime from the original texture in the Hero fragment shader:

1. Sample the original image once using the existing cover UV.
2. Convert it to luminance.
3. Combine multi-scale edge detection with restrained paper/grain noise.
4. Map the result to charcoal-gray lines over `#fffef9`.
5. Preserve lighter open areas and avoid applying a uniform grayscale photograph beneath the drawing.

The sketch shader must expose only a small set of tunable constants for line threshold, line strength, paper tone, and grain strength.

## Water behavior

- Keep the existing `water-mask.png` and `water-depth.png` constraints.
- Keep the existing slow, horizontally continuous refraction and its pointer enhancement.
- The original photographic water refraction is visible inside the circular reveal.
- Outside the reveal, the water remains represented by the sketch treatment and receives a subtle horizontal modulation derived from the existing refraction.
- Do not introduce radial ripples or discrete splash objects.

## Tree motion

Tree motion is not added in this change. This implementation focuses on the approved sketch/reveal treatment and preserves the current static tree geometry. Natural branch and leaf motion remains a separate follow-up so it can be judged independently from the new reveal.

## Input and interaction priority

- The canvas remains `pointer-events: none`.
- Existing plant hotspots and navigation buttons remain the interactive targets above it.
- Pointer coordinates continue flowing through `HeroEffectsHandle`.
- The reveal must not obscure focus indicators or change navigation activation behavior.
- Clicking navigation or a plant hotspot retains the existing 620ms handoff and duplicate-transition guard.

## Responsive, reduced-motion, and fallback

- Desktop fine-pointer devices receive the animated circular reveal and existing water effect.
- Touch/coarse-pointer devices display the static sketch Hero and retain the canonical `01–04` navigation. No touch-following reveal is required.
- Under `prefers-reduced-motion`, display a static sketch and disable reveal interpolation and water animation while preserving navigation.
- If WebGL or texture loading fails, display the original photograph as the static fallback and retain all navigation.

## Implementation boundaries

- Keep `Hero`'s public interface unchanged.
- Extend the existing `HeroEffectsCanvas` rather than creating a second competing animation loop.
- Keep the DOM base image as the loading and WebGL-failure fallback.
- Add no new animation or smooth-scroll dependencies.
- Dispose animation frames, textures, observers, geometry, materials, and renderer resources on unmount.
- Preserve every unrelated uncommitted workspace change.
- Do not deploy.

## Verification

1. TypeScript and the production build pass.
2. The sketch and original photograph remain pixel-aligned at desktop and mobile aspect ratios.
3. The reveal is circular, small, softly feathered, and free of a visible ring or halo.
4. The reveal uses the exact original photograph rather than a reconstructed or generated image.
5. The existing water effect remains horizontally continuous and constrained to its masks.
6. Text, `01–04` navigation, hotspots, routes, and 620ms transition remain unchanged.
7. Keyboard navigation remains operable.
8. Touch, reduced-motion, and WebGL-failure states retain usable navigation.
9. No plant mask or OptionWheel code is restored.
10. The result is visually inspected in the local browser before handoff.
