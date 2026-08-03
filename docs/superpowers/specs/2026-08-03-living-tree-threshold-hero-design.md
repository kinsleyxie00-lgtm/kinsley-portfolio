# KINSLEY XIE Portfolio — Living Tree Threshold Hero

## Objective

Replace only the current Hero with a first-person botanical space in which an ancient tree becomes the website entrance and navigation interface. Preserve the existing About, Experience, Projects, Notes, Contact, project overlay, photography lightbox, and post-Hero navigation.

The experience must feel quiet, ancient, natural, architectural, and museum-like. It must not resemble a fantasy forest, game cinematic, forest wallpaper, conventional landing-page banner, or skincare ecommerce campaign.

## Reference Interpretation

Use `/Users/xkx/Desktop/tree.jpg` as a material, scale, spatial, and compositional reference—not as an object to copy.

Extract these qualities:

- A partial tree form that exceeds the frame and cannot be read as a complete object.
- A first-person camera approximately 1–2 metres from the trunk with a slight upward angle.
- Rough, irregular, damp bark with convincing physical depth.
- Ancient wood contrasted with very small new growth.
- Foreground occlusion, a dominant middle-distance trunk, and a softly focused botanical architecture background.
- Real photographic lighting consistent with Leica botanical or luxury editorial architectural photography.

## Selected Production Approach

Use a bespoke photographic hero scene with layered depth and separately controlled interactive buds.

Do not use a flat stock photograph with generic hotspots. Do not build a fully synthetic 3D tree or game-like WebGL scene. Generate one coherent photographic master image, then create depth through restrained CSS/GSAP layer movement and interaction overlays.

## Composition

The camera stands about 1.5 metres from an ancient trunk and looks slightly upward.

Layers:

1. Foreground: softly blurred moss, bark ridges, and limited leaf edges.
2. Primary structure: an ancient trunk occupies roughly 70% of the frame, entering from the lower-left region, branching through the centre, and leaving the frame at the top and right.
3. Growth layer: four dormant buds follow plausible crevices and branch growth directions.
4. Background: an out-of-focus botanical museum or conservatory with glass architecture, restrained greenery, and natural daylight.

The full tree and canopy must never be visible. The scene must communicate that the visitor is physically beside a living structure rather than looking at a landscape.

## Hero Copy

Use minimal exhibition-like text:

> KINSLEY XIE  
> A living botanical archive  
> where nature becomes an interface.

The typography must occupy genuine negative space and remain subordinate to the tree. Use the existing editorial serif and minimal sans-serif system.

## Living Bud Navigation

Do not show the fixed navigation bar or a menu button while the Hero is active. Restore the existing shared Navigation after the user leaves the Hero.

Bud destinations:

- `01 ABOUT`: near a lower root or trunk crevice.
- `02 EXPERIENCE`: on the upward-growing middle trunk.
- `03 CASE`: on a lateral branch.
- `04 NOTES`: on the highest visible new branch.

Positions must follow the actual generated tree structure rather than an even UI grid.

Initial state:

- Chalky grey-white.
- Semi-translucent.
- Dormant and winter-like.
- No saturated green.

Hover/focus state:

- Scale from 1 to approximately 1.05.
- Add a subtle organic breath.
- Move the supporting twig by no more than approximately 3px.
- Apply restrained cursor magnetism on fine-pointer devices.
- Reveal the chapter number and name like a botanical museum annotation.

The state must remain usable through keyboard focus and native cursor fallback.

## Activation Sequence

Selecting a bud does not open a separate page. It performs a 3.2-second activation and then moves to the existing matching single-page chapter.

Sequence:

1. Dormant bud shifts from stone grey to low-saturation living green.
2. Outer bud form separates gradually.
3. Two small leaves unfold with a natural time-lapse cadence.
4. Camera moves closer to the selected bud.
5. Leaf texture expands to cover the viewport.
6. The cover recedes after the target chapter is positioned.

Do not use black fades, magical energy, glowing plants, particles, or elastic motion.

Visited buds remain green for the current in-page session, indicating explored chapters. They reset after a full reload. Do not store this state persistently.

## Motion Ownership

- GSAP owns camera parallax, magnetic pointer response, bud growth timelines, and the transition to the selected chapter.
- Framer Motion owns initial textual reveal and simple presence transitions.
- Do not make both systems animate the same property on the same element.
- Scope all GSAP work to the Hero and revert it on unmount.
- Use transforms and opacity for frequently updated motion.

Camera movement remains slow and limited:

- Primary trunk is nearly stable.
- Foreground and background layers move approximately 8–18px at maximum.
- A continuous slow zoom may be used only if it is nearly imperceptible.

## Shared Navigation Behavior

- The current Navigation component remains the only global navigation system.
- It is visually and interactively hidden while the viewport is within the Hero.
- It becomes available after the Hero boundary is crossed or after a bud transition reaches a chapter.
- Existing K.X reveal, section anchors, desktop navigation, and mobile menu remain unchanged outside the Hero.

## Mobile and Reduced Motion

Mobile:

- Recompose the photographic scene for portrait cropping without showing a complete tree.
- Place buds at reachable locations while preserving plausible growth logic.
- Disable cursor magnetism and pointer parallax.
- Retain tap activation, colour change, leaf unfolding, and organic chapter transition.
- Ensure each bud has at least a 44px interaction area even when its visible form is smaller.

Reduced motion:

- Show a static photographic composition.
- Replace breathing, parallax, zoom, and leaf growth with an immediate colour-state change and a short opacity transition.
- Scroll directly to the target chapter using native, non-smooth behaviour.
- Preserve all labels, keyboard access, and chapter destinations.

## Asset Requirements

Generate a bespoke landscape master image suitable for desktop and a composition that remains viable under portrait cropping. The image prompt must explicitly prohibit:

- Complete trees or forest vistas.
- Fantasy, fairy-tale, magical, cinematic-game, or glowing effects.
- Visible branded products.
- Artificially perfect bark or decorative floral arrangements.
- Excessive green saturation.

The result must prioritise rough bark, damp material, partial scale, spatial depth, architectural glass, natural daylight, and a believable old/new life contrast.

Inspect the generated image before implementation. Retry once only if the image is unusable because of an incorrect viewpoint, complete-tree composition, fantasy treatment, or insufficient negative space.

## Validation

Validate:

- Desktop at 1440×900 and 1280×800.
- Mobile at 390×844 and 360×800.
- Original KSX intro and its transition into the tree space.
- Global navigation hidden only inside the Hero and restored afterward.
- All four buds via mouse, keyboard, and touch.
- Hover breathing, cursor magnetism, activation state, leaf cover, target anchor, and visited state.
- Reduced-motion path.
- No horizontal overflow.
- No Hero layout changes leaking into later chapters.
- Browser console, TypeScript, and production build.

Keep the site local-only. Do not deploy or publish it.
