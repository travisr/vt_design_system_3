import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-text-fields',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <section>
      <h2 class="section-title">Text Inputs</h2>
      <p class="section-description">
        Input fields with clean borders and proper alignment for data entry.
      </p>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Input Fields</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput placeholder="name@example.com" [ngModel]="emailValue()" (ngModelChange)="updateEmailValue($event)">
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" placeholder="Enter password">
              <mat-icon matSuffix>lock</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Search</mat-label>
              <input matInput placeholder="Search...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone Number</mat-label>
              <input matInput type="tel" placeholder="+1 (555) 123-4567">
              <mat-icon matSuffix>phone</mat-icon>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Textarea</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput rows="4" placeholder="Enter a detailed description..."></textarea>
          </mat-form-field>
        </mat-card-content>
      </mat-card>
    </section>
  `
})
export class TextFieldsComponent {
  emailValue = signal('');
  
  updateEmailValue(value: string): void {
    this.emailValue.set(value);
  }
}