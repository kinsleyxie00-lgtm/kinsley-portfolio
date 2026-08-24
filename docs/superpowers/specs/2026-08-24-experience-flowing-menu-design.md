# Experience Flowing Menu Design

## Goal

Adapt the React Bits `FlowingMenu` interaction to the portfolio's Experience page while preserving the approved editorial layout. The page remains a calm, information-first experience index at rest; hovering a record reveals a moving project strip within that record.

## Scope

- Modify only the Experience presentation and the styles/components it directly needs.
- Preserve the existing Experience data source, portfolio navigation, project routing, Hero implementation, overlays, and other pages.
- Reuse the existing local experience images. Do not introduce remote demo imagery.
- Keep the work local. Deployment is explicitly out of scope.

## Resting Layout

The page follows the supplied reference:

- Warm off-white background, dark neutral type, and fine horizontal rules.
- Editorial header with `Experience / 02`, `Selected experience.`, the Chinese summary, and year/record metadata.
- Three horizontal records with six information regions: index, period, company/role, summary, tags, and project preview.
- Serif display typography for the page title and company names; compact sans-serif typography for metadata.
- Desktop spacing should feel wide and architectural. Tablet and mobile layouts collapse without horizontal overflow or unreadably narrow copy.

## Flowing Interaction

Each record owns an isolated FlowingMenu-style overlay:

- Pointer entry slides a marquee layer into the current row from the closest vertical edge.
- The marquee repeats the company name, role, and project image across the row and loops horizontally at a restrained speed.
- The overlay stays clipped to the row, does not change row height, and does not affect neighboring records.
- Pointer exit sends the overlay toward the closest vertical edge.
- The underlying six-column content remains the default and is restored after exit.
- Existing project navigation remains the row's action. The interaction must not create nested links or break click behavior.

The implementation will adapt the provided React Bits behavior rather than copy its visual defaults. GSAP is already installed and will drive entry, exit, and the seamless horizontal loop.

## Input and Accessibility Behavior

- Mouse and precise-pointer devices receive the animated hover interaction.
- Keyboard focus receives a clear, non-moving row highlight and preserves the row action.
- Touch and coarse-pointer devices keep the static editorial layout; the first tap must navigate normally rather than trigger a hover-only state.
- With `prefers-reduced-motion: reduce`, entry/exit movement and the infinite marquee are disabled. The static row remains fully usable.
- Decorative repeated marquee content is hidden from assistive technology; the underlying record provides the accessible name and information.

## Component Boundaries

- `Experience` continues to map the existing experience data and render the page header/list.
- A focused client-side row/marquee component owns refs, edge detection, repetition measurement, GSAP lifecycle, and cleanup.
- Experience-specific CSS owns the editorial grid, overlay, responsive states, focus treatment, and reduced-motion fallback.
- No shared site-wide interaction or Hero behavior is changed.

## Data Flow and Failure Behavior

Each existing experience record supplies its link, company, role, period, summary, tags, and local image path. The row component derives repeated marquee parts from that record. If an image cannot load, the colored marquee, text, and underlying static preview remain usable; navigation and record information do not depend on animation or image loading.

## Validation

- TypeScript check and the production build must pass.
- Verify the Experience view at desktop, tablet, and mobile widths.
- Verify entry from above and below, continuous marquee motion, clean exit, and no row-height shift.
- Verify row navigation, keyboard focus, touch behavior, and reduced-motion behavior.
- Confirm the Hero and other portfolio views remain unchanged.

