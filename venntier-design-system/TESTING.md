# Testing Guide - Venntier Design System

This guide outlines the comprehensive testing strategy for the Venntier Design System to minimize regressions and ensure quality.

## Testing Philosophy

Our testing approach follows the **Testing Pyramid** principle:

1. **Unit Tests (70%)** - Fast, isolated component testing
2. **Integration Tests (20%)** - Component interaction testing
3. **Visual/E2E Tests (10%)** - User journey and visual regression testing

## Test Types

### 1. Unit Tests (Jest + Angular Testing Library)

**Purpose**: Test individual components in isolation
**Tools**: Jest, Angular Testing Library, Custom Testing Utilities

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

**What to Test**:

- Component logic and state management
- Input/output behavior
- Theme responsiveness
- Design token application
- Accessibility features

**Example**:

```typescript
import { render, screen } from '@testing-library/angular';
import { createThemeTestUtils, TokenTestUtils } from '@venntier/design-system/testing';

describe('MyComponent', () => {
  it('should apply design tokens correctly', async () => {
    const { fixture } = await render(MyComponent);
    const element = screen.getByRole('button');

    TokenTestUtils.verifyMaterialSystemTokens(element);
    TokenTestUtils.verifyComponentTokens(element, 'button', ['container-color']);
  });
});
```

### 2. Integration Tests

**Purpose**: Test component interactions and theme switching
**Location**: `projects/design-system/src/testing/integration/`

```bash
# Run integration tests (included in main test suite)
npm run test -- --testPathPattern=integration
```

**What to Test**:

- Form validation workflows
- Theme switching stability
- Component state synchronization
- Token inheritance
- Cross-component consistency

### 3. Visual Regression Tests (Playwright)

**Purpose**: Catch visual changes and ensure UI consistency
**Tools**: Playwright, Screenshot comparison

```bash
# Run visual tests
npm run test:visual

# Update snapshots
npm run test:visual:update

# Run with UI
npm run test:visual:ui
```

**What to Test**:

- Component appearance in light/dark themes
- Responsive design breakpoints
- Hover/focus states
- Density variations
- Cross-browser compatibility

### 4. Accessibility Tests

**Purpose**: Ensure WCAG compliance and screen reader compatibility
**Tools**: axe-core, Playwright

```bash
# Run accessibility tests
npx playwright test tests/visual/accessibility.spec.ts
```

**What to Test**:

- Color contrast ratios
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

## Testing Utilities

### Theme Testing

```typescript
import { createThemeTestUtils } from '@venntier/design-system/testing';

const themeUtils = createThemeTestUtils(fixture);
await themeUtils.switchToDarkTheme();
themeUtils.verifyColorContrast(element, 4.5);
```

### Token Testing

```typescript
import { TokenTestUtils } from '@venntier/design-system/testing';

TokenTestUtils.verifyMaterialSystemTokens(element);
TokenTestUtils.verifySpacingScale(element);
TokenTestUtils.verifyColorTokens(element, ['--mat-sys-primary']);
```

### Component Testing

```typescript
import { createComponentTestUtils } from '@venntier/design-system/testing';

const utils = createComponentTestUtils(fixture);
await utils.click('button[mat-raised-button]');
utils.expectToHaveClasses('button', ['mat-mdc-raised-button']);
```

### Accessibility Testing

```typescript
import { runAccessibilityTests } from '@venntier/design-system/testing';

await runAccessibilityTests(fixture, {
  interactiveElements: ['button', 'input'],
  formElements: [{ selector: 'input', expectedLabel: 'Email' }],
});
```

## Best Practices

### 1. Test Structure

```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('Basic Functionality', () => {
    // Core component behavior
  });

  describe('Design System Integration', () => {
    // Token application, theming
  });

  describe('Accessibility', () => {
    // A11y compliance
  });

  describe('Theme Responsiveness', () => {
    // Light/dark theme behavior
  });
});
```

### 2. Testing Material Components

When testing Angular Material components with Venntier theming:

```typescript
// ✅ Good - Test design system integration
it('should apply Venntier button height (36px)', async () => {
  await render(TestComponent);
  const button = screen.getByRole('button');

  const styles = window.getComputedStyle(button);
  expect(styles.height).toBe('36px');
});

// ✅ Good - Test theme responsiveness
it('should respond to theme changes', async () => {
  const { fixture } = await render(TestComponent);
  const button = screen.getByRole('button');

  await testThemeAwareness(fixture, button, {
    light: () => expect(button).toHaveClass('mat-primary'),
    dark: () => expect(button).toHaveClass('mat-primary'),
  });
});

// ❌ Avoid - Testing Material's internal implementation
it('should have mat-button class', async () => {
  // Don't test Angular Material's internal classes
});
```

### 3. Regression Prevention

**Critical Test Areas**:

1. **Theme Switching** - Ensure no broken styles after theme changes
2. **Token Application** - Verify design tokens are properly applied
3. **Component Variants** - Test all density/color/size variations
4. **Responsive Behavior** - Test across different screen sizes
5. **Accessibility** - Maintain WCAG compliance

**Test Coverage Goals**:

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

### 4. Performance Testing

```typescript
it('should not cause memory leaks', async () => {
  // Test for memory leaks during interactions
  for (let i = 0; i < 100; i++) {
    await user.click(button);
  }
  // Component should remain responsive
});

it('should complete theme switching quickly', async () => {
  const startTime = performance.now();
  await themeUtils.toggleTheme();
  const endTime = performance.now();

  expect(endTime - startTime).toBeLessThan(100);
});
```

## CI/CD Integration

### GitHub Actions Workflow

Our testing pipeline runs on every PR and includes:

1. **Unit Tests** - Jest with coverage reporting
2. **Visual Tests** - Playwright across multiple browsers
3. **Accessibility Tests** - axe-core automated scanning
4. **Performance Tests** - Lighthouse CI and bundle size analysis

### Coverage Requirements

- **Pull Requests**: Must maintain or improve coverage
- **Main Branch**: Minimum 80% coverage required
- **Critical Components**: 90%+ coverage required

### Visual Regression

- **Baseline Images**: Stored in repository
- **Comparison Threshold**: 0.2% pixel difference allowed
- **Update Process**: Use `npm run test:visual:update` to update baselines

## Debugging Tests

### Common Issues

1. **Flaky Visual Tests**

   ```bash
   # Disable animations
   await page.addStyleTag({
     content: '*, *::before, *::after { animation-duration: 0s !important; }'
   });
   ```

2. **Theme Test Failures**

   ```typescript
   // Ensure clean environment
   beforeEach(() => {
     setupTestEnvironment(); // Clears localStorage, resets DOM
   });
   ```

3. **Timing Issues**
   ```typescript
   // Wait for Angular change detection
   await fixture.whenStable();
   await utils.detectChanges();
   ```

### Debug Commands

```bash
# Run specific test file
npm run test -- button.spec.ts

# Run tests in watch mode with coverage
npm run test:watch -- --coverage

# Debug visual tests with UI
npm run test:visual:ui

# Run tests with verbose output
npm run test -- --verbose
```

## Contributing

When adding new components or features:

1. **Write tests first** (TDD approach)
2. **Include all test types** (unit, integration, visual, accessibility)
3. **Use testing utilities** for consistency
4. **Document test patterns** for complex scenarios
5. **Update this guide** when adding new testing patterns

## Resources

- [Angular Testing Library Documentation](https://testing-library.com/docs/angular-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Jest Documentation](https://jestjs.io/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
