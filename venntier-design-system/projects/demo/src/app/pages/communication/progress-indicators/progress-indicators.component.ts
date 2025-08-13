import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-progress-indicators',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Progress Indicators"
        description="Progress indicators show the completion progress of a task or process."
        [mdLink]="docLinks.PROGRESS_INDICATORS"
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

      <!-- Progress Bar Variants -->
      <demo-example-viewer title="Progress Bar Variants">
        <div class="progress-variants">
          <div class="variant-group">
            <h4>Determinate Progress Bars</h4>
            <div class="progress-examples">
              <div class="progress-item">
                <span>Default ({{ progressValue() }}%)</span>
                <mat-progress-bar mode="determinate" [value]="progressValue()"></mat-progress-bar>
              </div>
              <div class="progress-item">
                <span>Primary ({{ progressValue() }}%)</span>
                <mat-progress-bar
                  mode="determinate"
                  [value]="progressValue()"
                  color="primary"
                ></mat-progress-bar>
              </div>
              <div class="progress-item">
                <span>Accent ({{ progressValue() }}%)</span>
                <mat-progress-bar
                  mode="determinate"
                  [value]="progressValue()"
                  color="accent"
                ></mat-progress-bar>
              </div>
              <div class="progress-item">
                <span>Warn ({{ progressValue() }}%)</span>
                <mat-progress-bar
                  mode="determinate"
                  [value]="progressValue()"
                  color="warn"
                ></mat-progress-bar>
              </div>
            </div>
          </div>

          <div class="variant-group">
            <h4>Indeterminate Progress Bars</h4>
            <div class="progress-examples">
              <div class="progress-item">
                <span>Default Loading</span>
                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
              </div>
              <div class="progress-item">
                <span>Primary Loading</span>
                <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
              </div>
              <div class="progress-item">
                <span>Accent Loading</span>
                <mat-progress-bar mode="indeterminate" color="accent"></mat-progress-bar>
              </div>
            </div>
          </div>

          <div class="variant-group">
            <h4>Buffer Progress Bars</h4>
            <div class="progress-examples">
              <div class="progress-item">
                <span>Buffering ({{ progressValue() }}% / {{ bufferValue() }}%)</span>
                <mat-progress-bar
                  mode="buffer"
                  [value]="progressValue()"
                  [bufferValue]="bufferValue()"
                ></mat-progress-bar>
              </div>
            </div>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Progress Spinner Variants -->
      <demo-example-viewer title="Progress Spinner Variants">
        <div class="spinner-variants">
          <div class="variant-group">
            <h4>Determinate Spinners</h4>
            <div class="spinner-examples">
              <div class="spinner-item">
                <span>Default ({{ progressValue() }}%)</span>
                <mat-progress-spinner
                  mode="determinate"
                  [value]="progressValue()"
                ></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Primary ({{ progressValue() }}%)</span>
                <mat-progress-spinner
                  mode="determinate"
                  [value]="progressValue()"
                  color="primary"
                ></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Accent ({{ progressValue() }}%)</span>
                <mat-progress-spinner
                  mode="determinate"
                  [value]="progressValue()"
                  color="accent"
                ></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Warn ({{ progressValue() }}%)</span>
                <mat-progress-spinner
                  mode="determinate"
                  [value]="progressValue()"
                  color="warn"
                ></mat-progress-spinner>
              </div>
            </div>
          </div>

          <div class="variant-group">
            <h4>Indeterminate Spinners</h4>
            <div class="spinner-examples">
              <div class="spinner-item">
                <span>Default Loading</span>
                <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Primary Loading</span>
                <mat-progress-spinner mode="indeterminate" color="primary"></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Accent Loading</span>
                <mat-progress-spinner mode="indeterminate" color="accent"></mat-progress-spinner>
              </div>
            </div>
          </div>

          <div class="variant-group">
            <h4>Different Sizes</h4>
            <div class="spinner-examples">
              <div class="spinner-item">
                <span>Small (24px)</span>
                <mat-progress-spinner mode="indeterminate" [diameter]="24"></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Medium (40px)</span>
                <mat-progress-spinner mode="indeterminate" [diameter]="40"></mat-progress-spinner>
              </div>
              <div class="spinner-item">
                <span>Large (60px)</span>
                <mat-progress-spinner mode="indeterminate" [diameter]="60"></mat-progress-spinner>
              </div>
            </div>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Interactive Controls -->
      <demo-example-viewer title="Interactive Controls">
        <div class="controls-section">
          <div class="control-group">
            <h4>Progress Value Control</h4>
            <mat-slider min="0" max="100" step="1">
              <input
                matSliderThumb
                [value]="progressValue()"
                (valueChange)="onProgressChange($event)"
              />
            </mat-slider>
            <p>Current Progress: {{ progressValue() }}%</p>
          </div>

          <div class="control-group">
            <h4>Animation Controls</h4>
            <div class="button-controls">
              <button mat-raised-button (click)="startProgress()" [disabled]="isAnimating()">
                Start Animation
              </button>
              <button mat-stroked-button (click)="resetProgress()">Reset</button>
            </div>
          </div>
        </div>
      </demo-example-viewer>

      <!-- Code Examples -->
      <demo-example-viewer title="Progress Indicator Implementation" [examples]="progressExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './progress-indicators.component.scss',
})
export class ProgressIndicatorsComponent {
  readonly docLinks = MD3_DOCS;

  // Density options
  readonly densityOptions = [
    { value: 'default', label: 'Default', description: 'Standard spacing' },
    { value: 'compact', label: 'Compact', description: 'Reduced spacing' },
    { value: 'dense', label: 'Dense', description: 'Minimal spacing' },
  ];

  readonly selectedDensity = signal('default');
  readonly progressValue = signal(65);
  readonly bufferValue = signal(85);
  readonly isAnimating = signal(false);

  onDensityChange(density: string) {
    this.selectedDensity.set(density);
  }

  onProgressChange(value: number | null) {
    if (value !== null) {
      this.progressValue.set(value);
    }
  }

  startProgress() {
    this.isAnimating.set(true);
    this.progressValue.set(0);

    const interval = setInterval(() => {
      const current = this.progressValue();
      if (current >= 100) {
        clearInterval(interval);
        this.isAnimating.set(false);
      } else {
        this.progressValue.set(current + 2);
        this.bufferValue.set(Math.min(100, current + 15));
      }
    }, 100);
  }

  resetProgress() {
    this.progressValue.set(65);
    this.bufferValue.set(85);
    this.isAnimating.set(false);
  }

  readonly progressExamples = [
    {
      title: 'Determinate Progress Bar',
      language: 'html',
      code: `<mat-progress-bar mode="determinate" [value]="65"></mat-progress-bar>`,
    },
    {
      title: 'Indeterminate Progress Bar',
      language: 'html',
      code: `<mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>`,
    },
    {
      title: 'Buffer Progress Bar',
      language: 'html',
      code: `<mat-progress-bar mode="buffer" [value]="65" [bufferValue]="85"></mat-progress-bar>`,
    },
    {
      title: 'Progress Spinner',
      language: 'html',
      code: `<mat-progress-spinner mode="determinate" [value]="65" color="accent"></mat-progress-spinner>`,
    },
    {
      title: 'Loading Spinner',
      language: 'html',
      code: `<mat-progress-spinner mode="indeterminate"></mat-progress-spinner>`,
    },
  ];
}
