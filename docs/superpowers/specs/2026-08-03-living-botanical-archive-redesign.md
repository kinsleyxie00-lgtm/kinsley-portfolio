# KINSLEY XIE Portfolio — The Living Archive Redesign

## 1. Objective

Redesign the existing KINSLEY XIE portfolio as a premium, immersive personal archive while preserving its purpose: presenting Kinsley's real experience, projects, capabilities, photography, resume, and contact information to employers and creative leaders in mainland China.

The experience should feel like a digital botanical archive, quiet luxury laboratory, and editorial museum. Botanical imagery is an art-direction metaphor for research, transformation, experimentation, and creative practice. The site must not imply that Kinsley works for a skincare brand or that botanical specimens are part of her actual projects.

The redesign replaces the current information architecture, layout, interaction model, and visual system. It does not create a second homepage, intro, navigation, or project system alongside the existing site.

## 2. Audience and Product Balance

The primary audience includes:

- Brand marketing and content-operation recruiters who need to understand Kinsley's experience quickly.
- Creative directors and studios who assess taste, visual thinking, and art-direction potential.

The design balances both audiences:

- The opening, project archive, and transitions may be immersive and exploratory.
- About, Experience, project facts, resume, and Contact must remain legible and easy to reach.
- A persistent navigation provides direct access to every important chapter.

Chinese is the primary content language. English is used for chapter names, archive labels, indices, and short atmospheric lines.

## 3. Creative Concept: The Living Archive

The portfolio presents Kinsley's creative practice as a living archive.

Botanical metaphors:

- Roots represent research and insight.
- Specimens represent collected experience.
- Extraction represents turning observations into strategy.
- Culture dishes represent content experiments.
- Water and glass represent media and transmission.
- Formulations represent finished project outcomes.

The metaphors remain atmospheric and editorial. They never overwrite or fabricate project facts.

## 4. Experience Model

Use a linear chapter narrative with local nonlinear exploration.

- Scrolling advances a clear story from observation to experience, projects, field notes, and contact.
- Project specimens and visual fragments support hover, focus, and detail exploration.
- Navigation lets information-focused visitors bypass the journey and jump directly to a chapter.
- The experience stays within a single page; no decorative routing is introduced.

This approach combines spatial art direction with portfolio usability. It avoids both a freeform canvas that obscures information and a conventional long-form landing page.

## 5. Information Architecture

### 00 / Threshold — Opening Scene

The existing sans-serif KSX intro animation remains the only intro component. Its exit transitions into a deep forest-green opening scene rather than the current warm-white Hero.

The scene contains restrained depth layers: botanical texture, glass reflection, portrait fragments, and subtle atmospheric movement. Kinsley's identity appears like exhibition titling:

> KINSLEY XIE  
> A living archive of ideas, images and cultural signals.

The opening contains no marketing CTA. A small prompt invites the visitor to enter the archive by scrolling.

The opening must preserve current session behavior:

- It plays once per session unless replay is forced.
- It clears legacy hashes and returns to the top only when the intro actually plays.
- It never automatically opens or scrolls to About.
- Existing full-motion and reduced-motion query parameters continue to work.

### 01 / Observation — About

The About chapter moves from the dark opening into archive cream. Kinsley's portrait behaves like a partially catalogued working specimen using crop, annotation, tracing-paper layers, and restrained index labels.

Content hierarchy:

1. Creative Marketer / Visual Storyteller positioning.
2. A concise personal statement.
3. Focus, tools, and location metadata.

Education remains de-emphasized and school information is not added.

### 02 / Extraction — Experience

Experience is presented as three extraction stages rather than cards or a conventional timeline:

- NIO: brand communication and physical touchpoints.
- DEWU: content, users, and commercial context.
- Xinhua Daily Nanjing Branch: image production and narrative foundations.

On desktop, specimen imagery and keywords evolve alongside readable experience copy. Company, role, dates, and summary remain immediately scannable. Optional expanded copy may reveal on deliberate interaction.

On mobile, the content becomes a sequential reveal without long pinned-scroll sequences.

