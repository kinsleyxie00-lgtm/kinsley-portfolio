# About Body TextType Design

## Goal

Apply a restrained React Bits TextType interaction to the two Chinese body paragraphs on the About page. The animation should add a deliberate authored feeling without reducing readability or changing the page's editorial layout.

## Scope

- Animate only the two existing About body paragraphs.
- Preserve the handwritten `about me` title, portrait, résumé link, navigation, scroll reveal, and all other pages.
- Reuse the existing GSAP dependency. Deployment remains out of scope.

## Behavior

- Start when the body copy becomes visible in the About overlay.
- Type the first paragraph once using a subtle variable cadence of approximately 32–48ms per character.
- Pause for approximately 350ms after the first paragraph, then type the second paragraph.
- Do not delete or loop. Completed text remains visible.
- Display a fine vertical cursor while typing. Hide it after the second paragraph completes.
- Reserve the final text height before animation begins so the résumé link and surrounding layout do not jump.

## Accessibility and Fallbacks

- The final complete copy remains available to assistive technology rather than exposing every intermediate character update.
- With `prefers-reduced-motion: reduce`, render both paragraphs immediately and omit the cursor animation.
- If IntersectionObserver is unavailable, begin typing after mount rather than leaving the copy blank.
- The feature must work consistently on desktop, tablet, and touch devices.

## Component Boundaries

- A focused client-side `TextType` component owns visibility detection, typing state, timers, cursor animation, and cleanup.
- `About` supplies the two existing paragraphs as an ordered text array and renders the résumé link unchanged.
- About-specific CSS preserves the existing Songti/serif typography, paragraph rhythm, cursor treatment, and reserved layout space.

## Validation

- TypeScript and the production build must pass.
- Verify first-to-second paragraph sequencing, final cursor removal, and stable résumé-link position.
- Verify reopening the About overlay starts a clean animation without orphaned timers.
- Verify reduced-motion displays complete copy immediately.
- Confirm the handwritten title, portrait, navigation, Hero, and other overlay pages remain unchanged.

