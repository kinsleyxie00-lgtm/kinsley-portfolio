# Photography Postcard Editorial Design

## Goal

Replace only the current Photography inner page with a luxury editorial photography experience inspired by botanical archives and personal postcards. Preserve the existing Hero, navigation, overlay routing, Contact footer, custom cursor, and all unrelated workspace changes.

The page must not resemble a portfolio card grid. It should feel like a quiet fashion editorial in which selecting an image opens a private memory.

## Source and content rules

- The two user-provided reference images define the approved visual structure.
- Use the supplied title system: `POSTCARDS / From My Garden` and the description `A study of nature, light and memories.`
- Photo metadata explicitly present in the supplied references may be used. Do not add biographical, commercial, or performance claims.
- The intended collection contains ten records: Fern, Window, Lily, Lake, Shadow, Wild Grass, Camellia, Pine, Doorway, and Old Building.
- Real photography files are not currently available in the repository. Missing files must render as restrained, clearly neutral editorial placeholders. Botanical atmosphere images must never be presented as Kinsley's photography.
- Handwritten memory copy may be short and poetic, but must avoid invented events, people, or factual claims.

## Existing architecture

Keep `PortfolioExperience` as the view controller and keep Photography inside the existing fixed `PortfolioOverlay`. The shared navigation remains above the overlay, and the shared Contact section remains after Photography in the overlay scroll container.

Photography owns three internal states:

1. Landing: featured Photo 01 plus previews for 02-06.
2. Archive: the extended 02-10 collection in an asymmetric editorial composition.
3. Postcard: a modal overlay above the current Photography state.

Landing and Archive belong to one continuous scroll page. `ALL STORIES` scrolls or focuses the archive rather than creating a route. The Postcard is the only nested overlay.

## Visual system

- Warm ivory background and charcoal text inherited from the Kinsley site.
- Elegant serif display type paired with small uppercase sans-serif metadata.
- Hairline rules, generous whitespace, quiet tonal shadows, and low-contrast botanical marks.
- Desktop composition uses a twelve-column editorial grid. Images vary in size, aspect ratio, and vertical position.
- Avoid full-width gallery images, equal cards, repeated columns, masonry libraries, and standard photo-wall rhythm.
- Plant references appear only as small marks, stamp imagery, or near-transparent line/shadow details.

## Landing composition

The first viewport is divided into three reading zones:

- Left: section number, `Photography`, `POSTCARDS / From My Garden`, the supplied description, and a small scroll cue.
- Center: the largest image on the page, Photo 01 Fern, with a quiet framed editorial presence rather than a full-bleed hero.
- Right: `01`, `FERN`, `Shanghai, Spring`, `2026`, a `VIEW STORY` control, and `01 / 10` pagination notation.

Below a hairline rule, previews 02-06 form a magazine spread. Each preview has its own width, vertical offset, and nearby metadata; none is wrapped in a card.

## Archive composition

The archive continues below the landing spread and displays records 02-10. It uses alternating portrait, landscape, and compact image slots across the twelve-column grid, with deliberate blank columns and vertical pauses.

Each interactive record exposes:

- two-digit number;
- title;
- location;
- season;
- year.

Selecting either the image or its associated story control opens the same Postcard state. The whole control receives an accessible label describing the selected record.

## Postcard modal

The modal sits above the Photography page while leaving the previous composition perceptible beneath a dark, approximately 60% translucent backdrop with restrained blur.

The centered postcard uses a wide paper card:

- Left half: selected photograph.
- Right half: `POSTCARD / From My Garden`, structured title/location/season/year metadata, a short handwritten memory, a subtle stamp, botanical mark, postmark lines, and Kinsley's signature.
- Outside or at the card edge: close, previous, and next controls.
- A small `BACK TO GARDEN` action provides an additional close affordance.

The card uses paper texture through CSS color, grain, rules, and shadow. Do not add heavy skeuomorphism or vintage collage decoration.

## Interaction and accessibility

- Opening sequence: selected image receives a brief scale/position emphasis, the backdrop fades and blurs in, then the postcard settles into place.
- Closing reverses the sequence without scrolling the underlying page.
- Previous and next controls wrap across all ten records.
- Keyboard support: Escape closes; ArrowLeft and ArrowRight navigate; Tab remains trapped inside the modal.
- Opening focuses the close control. Closing restores focus to the exact image or `VIEW STORY` control that opened it.
- While open, document scrolling is locked and the underlying content is hidden from assistive interaction through modal semantics.
- Touch targets remain at least 44px even when their visible treatment is minimal.
- With `prefers-reduced-motion: reduce`, transitions become short opacity changes with no spatial expansion.

## Responsive behavior

- Tablet retains the editorial hierarchy but reduces the twelve-column spread to a simpler six-column composition.
- Mobile stacks the landing copy, featured photograph, and record metadata while preserving large whitespace and fine rules.
- Mobile archive alternates image width, indentation, and spacing instead of becoming an equal two-column grid.
- The postcard becomes a vertically scrollable paper sheet: image first, correspondence content second. Controls remain fixed or sticky within safe viewport bounds.
- No text, navigation control, or postcard content may be clipped at 320px width.

## Component boundaries

- `data/photography.ts`: ten records and presentation-safe metadata.
- `components/Photography.tsx`: landing, archive composition, selection state, keyboard behavior, focus restoration, and modal orchestration.
- Optional small components may be extracted only when they clarify a single concern, such as a shared photo trigger or postcard body.
- `components/MediaPlaceholder.tsx`: retain its existing missing-file fallback behavior or extend it narrowly for the Photography treatment.
- `app/globals.css`: replace the old Photography layout rules with the editorial landing, archive, modal, and responsive rules; do not rewrite Hero or navigation styles.

## Validation

- Confirm records 01-10 render and missing files produce neutral placeholders.
- Confirm the landing hierarchy and asymmetric archive at desktop, tablet, and mobile widths.
- Confirm every image opens its matching postcard.
- Confirm close, previous, next, Escape, ArrowLeft, ArrowRight, focus trapping, focus restoration, and scroll locking.
- Confirm reduced-motion behavior.
- Confirm Contact remains reachable below the archive.
- Run `pnpm run build` and fix any failures.
- Do not deploy.

## Out of scope

- Rebuilding About, Experience, Projects, Hero, Navigation, Contact, or the global view-switching architecture.
- Creating or fabricating photography assets.
- Restoring programmatic roots or changing the homepage.
- Deployment.
