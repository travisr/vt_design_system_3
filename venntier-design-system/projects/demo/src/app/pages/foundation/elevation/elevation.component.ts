import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-elevation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    PageHeaderComponent,
  ],
  styleUrl: './elevation.component.scss',
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Elevation & Depth"
        description="Subtle elevation system for floating elements. Our flat design approach uses elevation sparingly for menus, modals, and overlays."
        [mdLink]="docLinks.ELEVATION"
      >
      </demo-page-header>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Elevation Scale</mat-card-title>
          <mat-card-subtitle>6 levels from flat to floating</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="elevation-scale">
            @for (level of elevationLevels(); track level.value) {
              <div class="elevation-item">
                <div class="elevation-sample" [style.box-shadow]="level.shadow">
                  <div class="elevation-content">
                    <span class="elevation-level">{{ level.value }}</span>
                    <span class="elevation-name">{{ level.name }}</span>
                  </div>
                </div>
                <div class="elevation-info">
                  <span class="elevation-token">--mat-sys-elevation-{{ level.value }}</span>
                  <span class="elevation-usage">{{ level.usage }}</span>
                  <span class="elevation-shadow">{{ level.shadowValue }}</span>
                </div>
              </div>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Component Examples</mat-card-title>
          <mat-card-subtitle>Real-world elevation usage</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="component-examples">
            <!-- Menu Example -->
            <div class="example-group">
              <h4>Dropdown Menu (Level 2)</h4>
              <div class="example-demo">
                <button mat-button [matMenuTriggerFor]="menu" class="demo-menu-trigger">
                  <mat-icon>arrow_drop_down</mat-icon>
                  Options Menu
                </button>
                <mat-menu #menu="matMenu" class="demo-menu">
                  <button mat-menu-item>
                    <mat-icon>edit</mat-icon>
                    Edit
                  </button>
                  <button mat-menu-item>
                    <mat-icon>delete</mat-icon>
                    Delete
                  </button>
                  <button mat-menu-item>
                    <mat-icon>share</mat-icon>
                    Share
                  </button>
                </mat-menu>
              </div>
            </div>

            <!-- Modal Example -->
            <div class="example-group">
              <h4>Modal Dialog (Level 4)</h4>
              <div class="example-demo">
                <button mat-button (click)="showModal.set(!showModal())" class="demo-modal-trigger">
                  <mat-icon>open_in_new</mat-icon>
                  Show Modal
                </button>
                @if (showModal()) {
                  <div class="modal-backdrop" (click)="showModal.set(false)">
                    <div class="modal-dialog" (click)="$event.stopPropagation()">
                      <div class="modal-header">
                        <h3>Example Modal</h3>
                        <button mat-icon-button (click)="showModal.set(false)" aria-label="Close">
                          <mat-icon>close</mat-icon>
                        </button>
                      </div>
                      <div class="modal-content">
                        <p>
                          This modal demonstrates elevation level 4 with a subtle shadow that
                          creates depth without being overwhelming.
                        </p>
                      </div>
                      <div class="modal-actions">
                        <button mat-button (click)="showModal.set(false)">Cancel</button>
                        <button mat-button color="primary">Confirm</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Tooltip Example -->
            <div class="example-group">
              <h4>Tooltip (Level 3)</h4>
              <div class="example-demo">
                <button
                  mat-icon-button
                  matTooltip="This tooltip uses elevation level 3"
                  matTooltipClass="demo-tooltip"
                >
                  <mat-icon>help_outline</mat-icon>
                </button>
                <span class="example-note">Hover the icon to see tooltip elevation</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Usage Guidelines</mat-card-title>
          <mat-card-subtitle>When to use elevation vs. borders</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="usage-guidelines">
            <div class="guideline-section">
              <h4>Use Elevation For:</h4>
              <ul>
                <li><strong>Floating Elements:</strong> Menus, dropdowns, autocomplete panels</li>
                <li>
                  <strong>Modal Overlays:</strong> Dialogs, bottom sheets, full-screen overlays
                </li>
                <li>
                  <strong>Temporary Surfaces:</strong> Tooltips, snackbars, floating action buttons
                </li>
                <li>
                  <strong>Interactive States:</strong> Subtle hover effects on interactive cards
                </li>
              </ul>
            </div>
            <div class="guideline-section">
              <h4>Use Borders For:</h4>
              <ul>
                <li><strong>Static Content:</strong> Cards, panels, sections</li>
                <li><strong>Form Elements:</strong> Input fields, buttons, controls</li>
                <li><strong>Layout Structure:</strong> Containers, grids, navigation</li>
                <li><strong>Content Separation:</strong> Dividers, section boundaries</li>
              </ul>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Implementation</mat-card-title>
          <mat-card-subtitle>Using elevation tokens in your components</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="code-examples">
            <div class="code-block">
              <h4>CSS Variables</h4>
              <pre><code>.floating-menu &#123;
  box-shadow: var(--mat-sys-elevation-2);
  background: var(--mat-sys-color-surface);
  border-radius: var(--mat-sys-shape-corner-small);
&#125;

.modal-dialog &#123;
  box-shadow: var(--mat-sys-elevation-4);
  background: var(--mat-sys-color-surface);
&#125;

.interactive-card &#123;
  box-shadow: var(--mat-sys-elevation-0);
  transition: box-shadow 200ms ease;
  
  &:hover &#123;
    box-shadow: var(--mat-sys-elevation-1);
  &#125;
&#125;</code></pre>
            </div>

            <div class="code-block">
              <h4>SCSS Mixins</h4>
              <pre><code>&#64;use '&#64;venntier/design-system/styles/tokens/elevation' as elevation;

.my-dropdown &#123;
  &#64;include elevation.elevation-menu();
  background: elevation.color('surface');
&#125;

.my-tooltip &#123;
  &#64;include elevation.elevation-tooltip();
&#125;

.my-dialog &#123;
  &#64;include elevation.elevation-dialog();
&#125;</code></pre>
            </div>

            <div class="code-block">
              <h4>Utility Classes</h4>
              <pre><code>&lt;div class="vt-elevation-2"&gt;
  Floating panel with level 2 elevation
&lt;/div&gt;

&lt;div class="vt-elevation-interactive"&gt;
  Interactive card with hover elevation
&lt;/div&gt;</code></pre>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ElevationComponent {
  readonly docLinks = MD3_DOCS;
  readonly showModal = signal(false);

  readonly elevationLevels = signal([
    {
      value: 0,
      name: 'Flat',
      shadow: 'none',
      shadowValue: 'none',
      usage: 'Default state, cards, buttons',
    },
    {
      value: 1,
      name: 'Subtle',
      shadow: '0px 1px 2px rgba(0, 0, 0, 0.04)',
      shadowValue: '0px 1px 2px rgba(0, 0, 0, 0.04)',
      usage: 'Hover states, selected items',
    },
    {
      value: 2,
      name: 'Floating',
      shadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      shadowValue: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      usage: 'Dropdowns, autocomplete panels',
    },
    {
      value: 3,
      name: 'Overlay',
      shadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
      shadowValue: '0px 4px 12px rgba(0, 0, 0, 0.12)',
      usage: 'Tooltips, small modals, FABs',
    },
    {
      value: 4,
      name: 'Modal',
      shadow: '0px 8px 24px rgba(0, 0, 0, 0.16)',
      shadowValue: '0px 8px 24px rgba(0, 0, 0, 0.16)',
      usage: 'Modal dialogs, large overlays',
    },
    {
      value: 5,
      name: 'Maximum',
      shadow: '0px 16px 32px rgba(0, 0, 0, 0.20)',
      shadowValue: '0px 16px 32px rgba(0, 0, 0, 0.20)',
      usage: 'Full-screen overlays (rarely used)',
    },
  ]);
}
