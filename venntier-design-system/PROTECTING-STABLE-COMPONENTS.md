# Protecting Stable Components

This guide shows how to protect your finalized design system components from regressions while allowing other parts to evolve.

## 🎯 **Your Stable Components**

Based on your description, these are **finalized and should be protected**:

### ✅ **Navigation**

- **Sidenav**: 280px width, specific padding, logo styling
- **Top Nav**: 64px height, 24px horizontal padding, border styling

### ✅ **Foundation Systems**

- **Typography**: Display, headline, body, label scales with exact font sizes
- **Elevation**: 6-level shadow system with precise shadow values
- **Colors**: Primary, secondary, tertiary color tokens
- **Spacing**: XS (4px), SM (8px), MD (16px), LG (24px), XL (32px)

## 🛡️ **Protection Strategy**

### **1. Strict Testing for Stable Components**

```typescript
// ✅ STRICT - Test exact values for stable components
describe('Sidenav - STABLE (Strict Protection)', () => {
  it('should maintain exact sidenav styling', async () => {
    const sidenav = document.querySelector('mat-sidenav') as HTMLElement;

    // Exact width specification - this should NEVER change
    expect(window.getComputedStyle(sidenav).width).toBe('280px');

    // Strict validation
    StableComponentTestUtils.verifySidenavStyling(sidenav);
  });
});

// ✅ STRICT - Test exact typography values
describe('Typography - STABLE (Strict Protection)', () => {
  it('should maintain exact typography scale', async () => {
    const displayLarge = document.querySelector('.display-large') as HTMLElement;

    StableComponentTestUtils.verifyTypographyScale(displayLarge, {
      fontSize: '57px',
      fontWeight: '400',
      lineHeight: '64px',
    });
  });
});
```

### **2. Separate Test Suites**

```bash
# Run only stable component tests (strict validation)
npm run test:stable

# Run migration tests (flexible validation)
npm run test:migration

# Run all tests
npm run test
```

### **3. CI/CD Protection**

```yaml
# In GitHub Actions - stable tests must always pass
- name: Run stable component tests
  run: npm run test:stable
  # This step will fail the build if stable components regress

- name: Run migration tests
  run: npm run test:migration
  continue-on-error: true # Allow these to fail during active development
```

## 🔒 **What Gets Protected**

### **Navigation Components**

```typescript
// Sidenav - PROTECTED
expect(styles.width).toBe('280px'); // Exact width
expect(styles.paddingLeft).toBe('24px'); // Exact padding
expect(styles.paddingRight).toBe('24px'); // Exact padding

// Top Nav - PROTECTED
expect(styles.height).toBe('64px'); // Exact height
expect(styles.paddingLeft).toBe('24px'); // Exact padding
expect(styles.borderBottomWidth).toBe('1px'); // Border styling
```

### **Typography System**

```typescript
// Display Large - PROTECTED
expect(styles.fontSize).toBe('57px');
expect(styles.fontWeight).toBe('400');
expect(styles.lineHeight).toBe('64px');

// Body Large - PROTECTED
expect(styles.fontSize).toBe('16px');
expect(styles.fontWeight).toBe('400');
expect(styles.lineHeight).toBe('24px');
```

### **Elevation System**

```typescript
// Level 1 Elevation - PROTECTED
expect(styles.boxShadow).toBe(
  '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
);

// Level 2 Elevation - PROTECTED
expect(styles.boxShadow).toBe(
  '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
);
```

### **Spacing System**

```typescript
// Spacing Scale - PROTECTED
expect(getCSSCustomProperty(element, '--vt-spacing-xs')).toBe('4px');
expect(getCSSCustomProperty(element, '--vt-spacing-sm')).toBe('8px');
expect(getCSSCustomProperty(element, '--vt-spacing-md')).toBe('16px');
expect(getCSSCustomProperty(element, '--vt-spacing-lg')).toBe('24px');
expect(getCSSCustomProperty(element, '--vt-spacing-xl')).toBe('32px');
```

