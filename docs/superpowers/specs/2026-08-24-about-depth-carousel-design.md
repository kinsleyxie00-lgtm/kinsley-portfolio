# About Depth Carousel Design

## Goal

Replace the single portrait on the left side of the About page with a restrained version of the React Bits `DepthCarousel`. The carousel should feel like a compact personal photo wall while preserving the existing About copy, handwritten heading, page grid, navigation, and overall editorial tone.

## Image Set and Order

Use five local portrait images in this exact order:

1. The existing `/images/profile.jpg`
2. `IMG_0548.JPG`
3. `IMG_4721.JPG`
4. `IMG_7833.JPG`
5. `IMG_8249.JPG`

The four newly supplied files will be copied into a dedicated public About image directory with web-safe filenames. The existing profile image remains the initial and default focused card.

## Visual Treatment

- Keep the carousel inside the left-side footprint currently occupied by the portrait rather than expanding it across the page.
- Show the focused image clearly at the front, with the other cards receding toward the right.
- Adapt the source component rather than reproducing its strong demo styling: use modest lateral spread and tilt, light depth shading, minimal blur, and restrained corner rounding.
- Preserve the photographs' natural color. The carousel may apply only the subtle color treatment already associated with the About portrait.
- Retain the small editorial caption below the carousel. It changes with the active card as `PORTRAIT / 01` through `PORTRAIT / 05`.
- Do not alter the right-side About content or the decorative leaf treatment.

## Interaction

- The carousel loops through all five images.
- Users can change the active image by dragging or swiping horizontally, using the mouse wheel while the carousel is hovered, or using compact previous and next controls.
- Automatic advancement is enabled and pauses while the carousel is hovered or focused.
- The current card is exposed to assistive technology, and the carousel supports keyboard navigation.
- With `prefers-reduced-motion`, transitions become immediate and autoplay is disabled.

## Component Boundary

Create a client-side `DepthCarousel` component responsible only for carousel layout, animation, controls, input handling, responsive scaling, and active-index notifications. `About.tsx` owns the image list and caption and passes those values into the carousel. This keeps About page content separate from animation mechanics.

GSAP, which is already installed in the project, drives transforms and transition easing. Effects and event listeners must be scoped to the component and fully cleaned up on unmount.

## Responsive Behavior

- Desktop retains the existing twelve-column About layout and left/right balance.
- The cards scale down with their container without overflowing or covering the copy.
- On mobile, the carousel remains above the copy in the existing stacked layout and supports touch dragging.
- Controls remain reachable without forcing horizontal page scrolling.

## Failure and Edge Cases

- If an image cannot load, its alt text remains available and the remaining carousel continues to function.
- A single-item data set renders as a stable card with navigation and autoplay disabled.
- An empty data set renders no carousel rather than throwing.
- Resize handling recalculates scale without recreating the entire carousel.

## Verification

- Run TypeScript checking and the production build.
- Verify desktop and mobile layouts at the About page.
- Test the five-image order, looping, drag/swipe, wheel input, arrow controls, keyboard navigation, hover/focus pause, and caption updates.
- Confirm reduced-motion behavior and confirm no horizontal page overflow.
- Confirm the Hero and other pages are visually unchanged.
