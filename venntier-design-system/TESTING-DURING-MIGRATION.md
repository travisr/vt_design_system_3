# Testing During Design System Migration

This guide explains how to implement effective testing while actively developing and migrating your design system.

## 🎯 **The Challenge**

You want comprehensive testing, but your design system is actively evolving:

- ❌ MD tokens need migration to MAT tokens
- ❌ Hardcoded values need to be replaced with tokens
- ❌ Component styling is being refined
- ❌ Architecture is being improved

**Solution**: Phased testing approach that adapts to your development stage.

## 📋 **3-Phase Testing Strategy**

### **Phase 1: Foundation Testing (Start Now)**

**Focus**: Structure, behavior, and basic functionality
**Duration**: During active migration
**Goal**: Prevent functional regressions while allowing styling changes

```typescript
// ✅ Test component structure (stable)
MigrationSafeTestUtils.verifyComponentStructure([
  { role: 'button', name: 'Submit' },
  { role: 'textbox', name: 'Email' },
]);

// ✅ Test user interactions (stable)
await user.click(screen.getByRole('button', { name: 'Submit' }));
expect(onSubmit).toHaveBeenCalled();

// ✅ Test that tokens exist (don't check values)
MigrationSafeTestUtils.verifyTokensExist(element, [
  '--mat-sys-color-primary',
  '--mat-sys-color-surface',
]);

// ❌ Don't test specific token values (they're changing)
// expect(getComputedStyle(element).getPropertyValue('--mat-sys-color-primary')).toBe('#specific-color');
```

### **Phase 2: Migration Tracking (During Migration)**

**Focus**: Track progress and identify issues without blocking development
**Duration**: During md→mat token migration
**Goal**: Monitor migration progress and catch breaking changes

```typescript
// ✅ Track migration progress
const status = KnownIssuesTestUtils.trackMigrationProgress(element);
console.log(`MD tokens remaining: ${status.mdTokens.length}`);
console.log(`MAT tokens present: ${status.matTokens.length}`);

// ✅ Warn about issues (don't fail tests)
KnownIssuesTestUtils.warnAboutKnownIssues(element, 'ButtonComponent');

// ✅ Test theme switching behavior (not specific colors)
await MigrationSafeTestUtils.verifyThemeSwitchingBehavior(fixture, element, themeService);
```

### **Phase 3: Strict Validation (Post-Migration)**

**Focus**: Comprehensive validation with strict requirements
**Duration**: After migration is complete
**Goal**: Ensure perfect implementation

```typescript
// ✅ Strict token validation (enable after migration)
it.skip('should use only mat tokens', async () => {
  TokenTestUtils.verifyMaterialSystemTokens(element);
  expect(KnownIssuesTestUtils.identifyMdTokens(element)).toHaveLength(0);
});

// ✅ Strict hardcoded value checks (enable after cleanup)
it.skip('should have no hardcoded values', async () => {
  MigrationSafeTestUtils.verifyNoHardcodedValues(element);
});
```

## 🛠 **Practical Implementation**

### **Current Test Structure**

```typescript
describe('MyComponent', () => {
  describe('Phase 1: Foundation (Always Active)', () => {
    it('should render correct structure', () => {
      // Test DOM structure and accessibility
    });

    it('should handle user interactions', () => {
      // Test click handlers, form submission, etc.
    });

    it('should maintain Angular Material integration', () => {
      // Test that Material classes are present
    });
  });

  describe('Phase 2: Migration Tracking (During Migration)', () => {
    it('should track token migration progress', () => {
      // Log progress, warn about issues
    });

    it('should maintain theme switching', () => {
      // Test that themes change something
    });
  });

  describe('Phase 3: Strict Validation (Post-Migration)', () => {
    it.skip('should use perfect tokens', () => {
      // Enable after migration complete
    });
  });

  describe('Regression Prevention (Always Active)', () => {
    it('should not break during changes', () => {
      // Core functionality that must never break
    });
  });
});
```

### **Migration-Safe Test Patterns**

#### ✅ **DO: Test Behavior**

```typescript
// Test that clicking works
await user.click(button);
expect(onClick).toHaveBeenCalled();

// Test that form validation works
await user.type(input, 'invalid-email');
expect(screen.getByText('Invalid email')).toBeInTheDocument();

// Test that theme switching changes something
const initialColor = getComputedStyle(element).color;
themeService.toggleTheme();
const newColor = getComputedStyle(element).color;
expect(newColor).not.toBe(initialColor);
```

#### ✅ **DO: Test Structure**

```typescript
// Test that required elements exist
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
expect(screen.getByLabelText('Email')).toBeInTheDocument();

// Test that Material classes are present
expect(button).toHaveClass('mat-mdc-raised-button');
```

#### ❌ **DON'T: Test Specific Values During Migration**

```typescript
// Don't test specific colors (they're changing)
expect(getComputedStyle(button).backgroundColor).toBe('rgb(25, 118, 210)');

// Don't test specific token values (md→mat migration)
expect(getCSSCustomProperty(element, '--md-sys-color-primary')).toBe('#1976d2');

// Don't test exact spacing values (being refined)
expect(getComputedStyle(element).padding).toBe('8px 16px');
```

## 🚀 **Getting Started Today**

### **1. Start with Foundation Tests**

```bash
# Create your first migration-safe test
npm run test -- --testNamePattern="Foundation"
```

### **2. Use Migration Tracking**

```typescript
import { KnownIssuesTestUtils } from '@venntier/design-system/testing';

// Add to existing tests to track progress
const migrationStatus = KnownIssuesTestUtils.trackMigrationProgress(element);
console.log('Migration progress:', migrationStatus);
```

### **3. Enable Strict Tests Gradually**

```typescript
// Start with .skip, remove as you fix issues
it.skip('should use only mat tokens', () => {
  // Enable when md→mat migration is complete
});

it.skip('should have no hardcoded values', () => {
  // Enable when hardcoded values are removed
});
```

## 📊 **Migration Progress Tracking**

### **Dashboard in CI**

Your GitHub Actions will show:

- ✅ Foundation tests: Always passing
- ⚠️ Migration warnings: Logged but not failing
- ⏸️ Strict tests: Skipped until ready

### **Local Development**

```bash
# See migration progress
npm run test -- --verbose

# Check specific component
npm run test -- button.spec.ts --verbose
```

## 🎯 **Benefits of This Approach**

### **✅ Immediate Benefits**

- Tests don't block development
- Catch functional regressions
- Track migration progress
- Maintain code quality

### **✅ Long-term Benefits**

- Smooth transition to comprehensive testing
- No "big bang" test implementation
- Gradual improvement of test coverage
- Clear migration milestones

### **✅ Team Benefits**

- Developers can focus on migration
- QA can track progress
- Product can see stability metrics
- Everyone knows what's tested vs. what's changing

## 🔄 **Migration Workflow**

1. **Start**: Write foundation tests for new components
2. **During**: Use migration tracking to monitor progress
3. **Milestone**: Enable strict tests for completed components
4. **Complete**: All tests are comprehensive and strict

This approach lets you have **good testing now** while building toward **excellent testing later**!

## 📝 **Example Commands**

```bash
# Run only foundation tests (safe during migration)
npm run test -- --testNamePattern="Foundation|Regression Prevention"

# Run migration tracking (see progress)
npm run test -- --testNamePattern="Migration Tracking" --verbose

# Run all tests including skipped ones (after migration)
npm run test -- --testNamePattern=".*" --verbose
```
