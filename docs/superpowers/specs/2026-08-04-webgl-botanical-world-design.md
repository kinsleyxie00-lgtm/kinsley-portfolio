# KINSLEY XIE Portfolio — WebGL Botanical World Hero

## Objective

Replace the current image-based Hero rendering layer with a production-level Three.js WebGL environment. The Hero becomes a real three-dimensional botanical world inside a dark, quiet water ecosystem. Preserve the existing KSX opening, the single shared navigation system, all portfolio chapters, anchors, mobile menu, personal experience, and project content.

The WebGL Hero must not use a photographic background, CSS parallax, stacked image planes, or fake depth. All visible spatial elements are real geometry, shader-driven water, lights, fog, and particles.

## Scope

This change replaces only the existing Hero visual and interaction implementation. It does not create a second Hero, home page, navigation, project section, or opening sequence.

The first production version uses procedural geometry for the ancient root and exposes a future GLTF replacement boundary. A scanned `.glb/.gltf` root can later replace the procedural generator without changing plant, interaction, water, or chapter-navigation contracts.

## Source Structure

Use TypeScript throughout:

```text
src/
├─ BotanicalWorld.tsx
├─ scene/
│  ├─ World.tsx
│  ├─ Camera.tsx
│  └─ Lighting.tsx
├─ objects/
│  ├─ AncientTree.tsx
│  ├─ LivingLeaf.tsx
│  └─ WaterSurface.tsx
├─ shaders/
│  ├─ waterRipple.glsl
│  └─ leafGrowth.glsl
├─ interaction/
│  ├─ Raycaster.tsx
│  └─ MouseEffects.tsx
└─ types/
   └─ botanical.ts
```

`components/Hero.tsx` remains the only Hero component and dynamically loads `src/BotanicalWorld.tsx` on the client.

## Module Responsibilities

### BotanicalWorld

- Own the WebGL canvas lifecycle and accessible HTML overlay.
- Dynamically initialize the Three.js world only in the browser.
- Expose loading, unsupported WebGL, context loss, and reduced-motion states.
- Preserve the four existing chapter destinations.

### World

- Create the scene and clock.
- Coordinate the root, plants, water, fog, lights, reflection target, and particles.
- Own per-frame updates and pause them when the Hero is not visible.
- Dispose all GPU and event resources on unmount.

### Camera

- Use a restrained first-person exhibition viewpoint.
- Smoothly respond to normalized pointer input.
- Limit translation and rotation to prevent game-like navigation or motion sickness.
- Perform the selected-plant approach animation before chapter navigation.

### Lighting

- Provide low-key environmental illumination, restrained volumetric shafts, and leaf rim/transmission light.
- Keep the ecosystem dark, quiet, and museum-like.
- Avoid fantasy glow, dramatic game lighting, and saturated green.

### AncientTree

- Generate a monumental branching root from curves, tube geometry, deterministic noise displacement, and PBR material properties.
- Provide stable plant attachment transforms.
- Remain non-interactive and excluded from the interactive raycast collection.
- Expose an interface compatible with a future GLTF root asset.

### LivingLeaf

- Represent one independently stateful plant attached to the root.
- Own its branches, leaf meshes, shader uniforms, particle emitter, and environmental response.
- Register only its intended hit meshes with Raycaster.

### WaterSurface

- Render a highly subdivided real mesh using `ShaderMaterial`.
- Own ripple uniforms, vertex displacement, normal perturbation, Fresnel reflection, water coloration, and reflection distortion.
- Accept world-space ripple impulses while remaining non-navigational.

### Raycaster

- Raycast only against registered small-plant hit meshes for navigation.
- Maintain a separate water-intersection path used only to position ripple input.
- Never make the root, water, fog, particles, or whole scene clickable.

### MouseEffects

- Normalize and smooth pointer/touch movement.
- Feed camera response, nearby plant wind direction, plant attraction, and water intersection input.
- Avoid direct React state updates on every pointer frame.

## Environment

The scene contains:

- a massive partial ancient root extending beyond the camera frame;
- physically present root branches with real occlusion and depth;
- a surrounding dark water surface;
- shader-driven reflection and refraction distortion;
- ambient depth fog;
- restrained volumetric light shafts;
- four small plants growing from believable bark attachment points;
- sparse procedural pollen or spore particles during plant activation.

No flat photographic planes or static background images may appear in the WebGL composition.

## Interactive Boundary

Only the four small plants attached to the root are interactive chapter objects.

The ancient tree itself is never clickable. Clicking tree bark, water, fog, particles, or empty space cannot activate a chapter. Cursor affordance appears only when a registered plant hit mesh is hovered or keyboard-focused.

Plant destinations remain:

- ABOUT → `#about`
- EXPERIENCE → `#experience`
- CASE → `#work`
- NOTES → `#notes`

## Plant State Machine

Each plant maintains an independent state.

### Dormant

- Shader-rendered grayscale leaves.
- Slow breathing animation with per-plant phase offsets.
- Minor nearby-pointer wind response.
- No particle emission.
- `growthProgress = 0`.

### Activated

- A one-time 3.2-second procedural growth timeline.
- Color transitions from grayscale to low-saturation natural green.
- Leaf veins appear after color recovery begins.
- Main and secondary branches extend from the attachment root.
- Leaves unfold individually.
- Sparse procedural particles emit.
- A restrained thin-leaf transmission response appears without a magical aura.

