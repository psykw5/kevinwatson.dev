# kevinwatson.dev

Personal engineering portfolio for [kevinwatson.dev](https://kevinwatson.dev), built with [Astro](https://astro.build/) and deployed to GitHub Pages with GitHub Actions.

## Local development

Install dependencies:

```sh
pnpm install
```

Start the local development server:

```sh
pnpm dev
```

Build the production site:

```sh
pnpm build
```

Preview the production build:

```sh
pnpm preview
```

Run validation:

```sh
pnpm lint
pnpm check
pnpm format:check
```

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`.

The workflow:

1. Installs dependencies with `pnpm install --frozen-lockfile`.
2. Runs linting, Astro checks and formatting checks.
3. Builds the static site.
4. Uploads `dist/` as a GitHub Pages artifact.
5. Deploys the artifact to GitHub Pages.

The custom domain is preserved by `public/CNAME`, which Astro copies into the build output.

## GitHub Pages settings

In the repository settings, set GitHub Pages to deploy from **GitHub Actions** rather than from a branch.

The site is designed to run at the root path `/` for the custom domain `kevinwatson.dev`.