## 🚫 **What Doesn't Get Protected (Yet)**

### **Components Under Migration**

```typescript
// Buttons - FLEXIBLE (during md->mat token migration)
describe('Buttons - Migration Phase', () => {
  it('should track token migration progress', () => {
    // Log warnings, don't fail tests
    KnownIssuesTestUtils.warnAboutKnownIssues(button, 'Button');
  });
});

// Form Fields - FLEXIBLE (during styling refinement)
describe('Form Fields - Migration Phase', () => {
  it('should maintain basic functionality', () => {
    // Test behavior, not specific styling
    expect(input).toBeVisible();
    expect(input).toBeEnabled();
  });
});
```

## 🎯 **Implementation Steps**

### **Step 1: Identify Your Stable Components**

```typescript
// Create specs for your stable components
export const STABLE_COMPONENT_SPECS = {
  sidenav: {
    width: '280px',
    padding: '24px',
  },
  topNav: {
    height: '64px',
    padding: '24px',
  },
  typography: {
    displayLarge: { fontSize: '57px', fontWeight: '400', lineHeight: '64px' },
    bodyLarge: { fontSize: '16px', fontWeight: '400', lineHeight: '24px' },
  },
};
```

### **Step 2: Write Strict Tests**

```typescript
import { StableComponentTestUtils, STABLE_COMPONENT_SPECS } from '../stable-component-tests';

describe('Navigation - STABLE (Strict Protection)', () => {
  it('should never change sidenav width', async () => {
    const sidenav = document.querySelector('mat-sidenav') as HTMLElement;
    expect(window.getComputedStyle(sidenav).width).toBe('280px');
  });
});
```

### **Step 3: Run Stable Tests**

```bash
# Test only your stable components
npm run test:stable

# Watch stable components during development
npm run test:stable:watch
```

### **Step 4: Protect in CI/CD**

```yaml
# Add to your GitHub Actions
- name: Protect stable components
  run: npm run test:stable
  # Build fails if stable components regress
```

## 📊 **Benefits**

### **✅ Immediate Protection**

- **Navigation** styling can't accidentally break
- **Typography** scale is locked in
- **Elevation** system is protected
- **Spacing** scale is preserved

### **✅ Development Freedom**

- Other components can still evolve
- Migration work can continue
- New features can be added
- Refactoring is safe

### **✅ Clear Boundaries**

- Team knows what's "done" vs "in progress"
- QA knows what to test strictly
- Product knows what's stable
- Developers know what they can change

## 🚨 **Regression Prevention**

### **Critical Tests (Always Run)**

```typescript
describe('Regression Prevention - CRITICAL', () => {
  it('should never break sidenav width', async () => {
    // This test will fail the build if sidenav width changes
    expect(sidenavWidth).toBe('280px');
  });

  it('should never break top nav height', async () => {
    // This test will fail the build if top nav height changes
    expect(topNavHeight).toBe('64px');
  });

  it('should never break typography scale', async () => {
    // This test will fail the build if typography changes
    expect(displayLargeFontSize).toBe('57px');
  });
});
```

## 🎯 **Commands Summary**

```bash
# Protect your stable components
npm run test:stable              # Run strict tests for stable components
npm run test:stable:watch        # Watch stable components during development

# Continue migration work
npm run test:migration           # Run flexible tests for components under migration
npm run test                     # Run all tests (stable + migration + foundation)

# Visual protection
npm run test:visual              # Visual regression tests for all components
```

This approach gives you **bulletproof protection** for your finalized components while maintaining **development flexibility** for everything else!

## 🔄 **Migration Workflow**

1. **Component is finalized** → Move to strict testing
2. **Component needs changes** → Move back to flexible testing
3. **Component is re-finalized** → Move back to strict testing

This way you can **protect what's done** while **evolving what's not**!
