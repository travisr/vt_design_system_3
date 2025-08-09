import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'demo-checkboxes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  template: `
    <section>
      <h2 class="section-title">Choice Controls</h2>
      <p class="section-description">
        Checkboxes, radio buttons, and toggles for binary and multiple choice selections.
      </p>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Checkboxes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="choice-group">
            <mat-checkbox [ngModel]="checkbox1()" (ngModelChange)="checkbox1.set($event)">Receive email notifications</mat-checkbox>
            <mat-checkbox [ngModel]="checkbox2()" (ngModelChange)="checkbox2.set($event)">Receive SMS notifications</mat-checkbox>
            <mat-checkbox [ngModel]="checkbox3()" (ngModelChange)="checkbox3.set($event)">Receive marketing updates</mat-checkbox>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Radio Buttons</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-radio-group [ngModel]="radioValue()" (ngModelChange)="updateRadioValue($event)" class="choice-group">
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
            <mat-slide-toggle [ngModel]="toggle1()" (ngModelChange)="toggle1.set($event)">Enable two-factor authentication</mat-slide-toggle>
            <mat-slide-toggle [ngModel]="toggle2()" (ngModelChange)="toggle2.set($event)">Show profile publicly</mat-slide-toggle>
            <mat-slide-toggle [ngModel]="toggle3()" (ngModelChange)="toggle3.set($event)">Allow data collection</mat-slide-toggle>
          </div>
        </mat-card-content>
      </mat-card>
    </section>
  `
})
export class CheckboxesComponent {
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
}