### 03 / Formulations — Projects

Projects and Social Media form the central museum archive:

- NIO Firefly Marketing Campaign.
- DEWU Fashion Content Operation.
- Xiaohongshu Personal Brand Growth.

The archive uses varied scale, spacing, depth, and controlled overlap rather than a regular grid. Hover or keyboard focus exposes project name, role, and core capabilities.

Selecting a project opens an in-page detail experience with:

1. Context.
2. Process.
3. Contribution.
4. Reflection.

The detail layer expands from the selected specimen, preserves a clear close control, supports Escape, traps focus appropriately, and returns focus to the invoking project when closed.

No project metrics, images, screenshots, or outcomes are invented. Missing project media uses designed archive placeholders.

### 04 / Field Notes — Photography

Photography becomes a sequence of observations and contact-sheet fragments rather than a regular image wall. Images vary in dimensions and spacing and may overlap within safe bounds.

The existing lightbox behavior is preserved, including keyboard closing. Missing photography remains represented by explicit placeholders.

### 05 / Correspondence — Contact

The final chapter returns to a quiet archive-cream environment. It contains contact information, resume download, location, and one restrained invitation. It avoids marketing-style CTA treatment.

The footer becomes part of this exhibition ending rather than a visually separate commercial footer.

## 6. Navigation

Preserve one shared Navigation component and its mobile menu structure. Update its labels and destinations to match the new chapters:

- About
- Experience
- Work
- Notes
- Contact

Requirements:

- Preserve direct anchor access.
- Preserve mobile MENU / CLOSE behavior.
- Preserve a single scrolled/detail navigation state and the K.X brand reveal.
- Keep edge-safe spacing on desktop and mobile.
- Navigation transitions may blur and fade chapter content briefly but must not obscure the destination or destabilize the final scroll position.

## 7. Visual System

### Palette

- Forest: `#10251D`
- Moss: `#667064`
- Sage Mist: `#A8B0A0`
- Archive Cream: `#F2EFE6`
- Charcoal: `#20221F`
- Glass: translucent warm grey-white derived from Archive Cream

Avoid vivid greens, blue-purple gradients, white product cards, SaaS glassmorphism, and ecommerce shadows.

### Typography

- Exhibition headlines: high-contrast editorial serif.
- Chinese body text: readable modern sans serif with robust CJK fallback.
- English metadata: compact sans serif, uppercase labels, and numerical indexing.

Typography must use generous whitespace and restrained line lengths. Large titles act as spatial objects rather than marketing slogans. Body copy remains comfortably readable for recruitment use.

### Material Language

Use low-contrast borders, restrained transparency, subtle grain, glass reflections, water distortion, botanical specimens, natural fibres, and tracing-paper overlays. Material effects should remain quiet and must not reduce text contrast.

## 8. Interaction Design

### Cursor

Desktop uses a two-layer cursor:

- A precise central dot.
- A delayed, translucent halo.

The halo grows over interactive specimens and displays a concise state such as `VIEW`, `OPEN`, or an archive index. A very subtle refraction response may appear beneath the cursor.

The custom cursor is disabled for touch input, reduced motion, and contexts where pointer precision or accessibility would suffer. Native cursor behavior remains available as a fallback.

### Scroll Storytelling

- Threshold: slow atmospheric push and subtle foreground/midground/background parallax.
- Observation: dark botanical environment yields to archive cream while portrait layers resolve.
- Extraction: botanical cuts separate into lines, labels, and experience keywords.
- Formulations: project specimens move at slightly different speeds to create depth.
- Field Notes: fragments settle into a readable observation sequence.
- Correspondence: motion progressively becomes still.

GSAP ScrollTrigger owns chapter-level scroll sequences. Framer Motion owns component reveals, menus, cursor states, and detail overlays. The two systems must not control the same property on the same element.

### Transitions

Transitions use transform, opacity, clip-path, and restrained blur. Movement remains slow, organic, and purposeful. Avoid elastic motion, decorative particles, exaggerated 3D, and continuous motion without narrative value.

### Botanical Labels

