import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-text-fields',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  styleUrl: './text-fields.component.scss',
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Text Fields"
        description="Input fields with clean borders and proper alignment for data entry."
        [mdLink]="docLinks.TEXT_FIELDS"
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
              >This density will be applied to all form fields below to test the MD3 density
              variations.</small
            >
          </p>
        </div>
      </demo-example-viewer>

      <demo-example-viewer title="Input Fields">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input
              matInput
              placeholder="name@example.com"
              [ngModel]="emailValue()"
              (ngModelChange)="updateEmailValue($event)"
            />
            <mat-icon matSuffix>email</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Password</mat-label>
            <input matInput type="password" placeholder="Enter password" />
            <mat-icon matSuffix>lock</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Search</mat-label>
            <input matInput placeholder="Search..." />
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Phone Number</mat-label>
            <input matInput type="tel" placeholder="+1 (555) 123-4567" />
            <mat-icon matSuffix>phone</mat-icon>
          </mat-form-field>
        </div>
      </demo-example-viewer>

      <demo-example-viewer title="Input States">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Required Field</mat-label>
            <input matInput placeholder="This field is required" [formControl]="requiredField" />
            <mat-icon matSuffix>star</mat-icon>
            @if (requiredField.invalid && requiredField.touched) {
              <mat-error>This field is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field>
            <mat-label>Disabled Field</mat-label>
            <input matInput placeholder="This field is disabled" disabled />
            <mat-icon matSuffix>block</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Number Input</mat-label>
            <input matInput type="number" placeholder="Enter a number" />
            <mat-icon matSuffix>tag</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>URL Input</mat-label>
            <input matInput type="url" placeholder="https://example.com" />
            <mat-icon matSuffix>link</mat-icon>
          </mat-form-field>
        </div>
      </demo-example-viewer>

      <demo-example-viewer title="Textarea">
        <mat-form-field class="full-width vt-textarea">
          <mat-label>Description</mat-label>
          <textarea matInput rows="4" placeholder="Enter a detailed description..."></textarea>
          <mat-hint>Provide as much detail as possible</mat-hint>
        </mat-form-field>
      </demo-example-viewer>
    </div>
  `,
})
export class TextFieldsComponent {
  emailValue = signal('');
  requiredField = new FormControl('', [Validators.required]);
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

  updateEmailValue(value: string): void {
    this.emailValue.set(value);
  }

  onDensityChange(density: string): void {
    this.selectedDensity.set(density);
  }
}
