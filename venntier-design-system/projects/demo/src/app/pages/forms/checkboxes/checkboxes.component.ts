import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';

@Component({
  selector: 'demo-checkboxes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Checkboxes & Choice Controls"
        description="Checkboxes, radio buttons, and toggles for binary and multiple choice selections."
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
              >This density will be applied to all choice controls below to test the MD3 density
              variations.</small
            >
          </p>
        </div>
      </demo-example-viewer>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Checkboxes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="choice-group">
            <mat-checkbox [ngModel]="checkbox1()" (ngModelChange)="checkbox1.set($event)"
              >Receive email notifications</mat-checkbox
            >
            <mat-checkbox [ngModel]="checkbox2()" (ngModelChange)="checkbox2.set($event)"
              >Receive SMS notifications</mat-checkbox
            >
            <mat-checkbox [ngModel]="checkbox3()" (ngModelChange)="checkbox3.set($event)"
              >Receive marketing updates</mat-checkbox
            >
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Radio Buttons</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-radio-group
            [ngModel]="radioValue()"
            (ngModelChange)="updateRadioValue($event)"
            class="choice-group"
          >
            <mat-radio-button value="monthly">Monthly billing</mat-radio-button>
            <mat-radio-button value="yearly">Yearly billing (save 20%)</mat-radio-button>
            <mat-radio-button value="enterprise">Enterprise (custom)</mat-radio-button>
          </mat-radio-group>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Toggle Switches</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="choice-group">
            <mat-slide-toggle [ngModel]="toggle1()" (ngModelChange)="toggle1.set($event)"
              >Enable two-factor authentication</mat-slide-toggle
            >
            <mat-slide-toggle [ngModel]="toggle2()" (ngModelChange)="toggle2.set($event)"
              >Show profile publicly</mat-slide-toggle
            >
            <mat-slide-toggle [ngModel]="toggle3()" (ngModelChange)="toggle3.set($event)"
              >Allow data collection</mat-slide-toggle
            >
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class CheckboxesComponent {
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

  // Checkbox signals
  checkbox1 = signal(false);
  checkbox2 = signal(false);
  checkbox3 = signal(false);

  // Radio button signal
  radioValue = signal('');

  // Toggle signals
  toggle1 = signal(false);
  toggle2 = signal(false);
  toggle3 = signal(false);

  updateRadioValue(value: string): void {
    this.radioValue.set(value);
  }

  onDensityChange(density: string): void {
    this.selectedDensity.set(density);
  }
}
