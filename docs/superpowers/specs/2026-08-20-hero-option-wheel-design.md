# Hero Option Wheel Navigation

## Goal

Replace the Hero's existing straight `01–04` plant index with an adapted React Bits `OptionWheel`. Preserve the ancient-tree composition, plant hotspots, water refraction, 620ms view handoff, top navigation, routes, and inner pages.

## Interaction model

The wheel contains exactly four items:

```text
01 ABOUT
02 EXPERIENCE
03 PROJECTS
04 PHOTOGRAPHY
```

`01 ABOUT` is selected on initial load. Scrolling, trackpad movement, dragging, and the arrow keys change only the selected item; settling on a new item must never navigate automatically. Clicking the centered selected item or pressing Enter/Space starts the existing 620ms handoff to its view.

Clicking an off-center item first selects and centers it without navigation. A subsequent click on the centered item enters the view. This prevents accidental navigation during exploration.

The wheel selection and plant hotspots remain bidirectionally linked:

- selecting a wheel item activates its matching plant marker;
- hovering or focusing a plant hotspot selects and centers its matching wheel item;
- clicking a plant hotspot retains the existing direct navigation behavior.

## Visual treatment

The wheel remains in the current left editorial column under `EXPLORE THROUGH THE PLANTS`. It curves gently toward the left edge rather than forming a dramatic carousel. The selected item stays dark, crisp, and slightly heavier. Neighboring items move along the arc with progressively lower opacity and an extremely subtle blur.

Typography, charcoal color, spacing, and hairline details must inherit the existing botanical editorial system. Do not introduce cards, plates, gradients, glow, large controls, white text, sound, or decorative chrome. The wheel must remain visually subordinate to `KINSLEY XIE` and the tree photograph.

## Component architecture

Create a typed, project-local `OptionWheel` component based on the supplied React Bits JavaScript/CSS source. Preserve its single request-animation-frame easing loop, pointer dragging, non-passive wheel handling, and keyboard navigation while adapting its public interface for controlled selection.

The component accepts:

- typed plant option data rather than plain display strings;
- `selectedIndex` and `onSelectedIndexChange` for controlled bidirectional linkage;
- `onActivate` for click/Enter/Space navigation;
- visual configuration needed by the Hero;
- a reduced-motion flag that snaps immediately instead of easing.

`Hero` remains responsible for plant/view state and the existing `onEnter(view)` contract. `OptionWheel` owns only wheel position, gesture interpretation, rendering, and focus behavior. No routing or view-specific knowledge belongs inside the wheel.

## Responsive and accessibility behavior

On desktop and fine-pointer devices, enable wheel scrolling and pointer dragging. On narrow or coarse-pointer layouts, render the same four options as a clear vertical button list without curvature, blur, or drag capture.

The wheel exposes listbox/option semantics, a descriptive accessible label, and `aria-selected` on each option. Arrow keys change selection. Enter and Space activate only the selected option. Pointer capture begins only after a real drag threshold so ordinary clicks remain reliable.

Under `prefers-reduced-motion`, selection snaps directly to the target and all navigation remains functional.

## Failure and cleanup behavior

The wheel uses no new package or audio asset. If animation APIs are unavailable, the options remain operable as a static list. On unmount, cancel animation frames and wheel-settle timers and release all pointer state. An empty or single-item option set must not produce modulo, indexing, or navigation errors.

## Verification

1. TypeScript and the production build pass.
2. The Hero shows one four-item wheel with `01 ABOUT` initially selected.
3. Wheel, trackpad, drag, and arrow input update selection without opening a view.
4. Clicking the centered item and pressing Enter/Space enter the correct view after approximately 620ms.
5. Clicking an off-center item only selects it on the first click.
6. Wheel-to-plant and plant-to-wheel linkage remains correct in both directions.
7. Plant hotspot clicks still enter the correct view directly.
8. Mobile/coarse-pointer presentation remains a readable four-button list.
9. Reduced-motion selection snaps without disabling navigation.
10. The water effect, original plant colors, top navigation, routes, and inner pages remain unchanged.
11. Browser console and runtime logs contain no new errors or warnings.
