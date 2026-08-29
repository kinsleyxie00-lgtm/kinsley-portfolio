# GitHub Pages Deployment Design

## Goal

Publish the KINSLEY XIE marketing portfolio from a public GitHub repository named `kinsley-xie-portfolio`, with automatic redeployment after updates to the default branch.

## Chosen approach

Use Next.js static export and a GitHub Actions Pages workflow. This is preferred over committing a generated site to a `gh-pages` branch because the source and deployment history stay together, and preferred over running a custom server because GitHub Pages only serves static files.

## Repository and URL

- Owner: `kinsleyxie00-lgtm`
- Repository: `kinsley-xie-portfolio`
- Visibility: public
- Expected project URL: `https://kinsleyxie00-lgtm.github.io/kinsley-xie-portfolio/`

## Build design

- Configure Next.js with `output: "export"`.
- Apply the repository base path in GitHub Actions builds so generated assets resolve under `/kinsley-xie-portfolio`.
- Keep local development at `/` with no base path.
- Disable image optimization only if required by static export.
- Preserve the current client-side portfolio interactions, WebGL effects, modal behavior, and browser-specific video controls.
- Deploy the generated static output directory through GitHub's official Pages actions.

## Media

Commit the web-optimized H.264/AAC videos currently in `public/videos`. Preserve full-size source copies under the existing local `work/` backup directories; they are not part of the deployed repository. Images and other public assets are copied unchanged into the static export.

## Automation

The workflow runs on pushes to `main` and manual dispatch. It installs dependencies with pnpm, builds the static export, uploads the generated artifact, and deploys it to GitHub Pages with the minimum required permissions.

## Validation

- TypeScript check passes.
- Production static export completes and produces `out/index.html`.
- Asset paths in exported HTML include the repository base path.
- GitHub Actions deployment succeeds.
- The published URL loads the portfolio and its key image/video assets.

## Failure handling

If static export detects server-only behavior, isolate or replace only that behavior with a client/static equivalent. If GitHub authentication or repository creation requires user interaction, pause at the GitHub page without exposing credentials and ask the user to complete the sign-in step.
