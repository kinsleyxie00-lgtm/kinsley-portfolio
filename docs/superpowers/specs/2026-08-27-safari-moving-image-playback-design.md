# Safari Moving Image Playback Compatibility

## Goal

Make the Moving Image film reliably playable in Safari 16.3 while preserving the existing custom interaction and appearance in Chrome and other non-Safari browsers.

## Confirmed diagnosis

- Safari can play the direct MP4 URL, so the H.264/AAC media file, MP4 container, HTTP range responses, and local server are valid.
- The failure is isolated to the page's custom playback interaction in Safari.

## Design

- Detect Safari on the client after mount, excluding Chromium-based browsers on iOS where applicable.
- In Safari, render the Moving Image `<video>` with native `controls` and allow the browser to own play, pause, seeking, and failure feedback.
- Hide the custom `PLAY FILM` overlay in Safari so it does not compete with native controls.
- Keep the independent poster image until Safari has enough media data to present its own frame or controls.
- Preserve the current custom click-to-play behavior in non-Safari browsers.
- Do not change the three Xiaohongshu video cards.

## Error handling

- If Safari reports a media error, retain the poster instead of exposing an unexplained black rectangle.
- The direct MP4 URL remains a valid diagnostic fallback.

## Verification

- TypeScript passes.
- Production build passes.
- Chrome retains the current custom interaction.
- Safari displays native controls and can start, pause, seek, and resume the Moving Image film.

## Non-goals

- No visual redesign of the Moving Image section.
- No video re-encoding.
- No deployment.
