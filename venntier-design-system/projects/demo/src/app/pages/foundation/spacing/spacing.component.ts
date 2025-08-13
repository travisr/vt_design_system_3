import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-spacing',
  standalone: true,
  imports: [CommonModule, MatCardModule, PageHeaderComponent],
  styleUrl: './spacing.component.scss',
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Spacing & Layout"
        description="Consistent spacing system based on 8px grid for predictable layouts and visual rhythm."
        [mdLink]="docLinks.LAYOUT"
      >
      </demo-page-header>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Spacing Scale</mat-card-title>
          <mat-card-subtitle>8px base unit with systematic progression</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="spacing-examples">
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 4px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">4px</span>
                <span class="spacing-token">--mat-sys-spacing-4</span>
                <span class="spacing-usage">Micro spacing, icon padding</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 8px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">8px</span>
                <span class="spacing-token">--mat-sys-spacing-8</span>
                <span class="spacing-usage">Base unit, tight spacing</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 12px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">12px</span>
                <span class="spacing-token">--mat-sys-spacing-12</span>
                <span class="spacing-usage">Small elements</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 16px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">16px</span>
                <span class="spacing-token">--mat-sys-spacing-16</span>
                <span class="spacing-usage">Component padding</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 24px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">24px</span>
                <span class="spacing-token">--mat-sys-spacing-24</span>
                <span class="spacing-usage">Card padding, section gaps</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 32px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">32px</span>
                <span class="spacing-token">--mat-sys-spacing-32</span>
                <span class="spacing-usage">Large sections</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 48px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">48px</span>
                <span class="spacing-token">--mat-sys-spacing-48</span>
                <span class="spacing-usage">Page margins</span>
              </div>
            </div>
            <div class="spacing-item">
              <div
                class="spacing-visual"
                style="width: 64px; background: var(--mat-sys-color-tertiary); color: var(--mat-sys-color-on-tertiary);"
              ></div>
              <div class="spacing-info">
                <span class="spacing-name">64px</span>
                <span class="spacing-token">--mat-sys-spacing-64</span>
                <span class="spacing-usage">Major sections</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Layout Examples</mat-card-title>
          <mat-card-subtitle>Practical spacing applications</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="layout-examples">
            <div
              class="layout-demo"
              style="padding: 24px; border: 1px solid var(--mat-sys-color-outline-variant); border-radius: 8px; background: var(--mat-sys-color-surface-container-low); color: var(--mat-sys-color-on-surface);"
            >
              <h4 style="margin: 0 0 16px 0; color: var(--mat-sys-color-on-surface);">
                Card Example (24px padding)
              </h4>
              <div
                style="padding: 16px; border: 1px solid var(--mat-sys-color-outline-variant); border-radius: 4px; background: var(--mat-sys-color-surface-container); color: var(--mat-sys-color-on-surface);"
              >
                <p style="margin: 0 0 8px 0; color: var(--mat-sys-color-on-surface);">
                  Content with 16px padding
                </p>
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                  <button
                    style="padding: 8px 16px; border: 1px solid var(--mat-sys-color-outline); border-radius: 4px; background: var(--mat-sys-color-surface-container-high); color: var(--mat-sys-color-on-surface); cursor: pointer;"
                  >
                    8px vertical
                  </button>
                  <button
                    style="padding: 8px 16px; border: 1px solid var(--mat-sys-color-outline); border-radius: 4px; background: var(--mat-sys-color-surface-container-high); color: var(--mat-sys-color-on-surface); cursor: pointer;"
                  >
                    16px horizontal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Grid System</mat-card-title>
          <mat-card-subtitle>Responsive layout foundation</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="grid-demo">
            <div
              style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; margin-bottom: 24px;"
            >
              @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; track i) {
                <div
                  style="background: var(--mat-sys-color-surface-container-high); padding: 8px; text-align: center; font-size: 12px; border-radius: 4px; color: var(--mat-sys-color-on-surface);"
                >
                  {{ i }}
                </div>
              }
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
              <div
                style="background: var(--mat-sys-color-surface-container-low); color: var(--mat-sys-color-on-surface); padding: 24px; border: 1px solid var(--mat-sys-color-outline-variant); border-radius: 8px;"
              >
                <h4 style="margin: 0 0 8px 0; color: var(--mat-sys-color-on-surface);">
                  1/3 Column
                </h4>
                <p
                  style="margin: 0; color: var(--mat-sys-color-on-surface-variant); font-size: 14px;"
                >
                  24px gaps between columns
                </p>
              </div>
              <div
                style="background: var(--mat-sys-color-surface-container-low); color: var(--mat-sys-color-on-surface); padding: 24px; border: 1px solid var(--mat-sys-color-outline-variant); border-radius: 8px;"
              >
                <h4 style="margin: 0 0 8px 0; color: var(--mat-sys-color-on-surface);">
                  1/3 Column
                </h4>
                <p
                  style="margin: 0; color: var(--mat-sys-color-on-surface-variant); font-size: 14px;"
                >
                  24px gaps between columns
                </p>
              </div>
              <div
                style="background: var(--mat-sys-color-surface-container-low); color: var(--mat-sys-color-on-surface); padding: 24px; border: 1px solid var(--mat-sys-color-outline-variant); border-radius: 8px;"
              >
                <h4 style="margin: 0 0 8px 0; color: var(--mat-sys-color-on-surface);">
                  1/3 Column
                </h4>
                <p
                  style="margin: 0; color: var(--mat-sys-color-on-surface-variant); font-size: 14px;"
                >
                  24px gaps between columns
                </p>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Implementation</mat-card-title>
          <mat-card-subtitle>Using spacing tokens in your components</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="code-examples">
            <div class="code-block">
              <h4>CSS Variables</h4>
              <pre><code>.card &#123;
  padding: var(--mat-sys-spacing-24);
  margin-bottom: var(--mat-sys-spacing-32);
&#125;

.button &#123;
  padding: var(--mat-sys-spacing-8) var(--mat-sys-spacing-16);
  margin-right: var(--mat-sys-spacing-8);
&#125;

.section &#123;
  margin-bottom: var(--mat-sys-spacing-48);
&#125;</code></pre>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class SpacingComponent {
  readonly docLinks = MD3_DOCS;
}
