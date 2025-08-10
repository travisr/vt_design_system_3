import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
    MatCardModule,
    MatTooltipModule,
    MatButtonToggleModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Icon Buttons"
        description="Icon buttons allow users to take actions and make choices with a single tap."
        [links]="resources"
      >
      </demo-page-header>

      <section class="demo-section">
        <h2>Basic Icon Buttons</h2>
        <p>Standard icon buttons for common actions.</p>
        <div class="demo-example">
          <div class="button-group">
            <button mat-icon-button matTooltip="Add new item" aria-label="Add">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Edit item" aria-label="Edit">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Delete item" aria-label="Delete">
              <mat-icon>delete</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Share item" aria-label="Share">
              <mat-icon>share</mat-icon>
            </button>
            <button mat-icon-button matTooltip="More options" aria-label="More">
              <mat-icon>more_vert</mat-icon>
            </button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Button Variants</h2>
        <p>Different visual styles for icon buttons.</p>
        <div class="demo-example">
          <div class="variant-demo">
            <div class="variant-group">
              <h4>Standard</h4>
              <button mat-icon-button>
                <mat-icon>favorite</mat-icon>
              </button>
            </div>

            <div class="variant-group">
              <h4>Raised</h4>
              <button mat-raised-button class="icon-button-raised">
                <mat-icon>favorite</mat-icon>
              </button>
            </div>

            <div class="variant-group">
              <h4>Stroked</h4>
              <button mat-stroked-button class="icon-button-stroked">
                <mat-icon>favorite</mat-icon>
              </button>
            </div>

            <div class="variant-group">
              <h4>Flat</h4>
              <button mat-flat-button class="icon-button-flat">
                <mat-icon>favorite</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Toggle Icon Buttons</h2>
        <p>Icon buttons that can be toggled between states.</p>
        <div class="demo-example">
          <div class="toggle-demo">
            <div class="toggle-group">
              <h4>Favorite Toggle</h4>
              <button
                mat-icon-button
                [class.active]="favoriteToggled()"
                (click)="toggleFavorite()"
                [attr.aria-label]="favoriteToggled() ? 'Remove from favorites' : 'Add to favorites'"
              >
                <mat-icon>{{ favoriteToggled() ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>
            </div>

            <div class="toggle-group">
              <h4>Bookmark Toggle</h4>
              <button
                mat-icon-button
                [class.active]="bookmarkToggled()"
                (click)="toggleBookmark()"
                [attr.aria-label]="bookmarkToggled() ? 'Remove bookmark' : 'Add bookmark'"
              >
                <mat-icon>{{ bookmarkToggled() ? 'bookmark' : 'bookmark_border' }}</mat-icon>
              </button>
            </div>

            <div class="toggle-group">
              <h4>Star Toggle</h4>
              <button
                mat-icon-button
                [class.active]="starToggled()"
                (click)="toggleStar()"
                [attr.aria-label]="starToggled() ? 'Unstar' : 'Star'"
              >
                <mat-icon>{{ starToggled() ? 'star' : 'star_border' }}</mat-icon>
              </button>
            </div>

            <div class="toggle-group">
              <h4>Visibility Toggle</h4>
              <button
                mat-icon-button
                [class.active]="visibilityToggled()"
                (click)="toggleVisibility()"
                [attr.aria-label]="visibilityToggled() ? 'Hide' : 'Show'"
              >
                <mat-icon>{{ visibilityToggled() ? 'visibility' : 'visibility_off' }}</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Button States</h2>
        <p>Different states of icon buttons including disabled and loading.</p>
        <div class="demo-example">
          <div class="states-demo">
            <div class="state-group">
              <h4>Normal</h4>
              <button mat-icon-button>
                <mat-icon>settings</mat-icon>
              </button>
            </div>

            <div class="state-group">
              <h4>Disabled</h4>
              <button mat-icon-button disabled>
                <mat-icon>settings</mat-icon>
              </button>
            </div>

            <div class="state-group">
              <h4>Loading</h4>
              <button mat-icon-button [disabled]="isLoading()" (click)="startLoading()">
                <mat-icon [class.spinning]="isLoading()">{{
                  isLoading() ? 'hourglass_empty' : 'refresh'
                }}</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Button Colors</h2>
        <p>Icon buttons with different color themes.</p>
        <div class="demo-example">
          <div class="color-demo">
            <div class="color-group">
              <h4>Default</h4>
              <button mat-icon-button>
                <mat-icon>home</mat-icon>
              </button>
            </div>

            <div class="color-group">
              <h4>Primary</h4>
              <button mat-icon-button color="primary">
                <mat-icon>star</mat-icon>
              </button>
            </div>

            <div class="color-group">
              <h4>Accent</h4>
              <button mat-icon-button color="accent">
                <mat-icon>favorite</mat-icon>
              </button>
            </div>

            <div class="color-group">
              <h4>Warn</h4>
              <button mat-icon-button color="warn">
                <mat-icon>warning</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Button Groups</h2>
        <p>Groups of related icon buttons for toolbars and action bars.</p>
        <div class="demo-example">
          <div class="group-demo">
            <div class="button-toolbar">
              <div class="button-section">
                <h4>Text Formatting</h4>
                <div class="button-group">
                  <button mat-icon-button matTooltip="Bold">
                    <mat-icon>format_bold</mat-icon>
                  </button>
                  <button mat-icon-button matTooltip="Italic">
                    <mat-icon>format_italic</mat-icon>
                  </button>
                  <button mat-icon-button matTooltip="Underline">
                    <mat-icon>format_underlined</mat-icon>
                  </button>
                </div>
              </div>

              <div class="button-section">
                <h4>Alignment</h4>
                <div class="button-group">
                  <button mat-icon-button matTooltip="Align left">
                    <mat-icon>format_align_left</mat-icon>
                  </button>
                  <button mat-icon-button matTooltip="Align center">
                    <mat-icon>format_align_center</mat-icon>
                  </button>
                  <button mat-icon-button matTooltip="Align right">
                    <mat-icon>format_align_right</mat-icon>
                  </button>
                </div>
              </div>

              <div class="button-section">
                <h4>Media</h4>
                <div class="button-group">
                  <button mat-icon-button matTooltip="Play">
                    <mat-icon>play_arrow</mat-icon>
                  </button>
                  <button mat-icon-button matTooltip="Pause">
                    <mat-icon>pause</mat-icon>
                  </button>
                  <button mat-icon-button matTooltip="Stop">
                    <mat-icon>stop</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <demo-example-viewer title="Icon Button Implementation" [examples]="iconButtonExamples">
      </demo-example-viewer>
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

  iconButtonExamples = [
    {
      title: 'Basic Icon Buttons',
      language: 'html',
      code: `<!-- Standard icon button -->
<button mat-icon-button aria-label="Add">
  <mat-icon>add</mat-icon>
</button>

<!-- With tooltip -->
<button mat-icon-button matTooltip="Edit item" aria-label="Edit">
  <mat-icon>edit</mat-icon>
</button>

<!-- Colored icon button -->
<button mat-icon-button color="primary">
  <mat-icon>star</mat-icon>
</button>`,
    },
    {
      title: 'Toggle Icon Buttons',
      language: 'html',
      code: `<!-- Toggle favorite -->
<button mat-icon-button 
        [class.active]="isFavorite"
        (click)="toggleFavorite()">
  <mat-icon>{{ isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
</button>

<!-- Toggle visibility -->
<button mat-icon-button (click)="toggleVisibility()">
  <mat-icon>{{ isVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
</button>`,
    },
    {
      title: 'Icon Button Groups',
      language: 'html',
      code: `<div class="button-group">
  <button mat-icon-button>
    <mat-icon>format_bold</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>format_italic</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>format_underlined</mat-icon>
  </button>
</div>`,
    },
    {
      title: 'Component Logic',
      language: 'typescript',
      code: `export class MyComponent {
  private _favoriteToggled = signal(false);
  readonly favoriteToggled = this._favoriteToggled.asReadonly();

  toggleFavorite() {
    this._favoriteToggled.update(value => !value);
  }

  onEdit() {
    console.log('Edit action triggered');
  }
}`,
    },
    {
      title: 'Icon Button Styling',
      language: 'scss',
      code: `.button-group {
  display: flex;
  gap: 4px;
  
  button {
    border-radius: var(--md-sys-shape-corner-small);
  }
}

.active {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}`,
    },
  ];

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
