# KINSLEY XIE Poetic Brand Archive

## Objective

Transform the existing portfolio into a personal creative archive and brand
lookbook for brand design, visual design, and creative roles.

The site should communicate:

> I can build emotional brand worlds, develop visual identities, and create
> meaningful storytelling experiences.

The first implementation establishes a complete, responsive visual framework.
Final project writing and original imagery may be added later, but every current
section must already demonstrate clear editorial hierarchy, intentional
whitespace, and coherent image-text relationships.

## Locked Existing Work

The following are not redesigned:

- `BrandIntro.tsx`
- `data/intro.ts`
- `Navigation.tsx`
- The intro sequence, timing, hash cleanup, session behavior, and exit logic
- The navigation structure, labels, layout, scroll-state transition, K.X reveal,
  and mobile menu behavior

No second intro, navigation, Hero, or homepage is created.

## Emotional Language

The references are treated as emotional and material direction rather than
layouts to copy.

Core qualities:

- Editorial
- Poetic
- Feminine
- Nostalgic
- Refined
- Sensory
- Artistic
- Emotional
- Timeless

The visual experience should evoke an independent fashion magazine, fragrance
campaign, luxury brand journal, artist portfolio book, and personal visual
diary.

The site avoids startup aesthetics, SaaS patterns, generic portfolio templates,
dashboard UI, dense modules, and excessive interface components.

## Visual System

### Palette

- Warm ivory and natural white as primary page surfaces
- Parchment beige for archive sections
- Dusty rose and faded blush for emotional color fields
- Sage and muted olive for supporting visual rhythm
- Burgundy and dark chocolate for sparing emphasis

Colors remain low-saturation and material. They should feel like paper, fabric,
flowers, fragrance packaging, and aged photographs.

### Typography

- Display: elegant high-contrast serif using a local/system fallback stack
  inspired by Cormorant, Canela, and Playfair
- Body: modern neutral sans using the existing Helvetica/Inter-style stack
- Annotation: restrained handwritten-style local cursive stack, used only for
  short notes

No external font dependency is required for the framework.

### Texture

Use subtle CSS-only grain and paper texture. Texture must remain low contrast,
must not reduce legibility, and must respect reduced-motion preferences.

Do not add a particle engine, canvas dependency, or decorative animation system.

## Hero

The Hero begins immediately after the locked intro and navigation.

It uses a campaign-like brand statement rather than a conventional
introduction:

> Creating visual stories  
> where brands become memories.

Supporting note:

> Brand designer · Visual storyteller

The composition uses an editorial serif headline, a cinematic temporary visual
area, small identity details, and generous whitespace. Existing profile
information remains available elsewhere; the Hero does not begin with “Hi, I'm.”

Motion is a slow reveal with subtle opacity and scale. It remains compatible
with the existing intro and reduced-motion behavior.

## About

About becomes an editorial profile spread.

- Large portrait or image field
- Personal manifesto using existing profile content as the factual base
- A “My approach” statement:
  - Brands are not only seen; they are felt.
- Small date, caption, and handwritten-style annotation
- Existing Skills, Tools, contact, and location remain present
- Skills and Tools use typographic lists instead of resume tables or cards

The currently supplied real portrait at `public/images/profile.jpg` may remain
as a temporary personal visual.

## Experience

Experience remains factual and data-driven.

- Quiet editorial rows
- Company, role, period, summary, and highlights remain readable
- Thin rules and whitespace replace card styling
- Visual hierarchy is secondary to Work but remains useful for recruiters
- Existing hover behavior may remain only when it does not obstruct reading

## Selected Work

Projects are redesigned as brand campaign book spreads, not cards.

Each project uses the existing factual project data as temporary content and
follows this professional narrative:

1. Project number and brand/project name
2. Large hero media field
3. Brand challenge
4. Concept
5. Visual direction
6. Process
7. Outcome

Current data fields may map into this framework until final case-study writing
is provided. Missing assets use editorial image placeholders that clearly state
their replacement path. No false brand design deliverables or results are
invented.

Layouts alternate between full-width imagery, asymmetric image-text spreads,
and quiet captioned fields. Every project maintains substantial whitespace.

## Social Media and Visual Archive

The existing Social and Photography sections remain separate components but are
visually reframed:

- Social becomes a visual storytelling case or content-world study.
- Photography becomes a visual diary and research archive.
- Existing metrics and factual content remain.
- Photography retains its accessible lightbox and keyboard behavior.
- Image groups use contact-sheet, scrapbook, and journal rhythms without
  copying the supplied references directly.

## Contact and Footer

Contact behaves like the back cover of a book:

- One restrained invitation
- Existing email, phone, location, and resume actions
- Deep chocolate or burgundy field
- Large serif closing line and minimal sans details

The existing Footer content remains but adopts the new palette and typography.

## Imagery Strategy

The supplied references inform color, material, spacing, cropping, and rhythm.
They are not copied as page layouts and are not presented as Kinsley's work.

Until original project imagery is supplied:

- Existing real personal imagery may be used where appropriate.
- Project, process, moodboard, packaging, and campaign areas remain clearly
  labeled editorial placeholders.
- The framework must make future image replacement straightforward through
  existing data paths.

## Motion

- Image reveal: opacity with slight scale, approximately one second
- Text reveal: restrained line or block reveal
- Project hover: slow image zoom and caption emphasis where real interactive
  media exists
- Section transitions: soft editorial entrance, not literal 3D page turns
- Reduced-motion users receive immediate static content

Motion should feel cinematic and quiet, never playful or technology-led.

## Responsive Behavior

Desktop:

- Expansive editorial layouts
- Alternating project spreads
- Large image fields and controlled asymmetry

Tablet:

- Simplified asymmetry
- Preserved hierarchy and image-text rhythm

Mobile:

- Single-column reading order
- Image fields remain generous
- Typography scales without clipping
- Annotations stay secondary
- No horizontal overflow
- Existing mobile navigation remains unchanged

## Implementation Surface

Expected component changes:

- `components/Hero.tsx`
- `components/About.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/SocialMedia.tsx`
- `components/Photography.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`
- `components/MediaPlaceholder.tsx` only if necessary for editorial presentation
- `components/SectionHeading.tsx` only if necessary for section-wide hierarchy
- `app/globals.css`

Potential data changes are limited to presentation labels or framework fields.
Existing factual content is preserved.

Locked intro and navigation files are excluded.

## Validation

The redesign is complete when:

- Intro and navigation behavior are unchanged.
- The site has one Hero and one single-page structure.
- Hero, About, Experience, Work, Social, Photography, Contact, and Footer share
  one coherent poetic archive language.
- Projects use campaign-spread layouts rather than cards.
- Missing content is visibly marked for replacement.
- No false work, role, result, or metric is introduced.
- Desktop and mobile layouts have no overlap or horizontal overflow.
- Existing navigation, resume links, contact links, and lightbox still work.
- The build succeeds.
- Browser checks cover desktop, mobile, intro exit, navigation state, project
  rhythm, contact, and lightbox.
- The site remains local and is not published.
