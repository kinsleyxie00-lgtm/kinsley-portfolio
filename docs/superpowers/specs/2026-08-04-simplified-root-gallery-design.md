# Simplified Root Gallery — Design

## Goal

Simplify the WebGL Hero to match the supplied reference composition: one warm mineral gallery wall, one dominant ancient root installation, one calm waterline, and four natural plant growth points. Preserve real Three.js depth and the completed plant interactions while removing visual complexity.

## Composition

- Camera remains inside a real 3D scene.
- One dominant root base crosses the waterline.
- One rising trunk creates the vertical architectural gesture.
- Four plants attach at lower waterline, mid-left trunk, upper trunk, and right branch positions.
- The waterline sits in the lower third of the frame and shows a restrained reflection.
- No text or fixed navigation appears over the opening scene.

## Architecture

- One warm gray plaster back wall.
- Two restrained side piers/reveals to establish gallery scale.
- One shallow stone platform behind the water.
- One simple pool basin and coping edge.
- Remove repeated wall slots, ceiling beams, decorative recesses, and volumetric-light geometry.

## Root and Plants

- Use the locally bundled Poly Haven PBR root model.
- Limit the installation to a base and one rising trunk; remove the third decorative root instance.
- Preserve wet/dry material distinction and procedural fallback.
- Preserve four independent plant states, session persistence, hover response, first-click awakening, and second-click navigation.
- Keep plant labels visible only during focus/hover.

## Lighting and Water

- One broad warm ambient/hemisphere source.
- One soft key light for bark relief.
- One restrained cool fill near the water.
- No visible light cone or decorative rear point light.
- Calm shader water with Fresnel reflection, subtle ripples, and root-contact darkening.

## Responsive Behavior

- Desktop uses the reference-like close architectural framing.
- Mobile uses a dedicated camera distance while retaining the same single-root composition.
- Mobile reduces pixel ratio and disables expensive shadows as already implemented.

## Preservation Rules

- Keep the KSX BrandIntro, shared navigation, all Kinsley experience/project content, section anchors, and downstream layout.
- Do not add a static background image, CSS fake depth, duplicate Hero, or second navigation system.
- Keep preview local only.

## Validation

- Verify the first viewport contains only the wall, root, water, four plants, and temporary spatial label.
- Verify no repeated wall decoration, ceiling grid, or extra root instance remains.
- Verify all four plant interactions and section transitions.
- Verify desktop and mobile framing, reduced motion, model fallback, and production build.

