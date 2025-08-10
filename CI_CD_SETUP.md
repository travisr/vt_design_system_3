# CI/CD Setup Guide

This document outlines the complete CI/CD setup for the Venntier Design System project.

## Overview

The CI/CD pipeline provides:

1. **Private NPM Package** - `@venntier/design-system` published to GitHub Packages
2. **Demo App Deployment** - Design system demo deployed to GitHub Pages
3. **Container Images** - Docker image for demo app pushed to GitHub Container Registry (GHCR)
4. **Preview Deployments** - PR-based preview environments
5. **Automated Cleanup** - Old images and environments cleanup

## Workflows

### 1. Main Deployment (`deploy.yml`)

**Triggers:**

- Push to `main` branch
- Git tags starting with `v*`
- Manual dispatch

**Jobs:**

- `publish-package`: Publishes NPM package on version tags
- `build-demo`: Builds the design system demo application
- `build-containers`: Builds and pushes Docker image
- `deploy-pages`: Deploys demo to GitHub Pages

### 2. Preview Deployment (`preview.yml`)

**Triggers:**

- Pull request events (opened, synchronized, reopened, closed)

**Jobs:**

- `preview-deploy`: Creates preview environment for PRs
- `preview-cleanup`: Cleans up when PR is closed

### 3. Cleanup (`cleanup.yml`)

**Triggers:**

- Daily at 2 AM UTC
- Manual dispatch

**Jobs:**

- `cleanup-containers`: Removes old container images (keeps 10 most recent)
- `cleanup-preview-branches`: Removes orphaned preview environments

## Repository Setup Required

### 1. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Ensure repository is private (for private Pages)

### 2. Enable GitHub Packages

1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"

### 3. Container Registry Permissions

No additional setup required - uses `GITHUB_TOKEN` with automatic permissions.

## Usage

### Publishing a New Version

1. Update version in `venntier-design-system/projects/design-system/package.json`
2. Create and push a git tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. The workflow will automatically publish to GitHub Packages

### Installing the Package

```bash
# Configure npm to use GitHub Packages for @venntier scope
echo "@venntier:registry=https://npm.pkg.github.com" >> .npmrc

# Install the package
npm install @venntier/design-system
```

## URLs

- **Demo App**: `https://travisr.github.io/vt_design_system_3/`
- **PR Previews**: `https://travisr.github.io/vt_design_system_3/pr-{number}/`
- **Container Registry**: `https://github.com/travisr/vt_design_system_3/pkgs/container/vt_design_system_3%2Fdemo`

### Preview Deployments

1. Create a pull request
2. The workflow will automatically:
   - Build the demo app with PR-specific base href
   - Deploy to GitHub Pages under `/pr-{number}/`
   - Build and push container image tagged with `pr-{number}`
   - Comment on PR with preview links

### Using Container Images

**From GitHub Container Registry:**

```bash
# Pull and run the demo app
docker pull ghcr.io/travisr/vt_design_system_3/demo:main
docker run -p 8080:80 ghcr.io/travisr/vt_design_system_3/demo:main
```

**Local Docker Development:**

```bash
# Build and run locally (production-like testing)
cd venntier-design-system
npm run docker:dev

# Or step by step:
npm run build           # Build the app
npm run docker:build    # Build Docker image
npm run docker:run      # Run container on http://localhost:8080

# Clean up local image
npm run docker:clean
```

## Security

- All deployments use GitHub authentication
- Container images are private by default
- GitHub Pages is private (requires repository access)
- NPM packages are restricted to organization members

## Monitoring

- Workflow runs: Repository → Actions tab
- Package versions: Repository → Packages tab
- Deployments: Repository → Environments tab
- Container images: Repository → Packages tab

## Troubleshooting

### Build Failures

1. Check workflow logs in Actions tab
2. Verify Node.js version compatibility
3. Check for dependency conflicts

### Package Publishing Issues

1. Verify version number is incremented
2. Check GitHub token permissions
3. Ensure tag format is correct (`v*`)

### Preview Deployment Issues

1. Check base href configuration
2. Verify GitHub Pages is enabled
3. Check workflow permissions

### Container Issues

1. Verify Docker build context
2. Check Dockerfile syntax
3. Ensure proper file permissions

## Optimization

The setup is optimized for build speed:

- Docker layer caching enabled
- npm ci with `--prefer-offline --no-audit`
- Parallel job execution
- Artifact reuse between jobs

To optimize for image size instead, modify Dockerfiles to use multi-stage builds with smaller base images.
