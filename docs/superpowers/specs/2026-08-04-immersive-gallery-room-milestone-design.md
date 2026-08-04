# KINSLEY XIE Portfolio — Immersive Gallery Room Milestone

## Objective

Refactor the current Three.js Hero so its first milestone is a complete, readable, real-time three-dimensional museum environment. The result must no longer resemble a foreground root placed against an empty or flat background.

This milestone validates only the physical environment: gallery volume, sculptural roots, water, reflection, lighting, shadows, fog, and camera presence. Hide plants, chapter labels, Hero typography, instructions, and navigation UI while this milestone is reviewed.

## Current Problem

The existing implementation uses real geometry but still reads visually as 2.5D because:

- no architectural room geometry defines scale or depth;
- the tree root fills most of the frame like a foreground cutout;
- the scene background is a solid color rather than a visible space;
- the floor and water boundary are not legible;
- the camera is too close to the root to reveal spatial relationships;
- the current procedural roots have regular tube silhouettes and insufficient taper or bark structure;
- lighting does not clearly separate walls, water, roots, and depth planes.

## Milestone Scope

Keep the existing React and Three.js module architecture, render lifecycle, pointer normalization, and future plant-interaction interfaces.

Implement or refactor:

```text
Scene
├── GalleryRoom (real architectural geometry)
├── WaterSurface (horizontal shader mesh)
├── AncientTree (sculptural branching mesh)
├── Lighting (museum lights and restrained volume)
└── CameraRig (viewer inside the room)
```

Temporarily exclude from rendering:

- all four interactive plants;
- plant raycasting and activation visuals;
- chapter labels and accessible chapter overlay;
- Hero title and instructional copy;
- decorative CSS vignette layers that imply depth.

Do not delete the plant state machine or interaction code. The next milestone will restore it after the space is approved.

## Gallery Room

Add `src/scene/GalleryRoom.tsx`.

Construct an approximately 18 × 10 × 20 metre minimalist indoor gallery using real Three.js geometry:

- back wall with recessed vertical light openings;
- left and right side walls with visible thickness and perspective convergence;
- ceiling beams or light wells that establish height;
- stone or mineral floor surrounding a recessed pool;
- a physically modelled pool basin, edge, and inner walls;
- optional rear plinth or shallow architectural ledge for scale.

Use PBR materials with restrained cream mineral plaster, pale stone, and subtle roughness variation. Generate small surface variation procedurally; do not use background photographs or billboard planes.

Every architectural surface exists in the same world coordinate system as the root and water and participates in lighting, fog, occlusion, shadow, and reflection.

## Composition and Camera

Place the camera inside the gallery entrance, approximately 5–7 metres from the root installation. The first frame must visibly include:

- at least two architectural planes meeting at a corner;
- a readable section of floor or pool surround;
- the horizontal water boundary;
- the root installation with negative space around it;
- the root reflection in the pool;
- a visible depth path toward the back wall.

Use a perspective camera with restrained first-person motion:

- pointer X controls limited yaw and lateral translation;
- pointer Y controls limited pitch and vertical translation;
- movement is damped and never becomes free navigation;
- the architectural lines, root occlusion, and reflections create real parallax;
- no CSS transform contributes to spatial movement.

## Sculptural Tree Root

Refactor `AncientTree.tsx` away from uniform TubeGeometry appearance.

Requirements:

- one dominant ancient trunk/root mass rises from the pool and leaves the upper frame;
- primary roots spread laterally and into depth rather than lying on one frontal plane;
- branch radius tapers toward each endpoint;
- cross-sections are non-circular and change along the path;
- branching junctions overlap and interpenetrate naturally without billboard edges;
- vertex displacement creates irregular bark ridges and fissures without regular zebra striping;
- dry upper bark and wet near-water bark use different PBR roughness, color, and clearcoat response;
- roots cast real shadows onto walls, floor, water surround, and other roots.

The first milestone remains procedural and preserves the future GLTF replacement boundary.

## Water and Reflection

Keep a real horizontal, subdivided WaterSurface mesh inside the recessed pool.

The shader pipeline remains:

```text
pointer ray → water world position → ripple uniforms
→ vertex displacement → displaced normals
→ Fresnel reflection → reflection distortion
```

Improve the reflection pass so it includes the gallery, root, and lights:

- mirror the camera correctly across the water plane;
- use an oblique clipping plane to exclude geometry behind the reflector;
- update the reflection texture before the main scene render;
- distort the reflection UV using displaced water normals;
- maintain a visible but restrained water tint and depth response;
- create pointer-driven circular ripples whose displacement changes the reflected image.

The pool edge and basin geometry must make the water plane's position unmistakable.

## Lighting and Atmosphere

Use cinematic museum lighting rather than an undifferentiated ambient wash:

- soft ceiling or light-well illumination establishes the room volume;
- one broad key light models the main trunk;
- restrained side fill reveals bark relief;
- real shadow maps anchor the root to the installation;
- subtle volumetric shafts occupy actual scene volume without hiding architecture;
- low-density ambient fog creates depth separation while keeping the back wall visible.

Tone mapping should preserve warm mineral walls, dark wet bark, muted green-black water, and soft highlights.

## Materials

Use only Three.js materials and procedural data for this milestone:

- walls: warm mineral plaster, high roughness;
- floor and pool surround: pale stone, moderate roughness and subtle reflectivity;
- dry bark: dark brown-grey, high roughness, pronounced normal variation;
- wet bark: darker, lower roughness, restrained clearcoat;
- water: shader reflection, Fresnel, depth tint, and dynamic normal distortion.

No background images, environment photographs, CSS layers, flat scene planes used as imagery, or cutout assets are permitted.

## UI State During Milestone

The Hero displays only the WebGL canvas and its short loading/failure fallback. Hide:

- KINSLEY XIE title;
- archive copy and instructions;
- chapter buttons and labels;
- custom cursor messaging;
- plants and particles.

The rest of the portfolio remains below the Hero and unchanged. Shared Navigation behavior outside the Hero remains intact.

## Performance and Cleanup

- Reuse the existing client-only dynamic import.
- Cap device pixel ratio by performance tier.
- Reduce room subdivisions, reflection target resolution, shadows, and volumetric effects on mobile.
- Do not allocate geometry, materials, or vectors inside the render loop.
- Pause rendering when the Hero is not visible.
- Dispose room materials, procedural textures, reflection targets, lights, and geometry on unmount.
- Preserve WebGL context-loss fallback.

## Validation

The milestone passes only if:

- the first frame clearly reads as a room, not an object on a background;
- walls, floor, pool, water, and roots coexist in one coordinate space;
- camera motion reveals real changes in occlusion and perspective;
- the root has convincing branching, taper, irregularity, and dry/wet material zones;
- the water is a horizontal mesh with visible boundary and reflection;
- pointer ripples distort the reflected gallery and root;
- lights cast readable shadows and reveal bark form;
- fog increases depth without erasing the architecture;
- no Hero image background, CSS parallax, billboard, cutout, or fake depth layer remains;
- no plants, text, labels, or webpage layout distract from spatial review;
- desktop and mobile render without overflow or WebGL errors;
- TypeScript and production build pass;
- the KSX intro and all portfolio content below the Hero remain intact;
- the site remains local-only and is not deployed.
