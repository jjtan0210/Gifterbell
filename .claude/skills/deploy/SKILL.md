---
name: deploy
description: Deploy the Gifterbell Next.js app to Vercel via GitHub. Use this skill whenever the user says "deploy", "ship it", "push to vercel", "go live", "deploy to production", "preview deploy", or anything about deploying or shipping the app. Also trigger when the user types "/deploy". Accepts an optional "preview" argument for preview deploys instead of production.
---

# Deploy to Vercel (via GitHub)

Vercel is connected to the GitHub repo (`jjtan0210/Gifterbell`). Pushing to GitHub triggers Vercel to automatically build and deploy. This skill verifies the build passes locally first, then commits and pushes so Vercel picks up the latest changes.

## Arguments

- `preview` — push to a feature branch (Vercel creates a preview deployment)
- No argument — push to `main` (Vercel deploys to production)

## Steps

### 1. Build locally

Run a full production build to verify everything compiles — this is the same command Vercel runs:

```bash
npm run build
```

This runs `next build`, which includes TypeScript type-checking and catches issues like missing env vars, broken imports, SSR/SSG rendering failures, and image optimization errors. If the build succeeds locally, it will succeed on Vercel.

If the build fails:

- Read the error output carefully
- Fix all errors (type errors, lint errors, missing imports, etc.)
- Re-run `npm run build` until it succeeds
- Do NOT proceed to commit/push until the local build passes

### 2. Commit and push

Stage and commit all changes (including any fixes made in step 1). Follow the repo's commit message conventions.

Determine the deploy mode from the skill arguments:

- **Production** (default, no arguments):
  - Ensure you're on `main` (or merge into `main`)
  - `git push origin main`
  - Vercel auto-deploys to production

- **Preview** (argument is "preview"):
  - Create or use a feature branch
  - `git push origin <branch-name>`
  - Vercel creates a preview deployment for the branch
  - Optionally create a PR with `gh pr create`

### 3. Report

After pushing, tell the user:
- What was pushed (branch, commit summary)
- That Vercel will auto-build and deploy
- Where to check build status: the Vercel dashboard or GitHub checks on the commit/PR
