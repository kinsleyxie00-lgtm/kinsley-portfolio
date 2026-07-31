# Navigation and Intro Restoration Design

## Scope

Make two isolated corrections without changing the current warm-paper Hero or
the remaining portfolio sections.

## Navigation

- Preserve the existing navigation component, labels, anchors, scroll behavior,
  and mobile menu.
- Add responsive horizontal safe spacing so the first and last desktop links
  remain fully visible.
- Keep the navigation aligned with the site grid at common desktop widths.
- Do not add, remove, or rename navigation items.

## Brand Intro

- Keep the current `BrandIntro` component logic, duration, session behavior,
  reduced-motion handling, and scroll reset.
- Restore its visual styling to the version used before the immersive
  Direction B layer.
- Use the original sans-serif KSX and KINSLEY / SEEKING / X matrix treatment.
- Remove the later editorial serif and film-grain overrides from the intro only.

## Exclusions

- Do not change the warm `#FFFEFA` Hero composition.
- Do not change About, Experience, Projects, Social, Photography, Contact, or
  Footer.
- Do not deploy the site or add dependencies.

## Validation

- ABOUT and CONTACT are fully visible at desktop widths.
- Mobile menu remains unchanged and usable.
- Intro plays and exits normally in full and reduced-motion modes.
- Production build passes with no horizontal overflow.
