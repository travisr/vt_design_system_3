# Venntier Design System

Angular Material components with OpenAI-inspired styling using Material Design 3 tokens.

## Installation

```bash
npm install @venntier/design-system
```

## Usage

### 1. Import the theme in your styles.scss:

```scss
@use '@venntier/design-system/styles/venntier-theme' as vt-theme;
```

### 2. Use Angular Material components as normal:

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <button mat-raised-button class="mat-primary">Primary Button</button>
      <button mat-stroked-button>Secondary Button</button>
    </mat-card>
  `
})
```

### 3. Optional: Use the theme service for dark mode:

```typescript
import { VenntierThemeService } from '@venntier/design-system';

export class AppComponent {
  constructor(private theme: VenntierThemeService) {}

  toggleTheme() {
    this.theme.toggleTheme();
  }
}
```

## Features

- **OpenAI-inspired design**: Minimalist, monochromatic interface
- **Material Design 3**: Latest Angular Material with M3 tokens
- **Design tokens**: CSS custom properties for colors, typography, spacing
- **Dark mode**: Built-in dark theme support
- **Typography scale**: Inter font with M3 type scale
- **Utility classes**: Spacing, typography, and shape utilities

## Design Principles

- **Monochromatic interactions**: Gray scale only, no colored states
- **Green CTAs only**: #10a37f for primary actions
- **Flat design**: Borders instead of shadows
- **8px grid**: All spacing in multiples of 8

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private
