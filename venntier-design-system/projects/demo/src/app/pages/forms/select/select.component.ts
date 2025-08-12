import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Select"
        description="Select components allow users to choose from a list of options in a dropdown menu."
        [mdLink]="docLinks.SELECT"
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
              >This density will be applied to all select fields below to test the MD3 density
              variations.</small
            >
          </p>
        </div>
      </demo-example-viewer>

      <!-- Basic Select Examples -->
      <demo-example-viewer title="Basic Select Fields" [code]="basicSelectCode">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Country</mat-label>
            <mat-select [ngModel]="countryValue()" (ngModelChange)="updateCountryValue($event)">
              <mat-option value="us">United States</mat-option>
              <mat-option value="uk">United Kingdom</mat-option>
              <mat-option value="ca">Canada</mat-option>
              <mat-option value="au">Australia</mat-option>
              <mat-option value="de">Germany</mat-option>
              <mat-option value="fr">France</mat-option>
            </mat-select>
            <mat-icon matSuffix>public</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Language</mat-label>
            <mat-select [ngModel]="languageValue()" (ngModelChange)="updateLanguageValue($event)">
              <mat-option value="en">English</mat-option>
              <mat-option value="es">Spanish</mat-option>
              <mat-option value="fr">French</mat-option>
              <mat-option value="de">German</mat-option>
              <mat-option value="it">Italian</mat-option>
              <mat-option value="pt">Portuguese</mat-option>
            </mat-select>
            <mat-icon matSuffix>language</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Team Size</mat-label>
            <mat-select [ngModel]="teamSizeValue()" (ngModelChange)="updateTeamSizeValue($event)">
              <mat-option value="1">1-10 employees</mat-option>
              <mat-option value="2">11-50 employees</mat-option>
              <mat-option value="3">51-200 employees</mat-option>
              <mat-option value="4">201+ employees</mat-option>
            </mat-select>
            <mat-icon matSuffix>groups</mat-icon>
          </mat-form-field>
        </div>
      </demo-example-viewer>

      <!-- Select States -->
      <demo-example-viewer title="Select States" [code]="selectStatesCode">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Required Field</mat-label>
            <mat-select [formControl]="requiredSelect">
              <mat-option value="option1">Option 1</mat-option>
              <mat-option value="option2">Option 2</mat-option>
              <mat-option value="option3">Option 3</mat-option>
            </mat-select>
            <mat-icon matSuffix>star</mat-icon>
            @if (requiredSelect.invalid && requiredSelect.touched) {
              <mat-error>This field is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field>
            <mat-label>Disabled Field</mat-label>
            <mat-select disabled>
              <mat-option value="disabled1">Disabled Option 1</mat-option>
              <mat-option value="disabled2">Disabled Option 2</mat-option>
            </mat-select>
            <mat-icon matSuffix>block</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>With Hint</mat-label>
            <mat-select>
              <mat-option value="hint1">Option with hint 1</mat-option>
              <mat-option value="hint2">Option with hint 2</mat-option>
            </mat-select>
            <mat-icon matSuffix>help</mat-icon>
            <mat-hint>Choose the best option for your needs</mat-hint>
          </mat-form-field>
        </div>
      </demo-example-viewer>

      <!-- Multiple Selection -->
      <demo-example-viewer title="Multiple Selection" [code]="multipleSelectCode">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Skills (Multiple)</mat-label>
            <mat-select
              multiple
              [ngModel]="skillsValue()"
              (ngModelChange)="updateSkillsValue($event)"
            >
              <mat-option value="javascript">JavaScript</mat-option>
              <mat-option value="typescript">TypeScript</mat-option>
              <mat-option value="angular">Angular</mat-option>
              <mat-option value="react">React</mat-option>
              <mat-option value="vue">Vue.js</mat-option>
              <mat-option value="node">Node.js</mat-option>
              <mat-option value="python">Python</mat-option>
              <mat-option value="java">Java</mat-option>
            </mat-select>
            <mat-icon matSuffix>code</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Interests (Multiple)</mat-label>
            <mat-select
              multiple
              [ngModel]="interestsValue()"
              (ngModelChange)="updateInterestsValue($event)"
            >
              <mat-option value="design">Design</mat-option>
              <mat-option value="development">Development</mat-option>
              <mat-option value="testing">Testing</mat-option>
              <mat-option value="devops">DevOps</mat-option>
              <mat-option value="management">Management</mat-option>
              <mat-option value="research">Research</mat-option>
            </mat-select>
            <mat-icon matSuffix>interests</mat-icon>
          </mat-form-field>
        </div>
      </demo-example-viewer>

      <!-- Option Groups -->
      <demo-example-viewer title="Option Groups" [code]="optionGroupsCode">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Food Category</mat-label>
            <mat-select [ngModel]="foodValue()" (ngModelChange)="updateFoodValue($event)">
              <mat-optgroup label="Fruits">
                <mat-option value="apple">Apple</mat-option>
                <mat-option value="banana">Banana</mat-option>
                <mat-option value="orange">Orange</mat-option>
              </mat-optgroup>
              <mat-optgroup label="Vegetables">
                <mat-option value="carrot">Carrot</mat-option>
                <mat-option value="broccoli">Broccoli</mat-option>
                <mat-option value="spinach">Spinach</mat-option>
              </mat-optgroup>
              <mat-optgroup label="Proteins">
                <mat-option value="chicken">Chicken</mat-option>
                <mat-option value="fish">Fish</mat-option>
                <mat-option value="tofu">Tofu</mat-option>
              </mat-optgroup>
            </mat-select>
            <mat-icon matSuffix>restaurant</mat-icon>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Location</mat-label>
            <mat-select [ngModel]="locationValue()" (ngModelChange)="updateLocationValue($event)">
              <mat-optgroup label="North America">
                <mat-option value="us">United States</mat-option>
                <mat-option value="ca">Canada</mat-option>
                <mat-option value="mx">Mexico</mat-option>
              </mat-optgroup>
              <mat-optgroup label="Europe">
                <mat-option value="uk">United Kingdom</mat-option>
                <mat-option value="de">Germany</mat-option>
                <mat-option value="fr">France</mat-option>
              </mat-optgroup>
              <mat-optgroup label="Asia">
                <mat-option value="jp">Japan</mat-option>
                <mat-option value="kr">South Korea</mat-option>
                <mat-option value="cn">China</mat-option>
              </mat-optgroup>
            </mat-select>
            <mat-icon matSuffix>location_on</mat-icon>
          </mat-form-field>
        </div>
      </demo-example-viewer>
    </div>
  `,
})
export class SelectComponent {
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

  // Form values
  countryValue = signal('');
  languageValue = signal('');
  teamSizeValue = signal('');
  skillsValue = signal<string[]>([]);
  interestsValue = signal<string[]>([]);
  foodValue = signal('');
  locationValue = signal('');

  // Form controls for validation examples
  requiredSelect = new FormControl('', [Validators.required]);

  onDensityChange(density: string): void {
    this.selectedDensity.set(density);
  }

  updateCountryValue(value: string): void {
    this.countryValue.set(value);
  }

  updateLanguageValue(value: string): void {
    this.languageValue.set(value);
  }

  updateTeamSizeValue(value: string): void {
    this.teamSizeValue.set(value);
  }

  updateSkillsValue(value: string[]): void {
    this.skillsValue.set(value);
  }

  updateInterestsValue(value: string[]): void {
    this.interestsValue.set(value);
  }

  updateFoodValue(value: string): void {
    this.foodValue.set(value);
  }

  updateLocationValue(value: string): void {
    this.locationValue.set(value);
  }

  // Code examples for demo
  basicSelectCode = {
    html: `<mat-form-field>
  <mat-label>Country</mat-label>
  <mat-select [(ngModel)]="countryValue">
    <mat-option value="us">United States</mat-option>
    <mat-option value="uk">United Kingdom</mat-option>
    <mat-option value="ca">Canada</mat-option>
  </mat-select>
  <mat-icon matSuffix>public</mat-icon>
</mat-form-field>`,
    ts: `import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

countryValue = signal('');`,
  };

  selectStatesCode = {
    html: `<mat-form-field>
  <mat-label>Required Field</mat-label>
  <mat-select [formControl]="requiredSelect">
    <mat-option value="option1">Option 1</mat-option>
    <mat-option value="option2">Option 2</mat-option>
  </mat-select>
  <mat-icon matSuffix>star</mat-icon>
  @if (requiredSelect.invalid && requiredSelect.touched) {
    <mat-error>This field is required</mat-error>
  }
</mat-form-field>`,
    ts: `import { FormControl, Validators } from '@angular/forms';

requiredSelect = new FormControl('', [Validators.required]);`,
  };

  multipleSelectCode = {
    html: `<mat-form-field>
  <mat-label>Skills (Multiple)</mat-label>
  <mat-select multiple [(ngModel)]="skillsValue">
    <mat-option value="javascript">JavaScript</mat-option>
    <mat-option value="typescript">TypeScript</mat-option>
    <mat-option value="angular">Angular</mat-option>
  </mat-select>
  <mat-icon matSuffix>code</mat-icon>
</mat-form-field>`,
    ts: `skillsValue = signal<string[]>([]);`,
  };

  optionGroupsCode = {
    html: `<mat-form-field>
  <mat-label>Food Category</mat-label>
  <mat-select [(ngModel)]="foodValue">
    <mat-optgroup label="Fruits">
      <mat-option value="apple">Apple</mat-option>
      <mat-option value="banana">Banana</mat-option>
    </mat-optgroup>
    <mat-optgroup label="Vegetables">
      <mat-option value="carrot">Carrot</mat-option>
      <mat-option value="broccoli">Broccoli</mat-option>
    </mat-optgroup>
  </mat-select>
  <mat-icon matSuffix>restaurant</mat-icon>
</mat-form-field>`,
    ts: `foodValue = signal('');`,
  };
}
