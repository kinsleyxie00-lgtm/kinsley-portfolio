# KINSLEY XIE Creative Marketing Portfolio Redesign

## Objective

Upgrade the existing single-page portfolio from a resume-like presentation into
an editorial creative marketing portfolio. The result should combine the visual
confidence of a premium creative studio with the clarity required by recruiters
hiring for Brand Marketing, Content Operation, Social Media, and Creative
Marketing roles.

This redesign preserves the existing React application, content, interactions,
intro sequence, and single-page component structure. It changes layout, visual
hierarchy, typography, image treatment, and section composition only.

## Design Direction

The selected direction is **Editorial Candidate Portfolio**:

- Swiss-inspired grid and restrained black, off-white, and gray palette
- Large, lightweight uppercase display typography
- Compact labels, generous line-height, and strong whitespace
- Asymmetric editorial compositions rather than repeated cards
- Clear recruitment information embedded within a premium visual system
- Minimal animation that supports hierarchy without becoming decorative

The site must feel like the portfolio of a marketer who understands brand,
content, and visual storytelling. It must not resemble a SaaS landing page,
student portfolio template, generic resume builder, or creative agency website.

## Existing Structure and Constraints

The page remains a single composition in this order:

1. `BrandIntro`
2. `Navigation`
3. `Hero`
4. `About`
5. `Experience`
6. `Projects`
7. `SocialMedia`
8. `Photography`
9. `Contact`
10. `Footer`

No second intro, navigation, hero, or homepage may be created. The existing
intro playback, hash cleanup, scroll restoration, navigation state transition,
mobile menu, lightbox, contact links, and resume download remain functional.

All existing uncommitted work unrelated to this redesign must be preserved.
No new dependency is required. The site remains local-only and must not be
published.

## Navigation

The existing `Navigation` component remains the sole navigation controller.

- Brand: `K.X`
- Links: `ABOUT`, `EXPERIENCE`, `WORK`, `SKILLS`, `CONTACT`
- `EXPERIENCE` targets the experience section.
- `WORK` targets selected projects.
- `SKILLS` targets the skills presentation within the redesigned About area.
- Desktop navigation is thin, uppercase, and widely spaced.
- Mobile navigation continues to use the current menu interaction.
- The existing scroll threshold and K.X reveal behavior are preserved.

## Hero

The first viewport becomes an asymmetric editorial grid.

### Left column

- Small label: `CREATIVE MARKETER`
- Dominant display name: `KINSLEY XIE`
- Role stack:
  - `BRAND MARKETING`
  - `CONTENT OPERATION`
  - `SOCIAL MEDIA`
- A short introduction derived from the existing profile copy
- Compact availability and location metadata

The hero avoids long paragraphs and repeated personal information.

### Right column

Use the supplied image:

`/Users/xkx/Desktop/网页图片.JPG`

Copy it into the site's public image directory as the real profile visual. On
desktop it is cropped into a tall editorial frame while protecting the seated
subject as the focal point. On mobile it becomes a wider image so the working
environment remains legible. The image must not be replaced with a placeholder
or generated portrait.

## About and Skills

The About section becomes a concise brand statement rather than a second hero.
It contains:

- A short introduction using the existing Chinese profile copy
- A positioning statement connecting strategy, content, and distribution
- A dedicated skills index:
  - Brand Strategy
  - Content Planning
  - Social Media Operation
  - Visual Storytelling
  - Video Production
- A tools index based on existing profile data:
  - Premiere Pro
  - Photoshop
  - DaVinci Resolve
  - AI Tools
  - Other existing tools where appropriate

Skills and tools use rows or typographic columns, not cards.

## Experience

Experience remains data-driven from the existing experience file.

- Each role appears as a full-width editorial row.
- Company, role, date, summary, and highlights remain readable at a glance.
- Dividers and whitespace replace card containers.
- Existing hover-preview behavior may remain, but it must not obstruct content.
- Mobile layout stacks naturally and exposes the same information without
  relying on hover.

The section receives the stable `experience` anchor used by navigation.

## Selected Work

Projects remain data-driven from the existing project file.

- The section receives the stable `work` anchor.
- Projects use large media areas with alternating or offset editorial layouts.
- Each project shows number, title, category, short context, role, execution,
  and result.
- Project presentation emphasizes marketing outcomes: growth, reach, brand
  influence, and performance where verified data already exists.
- Existing qualified statements such as “素材与复盘待补充” remain; no invented
  screenshots, outcomes, or metrics are introduced.
- Missing project images remain clearly defined media placeholders until the
  user supplies real assets.

## Social Media and Visual Archive

The existing Social Media and Photography functionality remains.

- Social metrics become a clean typographic data band instead of a card grid.
- The Xiaohongshu section retains existing verified figures and link-disabled
  behavior.
- Photography becomes a quiet editorial image rhythm with fewer visible
  borders.
- The current accessible lightbox and keyboard navigation remain unchanged.

## Contact

Contact becomes a high-contrast editorial closing section.

- Large invitation headline
- Existing email, phone, location, resume download, and mail links
- No new form or external service
- Clear keyboard focus states and responsive stacking

## Typography and Color

- Background remains warm off-white, close to `#fffefa`.
- Primary text is near-black.
- Secondary text uses neutral gray.
- Red accent is removed from the main portfolio presentation or reduced to a
  negligible legacy role; the visual identity is primarily monochrome.
- Display text is uppercase, lightweight, tightly controlled, and responsive
  through `clamp()`.
- Body text is smaller with generous line-height and bounded line length.
- Chinese copy uses the existing system font fallback and remains fully legible.

## Responsive Behavior

### Desktop

- Editorial two-column hero
- Large portrait crop
- Wide horizontal experience rows
- Alternating project compositions

### Tablet

- Reduced display type without losing hierarchy
- Hero proportions remain asymmetric
- Project detail grids simplify before becoming single-column

### Mobile

- Navigation uses the existing menu
- Hero content precedes the image
- Portrait uses a wider crop to preserve context
- All project and experience content becomes single-column
- No horizontal overflow
- Tap targets and focus states remain accessible

## Implementation Boundaries

Primary files expected to change:

- `components/Navigation.tsx`
- `components/Hero.tsx`
- `components/About.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/SocialMedia.tsx`
- `components/Photography.tsx`
- `components/Contact.tsx`
- `data/profile.ts`
- `app/globals.css`
- `public/images/profile.jpg`

`BrandIntro.tsx` and its timing data are not redesigned. Other files change only
when required to support stable anchors or the approved layout.

## Validation

The redesign is complete when:

- The intro exits to the hero without automatically entering About.
- The page contains only one intro, navigation, and hero.
- Every navigation link reaches the correct section.
- The supplied real portrait appears in the hero.
- Desktop and mobile layouts have no overlap or horizontal overflow.
- Existing data and functional interactions are preserved.
- No unsupported metric or project material has been added.
- The production build succeeds.
- Browser checks cover desktop, mobile, intro completion, scrolling, navigation,
  mobile menu, and photography lightbox.
- No deployment or public upload occurs.
