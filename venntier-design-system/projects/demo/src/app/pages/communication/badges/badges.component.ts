import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-badges',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Badges"
        description="Badges show notifications, counts, or status information on UI elements."
        [mdLink]="docLinks.BADGES"
      >
      </demo-page-header>

      <!-- Density Selector -->
      <demo-example-viewer title="Density Selector">
        <div class="density-selector">
          <mat-form-field>
            <mat-label>Select Density</mat-label>
            <mat-select
              [value]="selectedDensity()"
              (selectionChange)="onDensityChange($event.value)"
              panelWidth="auto"
            >
              @for (option of densityOptions; track option.value) {
                <mat-option [value]="option.value">
                  {{ option.label }} - {{ option.description }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>
      </demo-example-viewer>

      <!-- Color Variants -->
      <demo-example-viewer title="Color Variants">
        <div class="badge-variants">
          <div class="variant-group">
            <h4>Default Color Scheme</h4>
            <mat-button-toggle-group class="default-variant" value="option1">
              <mat-button-toggle value="option1">
                <span matBadge="4" matBadgePosition="after">Messages</span>
              </mat-button-toggle>
              <mat-button-toggle value="option2">Option 2</mat-button-toggle>
              <mat-button-toggle value="option3">Option 3</mat-button-toggle>
            </mat-button-toggle-group>
          </div>

          <div class="variant-group">
            <h4>Primary Color Scheme</h4>
            <mat-button-toggle-group class="primary-variant" value="option1">
              <mat-button-toggle value="option1">
                <span matBadge="12" matBadgeColor="primary" matBadgePosition="after"
                  >Notifications</span
                >
              </mat-button-toggle>
              <mat-button-toggle value="option2">Option 2</mat-button-toggle>
              <mat-button-toggle value="option3">Option 3</mat-button-toggle>
            </mat-button-toggle-group>
          </div>

          <div class="variant-group">
            <h4>Accent Color Scheme</h4>
            <mat-button-toggle-group class="tertiary-variant" value="option1">
              <mat-button-toggle value="option1">
                <span matBadge="99+" matBadgeColor="accent" matBadgePosition="after">Updates</span>
              </mat-button-toggle>
              <mat-button-toggle value="option2">Option 2</mat-button-toggle>
              <mat-button-toggle value="option3">Option 3</mat-button-toggle>
            </mat-button-toggle-group>
          </div>

          <div class="variant-group">
            <h4>Warn Color Scheme</h4>
            <mat-button-toggle-group class="secondary-variant" value="option1">
              <mat-button-toggle value="option1">
                <span matBadge="!" matBadgeColor="warn" matBadgePosition="after">Alerts</span>
              </mat-button-toggle>
              <mat-button-toggle value="option2">Option 2</mat-button-toggle>
              <mat-button-toggle value="option3">Option 3</mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Badge Types -->
      <demo-example-viewer title="Badge Types">
        <div class="badge-types">
          <div class="type-group">
            <h4>Standard Badges</h4>
            <div class="badge-examples">
              <span matBadge="4" matBadgePosition="after">
                <mat-icon>mail</mat-icon>
              </span>
              <span matBadge="15" matBadgePosition="after">
                <mat-icon>notifications</mat-icon>
              </span>
              <span matBadge="99+" matBadgePosition="after">
                <mat-icon>chat</mat-icon>
              </span>
            </div>
          </div>

          <div class="type-group">
            <h4>Dot Badges</h4>
            <div class="badge-examples">
              <span matBadge="" matBadgePosition="after" matBadgeSize="small">
                <mat-icon>notifications</mat-icon>
              </span>
              <span
                matBadge=""
                matBadgePosition="after"
                matBadgeSize="small"
                matBadgeColor="primary"
              >
                <mat-icon>mail</mat-icon>
              </span>
              <span matBadge="" matBadgePosition="after" matBadgeSize="small" matBadgeColor="warn">
                <mat-icon>error</mat-icon>
              </span>
            </div>
          </div>

          <div class="type-group">
            <h4>Large Badges</h4>
            <div class="badge-examples">
              <span matBadge="New" matBadgePosition="after" matBadgeSize="large">
                <mat-icon>star</mat-icon>
              </span>
              <span
                matBadge="Beta"
                matBadgePosition="after"
                matBadgeSize="large"
                matBadgeColor="accent"
              >
                <mat-icon>science</mat-icon>
              </span>
            </div>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Badge Positions -->
      <demo-example-viewer title="Badge Positions">
        <div class="badge-positions">
          <div class="position-group">
            <h4>Position Variants</h4>
            <div class="position-examples">
              <span matBadge="1" matBadgePosition="above after">
                <mat-icon>notifications</mat-icon>
              </span>
              <span matBadge="2" matBadgePosition="above before">
                <mat-icon>mail</mat-icon>
              </span>
              <span matBadge="3" matBadgePosition="below after">
                <mat-icon>chat</mat-icon>
              </span>
              <span matBadge="4" matBadgePosition="below before">
                <mat-icon>favorite</mat-icon>
              </span>
            </div>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Interactive States -->
      <demo-example-viewer title="Interactive States">
        <div class="badge-states">
          <div class="state-group">
            <h4>Button with Badges</h4>
            <div class="button-examples">
              <button mat-raised-button matBadge="5" matBadgePosition="after">Messages</button>
              <button mat-stroked-button matBadge="!" matBadgeColor="warn" matBadgePosition="after">
                Alerts
              </button>
              <button
                mat-flat-button
                matBadge="New"
                matBadgeColor="accent"
                matBadgePosition="after"
              >
                Features
              </button>
            </div>
          </div>

          <div class="state-group">
            <h4>Disabled States</h4>
            <div class="disabled-examples">
              <button mat-raised-button disabled matBadge="5" matBadgePosition="after">
                Disabled
              </button>
              <span matBadge="3" matBadgeDisabled="true">
                <mat-icon>notifications</mat-icon>
              </span>
            </div>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Code Examples -->
      <demo-example-viewer title="Badge Implementation" [examples]="badgeExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './badges.component.scss',
})
export class BadgesComponent {
  readonly docLinks = MD3_DOCS;

  // Density options
  readonly densityOptions = [
    { value: 'default', label: 'Default', description: 'Standard spacing' },
    { value: 'compact', label: 'Compact', description: 'Reduced spacing' },
    { value: 'dense', label: 'Dense', description: 'Minimal spacing' },
  ];

  readonly selectedDensity = signal('default');

  onDensityChange(density: string) {
    this.selectedDensity.set(density);
  }

  readonly badgeExamples = [
    {
      title: 'Basic Badge',
      language: 'html',
      code: `<span matBadge="4" matBadgePosition="after">
  <mat-icon>mail</mat-icon>
</span>`,
    },
    {
      title: 'Colored Badge',
      language: 'html',
      code: `<span matBadge="!" matBadgeColor="warn" matBadgePosition="after">
  <mat-icon>error</mat-icon>
</span>`,
    },
    {
      title: 'Dot Badge',
      language: 'html',
      code: `<span matBadge="" matBadgeSize="small" matBadgePosition="after">
  <mat-icon>notifications</mat-icon>
</span>`,
    },
    {
      title: 'Button with Badge',
      language: 'html',
      code: `<button mat-raised-button matBadge="5" matBadgePosition="after">
  Messages
</button>`,
    },
  ];
}
