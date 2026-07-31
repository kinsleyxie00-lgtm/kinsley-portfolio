# About Me Editorial Redesign

## Scope

Redesign only the existing `About` section of the KINSLEY XIE portfolio. Keep
the current single-page structure, content, intro, Hero, shared navigation, and
all sections after About unchanged.

Implementation is limited to:

- `components/About.tsx`
- About-scoped rules in `app/globals.css`
- A local About image copied to `public/images/profile.jpg`

No shared navigation, page ordering, data files, dependencies, or non-About
component styles may be changed.

## Direction

Use an Editorial Split composition inspired by premium portfolio websites and
minimal creative studio layouts:

- Warm off-white, black, and neutral gray palette
- Large areas of whitespace
- Strong relationship between typography and image
- Thin rules, restrained labels, and magazine-like captions
- No cards, pills, resume tables, decorative gradients, or dense modules

## Navigation

The existing shared navigation remains unchanged. When the user reaches About,
the current scroll behavior continues to reveal `K.X` on the left and the
existing `ABOUT / WORK / SOCIAL / PHOTO / CONTACT` links on the right.

No About-specific header or second navigation is created.

## Desktop Layout

The About section retains its existing heading and becomes a two-column
editorial spread.

### Left column

- Small uppercase label: `CREATIVE MARKETER`
- Large name treatment using the existing `谢可心 / KINSLEY XIE`
- Existing professional directions:
  - `BRAND MARKETING`
  - `CONTENT OPERATION`
  - `SOCIAL MEDIA`
- Existing English positioning statement
- Existing Chinese personal introduction, set with shorter line length and
  increased line-height
- Existing Skills, Tools, and Contact information reorganized as quiet
  typographic groups rather than a resume table

No content is invented or removed.

### Right column

Use the real image supplied at:

`/Users/xkx/Desktop/网页图片.JPG`

Copy it to:

`public/images/profile.jpg`

Render it as a large editorial image with a tall desktop crop. The seated
subject remains the primary focal point. The image is presented in grayscale
with a minimal caption using the existing identity. It must not use the
placeholder component.

## Mobile Layout

- The About content becomes one column.
- Name and professional directions appear before the image.
- The supplied image uses a wider crop to retain the working environment.
- Introduction and professional information follow with comfortable spacing.
- Skills, Tools, and Contact stack as separated text groups.
- No horizontal overflow is permitted.

## Typography

- Name: large, lightweight, tightly spaced display typography
- Role label: small uppercase with generous tracking
- Professional directions: compact uppercase lines
- Body: smaller than the name, generous line-height, restrained line length
- Skills and Tools: typographic lists separated by rules, not boxed cards

Existing global fonts remain in use. No dependency or external font is added.

## Accessibility and Behavior

- The image receives meaningful alternative text.
- Existing section ID and navigation target remain unchanged.
- Text remains selectable and semantic.
- Responsive layouts retain readable contrast and logical source order.
- No new client state, animation, or interaction is introduced.

## Validation

The work is complete when:

- Only About markup, About-scoped CSS, and the real About image have changed.
- The About section uses the supplied image and no portrait placeholder.
- Existing About content is preserved.
- Shared navigation and every other section are unchanged.
- Desktop and mobile layouts have no overlap or horizontal overflow.
- The project build succeeds.
- Browser verification covers the About section at desktop and mobile widths.
- The site remains local and is not published.
