# Kinsley Xie Paper Archive Hybrid Design

## Objective

Create a hybrid portfolio direction that preserves the approved immersive hero
composition while returning the remainder of the site to the restrained
editorial language of Direction A.

## Confirmed Scope

- Preserve the current hero composition and motion:
  oversized KINSLEY XIE typography, right-side portrait, overlapping secondary
  photograph, archive metadata, handwritten annotation, and slow reveal.
- Change the hero from a dark exhibition scene to the same warm paper palette
  used throughout the rest of the website.
- Return every section after the hero to Direction A.
- Preserve the existing navigation structure and behavior.
- Preserve the existing project-strip structure and interaction model.
- Do not rewrite content, add dependencies, or deploy the site.

## Color System

- Universal background: `#FFFEFA`
- Primary text: `#1D1C1A`
- Secondary text and outline: muted gray-brown
- Single accent: muted dark burgundy
- Images: soft black-and-white treatment with restrained contrast

All major sections, including Hero, About, Experience, Projects, Social,
Photography, Contact, and Footer, use the same `#FFFEFA` background. Dark
full-section scenes are removed.

## Hero

Retain the approved Direction B spatial composition and entrance timing. Adapt
it to the paper palette:

- filled KINSLEY uses soft black;
- outlined XIE uses gray-brown;
- archival rules and geometric linework use low-contrast warm gray;
- handwritten annotation uses muted burgundy;
- photography remains black and white but is softened for a printed editorial
  feeling;
- the overlapping secondary photograph keeps its paper-frame treatment.

## Remaining Sections

From About onward, use Direction A:

- strict editorial grids;
- restrained serif headlines;
- small uppercase metadata;
- generous whitespace;
- medium-scale images treated as placed editorial objects;
- thin rules and subtle separators;
- no dark section backgrounds;
- no heavy hover overlays;
- no oversized chapter typography competing with content.

Projects retain their current strip/chapter structure but return to quiet paper
styling. Photography remains an archive strip and keeps its lightbox. Contact
returns to a calm paper closing page.

## Motion

- Preserve the current hero reveal and image settling.
- Use only quiet fade and slight vertical reveal in the remaining sections.
- Keep reduced-motion behavior.
- Remove dark-scene effects and aggressive hover overlays outside the hero.

## Responsive Behavior

Desktop retains the asymmetric hero composition. Mobile keeps the same visual
hierarchy in a vertical composition without horizontal overflow. Navigation,
project interactions, and the photography lightbox continue to work on desktop
and mobile.

## Validation

- Production build passes.
- Every main section computes to `#FFFEFA`.
- Desktop and mobile have no horizontal overflow.
- Existing navigation anchors and mobile menu work.
- Existing project-strip structure remains intact.
- Photography lightbox opens and closes with keyboard support.
- No console errors.
