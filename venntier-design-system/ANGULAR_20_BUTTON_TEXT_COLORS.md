# Angular 20 Button Text Color Best Practices

## The Problem: Black Text on Black Backgrounds

When you see black text on black backgrounds in Angular Material buttons, it's typically caused by:

1. **Token Mismatch**: Using background tokens without their paired text tokens
2. **CSS Conflicts**: Custom CSS overriding Angular Material's token system
3. **Incorrect Token Usage**: Using `--md-*` tokens instead of `--mat-*` tokens

## Angular 20 Solution: Proper Token Pairs

### ✅ CORRECT: Always Use Paired Tokens

```scss
// Primary button (filled)
--mat-sys-primary          // Background color
--mat-sys-on-primary       // Text color (guaranteed contrast)

// Surface elements
--mat-sys-surface          // Background color
--mat-sys-on-surface       // Text color (guaranteed contrast)

// Container elements
--mat-sys-primary-container     // Background color
--mat-sys-on-primary-container  // Text color (guaranteed contrast)
```

### ❌ WRONG: Using Mismatched Tokens

```scss
// This causes black text on black backgrounds!
background: var(--mat-sys-primary);
color: var(--mat-sys-primary); // WRONG! Should be --mat-sys-on-primary
```

## Angular 20 Button Implementation

### 1. Use `mat.button-overrides()` Mixin

```scss
@use '@angular/material' as mat;

@include mat.button-overrides(
  (
    // ✅ FILLED BUTTONS: Use proper token pairs
    filled-container-color: var(--mat-sys-primary),
    filled-label-text-color: var(--mat-sys-on-primary),
    // ✅ OUTLINED BUTTONS: Use proper token pairs
    outlined-outline-color: var(--mat-sys-outline),
    outlined-label-text-color: var(--mat-sys-on-surface),
    // ✅ TEXT BUTTONS: Use proper token pairs
    text-label-text-color: var(--mat-sys-on-surface)
  )
);
```

### 2. Tonal Buttons (mat-flat-button without color)

```scss
// ✅ CORRECT: Use secondary-container tokens for tonal buttons
.mat-mdc-button.mat-mdc-unelevated-button.mat-unthemed {
  --mat-button-filled-container-color: var(--mat-sys-secondary-container);
  --mat-button-filled-label-text-color: var(--mat-sys-on-secondary-container);
}
```

### 3. Custom Color Buttons

```scss
// ✅ CORRECT: Custom tertiary button with proper contrast
.mat-mdc-button.mat-tertiary {
  --mat-button-filled-container-color: var(--mat-sys-tertiary);
  --mat-button-filled-label-text-color: var(--mat-sys-on-tertiary);
}
```

## HTML Usage Examples

### ✅ CORRECT: Proper Button Usage

```html
<!-- Primary CTA button -->
<button mat-flat-button color="primary">Save Changes</button>

<!-- Tonal button (uses secondary-container tokens) -->
<button mat-flat-button>Cancel</button>

<!-- Outlined button -->
<button mat-stroked-button>Learn More</button>

<!-- Text button -->
<button mat-button>Skip</button>
```

## Token Reference for Angular 20

### Core Color Tokens

```scss
// Background → Text pairs (ALWAYS use together)
--mat-sys-primary → --mat-sys-on-primary
--mat-sys-secondary → --mat-sys-on-secondary
--mat-sys-tertiary → --mat-sys-on-tertiary
--mat-sys-surface → --mat-sys-on-surface
--mat-sys-error → --mat-sys-on-error

// Container → Text pairs (ALWAYS use together)
--mat-sys-primary-container → --mat-sys-on-primary-container
--mat-sys-secondary-container → --mat-sys-on-secondary-container
--mat-sys-tertiary-container → --mat-sys-on-tertiary-container
--mat-sys-error-container → --mat-sys-on-error-container
```

## Debugging Text Color Issues

### 1. Check Token Pairing

```scss
// ❌ BAD: Mismatched tokens
background: var(--mat-sys-primary);
color: var(--mat-sys-surface); // WRONG!

// ✅ GOOD: Proper token pairing
background: var(--mat-sys-primary);
color: var(--mat-sys-on-primary); // CORRECT!
```

### 2. Verify CSS Specificity

```scss
// ✅ Use specific selectors to override Angular Material defaults
.mat-mdc-button.mat-mdc-unelevated-button.mat-tertiary {
  --mat-button-filled-label-text-color: var(--mat-sys-on-tertiary);
}
```

### 3. Check for CSS Conflicts

```scss
// ❌ Avoid global overrides that break token system
* {
  color: black !important;
} // This breaks everything!

// ✅ Use component-specific overrides instead
.my-component .mat-mdc-button {
  --mat-button-filled-label-text-color: var(--mat-sys-on-primary);
}
```

## Key Takeaways

1. **Always use paired tokens**: `--mat-sys-*` and `--mat-sys-on-*`
2. **Use Angular 20 conventions**: `--mat-*` not `--md-*`
3. **Leverage `mat.button-overrides()`**: Official Angular Material API
4. **Avoid `!important`**: Use proper CSS specificity instead
5. **Test in both light and dark modes**: Ensure contrast works in all themes
