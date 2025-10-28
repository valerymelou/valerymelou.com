# valerymelou.com

[![CI](https://github.com/valerymelou/valerymelou.com/actions/workflows/ci.yml/badge.svg)](https://github.com/valerymelou/valerymelou.com/actions/workflows/ci.yml) [![Maintainability](https://qlty.sh/gh/valerymelou/projects/valerymelou.com/maintainability.svg)](https://qlty.sh/gh/valerymelou/projects/valerymelou.com) [![Code Coverage](https://qlty.sh/gh/valerymelou/projects/valerymelou.com/coverage.svg)](https://qlty.sh/gh/valerymelou/projects/valerymelou.com)

All the code powering my personal website: https://valerymelou.com.

## Run locally

This is an Nx monorepo with an Angular application (`apps/www`) and several libraries.

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm 9+/pnpm/yarn (examples below use `npx` and `npm`)

Optional for deployment:

- Firebase CLI: `npm i -g firebase-tools`

### 1) Install dependencies

```sh
npm install
```

### 2) Configure environment variables

Some features (Contentful CMS, absolute URLs, etc.) are configured via environment variables. Only variables prefixed with `VM_` are exposed to the browser at build time.

Required:

- `VM_CONTENTFUL_SPACE`
- `VM_CONTENTFUL_ACCESS_TOKEN`
- `VM_CONTENTFUL_ENVIRONMENT` (e.g. `master`)

Export them in your shell before serving/building (macOS zsh):

```sh
export VM_CONTENTFUL_SPACE="<your_space_id>"
export VM_CONTENTFUL_ACCESS_TOKEN="<your_cda_access_token>"
export VM_CONTENTFUL_ENVIRONMENT="master"
```

Notes:

- The dev server and builds read from your process environment. If you prefer, add these exports to your shell profile (e.g. `~/.zshrc`).
- The app includes an env-var plugin that injects only `VM_*` variables into the client bundle.

### 3) Start the dev server

```sh
npx nx serve www
```

This runs Angular’s dev server with HMR. The app is available at http://localhost:4200 by default.

### Useful scripts

- Run all tests:
  ```sh
  npx nx test
  ```
- Lint all projects:
  ```sh
  npx nx lint
  ```
- Build the app (production):
  ```sh
  npx nx build www --configuration=production
  ```
- Serve the built app statically (after a build):
  ```sh
  npx nx serve-static www
  ```

## Deploy to Firebase Hosting

This project ships with a `firebase.json` configured to serve the built browser output from `dist/apps/www/browser` with SPA rewrites.

### One-time setup

1. Install the Firebase CLI and log in:

```sh
npm i -g firebase-tools
firebase login
```

2. Select or set your Firebase project (skip if already configured):

```sh
firebase use --add
```

### Build and deploy

1. Ensure the required env vars are set (see above), then build:

```sh
npx nx build www --configuration=production
```

2. Deploy Hosting:

```sh
firebase deploy --only hosting
```

That’s it—Firebase Hosting will upload the contents of `dist/apps/www/browser` and apply SPA rewrites (`/** -> /index.html`).

### Preview channels (optional)

Create a temporary preview deployment without affecting production:

```sh
firebase hosting:channel:deploy staging
```

You’ll get a unique preview URL. You can also set an expiration:

```sh
firebase hosting:channel:deploy staging --expires 7d
```

### Notes

- Environment variables must be present when building. Hosting is static and will serve whatever was baked into the bundle at build time.
- If you run deployment from CI, export the `VM_...` variables in your CI environment before running `nx build`.
