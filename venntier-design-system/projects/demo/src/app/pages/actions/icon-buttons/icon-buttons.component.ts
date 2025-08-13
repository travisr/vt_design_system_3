import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-icon-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Icon Buttons"
        description="Icon buttons help people take supplementary actions with a single tap. They're used when a compact button is required, such as in a toolbar or image list."
        [links]="resources"
      >
      </demo-page-header>

      <!-- Icon Button Types -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon Button Types</h2>
        <p class="demo-section-description">
          MD3 provides different icon button types for various use cases and visual hierarchy.
        </p>

        <demo-example-viewer title="Standard Icon Button" [code]="standardCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button aria-label="Add item">
                <mat-icon>add</mat-icon>
              </button>
              <span class="demo-label">Standard</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button matTooltip="Edit item" aria-label="Edit item">
                <mat-icon>edit</mat-icon>
              </button>
              <span class="demo-label">With Tooltip</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button disabled aria-label="Disabled action">
                <mat-icon>delete</mat-icon>
              </button>
              <span class="demo-label">Disabled</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon Button Variants -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon Button Variants</h2>
        <p class="demo-section-description">
          MD3 provides different icon button variants for various visual emphasis levels and use
          cases.
        </p>

        <demo-example-viewer title="MD3 Icon Button Types" [code]="variantsCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button aria-label="Standard icon button">
                <mat-icon>favorite</mat-icon>
              </button>
              <span class="demo-label">Standard</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab class="demo-icon-button-filled" aria-label="Filled icon button">
                <mat-icon>favorite</mat-icon>
              </button>
              <span class="demo-label">Filled</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal icon button">
                <mat-icon>favorite</mat-icon>
              </button>
              <span class="demo-label">Tonal</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                class="demo-icon-button-outlined"
                aria-label="Outlined icon button"
              >
                <mat-icon>favorite</mat-icon>
              </button>
              <span class="demo-label">Outlined</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon Button Densities -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon Button Densities</h2>
        <p class="demo-section-description">
          Icon buttons support different density levels for various UI contexts, from spacious
          layouts to compact property panels.
        </p>

        <demo-example-viewer title="Density Variations" [code]="densitiesCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button aria-label="Standard density">
                <mat-icon>settings</mat-icon>
              </button>
              <span class="demo-label">Standard (48px)</span>
            </div>

            <div
              class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center compact"
            >
              <button mat-icon-button aria-label="Compact density">
                <mat-icon>settings</mat-icon>
              </button>
              <span class="demo-label">Compact (40px)</span>
            </div>

            <div
              class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center dense"
            >
              <button mat-icon-button aria-label="Dense density">
                <mat-icon>settings</mat-icon>
              </button>
              <span class="demo-label">Dense (32px)</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon Button Colors -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon Button Colors</h2>
        <p class="demo-section-description">
          Icon buttons can use different color variants to indicate different action types and
          importance levels.
        </p>

        <demo-example-viewer title="Color Variants" [code]="colorsCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button aria-label="Default action">
                <mat-icon>home</mat-icon>
              </button>
              <span class="demo-label">Default</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button color="primary" aria-label="Primary action">
                <mat-icon>star</mat-icon>
              </button>
              <span class="demo-label">Primary</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button color="accent" aria-label="Secondary action">
                <mat-icon>favorite</mat-icon>
              </button>
              <span class="demo-label">Accent</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button color="warn" aria-label="Warning action">
                <mat-icon>warning</mat-icon>
              </button>
              <span class="demo-label">Warn</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Toggle Icon Buttons -->
      <section class="demo-section">
        <h2 class="demo-section-title">Toggle Icon Buttons</h2>
        <p class="demo-section-description">
          Toggle icon buttons allow users to switch between two states, such as favorite/unfavorite
          or show/hide.
        </p>

        <demo-example-viewer title="Interactive Toggle Buttons" [code]="toggleCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                [class.active]="favoriteToggled()"
                (click)="toggleFavorite()"
                [attr.aria-label]="favoriteToggled() ? 'Remove from favorites' : 'Add to favorites'"
              >
                <mat-icon>{{ favoriteToggled() ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>
              <span class="demo-label">Favorite</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                [class.active]="bookmarkToggled()"
                (click)="toggleBookmark()"
                [attr.aria-label]="bookmarkToggled() ? 'Remove bookmark' : 'Add bookmark'"
              >
                <mat-icon>{{ bookmarkToggled() ? 'bookmark' : 'bookmark_border' }}</mat-icon>
              </button>
              <span class="demo-label">Bookmark</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                [class.active]="starToggled()"
                (click)="toggleStar()"
                [attr.aria-label]="starToggled() ? 'Unstar' : 'Star'"
              >
                <mat-icon>{{ starToggled() ? 'star' : 'star_border' }}</mat-icon>
              </button>
              <span class="demo-label">Star</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                [class.active]="visibilityToggled()"
                (click)="toggleVisibility()"
                [attr.aria-label]="visibilityToggled() ? 'Hide' : 'Show'"
              >
                <mat-icon>{{ visibilityToggled() ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
              <span class="demo-label">Visibility</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon Button Variants with Densities -->
      <section class="demo-section">
        <h2 class="demo-section-title">Variants with Density Support</h2>
        <p class="demo-section-description">
          All icon button variants support density variations for different UI contexts.
        </p>

        <demo-example-viewer title="Tonal Icon Button Densities" [code]="tonalDensitiesCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal standard">
                <mat-icon>palette</mat-icon>
              </button>
              <span class="demo-label">Standard (48px)</span>
            </div>

            <div
              class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center compact"
            >
              <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal compact">
                <mat-icon>palette</mat-icon>
              </button>
              <span class="demo-label">Compact (40px)</span>
            </div>

            <div
              class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center dense"
            >
              <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal dense">
                <mat-icon>palette</mat-icon>
              </button>
              <span class="demo-label">Dense (32px)</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon Button States -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon Button States</h2>
        <p class="demo-section-description">
          Icon buttons support various interactive states including normal, disabled, and loading
          states.
        </p>

        <demo-example-viewer title="Interactive States" [code]="statesCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button aria-label="Normal state">
                <mat-icon>settings</mat-icon>
              </button>
              <span class="demo-label">Normal</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button disabled aria-label="Disabled state">
                <mat-icon>settings</mat-icon>
              </button>
              <span class="demo-label">Disabled</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                [disabled]="isLoading()"
                (click)="startLoading()"
                aria-label="Loading state"
              >
                <mat-icon [class.spinning]="isLoading()">{{
                  isLoading() ? 'hourglass_empty' : 'refresh'
                }}</mat-icon>
              </button>
              <span class="demo-label">{{ isLoading() ? 'Loading...' : 'Click to Load' }}</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Tonal Icon Button States -->
      <section class="demo-section">
        <h2 class="demo-section-title">Tonal Icon Button States</h2>
        <p class="demo-section-description">
          Tonal icon buttons provide a middle ground between standard and filled variants with
          subtle background.
        </p>

        <demo-example-viewer title="Tonal States" [code]="tonalStatesCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal normal">
                <mat-icon>palette</mat-icon>
              </button>
              <span class="demo-label">Normal</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                class="demo-icon-button-tonal"
                disabled
                aria-label="Tonal disabled"
              >
                <mat-icon>palette</mat-icon>
              </button>
              <span class="demo-label">Disabled</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-icon-button
                class="demo-icon-button-tonal"
                [disabled]="isLoading()"
                (click)="startLoading()"
                aria-label="Tonal loading"
              >
                <mat-icon [class.spinning]="isLoading()">{{
                  isLoading() ? 'hourglass_empty' : 'color_lens'
                }}</mat-icon>
              </button>
              <span class="demo-label">{{ isLoading() ? 'Loading...' : 'Click to Load' }}</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon Button Groups -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon Button Groups</h2>
        <p class="demo-section-description">
          Icon buttons are commonly grouped together in toolbars and action bars for related
          functionality.
        </p>

        <demo-example-viewer title="Toolbar Groups" [code]="groupsCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-lg">
            <div class="demo-toolbar-group">
              <h4 class="demo-group-title">Text Formatting</h4>
              <div class="demo-flex demo-flex--gap-sm">
                <button mat-icon-button matTooltip="Bold" aria-label="Bold">
                  <mat-icon>format_bold</mat-icon>
                </button>
                <button mat-icon-button matTooltip="Italic" aria-label="Italic">
                  <mat-icon>format_italic</mat-icon>
                </button>
                <button mat-icon-button matTooltip="Underline" aria-label="Underline">
                  <mat-icon>format_underlined</mat-icon>
                </button>
              </div>
            </div>

            <div class="demo-toolbar-group">
              <h4 class="demo-group-title">Alignment</h4>
              <div class="demo-flex demo-flex--gap-sm">
                <button mat-icon-button matTooltip="Align left" aria-label="Align left">
                  <mat-icon>format_align_left</mat-icon>
                </button>
                <button mat-icon-button matTooltip="Align center" aria-label="Align center">
                  <mat-icon>format_align_center</mat-icon>
                </button>
                <button mat-icon-button matTooltip="Align right" aria-label="Align right">
                  <mat-icon>format_align_right</mat-icon>
                </button>
              </div>
            </div>

            <div class="demo-toolbar-group">
              <h4 class="demo-group-title">Media Controls</h4>
              <div class="demo-flex demo-flex--gap-sm">
                <button mat-icon-button matTooltip="Play" aria-label="Play">
                  <mat-icon>play_arrow</mat-icon>
                </button>
                <button mat-icon-button matTooltip="Pause" aria-label="Pause">
                  <mat-icon>pause</mat-icon>
                </button>
                <button mat-icon-button matTooltip="Stop" aria-label="Stop">
                  <mat-icon>stop</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Usage Guidelines -->
      <section class="demo-section">
        <h2 class="demo-section-title">Usage Guidelines</h2>
        <div class="demo-guidelines">
          <div class="demo-do-dont">
            <div class="demo-do">
              <h3>✅ Do</h3>
              <ul>
                <li>Use clear, recognizable icons</li>
                <li>Provide tooltips for icon buttons</li>
                <li>Include proper ARIA labels</li>
                <li>Group related icon buttons together</li>
                <li>Use consistent sizing within groups</li>
              </ul>
            </div>
            <div class="demo-dont">
              <h3>❌ Don't</h3>
              <ul>
                <li>Use obscure or ambiguous icons</li>
                <li>Overcrowd toolbars with too many buttons</li>
                <li>Mix different icon button sizes randomly</li>
                <li>Forget accessibility attributes</li>
                <li>Use icon buttons for primary actions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './icon-buttons.component.scss',
})
export class IconButtonsComponent {
  readonly resources = [{ label: 'M3 Icon Button Guidelines', url: MD3_DOCS.ICON_BUTTONS }];

  private _favoriteToggled = signal(false);
  private _bookmarkToggled = signal(false);
  private _starToggled = signal(false);
  private _visibilityToggled = signal(true);
  private _isLoading = signal(false);

  readonly favoriteToggled = this._favoriteToggled.asReadonly();
  readonly bookmarkToggled = this._bookmarkToggled.asReadonly();
  readonly starToggled = this._starToggled.asReadonly();
  readonly visibilityToggled = this._visibilityToggled.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  // Code examples for demo-example-viewer components
  readonly variantsCode = {
    html: `<!-- Standard icon button -->
<button mat-icon-button aria-label="Standard icon button">
  <mat-icon>favorite</mat-icon>
</button>

<!-- Filled icon button (using mat-fab with custom styling) -->
<button mat-fab class="demo-icon-button-filled" aria-label="Filled icon button">
  <mat-icon>favorite</mat-icon>
</button>

<!-- Tonal icon button (using mat-icon-button with custom styling) -->
<button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal icon button">
  <mat-icon>favorite</mat-icon>
</button>

<!-- Outlined icon button (using mat-icon-button with custom styling) -->
<button mat-icon-button class="demo-icon-button-outlined" aria-label="Outlined icon button">
  <mat-icon>favorite</mat-icon>
</button>`,
    scss: `.demo-icon-button-filled {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
}

.demo-icon-button-tonal {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  padding: 0;
  background-color: var(--mat-sys-color-secondary-container);
  color: var(--mat-sys-color-on-secondary-container);
}

.demo-icon-button-outlined {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  padding: 0;
}`,
  };

  readonly densitiesCode = {
    html: `<!-- Standard density (48px) -->
<button mat-icon-button aria-label="Standard density">
  <mat-icon>settings</mat-icon>
</button>

<!-- Compact density (40px) - using global density class -->
<div class="compact">
  <button mat-icon-button aria-label="Compact density">
    <mat-icon>settings</mat-icon>
  </button>
</div>

<!-- Dense density (32px) - using global density class -->
<div class="dense">
  <button mat-icon-button aria-label="Dense density">
    <mat-icon>settings</mat-icon>
  </button>
</div>`,
    scss: `// Density is handled globally by Angular Material density mixins
// in the design system theme (_core-refined.scss):
//
// .compact {
//   @include mat.all-component-densities(-2);
// }
//
// .dense {
//   @include mat.all-component-densities(-3);
// }
//
// No component-specific CSS needed - the global system handles all components`,
  };

  readonly tonalDensitiesCode = {
    html: `<!-- Tonal standard density (48px) -->
<button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal standard">
  <mat-icon>palette</mat-icon>
</button>

<!-- Tonal compact density (40px) - using global density class -->
<div class="compact">
  <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal compact">
    <mat-icon>palette</mat-icon>
  </button>
</div>

<!-- Tonal dense density (32px) - using global density class -->
<div class="dense">
  <button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal dense">
    <mat-icon>palette</mat-icon>
  </button>
</div>`,
    scss: `.demo-icon-button-tonal {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  padding: 0;

  // MD3 Tonal Icon Button colors
  --mdc-filled-button-container-color: var(--mat-sys-color-secondary-container);
  --mdc-filled-button-label-text-color: var(--mat-sys-color-on-secondary-container);
  --mdc-filled-button-state-layer-color: var(--mat-sys-color-on-secondary-container);

  mat-icon {
    color: var(--mat-sys-color-on-secondary-container);
  }
}

// Density variations are handled globally by Angular Material density mixins
// in the design system theme (_core-refined.scss):
// .compact { @include mat.all-component-densities(-2); }
// .dense { @include mat.all-component-densities(-3); }
// No component-specific CSS needed - the global system handles all components`,
  };

  readonly tonalStatesCode = {
    html: `<!-- Tonal normal state -->
<button mat-icon-button class="demo-icon-button-tonal" aria-label="Tonal normal">
  <mat-icon>palette</mat-icon>
</button>

<!-- Tonal disabled state -->
<button mat-icon-button class="demo-icon-button-tonal" disabled aria-label="Tonal disabled">
  <mat-icon>palette</mat-icon>
</button>

<!-- Tonal loading state -->
<button mat-icon-button class="demo-icon-button-tonal" [disabled]="isLoading()" (click)="startLoading()" aria-label="Tonal loading">
  <mat-icon [class.spinning]="isLoading()">{{ isLoading() ? 'hourglass_empty' : 'color_lens' }}</mat-icon>
</button>`,
    scss: `.demo-icon-button-tonal {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  padding: 0;

  // MD3 Tonal Icon Button colors
  --mdc-filled-button-container-color: var(--mat-sys-color-secondary-container);
  --mdc-filled-button-label-text-color: var(--mat-sys-color-on-secondary-container);
  --mdc-filled-button-state-layer-color: var(--mat-sys-color-on-secondary-container);
  --mdc-filled-button-hover-state-layer-opacity: 0.08;
  --mdc-filled-button-pressed-state-layer-opacity: 0.12;

  mat-icon {
    color: var(--mat-sys-color-on-secondary-container);
  }
}`,
  };

  readonly standardCode = {
    html: `<!-- Standard icon button -->
<button mat-icon-button aria-label="Add item">
  <mat-icon>add</mat-icon>
</button>

<!-- With tooltip -->
<button mat-icon-button matTooltip="Edit item" aria-label="Edit item">
  <mat-icon>edit</mat-icon>
</button>

<!-- Disabled state -->
<button mat-icon-button disabled aria-label="Disabled action">
  <mat-icon>delete</mat-icon>
</button>`,
    ts: `import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';`,
  };

  readonly colorsCode = {
    html: `<!-- Default color -->
<button mat-icon-button aria-label="Default action">
  <mat-icon>home</mat-icon>
</button>

<!-- Primary color -->
<button mat-icon-button color="primary" aria-label="Primary action">
  <mat-icon>star</mat-icon>
</button>

<!-- Accent color -->
<button mat-icon-button color="accent" aria-label="Secondary action">
  <mat-icon>favorite</mat-icon>
</button>

<!-- Warning color -->
<button mat-icon-button color="warn" aria-label="Warning action">
  <mat-icon>warning</mat-icon>
</button>`,
  };

  readonly toggleCode = {
    html: `<!-- Toggle favorite -->
<button mat-icon-button
        [class.active]="favoriteToggled()"
        (click)="toggleFavorite()"
        [attr.aria-label]="favoriteToggled() ? 'Remove from favorites' : 'Add to favorites'">
  <mat-icon>{{ favoriteToggled() ? 'favorite' : 'favorite_border' }}</mat-icon>
</button>

<!-- Toggle bookmark -->
<button mat-icon-button
        [class.active]="bookmarkToggled()"
        (click)="toggleBookmark()"
        [attr.aria-label]="bookmarkToggled() ? 'Remove bookmark' : 'Add bookmark'">
  <mat-icon>{{ bookmarkToggled() ? 'bookmark' : 'bookmark_border' }}</mat-icon>
</button>`,
    ts: `// Toggle state management with signals
private _favoriteToggled = signal(false);
readonly favoriteToggled = this._favoriteToggled.asReadonly();

toggleFavorite() {
  this._favoriteToggled.update(value => !value);
}`,
  };

  readonly statesCode = {
    html: `<!-- Normal state -->
<button mat-icon-button aria-label="Normal state">
  <mat-icon>settings</mat-icon>
</button>

<!-- Disabled state -->
<button mat-icon-button disabled aria-label="Disabled state">
  <mat-icon>settings</mat-icon>
</button>

<!-- Loading state -->
<button mat-icon-button [disabled]="isLoading()" (click)="startLoading()" aria-label="Loading state">
  <mat-icon [class.spinning]="isLoading()">{{ isLoading() ? 'hourglass_empty' : 'refresh' }}</mat-icon>
</button>`,
    scss: `.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
  };

  readonly groupsCode = {
    html: `<!-- Text formatting group -->
<div class="demo-flex demo-flex--gap-sm">
  <button mat-icon-button matTooltip="Bold" aria-label="Bold">
    <mat-icon>format_bold</mat-icon>
  </button>
  <button mat-icon-button matTooltip="Italic" aria-label="Italic">
    <mat-icon>format_italic</mat-icon>
  </button>
  <button mat-icon-button matTooltip="Underline" aria-label="Underline">
    <mat-icon>format_underlined</mat-icon>
  </button>
</div>

<!-- Media controls group -->
<div class="demo-flex demo-flex--gap-sm">
  <button mat-icon-button matTooltip="Play" aria-label="Play">
    <mat-icon>play_arrow</mat-icon>
  </button>
  <button mat-icon-button matTooltip="Pause" aria-label="Pause">
    <mat-icon>pause</mat-icon>
  </button>
  <button mat-icon-button matTooltip="Stop" aria-label="Stop">
    <mat-icon>stop</mat-icon>
  </button>
</div>`,
    scss: `.demo-toolbar-group {
  display: flex;
  flex-direction: column;
  gap: var(--mat-sys-spacing-8);
}`,
  };

  toggleFavorite() {
    this._favoriteToggled.update((value) => !value);
  }

  toggleBookmark() {
    this._bookmarkToggled.update((value) => !value);
  }

  toggleStar() {
    this._starToggled.update((value) => !value);
  }

  toggleVisibility() {
    this._visibilityToggled.update((value) => !value);
  }

  startLoading() {
    this._isLoading.set(true);
    setTimeout(() => {
      this._isLoading.set(false);
    }, 2000);
  }
}
