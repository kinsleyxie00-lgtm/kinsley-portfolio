# Photoreal Botanical Gallery Polish — Design

## Objective

Raise the current interactive WebGL Hero from a functional prototype to a credible premium botanical-museum installation. The polish phase replaces the visibly procedural tree-root asset, improves the plants, water, architecture, lighting, and camera, and preserves every working interaction from the living-plant phase.

The first impression must be a real sculptural installation photographed inside a quiet gallery, not a Three.js technology demonstration.

## Non-Goals

- Do not rebuild BrandIntro, shared navigation, About, Experience, Projects, Notes, Contact, or Footer.
- Do not introduce a background image, billboard scene, CSS parallax, or fake foreground layers.
- Do not replace the existing plant state machine, second-click navigation model, session persistence, or target anchors.
- Do not publish or deploy the site.

## Asset Strategy

Use locally bundled, commercially usable or CC0 assets for the hero object and its PBR materials.

Selection requirements:

- A high-quality tree root, weathered trunk, driftwood, stump, or compatible set of two to three wood assets.
- Real three-dimensional silhouette with irregular bark depth; no cutout planes.
- GLB or glTF source suitable for web optimization.
- Clear license permitting portfolio use and local modification.
- A documented source URL, author when required, license, and download date in `public/models/ATTRIBUTION.md`.
- No runtime dependency on third-party URLs.

When a single suitable root model is unavailable, combine two or three compatible wood assets into one sculptural installation. Their intersections must be concealed below the waterline, within bark contact zones, or by small natural knot geometry.

## Tree-Root Installation

Create a new `MuseumRoot` loader-based object and retain `AncientTree` only as a loading/error fallback.

The final installation:

- occupies the same world region as the current root so camera and gallery coordinates remain stable;
- presents one dominant old trunk and several lateral roots crossing the water;
- avoids visible cut ends, spikes, low-poly facets, and symmetric radial forms;
- uses PBR bark with base color, normal, roughness, and ambient-occlusion maps when the selected asset supports them;
- uses lower roughness and slightly darker color at and below the waterline;
- casts and receives restrained museum-light shadows;
- exposes stable attachment transforms for the four interactive plants.

## Plant Refinement

Keep each plant as an independent `LivingLeaf` object with dormant, activated, and mature states.

Refinements:

- Replace the current diamond-like leaf silhouette with asymmetric curved leaf geometry.
- Reduce the visual emphasis to two primary leaves plus restrained secondary growth.
- Anchor branches at explicit transforms supplied by the root installation.
- Ensure dormant leaves and branch tips remain physically connected.
- Use stone gray for dormancy and low-saturation moss green for maturity.
- Retain grayscale-to-green shader mixing, vein reveal, unfolding, wind response, spores, and session persistence.
- Remove fantasy-like emissive glow; retain only restrained rim lift and translucency.

## Gallery Architecture

Simplify the existing room into a warm mineral volume:

- warm limestone/plaster walls with subtle roughness;
- fewer repeated vertical wall elements;
- one broad architectural reveal or light slot behind the installation;
- a clear water basin with stone coping and sufficient foreground depth;
- no decorative objects that compete with the tree.

All architecture remains real Three.js geometry in the same scene.

## Water

Retain the horizontal shader-driven water surface and improve it with:

- correct mirrored environment rendering;
- Fresnel-driven reflection strength;
- small layered ambient waves;
- pointer and plant-proximity circular ripples;
- reflection UV distortion derived from the displaced surface;
- contact darkening and a deeper, low-saturation water color around submerged roots.

The water must remain calm and architectural. No ocean motion, glowing energy, or exaggerated concentric rings.

## Lighting, Fog, and Camera

Lighting uses a museum-installation hierarchy:

- broad warm skylight for the room;
- one soft key light defining bark relief;
- a restrained cooler fill from the water side;
- limited rear separation against the plaster wall;
- soft shadows with a conservative desktop shadow budget.

Fog remains subtle and is used only to separate foreground water, root, and back wall.

The camera uses a close architectural viewpoint with a slightly elevated waterline, a natural perspective field of view, and restrained pointer rotation. The root must feel large without filling the frame as an isolated object. Mobile framing uses a dedicated camera home and look target rather than simply cropping the desktop camera.

## Loading and Failure Behavior

- Preload the optimized model before revealing the WebGL world.
- Display the existing minimal loading state while the asset is decoded.
- If the model or textures fail, instantiate the existing procedural `AncientTree` fallback and keep all plant interactions available.
- Failure of decorative PBR channels falls back to a neutral bark material without failing the scene.
- WebGL context failure continues to expose the existing downstream portfolio.

## Performance Budget

Target budgets after optimization:

- combined compressed model payload: approximately 5 MB or less where asset quality permits;
- individual color/normal textures: maximum 2048 px desktop, with a lower-cost mobile path;
- no more than three wood asset instances;
- keep particle counts low and emit only during plant activation;
- cap device pixel ratio using the current renderer policy;
- disable expensive dynamic shadows on mobile;
- dispose loaded geometries, textures, render targets, and timelines on unmount.

Model quality takes priority over an arbitrary payload target, but assets must be optimized before integration and visibly tested on mobile.

## Existing Behavior That Must Survive

- Original sans-serif KSX BrandIntro.
- One Hero and one Three.js world.
- Four independent plants: About, Experience, Case, and Notes.
- Only plants are navigational hit targets.
- First action awakens a dormant plant without navigating.
- Mature plant requires a second action to enter its section.
- Mature plants remain green in the current browser session.
- Leaf-cover transition and existing section anchors.
- Mouse camera response, water ripples, touch input, keyboard access, and reduced-motion behavior.
- Existing Kinsley personal experience and project content below the Hero.

## Asset Research and Verification

Asset research begins only after this specification is approved. Candidate assets are evaluated for silhouette, bark detail, topology, license, download format, payload size, and visual compatibility. Primary or creator-hosted asset pages are preferred for licensing evidence.

Downloaded assets are inspected locally before integration. Assets with unclear licensing, embedded tracking, unnecessary scripts, or unusable topology are rejected.

## Validation

- Compare desktop composition against the supplied botanical-installation reference language: scale, material, spatial depth, and restraint.
- Verify the model is real geometry through camera parallax and shadow behavior.
- Verify bark relief, wet/dry material variation, water reflection, ripple distortion, and fog depth.
- Exercise all four plant state transitions and second-click navigation.
- Reload the page and verify mature plants restore in the same session.
- Verify touch focus/activation/navigation behavior with mobile framing.
- Verify reduced motion, keyboard controls, BrandIntro exit, shared navigation, and all downstream sections.
- Test the fallback root by intentionally simulating a model-load failure.
- Run the production build and retain local preview only.

