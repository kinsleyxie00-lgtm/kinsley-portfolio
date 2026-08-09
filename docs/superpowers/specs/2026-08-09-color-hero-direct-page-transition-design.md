# Color Hero and Direct Page Transition Design

## Objective

Refine the interactive portfolio around the three supplied reference images. The ancient-tree photograph is a warm, full-color entrance. Only its four plants begin desaturated. Hovering or focusing a plant reveals its natural green color with restrained organic motion; clicking immediately enters the corresponding portfolio page.

Once a visitor enters the content space, the persistent navigation switches directly among About, Experience, Projects, Photography, and Contact. The Hero is not shown again during that visit and there is no back-to-Hero control.

## Sources of Truth

The implementation follows these local references:

- `/Users/xkx/Desktop/download-1.png` for the four plant locations;
- `/var/folders/m6/h_8jl2_96w97b_5693cs16580000gn/T/codex-clipboard-66509972-1293-49de-b7bf-61ae646c80b5.png` for interaction, page switching, layout examples, and palette;
- `/var/folders/m6/h_8jl2_96w97b_5693cs16580000gn/T/codex-clipboard-5950dbf6-ec9b-44fe-b778-a655ce14b8e7.png` for Hero typography, navigation, plant labels, and editorial project composition.

StudioFMRG informs transition restraint and editorial pacing. Aesop-inspired natural materiality informs atmosphere only. No brand copy, branded component, or recognizable Aesop page composition is copied.

## Scope

This phase builds:

1. the revised color Hero interaction;
2. the non-returning page transition state machine;
3. the shared editorial exhibition layout framework;
4. direct persistent navigation among all five content pages.

It preserves the current KSX BrandIntro, existing Kinsley content, React/Next.js/GSAP/Framer Motion architecture, and existing local assets. It does not deploy the site, add images, create routes, or introduce a second homepage or navigation system.

## Hero

After the KSX BrandIntro finishes, the viewport reveals `/public/images/tree-aquatic-archive-v3.png` in its original warm color photography.

The Hero includes:

- the KINSLEY XIE wordmark at upper left;
- the five-item navigation across the top;
- one short serif statement in the left negative space;
- restrained plant labels placed near their corresponding specimens;
- a small practice line such as `Observe / Curate / Create` where space permits.

The photograph remains the dominant element. Typography is small, sparse, and integrated into the architecture rather than presented as a conventional portfolio headline block.

Pointer movement creates subtle parallax only. Touch and reduced-motion modes remain static.

## Plant Mapping

The plant positions remain:

| Photograph position | Destination |
| --- | --- |
| Upper trunk | About |
| Center-left trunk | Experience |
| Right branch | Projects |
| Lower waterline | Photography |

Hotspots are semantic buttons with at least 44 CSS-pixel hit areas. Desktop and mobile coordinates may differ to account for the responsive image crop. The visible label and hit area must remain tied to the same plant.

## Plant Visual State

The base tree photograph stays in color. Each plant receives an independent local desaturation treatment at rest. The trunk, water, walls, moss, and reflection are not globally desaturated.

On hover or keyboard focus:

1. the plant's grayscale treatment dissolves to reveal source green;
2. its local reveal expands softly from the growth point;
3. a small scale and brightness change suggests leaves opening;
4. the nearby label gains contrast.

The motion is reversible when hover or focus leaves. No click is required to color the plant. There are no particles, glows, spores, portals, or game-state labels.

On touch, the first tap may show the hover state briefly only if required for discoverability; the same tap should still enter the section unless the browser's interaction model prevents it.

## Click and Transition

Clicking a plant immediately begins the page transition. It does not wait for a growth sequence to complete.

The Hero exits through a restrained combination of:

- image scale of no more than a few percent;
- short blur and opacity reduction;
- a soft editorial wipe or clip reveal for the incoming page.

The URL, route, and hash remain unchanged. There is no refresh.

