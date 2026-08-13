# Scroll-driven Progressive Reveal Design

## Goal

Add a restrained, reversible progressive reveal to every major content block in the About, Experience, Projects, Photography, and Contact views. Animation progress must remain tied to the portfolio overlay's native scroll position so scrolling feels like uncovering content, not triggering a one-shot entrance animation.

The Hero, navigation, routing model, approved content hierarchy, and project ordering remain unchanged.

## Architecture

`PortfolioOverlay` owns the scroll container (`.portfolio-overlay__content`) and will also own the reveal lifecycle. A small client-side reveal controller will initialize GSAP ScrollTrigger timelines after the active view mounts. All ScrollTriggers use the overlay content element as their explicit `scroller`; none read from the window scroll position.

Page components expose animation intent with semantic data attributes:

- `data-reveal-section` marks one independently scrubbed content group.
- `data-reveal="media"` marks imagery, video frames, or large visual surfaces.
- `data-reveal="title"` marks the primary heading or index label for that group.
- `data-reveal="body"` marks copy, metadata, captions, links, and supporting information.

The controller queries only within the mounted overlay, so selectors cannot affect Hero or another view. GSAP context cleanup removes timelines, inline animation styles, and ScrollTriggers whenever the overlay unmounts or the active view changes.

## Coverage and Grouping

The reveal system covers all major blocks:

- About: introduction/portrait composition and supporting biographical content.
- Experience: opening editorial block and each experience index row or grouped entry.
- Projects: opening block, personal-account showcase, each of its three video items where appropriate, Moving Image, Firefly Big Day, and supporting metadata.
- Photography: landing composition and preview selection; the opened postcard viewer remains an interaction state rather than a scroll reveal target.
- Contact: heading, supporting copy, and contact/actions.

Large sections may contain nested reveal groups. A parent group must not also animate a nested group as one duplicate target; each element belongs to the nearest reveal section.

Modal/detail overlays are excluded from scroll scrubbing because their presentation is driven by explicit user interaction and may lock the underlying scroller.

## Motion Model

Each reveal section receives its own GSAP timeline and ScrollTrigger:

- Start near `top 88%` of the overlay viewport.
- End near `top 35%`, adjusted for unusually tall groups when necessary.
- Use numeric scrub in the approximate range `0.8–1.2` seconds for a soft catch-up feel.
- Animate only compositor-friendly `opacity` and `transform` properties.
- Initial displacement is approximately `y: 48px`, staying within the requested 40–60px range.
- Use no bounce, elastic motion, scale flourish, pinning, or strong parallax.

Within a group, visual progress is sequenced as media, then title, then body/metadata. Their timeline positions overlap slightly, producing a restrained stagger rather than discrete phases. ScrollTrigger controls the overall playhead; reversing the scroll reverses the sequence naturally.

The reveal tween uses a smooth, non-dramatic ease. Because ScrollTrigger scrubs the playhead, the staggered timeline positions and numeric scrub create the perceived softness without disconnecting the result from scroll progress.

Content can begin to soften after it travels above the main reading area, but it must remain legible enough that ordinary reading is not interrupted. The primary requirement is the progressive entrance; any exit fade is subtle and omitted where it harms usability.

## Layout and Spacing

Existing layout and approved page design remain intact. Vertical spacing between major reveal groups may be increased with scoped CSS to create breathing room for the scroll ranges. This must not introduce fixed scenes, full-screen pinning, artificial scroll-jacking, or restore the previously rejected cross-fade presentation.

Desktop spacing may be more generous. Mobile spacing must preserve the same editorial rhythm without creating excessive empty screens or obscuring horizontal project/media interactions.

## Reduced Motion and Progressive Enhancement

When `prefers-reduced-motion: reduce` matches:

- Do not create reveal ScrollTriggers or scrub timelines.
- Ensure every reveal target is immediately visible with no transform.
- Preserve native scrolling and all content interactions.

If JavaScript does not initialize, content remains visible by default. Hidden states are applied by GSAP only after initialization, avoiding invisible server-rendered content.

## Refresh and Lifecycle

ScrollTrigger measurements are refreshed after the view mounts and after layout-affecting media settles. Refreshes must be bounded and must not run continuously during scroll. Resize/orientation changes use ScrollTrigger's normal refresh behavior.

Switching views resets the overlay scroll position and creates a fresh, scoped reveal system for the newly mounted content. Cleanup must prevent triggers from referencing detached nodes.

## Performance

- Animate opacity and transforms only.
- Apply `will-change` only to active reveal targets and remove/revert it through cleanup.
- Use one timeline per meaningful group rather than one ScrollTrigger per individual text node.
- Avoid scroll callbacks that read and write layout on every frame.
- Keep the native overlay scroller; do not add a smooth-scroll library or scroller proxy.

## Verification

The implementation is complete when:

1. About, Experience, all three Projects areas, Photography landing/preview, and Contact progressively reveal while scrolling.
2. Media precedes title, and title precedes copy/metadata within each group.
3. Progress visibly follows scroll position and naturally reverses when scrolling upward.
4. No block suddenly fires a one-time AOS-style animation.
5. The overlay's nested scroll container drives every trigger correctly on desktop and mobile.
6. Reduced-motion users see all content immediately and retain normal interactions.
7. Hero, navigation, postcard viewer, project detail modal, and existing pointer interactions continue to work.
8. TypeScript checks and the production build pass.

