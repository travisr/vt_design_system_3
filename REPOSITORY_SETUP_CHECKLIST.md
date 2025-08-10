# Repository Setup Checklist

Complete these steps to activate the CI/CD pipeline:

## ✅ Required Repository Settings

### 1. GitHub Pages Configuration
- [ ] Go to **Settings** → **Pages**
- [ ] Set **Source** to "GitHub Actions"
- [ ] Verify repository is **private** (required for private Pages)
- [ ] Note: First deployment will create the `gh-pages` branch automatically

### 2. Actions Permissions
- [ ] Go to **Settings** → **Actions** → **General**
- [ ] Under **Workflow permissions**, select:
  - [x] **Read and write permissions**
  - [x] **Allow GitHub Actions to create and approve pull requests**

### 3. Package Registry Access
- [ ] Go to **Settings** → **Actions** → **General**
- [ ] Ensure **GITHUB_TOKEN** has package write permissions (enabled by default)

### 4. Environments (Auto-created)
The following environments will be created automatically:
- `github-pages` (for main deployments)
- `preview-pr-{number}` (for each PR preview)

## 🚀 Testing the Setup

### 1. Test Main Deployment
```bash
# Push to main branch or create a tag
git tag v0.0.1
git push origin v0.0.1
```

Expected results:
- [ ] NPM package published to GitHub Packages
- [ ] Demo app deployed to GitHub Pages
- [ ] Container images pushed to GHCR

### 2. Test Preview Deployment
```bash
# Create a pull request
git checkout -b feature/test-preview
git push origin feature/test-preview
# Create PR via GitHub UI
```

Expected results:
- [ ] PR comment with preview links
- [ ] Preview environment created
- [ ] Container image tagged with PR number

### 3. Test Package Installation
```bash
# In a test project
echo "@venntier:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc
npm install @venntier/design-system
```

## 🔧 Optional Optimizations

### 1. Branch Protection Rules
- [ ] Go to **Settings** → **Branches**
- [ ] Add rule for `main` branch:
  - [x] Require status checks to pass
  - [x] Require branches to be up to date
  - [x] Include administrators

### 2. Environment Protection Rules
- [ ] Go to **Settings** → **Environments**
- [ ] For `github-pages` environment:
  - [x] Required reviewers (optional)
  - [x] Deployment branches: `main` only

### 3. Dependabot Configuration
Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/venntier-design-system"
    schedule:
      interval: "weekly"
  - package-ecosystem: "npm"
    directory: "/examples/venntier-theme-demo"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

## 📊 Monitoring & Maintenance

### Regular Checks
- [ ] Monitor workflow runs in **Actions** tab
- [ ] Check package versions in **Packages** tab
- [ ] Review deployment history in **Environments** tab
- [ ] Monitor container image usage in **Insights** → **Traffic**

### Cleanup Schedule
- Container images: Automated daily cleanup (keeps 10 most recent)
- Preview environments: Automated cleanup when PRs close
- Workflow runs: GitHub retains for 90 days by default

## 🚨 Troubleshooting

### Common Issues

1. **"Resource not accessible by integration"**
   - Check Actions permissions are set to "Read and write"

2. **Package publishing fails**
   - Verify version number is incremented
   - Check package.json publishConfig

3. **Pages deployment fails**
   - Ensure GitHub Pages is enabled
   - Check if repository is private (requires paid plan)

4. **Container build fails**
   - Check Dockerfile syntax
   - Verify build context includes necessary files

### Getting Help
- Check workflow logs in Actions tab
- Review this setup guide: `CI_CD_SETUP.md`
- GitHub Actions documentation: https://docs.github.com/en/actions

## ✅ Completion Checklist

Once all items above are completed:
- [ ] Main deployment workflow runs successfully
- [ ] Preview deployment creates PR environments
- [ ] NPM package is accessible
- [ ] Container images are available
- [ ] Cleanup workflows are scheduled

**Status**: Ready for production use! 🎉