## View State

The application owns one view state:

```text
hero | about | experience | projects | photography | contact
```

`hero` is available only before the first content entry in the current mounted session. After entry, all navigation actions select one of the five content views. The brand button becomes a non-interactive identity mark or opens About; it does not return to the Hero.

No back-to-Hero control appears. Escape does not close the current page to the Hero. Project details and photography lightboxes may continue to use Escape to close their own nested modal.

Selecting another navigation item while inside a section directly replaces the current section using the shared transition system. The outgoing and incoming content do not expose the Hero between them.

## Navigation

The persistent navigation contains:

```text
About / Experience / Projects / Photography / Contact
```

It remains visible on the Hero and every content page, with a restrained active underline. Mobile uses the same destinations in a compact menu. Closing the mobile menu does not change the active view.

## Editorial Exhibition Framework

All content pages share a structural framework rather than sharing an identical template:

- persistent top navigation;
- warm off-white or mineral background;
- small section index and metadata;
- large serif page title;
- controlled image proportions using existing assets only;
- story, process, and results content organized into short editorial blocks;
- generous whitespace and asymmetrical grids.

Pages may scroll internally when their content exceeds the viewport. This internal reading flow is not a continuous scrolling homepage.

### About

Use a quiet two-part composition: concise personal story and one existing portrait/botanical arrangement. Skills and tools appear as light metadata, not résumé cards.

### Experience

Use an indexed editorial timeline. Each role has short story, process/contribution, and result highlights. Avoid a corporate résumé table.

### Projects

Use an asymmetrical image-led grid inspired by the supplied project reference. Each project exposes title, story/context, process, and result through the existing nested project detail system.

### Photography

Use a museum-contact-sheet or exhibition grid with existing photography placeholders/assets. Preserve the lightbox and keyboard navigation.

### Contact

Use a minimal correspondence page with a large invitation line, concise availability, email, phone, location, and résumé action.

## Motion

Motion uses Framer Motion and GSAP/CSS only where each is already appropriate:

- hover desaturation reveal;
- restrained image parallax;
- fade, blur, and clip transitions between views;
- small stagger for headings, metadata, and image groups;
- smooth internal scrolling without an exaggerated inertia system.

Reduced-motion mode removes parallax, blur, and stagger and switches views with a near-instant opacity change.

## Responsive Behavior

Desktop follows the supplied wide Hero composition. Mobile uses a dedicated crop and hotspot calibration. If one plant cannot remain visible in a single portrait crop, navigation still guarantees direct access, but the design should prioritize showing as many real plant positions as possible without fabricating new imagery.

Content grids collapse into deliberate editorial sequences rather than generic stacked cards. Safe areas, 44-pixel controls, keyboard focus, and touch interaction are preserved.

## Failure and Edge Cases

- Failure to apply a local plant mask leaves that plant desaturated but does not block its button.
- Rapid navigation selects only the latest requested view and cannot produce overlapping pages.
- KSX BrandIntro always resolves to the Hero, never directly to a content page.
- A nested project detail or photography lightbox closes back to its parent section, not to the Hero.
- Session storage is not required for plant state because hover is transient and the Hero is not revisited.

## Validation

- Compare Hero color, typography, labels, and spacing with all three supplied images.
- Verify the tree, water, architecture, and reflection remain in original color.
- Verify only the four plant regions appear desaturated at rest.
- Verify hover/focus reveals green and organic motion without click.
- Verify each plant click immediately opens its mapped page.
- Verify no content page exposes a return-to-Hero control.
- Verify navigation switches directly between all five pages with no Hero flash, URL change, or refresh.
- Verify About, Experience, Projects, Photography, and Contact use the shared editorial framework and existing assets only.
- Verify nested project and photography dialogs still function.
- Verify desktop, mobile, keyboard, touch, and reduced-motion behavior.
- Run the production build and retain local preview only.
