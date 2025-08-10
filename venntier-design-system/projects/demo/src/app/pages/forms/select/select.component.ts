import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'demo-select',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule],
  template: `
    <section>
      <h2 class="section-title">Selection Controls</h2>
      <p class="section-description">
        Dropdowns and selection components for choosing from predefined options.
      </p>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Select Dropdowns</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Country</mat-label>
              <mat-select [ngModel]="countryValue()" (ngModelChange)="updateCountryValue($event)">
                <mat-option value="us">United States</mat-option>
                <mat-option value="uk">United Kingdom</mat-option>
                <mat-option value="ca">Canada</mat-option>
                <mat-option value="au">Australia</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Language</mat-label>
              <mat-select [ngModel]="languageValue()" (ngModelChange)="updateLanguageValue($event)">
                <mat-option value="en">English</mat-option>
                <mat-option value="es">Spanish</mat-option>
                <mat-option value="fr">French</mat-option>
                <mat-option value="de">German</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Team Size</mat-label>
              <mat-select>
                <mat-option value="1">1-10 employees</mat-option>
                <mat-option value="2">11-50 employees</mat-option>
                <mat-option value="3">51-200 employees</mat-option>
                <mat-option value="4">201+ employees</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>
    </section>
  `,
})
export class SelectComponent {
  countryValue = signal('');
  languageValue = signal('');

  updateCountryValue(value: string): void {
    this.countryValue.set(value);
  }

  updateLanguageValue(value: string): void {
    this.languageValue.set(value);
  }
}
