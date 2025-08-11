import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Buttons"
        description="Buttons help people take action, such as sending an email, sharing a document, or liking a comment."
        [mdLink]="docLinks.BUTTONS"
      >
      </demo-page-header>

      <!-- Density Selector for Testing -->
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
          <p class="density-info">
            Current density: <strong>{{ selectedDensity() }}</strong>
            <br />
            <small
              >This density will be applied to all buttons below to test the MD3 density
              variations.</small
            >
            <br />
            <small class="density-note">
              <strong>Note:</strong> FABs (Floating Action Buttons) do not support density in MD3 -
              they have fixed sizes (56dp standard, 40dp mini).
            </small>
          </p>
        </div>
      </demo-example-viewer>

      <!-- Button Variants -->
      <section class="demo-section">
        <h2 class="demo-section-title">Button Variants</h2>
        <p class="demo-section-description">
          Material Design 3 offers five button types. Each type has its own emphasis level and use
          case.
        </p>

        <demo-example-viewer title="All Button Types" [code]="variantsCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-md demo-flex--align-center">
            <button mat-fab color="primary">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-fab extended color="primary">
              <mat-icon>add</mat-icon>
              Extended FAB
            </button>
            <button mat-raised-button color="primary">Elevated</button>
            <button mat-flat-button color="primary">Filled</button>
            <button mat-flat-button>Filled Tonal</button>
            <button mat-stroked-button>Outlined</button>
            <button mat-button>Text</button>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Interactive States -->
      <section class="demo-section">
        <h2 class="demo-section-title">Interactive States</h2>
        <p class="demo-section-description">
          Buttons have multiple interactive states including enabled, hovered, focused, pressed, and
          disabled.
        </p>

        <demo-example-viewer title="Button States" [code]="statesCode">
          <div class="demo-grid demo-grid--3-col demo-grid--gap-lg">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm">
              <span class="demo-label">Enabled</span>
              <button mat-flat-button color="primary">Primary</button>
            </div>
            <div class="demo-flex demo-flex--column demo-flex--gap-sm">
              <span class="demo-label">Disabled</span>
              <button mat-flat-button color="primary" disabled>Primary</button>
            </div>
            <div class="demo-flex demo-flex--column demo-flex--gap-sm">
              <span class="demo-label">Loading</span>
              <button mat-flat-button color="primary" disabled>
                <mat-spinner
                  diameter="20"
                  style="display: inline-block; margin-right: 8px;"
                ></mat-spinner>
                Loading...
              </button>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- With Icons -->
      <section class="demo-section">
        <h2 class="demo-section-title">Buttons with Icons</h2>
        <p class="demo-section-description">
          Icons can reinforce the button's action and improve visual recognition.
        </p>

        <demo-example-viewer title="Icon Buttons" [code]="iconCode">
          <div class="demo-component-group">
            <button mat-flat-button color="primary">
              <mat-icon>send</mat-icon>
              Send Email
            </button>
            <button mat-stroked-button>
              <mat-icon>download</mat-icon>
              Download
            </button>
            <button mat-button>
              <mat-icon>share</mat-icon>
              Share
            </button>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Button Groups -->
      <section class="demo-section">
        <h2 class="demo-section-title">Button Groups</h2>
        <p class="demo-section-description">
          Related actions can be grouped together for better organization.
        </p>

        <demo-example-viewer title="Grouped Actions" [code]="groupCode">
          <div class="demo-example-row">
            <button mat-stroked-button>Cancel</button>
            <button mat-flat-button color="primary">Save</button>
          </div>
        </demo-example-viewer>
      </section>
    </div>
  `,
})
export class ButtonsComponent {
  readonly docLinks = MD3_DOCS;

  // Density selector for testing MD3 density variations
  selectedDensity = signal('default');

  readonly densityOptions = [
    { value: 'dense', label: 'Dense (-3) - Most compact', description: 'MD3 highest density' },
    { value: 'compact', label: 'Compact (-2) - More compact', description: 'MD3 high density' },
    {
      value: 'standard',
      label: 'Standard (-1) - Slightly compact',
      description: 'MD3 medium density',
    },
    { value: 'default', label: 'Default (0) - Comfortable', description: 'MD3 default density' },
  ];

  onDensityChange(density: string): void {
    this.selectedDensity.set(density);
  }

  variantsCode = {
    html: `<button mat-fab color="primary">
  <mat-icon>add</mat-icon>
</button>
<button mat-raised-button color="primary">Elevated</button>
<button mat-flat-button color="primary">Filled</button>
<button mat-flat-button>Filled Tonal</button>
<button mat-stroked-button>Outlined</button>
<button mat-button>Text</button>`,
    ts: `import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';`,
  };

  statesCode = {
    html: `<button mat-flat-button color="primary">Enabled</button>
<button mat-flat-button color="primary" disabled>Disabled</button>`,
  };

  iconCode = {
    html: `<button mat-flat-button color="primary">
  <mat-icon>send</mat-icon>
  Send Email
</button>`,
  };

  groupCode = {
    html: `<div class="button-group">
  <button mat-stroked-button>Cancel</button>
  <button mat-flat-button color="primary">Save</button>
</div>`,
  };
}
