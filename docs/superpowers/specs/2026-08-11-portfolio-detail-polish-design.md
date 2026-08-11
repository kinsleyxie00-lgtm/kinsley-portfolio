# Portfolio Detail Polish Design

## Scope

This pass changes only four approved details in the existing portfolio. It does not redesign the Hero, page layouts, navigation structure, project content, or contact section.

## 1. About signature

- Keep the existing `public/images/kinsley-signature.png` asset.
- Show the complete signature in the About navigation brand without cropping or stretching.
- Use a slightly wider responsive container and `object-fit: contain`; preserve the current restrained scale on desktop and mobile.

## 2. Navigation surface while scrolling

- Remove the visible bottom border from the content navigation.
- At the top of a page, retain the current clean warm-white surface.
- Once the active inner-page scroller moves beyond a small threshold, add a scroll-state class to the navigation.
- In that state, use a translucent warm-white background, subtle backdrop blur/saturation, and a very soft shadow. The effect must remain light enough that body text passing below stays legible.
- Respect `prefers-reduced-motion` and avoid layout shifts.

## 3. Postcard close control

- Keep the existing postcard dialog, previous/next controls, backdrop, and layout.
- Make the close control visibly distinct at the top-right of the modal at all supported breakpoints.
- Use a high-contrast circular surface and a clear `×` glyph with a minimum 44px target.
- Preserve existing Escape-key closing, focus transfer into the dialog, focus trapping, and focus restoration.
- Clicking the backdrop may also close the dialog, while clicks inside the postcard must not.

## 4. Eight photographs

- Photography contains only items 01 through 08; remove 09 and 10 from the data source.
- Derive all visible totals and ranges from `photography.length`, producing `01 / 08`, `02—08`, and postcard counts ending in `/ 08`.
- Previous/next navigation and ArrowLeft/ArrowRight wrapping use the eight-item collection.
- Preserve the existing irregular archive composition for items 01 through 08.

## Responsive and accessibility checks

- Verify desktop at 1440px and mobile at 390px.
- Confirm the signature is complete, navigation remains readable while scrolling, and the close button is visible and keyboard operable.
- Confirm exactly eight photography entries are reachable and all displayed totals match.
- Run the production build and inspect the browser console for errors.

## Non-goals

- No deployment.
- No new homepage or navigation.
- No changes to resume-derived experience or project facts.
- No restoration of procedural tree roots.
- No unrelated refactoring or cleanup of the existing dirty worktree.
