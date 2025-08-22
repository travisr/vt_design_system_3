import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-colors',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PageHeaderComponent],
  styleUrl: './colors.component.scss',
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Colors & Themes"
        description="A refined monochromatic palette inspired by OpenAI's minimalist design. Our color system emphasizes clarity and focus through subtle gray variations."
        [mdLink]="MD3_DOCS.COLOR"
      >
      </demo-page-header>

      <!-- MD3 Color Tokens -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Material Design 3 Color Tokens</mat-card-title>
          <mat-card-subtitle>
            Design system colors using CSS custom properties. Standard MD3 tokens use
            <code>--mat-sys-*</code> format, while our custom extensions use
            <code>--mat-sys-*</code> format.
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="color-grid">
            <div class="color-group">
              <h4 class="color-group-title">Primary Colors</h4>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="swatch-preview swatch-primary"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Primary</span>
                    <span class="swatch-token">--mat-sys-primary</span>
                    <span class="swatch-usage">Main actions, headers</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-on-primary"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">On Primary</span>
                    <span class="swatch-token">--mat-sys-on-primary</span>
                    <span class="swatch-usage">Text on primary</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-tertiary"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Tertiary (CTA)</span>
                    <span class="swatch-token">--mat-sys-tertiary</span>
                    <span class="swatch-usage">Primary call-to-actions only</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-data-primary"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Data Primary</span>
                    <span class="swatch-token">--mat-sys-data-primary</span>
                    <span class="swatch-usage">Data visualization (custom extension)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Surface & Background Tokens -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Surface & Background Tokens</mat-card-title>
          <mat-card-subtitle
            >MD3 surface hierarchy for consistent layout backgrounds</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <div class="color-grid">
            <div class="color-group">
              <h4 class="color-group-title">Backgrounds</h4>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="swatch-preview swatch-background"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Background</span>
                    <span class="swatch-token">--mat-sys-background</span>
                    <span class="swatch-usage">App/page background</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-surface"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Surface</span>
                    <span class="swatch-token">--mat-sys-surface</span>
                    <span class="swatch-usage">Cards, dialogs</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-surface-variant"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Surface Variant</span>
                    <span class="swatch-token">--mat-sys-surface-variant</span>
                    <span class="swatch-usage">Input backgrounds</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="color-group">
              <h4 class="color-group-title">Surface Containers</h4>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="swatch-preview swatch-surface-container-low"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Container Low</span>
                    <span class="swatch-token">--mat-sys-surface-container-low</span>
                    <span class="swatch-usage">Hover states</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-surface-container"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Container</span>
                    <span class="swatch-token">--mat-sys-surface-container</span>
                    <span class="swatch-usage">Input fields</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-surface-container-high"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Container High</span>
                    <span class="swatch-token">--mat-sys-surface-container-high</span>
                    <span class="swatch-usage">Selected states</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-surface-container-highest"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Container Highest</span>
                    <span class="swatch-token">--mat-sys-surface-container-highest</span>
                    <span class="swatch-usage">Elevated elements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Interactive State Tokens -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Interactive State Tokens</mat-card-title>
          <mat-card-subtitle
            >MD3 interaction states for consistent user experience</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <div class="color-grid">
            <div class="color-group">
              <h4 class="color-group-title">Interaction States</h4>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="swatch-preview swatch-hover"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Hover</span>
                    <span class="swatch-token">--mat-sys-hover</span>
                    <span class="swatch-usage">Element hover backgrounds (custom extension)</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-selected"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Selected</span>
                    <span class="swatch-token">--mat-sys-selected</span>
                    <span class="swatch-usage">Active/selected items (custom extension)</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-focus-ring"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Focus Ring</span>
                    <span class="swatch-token">--mat-sys-focus-ring</span>
                    <span class="swatch-usage">Focus outlines (custom extension)</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-disabled"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Disabled</span>
                    <span class="swatch-token">--mat-sys-disabled</span>
                    <span class="swatch-usage">Disabled text/elements (custom extension)</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="color-group">
              <h4 class="color-group-title">Outline & Border</h4>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="swatch-preview swatch-outline"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Outline</span>
                    <span class="swatch-token">--mat-sys-outline</span>
                    <span class="swatch-usage">Standard borders</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview swatch-outline-variant"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Outline Variant</span>
                    <span class="swatch-token">--mat-sys-outline-variant</span>
                    <span class="swatch-usage">Subtle borders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Usage Examples -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Live Token Examples</mat-card-title>
          <mat-card-subtitle>See MD3 tokens in action</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="usage-examples">
            <div class="usage-section">
              <h4 class="usage-title">Surface Hierarchy</h4>
              <div class="hierarchy-demo">
                <div class="hierarchy-level hierarchy-background">
                  <span class="hierarchy-label">Background (--mat-sys-background)</span>
                  <div class="hierarchy-level hierarchy-surface">
                    <span class="hierarchy-label">Surface (--mat-sys-surface)</span>
                    <div class="hierarchy-level hierarchy-surface-variant">
                      <span class="hierarchy-label"
                        >Surface Variant (--mat-sys-surface-variant)</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="usage-section">
              <h4 class="usage-title">Text on Surfaces</h4>
              <div class="text-examples">
                <p class="text-on-surface-primary">Primary text using --mat-sys-on-surface</p>
                <p class="text-on-surface">Body text using --mat-sys-on-surface</p>
                <p class="text-on-surface-variant">
                  Secondary text using --mat-sys-on-surface-variant
                </p>
                <p class="text-disabled">Disabled text using --mat-sys-disabled</p>
              </div>
            </div>

            <div class="usage-section">
              <h4 class="usage-title">Interactive Examples</h4>
              <div class="interactive-examples">
                <button mat-stroked-button class="demo-btn demo-btn--default">
                  Default Button
                </button>
                <button mat-stroked-button class="demo-btn demo-btn--hover">Hover State</button>
                <button mat-stroked-button class="demo-btn demo-btn--selected">Selected</button>
                <button mat-flat-button color="primary" class="demo-btn">Primary CTA</button>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Implementation Code -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Implementation</mat-card-title>
          <mat-card-subtitle>Using design tokens in your components</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="code-examples">
            <div class="code-block">
              <h4>CSS Variables</h4>
              <pre><code>.my-component &#123;
  background: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  border: 1px solid var(--mat-sys-outline);
&#125;

.my-component:hover &#123;
  background: var(--mat-sys-hover);
&#125;

.primary-button &#123;
  background: var(--mat-sys-tertiary);
  color: var(--mat-sys-on-tertiary);
&#125;</code></pre>
            </div>

            <div class="code-block">
              <h4>SCSS Function</h4>
              <pre><code>&#64;use '&#64;venntier/design-system/styles/tokens/sys-color' as colors;

.my-component &#123;
  background: colors.color('surface');
  color: colors.color('on-surface');
  
  &:hover &#123;
    background: colors.color('hover');
  &#125;
&#125;</code></pre>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ColorsComponent {
  readonly MD3_DOCS = MD3_DOCS;
}
