import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'demo-colors',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <section>
      <h2 class="section-title">Color System</h2>
      <p class="section-description">
        A refined monochromatic palette inspired by OpenAI's minimalist design. Our color system emphasizes clarity and focus through subtle gray variations.
      </p>

      <!-- Primary Palette -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Core Palette</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="color-grid">
            <div class="color-group">
              <h4 class="color-group-title">Primary Colors</h4>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="swatch-preview" style="background: #000000;"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Black</span>
                    <span class="swatch-value">#000000</span>
                    <span class="swatch-token">--md-sys-color-primary</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview" style="background: #ffffff; border: 1px solid #e5e5e5;"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">White</span>
                    <span class="swatch-value">#ffffff</span>
                    <span class="swatch-token">--md-sys-color-on-primary</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview" style="background: #10a37f;"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Green (CTA)</span>
                    <span class="swatch-value">#10a37f</span>
                    <span class="swatch-token">--md-sys-color-tertiary</span>
                  </div>
                </div>
                <div class="color-swatch">
                  <div class="swatch-preview" style="background: #8b5cf6;"></div>
                  <div class="swatch-info">
                    <span class="swatch-name">Purple (Data)</span>
                    <span class="swatch-value">#8b5cf6</span>
                    <span class="swatch-token">--md-sys-color-data-primary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Gray Scale -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gray Scale</mat-card-title>
          <mat-card-subtitle>OpenAI-inspired refined grays for UI hierarchy</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="gray-scale-grid">
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #0a0a0a;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 950</span>
                <span class="gray-value">#0a0a0a</span>
                <span class="gray-usage">Dark theme background</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #202123;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 900</span>
                <span class="gray-value">#202123</span>
                <span class="gray-usage">Text primary</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #353740;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 800</span>
                <span class="gray-value">#353740</span>
                <span class="gray-usage">Dark sidebar</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #40414f;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 700</span>
                <span class="gray-value">#40414f</span>
                <span class="gray-usage">Dark borders</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #565869;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 600</span>
                <span class="gray-value">#565869</span>
                <span class="gray-usage">Secondary text</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #6e6e80;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 500</span>
                <span class="gray-value">#6e6e80</span>
                <span class="gray-usage">Focus borders</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #9ca3af;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 400</span>
                <span class="gray-value">#9ca3af</span>
                <span class="gray-usage">Disabled text</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #d1d5db;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 300</span>
                <span class="gray-value">#d1d5db</span>
                <span class="gray-usage">Standard borders</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #e5e5e5;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 200</span>
                <span class="gray-value">#e5e5e5</span>
                <span class="gray-usage">Active state</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #ececf1;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 175</span>
                <span class="gray-value">#ececf1</span>
                <span class="gray-usage">Hover state</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #f7f7f8; border: 1px solid #e5e5e5;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 150</span>
                <span class="gray-value">#f7f7f8</span>
                <span class="gray-usage">Sidenav background</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #f9f9f9; border: 1px solid #e5e5e5;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 100</span>
                <span class="gray-value">#f9f9f9</span>
                <span class="gray-usage">Subtle backgrounds</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #fafafa; border: 1px solid #e5e5e5;"></div>
              <div class="gray-info">
                <span class="gray-name">Gray 50</span>
                <span class="gray-value">#fafafa</span>
                <span class="gray-usage">Alt sections</span>
              </div>
            </div>
            <div class="gray-swatch">
              <div class="gray-preview" style="background: #ffffff; border: 1px solid #e5e5e5;"></div>
              <div class="gray-info">
                <span class="gray-name">White</span>
                <span class="gray-value">#ffffff</span>
                <span class="gray-usage">Primary background</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Interactive States -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Interactive States</mat-card-title>
          <mat-card-subtitle>Monochromatic state colors for consistent interactions</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="states-demo">
            <div class="state-row">
              <div class="state-example">
                <button mat-stroked-button class="state-default">Default State</button>
                <span class="state-label">Default · #ffffff</span>
              </div>
              <div class="state-example">
                <button mat-stroked-button class="state-hover">Hover State</button>
                <span class="state-label">Hover · #ececf1</span>
              </div>
              <div class="state-example">
                <button mat-stroked-button class="state-selected">Selected State</button>
                <span class="state-label">Selected · #e5e5e5</span>
              </div>
              <div class="state-example">
                <button mat-stroked-button class="state-focus">Focus State</button>
                <span class="state-label">Focus · #6e6e80 border</span>
              </div>
              <div class="state-example">
                <button mat-stroked-button disabled>Disabled State</button>
                <span class="state-label">Disabled · #9ca3af</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Usage Examples -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Color Usage Guidelines</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="usage-examples">
            <div class="usage-section">
              <h4 class="usage-title">Background Hierarchy</h4>
              <div class="hierarchy-demo">
                <div class="hierarchy-level" style="background: #ffffff; padding: 24px; border: 1px solid #ececf1; border-radius: 6px;">
                  <span class="hierarchy-label">Body Background · #ffffff</span>
                  <div class="hierarchy-level" style="background: #ffffff; padding: 24px; margin-top: 16px; border: 1px solid #ececf1; border-radius: 6px;">
                    <span class="hierarchy-label">Card Surface · #ffffff</span>
                    <div class="hierarchy-level" style="background: #ffffff; padding: 16px; margin-top: 16px; border: 1px solid #ececf1; border-radius: 6px;">
                      <span class="hierarchy-label">Input Background · #ffffff</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="usage-section">
              <h4 class="usage-title">Text Hierarchy</h4>
              <div class="text-examples">
                <p style="color: #202123; font-weight: 600;">Primary Text · #202123 · Weight 600</p>
                <p style="color: #202123; font-weight: 400;">Body Text · #202123 · Weight 400</p>
                <p style="color: #565869; font-weight: 400;">Secondary Text · #565869 · Weight 400</p>
                <p style="color: #9ca3af; font-weight: 400;">Disabled Text · #9ca3af · Weight 400</p>
              </div>
            </div>

            <div class="usage-section">
              <h4 class="usage-title">Border Usage</h4>
              <div class="border-examples">
                <div class="border-example" style="border: 1px solid #d1d5db; padding: 16px;">
                  Standard Border · #d1d5db
                </div>
                <div class="border-example" style="border: 1px solid #e5e5e5; padding: 16px; margin-top: 8px;">
                  Subtle Border · #e5e5e5
                </div>
                <div class="border-example" style="border: 2px solid #6e6e80; padding: 16px; margin-top: 8px;">
                  Focus Border · #6e6e80
                </div>
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
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline);
&#125;

.my-component:hover &#123;
  background: var(--md-sys-color-hover);
&#125;

.primary-button &#123;
  background: var(--md-sys-color-tertiary);
  color: var(--md-sys-color-on-tertiary);
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
    </section>
  `
})
export class ColorsComponent {
}