# Quiet Studio Editorial Redesign

## Objective

Redesign the current portfolio through subtraction. The result should feel like
an independent design studio site, printed art book, exhibition catalogue, and
private creative archive.

The primary design element is whitespace. Empty areas remain intentionally
empty. The site should communicate taste and visual sensitivity before
information density.

## Locked Work

The following remain unchanged:

- Existing `BrandIntro` component and intro data
- Intro animation, timing, session, scroll, and hash behavior
- Existing `Navigation` component
- Navigation labels, desktop layout, scrolled state, K.X reveal, and mobile menu
- Single-page React structure

No second intro, navigation, or homepage is created.

## Palette

All page sections use one background:

- Warm paper white: `#FFFEFA`

No section receives a pink, green, olive, beige, burgundy, chocolate, or black
background.

Remaining colors:

- Primary text: soft black / dark charcoal
- Secondary text: restrained gray-brown
- Accent: one muted burgundy used only for occasional type or fine details

Images retain their own natural color treatment. No gradients or colorful UI
surfaces are introduced.

## Editorial Grid

Use a precise but flexible editorial grid:

- Large outer margins
- Asymmetric columns
- Narrow text measures
- Small metadata
- Thin rules
- Intentional offsets
- Long vertical pauses

The layout should not rely on repeated cards, equal grids, boxed modules, or
full-width banners.

Each section may use a different composition while sharing the same margin,
caption, typography, and spacing system.

## Typography

Typography is restrained rather than oversized.

- Headline: elegant serif, thin or regular weight
- Body: small clean sans-serif
- Metadata: very small uppercase sans-serif with letter spacing
- Handwritten detail: optional and used once or twice across the entire site

Large statements remain bounded and never overwhelm the viewport. Hierarchy
comes primarily from position, whitespace, and contrast.

## Hero

The opening is a quiet introduction, not a full-screen marketing hero.

Content:

- Small metadata: portfolio, discipline, year
- Restrained statement: visual identity and brand experience positioning
- One medium image positioned as an editorial object
- One small note
- Extensive empty space

Remove stacked identity lines, multiple metadata bands, decorative color fields,
and oversized campaign typography.

## About

About follows a three-part studio profile composition:

- Small portrait
- Short personal statement
- Narrow personal philosophy

Existing factual introduction, Skills, Tools, location, and contact remain
available but are compressed into quiet supporting text. They do not become a
resume table or visual feature.

## Experience

Experience becomes a restrained text index:

- Company
- Role
- Period
- One short summary

Existing factual details remain in the document but are visually quiet. Large
company names, boxed areas, colored backgrounds, and dense tag groups are
removed.

## Projects

Project cards are removed.

Each project becomes a slow editorial case-study page:

- Small number
- Small title
- Year and role metadata
- One medium main image
- Optional smaller supporting image placeholder
- One short description or concept paragraph
- Large empty space before the next project

Compositions vary between projects but use the same baseline grid. Images are
placed objects, never edge-to-edge banners or equal thumbnail cards.

Existing project facts and replacement paths remain. Missing assets are clearly
marked without inventing results or design deliverables.

## Social and Visual Diary

Social is reduced to one quiet content-study spread.

Photography becomes the only archive-style image composition. It may use one
horizontal strip or sparse Polaroid rhythm, but the collage language is not
repeated elsewhere.

The existing accessible lightbox and keyboard behavior remain.

## Contact

Contact uses the same `#FFFEFA` background as every other section.

It contains:

- One restrained closing sentence
- Email
- Phone
- Location
- Resume link

There is no contact form, dark color field, oversized slogan, or large button
group.

## Texture and Motion

Texture is almost imperceptible. Remove prominent grain and decorative effects.

Motion:

- Fade in
- Slight upward movement
- Gentle image reveal
- 800–1200ms duration
- Smooth easing

No bouncing, particles, flashy transitions, or literal page-turn effects.
Reduced-motion preferences receive static content.

## Responsive Behavior

Desktop preserves asymmetric magazine composition and generous empty space.

Mobile becomes a vertical editorial page:

- Same typography hierarchy
- Same warm paper white
- Images remain medium scale
- Text remains narrow and readable
- Large but controlled vertical spacing
- No horizontal overflow

The existing mobile navigation remains unchanged.

## Implementation Scope

Expected changes:

- `components/Hero.tsx`
- `components/About.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/SocialMedia.tsx`
- `components/Photography.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`
- `app/globals.css`

Locked intro and navigation files are excluded.

No new dependency, new route, deployment, or public upload is required.

## Validation

- Intro and navigation remain unchanged.
- Every section background is `#FFFEFA`.
- No colorful section fields, card grids, gradients, or decorative frames remain.
- Hero is restrained and does not dominate the viewport.
- About reads as a studio profile rather than a biography block.
- Projects use sparse editorial compositions.
- Images remain medium scale with deliberate surrounding whitespace.
- Desktop and mobile have no horizontal overflow.
- Navigation, contact links, resume download, and lightbox remain functional.
- Build succeeds.
- Site remains local and is not published.