### Mature

- Final plant scale is approximately `1.2` relative to dormant size.
- Added branches and expanded leaves remain present.
- The plant continues slow breathing and environmental wind response.
- The mature state persists for the current in-page session and resets on full reload.

Only one plant may enter the activated timeline at a time. Other plants remain responsive but cannot begin a competing camera transition.

## Growth Timeline

Use a root-to-tip procedural progression:

```text
0.0s  attachment root pulses subtly
0.3s  primary branch extends along its curve
0.9s  secondary branches unfold in sequence
1.4s  leaves open individually from their petioles
2.2s  the complete plant approaches scale 1.2
2.6s  veins finish appearing and sparse spores release
3.2s  plant enters mature environmental response
```

GSAP drives normalized progress values. Geometry and shaders derive individual branch and leaf timing from path distance and per-leaf delays. Do not animate every mesh with unrelated imperative tweens.

## Leaf Shader

`leafGrowth.glsl` owns the color and growth presentation. It uses independent per-plant uniforms:

```text
growthProgress
breathProgress
hoverStrength
veinProgress
glowStrength
windDirection
```

Color transition follows this model:

```glsl
vec3 grayscaleColor = vec3(dot(baseColor, vec3(0.299, 0.587, 0.114)));
vec3 leafColor = mix(
  grayscaleColor,
  greenColor,
  smoothstep(0.0, 1.0, growthProgress)
);
```

`veinProgress` starts after the initial color change. `glowStrength` temporarily increases during activation and settles into restrained edge transmission in the mature state. Growth also drives leaf scale, unfolding angle, and surface bend so the result is not a flat color crossfade.

## Water Shader Pipeline

Pointer input follows this pipeline:

```text
cursor screen coordinate
→ water ray intersection
→ world-space ripple center
→ ripple uniforms
→ vertex displacement
→ circular wave propagation
→ perturbed water normal
→ Fresnel reflection
→ reflection distortion
```

`waterRipple.glsl` provides:

- low-frequency ambient vertex waves;
- multiple short-lived circular ripple impulses;
- spatial attenuation and temporal propagation;
- recomputed or approximated displaced normals;
- Fresnel edge reflection;
- dark green depth color and restrained transparency;
- distorted reflection of the real tree and plants.

Pointer movement adds subtle ripples at the water intersection. Activating a plant adds a stronger but restrained ripple beneath its attachment point. When no water intersection exists, no invalid impulse is emitted.

The water can receive mouse input but is never a navigational click target.

## Camera and Chapter Transition

- Camera movement is cinematic and constrained, not free-roaming gameplay.
- Pointer movement produces slow positional and rotational response based on true perspective.
- Plant activation triggers a calm camera approach toward the selected plant.
- At timeline completion, the existing target section is positioned and revealed.
- The transition must preserve the single-page anchors and shared Navigation behavior.
- No black fade or flat leaf-image cover is used.

## Accessibility

- Provide an HTML chapter control list synchronized with the four 3D plants.
- Keyboard focus produces the same hover state and activation timeline.
- Announce plant state changes without exposing decorative scene objects.
- Maintain native focus visibility.
- WebGL failure retains functional chapter navigation instead of an empty canvas.

## Performance

- Dynamically import Three.js code only on the client.
- Cap device pixel ratio by performance tier.
- Share geometry and materials where possible.
- Instance particles and repeated leaf geometry where compatible with independent uniforms.
- Reduce water subdivisions, reflection resolution, particle count, fog complexity, and volumetric lighting on mobile or low-tier devices.
- Avoid React state updates inside the render loop.
- Pause or heavily throttle rendering when the Hero is outside the viewport or the document is hidden.
- Dispose geometry, material, textures, render targets, animation handles, observers, and listeners on unmount.
- Handle `webglcontextlost` and show the accessible fallback.

## Reduced Motion

With `prefers-reduced-motion`:

- keep a static 3D scene when WebGL is supported;
- disable camera pointer movement, continuous ripples, growth sequencing, and particle emission;
- activate a plant directly into the mature visual state;
- navigate to the chapter without a long camera transition;
- retain focus, labels, and destinations.

## Error and Fallback Behavior

- Show a restrained loading state while the client scene initializes.
- If WebGL is unsupported or scene initialization fails, render the four accessible chapter controls over the existing warm neutral Hero surface.
- Do not fall back to the previously generated tree photograph.
- Preserve the rest of the page even if the WebGL scene fails.

## Validation

Validate:

- original KSX intro and its transition into the WebGL Hero;
- exactly one Hero and one shared Navigation;
- desktop at 1440×900 and 1280×800;
- mobile at 390×844 and 360×800;
- real perspective response and geometry occlusion;
- interactive-object boundary: only small plants activate;
- all three plant states independently;
- leaf color uniform interpolation, veins, branches, unfolding, and final 1.2 scale;
- water ray intersection, circular vertex waves, Fresnel reflection, and distortion;
- pointer, touch, keyboard, and reduced-motion paths;
- current-session mature-state retention;
- navigation to ABOUT, EXPERIENCE, CASE, and NOTES;
- WebGL unsupported and context-loss fallback;
- no horizontal overflow or later-section regressions;
- TypeScript, production build, and browser console;
- GPU resource cleanup and acceptable desktop/mobile frame behavior.

Keep all work local. Do not publish or deploy the website.
