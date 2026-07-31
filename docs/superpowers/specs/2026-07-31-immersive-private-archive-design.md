# Kinsley Xie Immersive Private Archive Design

## Objective

Transform the existing portfolio into a cinematic personal digital exhibition:
a private creative archive from the future. The result should combine the
atmosphere of a printed art book, fashion editorial, museum catalog, and
interactive installation while remaining useful as a professional portfolio.

This is a visual and interaction redesign of the existing React site. Existing
personal information, project content, routes, anchors, and core behavior remain
the source of truth.

## Confirmed Direction

Use the immersive “Direction B” visual language with two explicit preservation
constraints:

1. Preserve the current navigation structure, labels, anchor behavior, and
   mobile navigation logic.
2. Preserve the current project-strip structure and interaction model.

These elements may receive restrained styling and transition adjustments so
they belong to the new art direction, but they must not be replaced by a second
navigation system or a card-based project gallery.

## Experience Principles

- The site should feel like entering a private exhibition, not browsing a
  conventional portfolio template.
- Atmosphere and personality lead; professional information remains clear and
  discoverable.
- Negative space controls the rhythm. Experimental composition must not become
  visual clutter.
- Motion is slow, cinematic, and purposeful. It reveals hierarchy rather than
  decorating every element.
- Images behave as archival objects: cropped, layered, annotated, and placed at
  different scales.
- The interface remains usable with keyboard, touch, reduced-motion settings,
  and small screens.

## Visual System

### Color

- Primary paper: warm ivory and parchment tones derived from the current
  palette.
- Primary ink: soft black or deep charcoal.
- Accent: one muted burgundy.
- Dark exhibition scenes may use near-black backgrounds with warm ivory type.
- Dusty colors and strong gradients are excluded.

### Typography

- Editorial serif type carries names, poetic statements, and selected oversized
  words.
- Minimal sans-serif type carries navigation, body copy, labels, dates, roles,
  and metadata.
- Handwritten styling appears only in short annotations and never carries
  essential information.
- Large type is used as a spatial object, but supporting text remains restrained
  and readable.

### Texture

- Use subtle CSS paper grain or film-noise overlays at low opacity.
- Texture must not reduce text contrast or create visible tiling.
- No decorative shadows, rounded cards, or glossy UI surfaces.

## Page Composition

### Brand Intro

Keep the existing `BrandIntro` component and entry sequence. Restage it as a
cinematic exhibition threshold using layered typography, a restrained image
reveal, archival metadata, and slow pacing. It remains a single opening
experience rather than a newly added splash screen.

### Navigation

Keep the existing `Navigation` component, labels, scrolling targets, and mobile
menu behavior. Its visual treatment may adapt between light and dark scenes
through transparent or paper-toned surfaces, fine rules, and restrained state
transitions. Do not introduce a floating index, vertical timeline, or second
navigation system.

### Hero

Turn the hero into the first exhibition plate:

- KINSLEY XIE as the primary typographic object.
- One dominant cinematic photograph with one optional cropped echo of the same
  image.
- Small archive metadata and a short poetic statement.
- One handwritten annotation as a nonessential atmospheric detail.
- Slow mask reveal, slight scale settling, and measured letter-spacing motion.

The hero must create curiosity without presenting all professional information
at once.

### About

Present About as a personal archive rather than a biography block:

- one portrait or object image;
- a concise creative philosophy;
- compact professional context;
- focus and tools presented as editorial text, not a resume table;
- sparse annotations such as “research 2026” or “visual study.”

### Experience

Keep experience information concise and factual. Treat each role as an archive
record with dates, organization, and a short outcome-focused description.
Avoid cards, badges, and dense skills lists.

### Projects

Preserve the current project-strip structure and behavior. Each selected project
remains a chapter rather than becoming a card:

- project number, title, year, and role remain legible;
- imagery may reveal through masks or change depth subtly;
- chapter transitions can move between paper and dark exhibition scenes;
- supporting descriptions remain short;
- no equal thumbnail grid and no replacement project gallery.

### Social and Photography Archive

Treat these sections as research material and visual notes. Use asymmetric image
placement, small captions, differing scales, and limited overlap. Photography
lightbox behavior remains available and accessible.

### Contact and Footer

End with a quiet, spacious statement and existing contact links. The final
screen should feel like the closing page of an exhibition catalog, not a lead
generation form.

## Motion System

Use the project’s existing Framer Motion and GSAP dependencies. Do not add Lenis
or another scrolling library.

Allowed motion:

- slow opacity and vertical reveals;
- mask or clip-path image reveals;
- slight image scale settling;
- restrained parallax on large screens;
- letter-spacing changes for selected display words;
- subtle hover zoom or depth shift;
- section transitions between paper and dark scenes.

Avoid:

- bouncing, elastic, or playful easing;
- cursor trails;
- continuous heavy grain animation;
- excessive pinned sections;
- horizontal scrolling that blocks ordinary navigation;
- motion on every text block.

Animations should generally last 800–1500 ms with smooth easing. Reduced-motion
users receive immediate or simple opacity transitions. Touch devices do not
depend on hover or a custom cursor.

## Cursor

A small custom cursor may appear on fine-pointer desktop devices only. It may
expand over project imagery and display “VIEW.” The native cursor remains on
touch devices and when reduced motion is preferred. Cursor behavior must never
hide essential interaction feedback.

## Responsive Behavior

Desktop keeps asymmetric editorial compositions and limited visual overlap.
Tablet reduces overlap and parallax. Mobile becomes a vertical art book with:

- preserved navigation and project-strip behavior;
- clear text hierarchy;
- generous spacing;
- simplified reveals;
- no pinned scenes, pointer-only interactions, or risky horizontal overflow.

## Component Boundaries

Modify existing components in place:

- `BrandIntro`
- `Navigation`
- `Hero`
- `About`
- `Experience`
- `Projects`
- `SocialMedia`
- `Photography`
- `Contact`
- `Footer`

Shared visual behavior may be extracted only when it reduces duplication, for
example an `ImageReveal` or motion preference helper. Do not create a second
home page, navigation system, intro sequence, or project gallery.

## Validation

The completed implementation must pass:

- production build;
- desktop and mobile visual review;
- no horizontal overflow;
- navigation anchors and mobile menu;
- preserved project-strip interactions;
- photography lightbox and keyboard dismissal;
- readable contrast in paper and dark scenes;
- reduced-motion behavior;
- no console errors.

## Out of Scope

- Rewriting portfolio content or inventing projects.
- Publishing or deploying the website.
- Adding a CMS, database, authentication, or contact form.
- Adding new animation libraries.
- Replacing existing navigation or project-strip behavior.
- Unrelated refactoring or overwriting existing user changes.