Botanical hover labels are explicitly presented as visual specimens, for example:

> GERANIUM / VISUAL SPECIMEN 03  
> Balance · Adaptation · Structure

They must not make health, skincare, origin, or project claims unless verified by the selected image source and intentionally included as source metadata.

## 9. Responsive Behavior

Mobile is a designed interpretation rather than a scaled desktop layout:

- Disable custom cursor and mouse parallax.
- Convert project depth composition into a varied vertical sequence.
- Permit controlled overlap without horizontal overflow.
- Replace long pinned sequences with staged reveals.
- Present project details as a full-screen reading drawer.
- Retain MENU / CLOSE navigation.
- Maintain minimum 44px interaction targets.
- Keep primary Chinese content readable without zooming.

Under `prefers-reduced-motion`:

- Disable smooth scrolling, parallax, pins, continuous floating, and cursor effects.
- Preserve content order and all interactions with simple fades or static states.
- Keep the reduced KSX intro behavior.

## 10. Asset Strategy

Search for botanical specimen, glass, water, laboratory, and natural-material imagery with clear permissive licensing or safe attribution terms. Record title, creator, source URL, and license where applicable.

Selection criteria:

- Low saturation and natural or laboratory light.
- Sufficient negative space for responsive cropping.
- No visible third-party skincare packaging or competing brand identity.
- Visual relevance to the archive metaphor.
- Adequate resolution for desktop without excessive file weight.

Kinsley's existing portrait remains in use. Real project, social, and photography assets remain separate from atmospheric imagery. Missing real media continues to use explicit placeholders.

## 11. Component Architecture

Refactor existing components in place:

- `BrandIntro`: retain the original KSX motion and update only its transition into Threshold.
- `Navigation`: retain one navigation state machine and mobile menu.
- `Hero`: become Threshold.
- `About`: become Observation.
- `Experience`: become Extraction.
- `Projects`: own the Formulations archive and project entries.
- `SocialMedia`: integrate its real content into the third project narrative rather than duplicate the archive.
- `Photography`: become Field Notes and retain the lightbox.
- `Contact` and `Footer`: form Correspondence.

New shared components are limited to clear responsibilities such as:

- Archive cursor.
- Project detail overlay.
- Botanical specimen figure and label.
- Chapter transition or section index.

Continue reading content from `data/`. Store atmospheric specimen metadata separately from factual project data so the visual metaphor cannot be mistaken for project evidence.

## 12. Progressive Enhancement and Failure States

- Keep core identity, experience, projects, resume, and contact readable without advanced animation.
- Lazy-load noncritical media after the opening scene.
- Prioritize transforms and opacity for animated work.
- Batch pointer updates through `requestAnimationFrame`.
- Use WebGL only if a restrained refraction effect materially improves the opening and remains stable; otherwise use layered images and CSS.
- If an atmospheric image fails, show an archive-index placeholder without collapsing layout.
- If JavaScript fails, preserve meaningful document order and anchor navigation.

## 13. Validation

Validate at minimum:

- Desktop: 1440×900 and 1280×800.
- Mobile: 390×844 and 360×800.
- Full KSX intro, session skip, forced replay, and reduced-motion intro.
- Intro completion returns to Threshold without opening About or adding a hash.
- All navigation anchors and mobile MENU / CLOSE behavior.
- Scrolled K.X navigation state.
- Cursor states and native-cursor fallback.
- Project hover/focus, detail opening, Escape close, focus return, and mobile drawer.
- Photography lightbox and keyboard close.
- Image-error placeholders.
- No horizontal overflow.
- Reduced-motion behavior.
- Production build and browser console.
- Keyboard access, visible focus, semantic headings, image alternatives, and dialog semantics.

The site remains local-only. Do not deploy or publish it.

## 14. Non-Goals

- Turning Kinsley into a skincare brand.
- Ecommerce, product catalogue, cart, checkout, or product claims.
- Fabricated project results, screenshots, photography, or metrics.
- A second intro, navigation, homepage, or projects implementation.
- Decorative WebGL or animation that harms performance or legibility.
- Deployment or public hosting.
