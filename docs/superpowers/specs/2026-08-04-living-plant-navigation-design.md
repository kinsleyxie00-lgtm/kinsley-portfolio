# Living Plant Navigation — Phase Two Design

## Objective

Add four independent interactive plants to the existing real-time gallery scene. The plants are the only navigational objects in the WebGL world. They awaken through a restrained biological growth sequence and reconnect the immersive Hero to Kinsley Xie's existing About, Experience, Case, and Notes content.

This phase does not redesign the gallery room, water, tree-root installation, BrandIntro, downstream sections, shared navigation, or project structure.

## Selected Direction

Use procedural Three.js geometry combined with custom leaf shaders and GSAP timelines. This preserves real depth and good runtime performance without depending on external GLB assets. Geometry provides actual branches, leaves, shadows, and raycast targets; shaders provide the dormant-to-living material transition, leaf veins, translucency, and restrained glow.

## Plant Placement

Four `LivingLeaf` groups attach to distinct positions on the tree-root installation:

- `01 ABOUT` near the lower/root region, navigating to `#about`.
- `02 EXPERIENCE` growing upward from the central trunk, navigating to `#experience`.
- `03 CASE` on a lateral root, navigating to `#work`.
- `04 NOTES` at the highest visible growth point, navigating to `#notes`.

Placement follows the tree's geometry rather than an even screen grid. Each plant remains a genuine 3D object in the gallery coordinate system and receives scene lighting and shadows.

## State Model

Each plant owns one of three states:

### Dormant

- Grayscale stone-white leaves with low translucency.
- Branches are short and leaves remain partially folded.
- A slow, asynchronous breathing motion prevents the four plants from moving in unison.
- Hover or pointer proximity adds only a small increase in scale and wind response.

### Activated

- Input is locked for that plant during its approximately three-second awakening timeline.
- Branch geometry reveals progressively from root to tip.
- Two primary leaves unfold first; secondary leaves follow.
- `growthProgress` mixes the dormant material into a muted natural green.
- Leaf veins become visible during the latter half of the transition.
- A short, sparse spore emission appears near completion.

### Mature

- Leaves remain larger, green, and fully unfolded.
- Branches respond subtly to the environment and pointer direction.
- Glow is limited to a soft material lift, not an emissive fantasy effect.
- The state persists for the current browser session.
- A second click initiates navigation.

## Input and Navigation

Only plant hit meshes participate in navigational raycasting. The tree, water, room, and tree-root installation never activate chapters.

Desktop behavior:

1. Pointer proximity causes plant breathing/wind response and a weak water ripple near the plant's projected root point.
2. First click on a dormant plant starts awakening.
3. Clicks during activation are ignored.
4. Second click on a mature plant starts the organic chapter transition.

Touch behavior:

1. First tap focuses a plant and provides a restrained visual response.
2. Second tap awakens a dormant plant.
3. After maturity, the next tap starts chapter navigation.

The mature plant is never forced to navigate automatically. This preserves the user's chosen B interaction: awakening and navigation are separate actions.

## Organic Chapter Transition

Navigation uses one continuous GSAP timeline:

1. Camera approaches the selected mature plant.
2. A real leaf mesh scales and rotates toward the camera until its material fills the viewport.
3. At full visual coverage, the existing page scrolls to the target section.
4. The WebGL overlay recedes and the camera rig returns home for the next visit.

There is no fade-to-black, route change, duplicate page, or replacement navigation system.

## Spatial Labels

Labels remain minimal and do not become a conventional navbar. The active or focused plant may show its number and chapter name through a small projected HTML label anchored to the plant's world position. Labels are hidden when no plant is focused and never sit in fixed screen corners.

## Persistence

Mature plant IDs are stored in `sessionStorage`. Returning to the Hero during the same tab session restores those plants directly to mature green state without replaying the growth timeline. Persistence is intentionally not permanent across browser sessions.

## Component Responsibilities

- `LivingLeaf`: plant geometry, shader uniforms, local state, growth timeline, particles, and environmental response.
- `World`: plant lifecycle coordination, raycasting decisions, camera transition, water response, and navigation callbacks.
- `BotanicalRaycaster`: plant-only interaction hits plus non-navigational water-plane intersections.
- `CameraRig`: pointer parallax and selected-plant approach/recovery.
- `BotanicalWorld`: React lifecycle, spatial label state, session-state restoration, and callbacks into the existing page.
- `leafGrowth.glsl`: grayscale-to-green mix, vein reveal, subtle translucency, and hover deformation.

## Motion and Accessibility

- Normal awakening lasts approximately three seconds with organic easing.
- `prefers-reduced-motion` immediately resolves a dormant plant to its mature visual state and uses direct scrolling for navigation.
- Keyboard users receive a compact offscreen-accessible chapter control that follows the same dormant/mature two-action model; it is not visually rendered as a second navbar.
- Touch targets use invisible 3D hit volumes large enough for mobile without enlarging visible leaves.

## Performance

- Shared leaf geometry and shared shader material are reused where state isolation permits; per-plant uniforms remain independent.
- Particle counts remain low and emission occurs only during activation.
- No dynamic shadows are added beyond the existing desktop shadow budget.
- Mobile uses reduced geometry segments and device-pixel-ratio limits already established by the WebGL world.

## Validation

- Verify all four plants can independently reach dormant, activated, and mature states.
- Verify one plant's transition cannot mutate another plant's uniforms or state.
- Verify mature-state restoration after scrolling away and returning during the same session.
- Verify tree, root, room, and water clicks never navigate.
- Verify mouse parallax, leaf response, water ripple, second-click navigation, and camera recovery on desktop.
- Verify focus-first touch behavior and responsive framing on mobile.
- Verify reduced-motion behavior, keyboard access, BrandIntro completion, shared navigation, and downstream Kinsley content.
- Run the production build and keep preview local only.

