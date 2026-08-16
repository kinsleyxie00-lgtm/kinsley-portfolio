# Thin Frosted Project Bars

## Goal

Make the three sticky project bars feel lighter and more refined while preserving the approved stacked push-and-cover interaction.

## Visual treatment

- Use a translucent warm-white surface instead of an opaque fill.
- Add a 16px backdrop blur with mild saturation so content passing underneath remains softly perceptible.
- Add a very subtle translucent bottom border to keep overlapping bars legible.
- Keep the project content surfaces opaque; the frosted treatment applies only to the sticky bars.

## Dimensions

- Desktop bar height: 56px.
- Tablet bar height: 52px.
- Mobile bar height: 48px.
- Reduce the bar title sizing slightly at each breakpoint so the thinner bars remain calm and uncluttered.

## Interaction constraints

- Preserve the current sticky position, stacking order, and push/cover behavior.
- Do not add fades, snapping, pinning libraries, or new motion.
- Preserve the existing metadata layout and mobile rule that hides the final metadata item.

## Responsive and accessibility checks

- Confirm titles stay on one line without clipping at desktop, tablet, and mobile widths.
- Confirm the blur has a translucent warm-white fallback when backdrop filtering is unavailable.
- Confirm the project bars retain sufficient separation while overlapping.

## Verification

- Run the existing TypeScript and production build checks.
- Inspect the Projects section at desktop, tablet, and mobile widths in the local preview.
