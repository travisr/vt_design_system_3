import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';

@Component({
  selector: 'demo-motion',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PageHeaderComponent,
    ExampleViewerComponent
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Motion"
        description="Motion provides meaning and helps users understand the interface through purposeful transitions and animations."
        [links]="[
          { label: 'M3 Motion Guidelines', url: 'https://m3.material.io/styles/motion' }
        ]">
      </demo-page-header>

      <section class="demo-section">
        <h2>Easing Curves</h2>
        <p>Material Design uses four main easing curves to create natural motion.</p>
        <div class="demo-example">
          <div class="easing-demo">
            <div class="curve-example">
              <h4>Standard (0.2, 0.0, 0, 1.0)</h4>
              <div class="motion-box standard-easing">Standard</div>
              <button mat-button (click)="animateBox('standard')">Animate</button>
            </div>
            <div class="curve-example">
              <h4>Decelerate (0.0, 0.0, 0.2, 1.0)</h4>
              <div class="motion-box decelerate-easing">Decelerate</div>
              <button mat-button (click)="animateBox('decelerate')">Animate</button>
            </div>
            <div class="curve-example">
              <h4>Accelerate (0.4, 0.0, 1.0, 1.0)</h4>
              <div class="motion-box accelerate-easing">Accelerate</div>
              <button mat-button (click)="animateBox('accelerate')">Animate</button>
            </div>
            <div class="curve-example">
              <h4>Emphasized (0.2, 0.0, 0, 1.0)</h4>
              <div class="motion-box emphasized-easing">Emphasized</div>
              <button mat-button (click)="animateBox('emphasized')">Animate</button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Duration Scale</h2>
        <p>Motion durations are based on a structured scale for consistency.</p>
        <div class="demo-example">
          <div class="duration-demo">
            <div class="duration-example" *ngFor="let duration of durations">
              <span class="duration-label">{{ duration.label }}</span>
              <div class="motion-box duration-box" [style.animation-duration.ms]="duration.value">
                {{ duration.value }}ms
              </div>
              <button mat-button (click)="animateDuration(duration.value)">Test</button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Common Animations</h2>
        <p>Practical examples of motion patterns used in Material Design components.</p>
        <div class="demo-example">
          <div class="animation-examples">
            <mat-card class="animation-card">
              <h4>Fade In/Out</h4>
              <div class="fade-demo" [class.visible]="fadeVisible">
                <mat-icon>star</mat-icon>
              </div>
              <button mat-button (click)="toggleFade()">Toggle Fade</button>
            </mat-card>

            <mat-card class="animation-card">
              <h4>Scale</h4>
              <div class="scale-demo" [class.scaled]="scaleActive">
                <mat-icon>favorite</mat-icon>
              </div>
              <button mat-button (click)="toggleScale()">Toggle Scale</button>
            </mat-card>

            <mat-card class="animation-card">
              <h4>Slide</h4>
              <div class="slide-container">
                <div class="slide-demo" [class.slid]="slideActive">
                  <mat-icon>arrow_forward</mat-icon>
                </div>
              </div>
              <button mat-button (click)="toggleSlide()">Toggle Slide</button>
            </mat-card>
          </div>
        </div>
      </section>

      <demo-example-viewer
        title="Motion Tokens"
        [examples]="motionExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './motion.component.scss'
})
export class MotionComponent {
  fadeVisible = true;
  scaleActive = false;
  slideActive = false;

  durations = [
    { label: 'Short 1', value: 50 },
    { label: 'Short 2', value: 100 },
    { label: 'Short 3', value: 150 },
    { label: 'Short 4', value: 200 },
    { label: 'Medium 1', value: 250 },
    { label: 'Medium 2', value: 300 },
    { label: 'Medium 3', value: 350 },
    { label: 'Medium 4', value: 400 },
    { label: 'Long 1', value: 450 },
    { label: 'Long 2', value: 500 },
  ];

  motionExamples = [
    {
      title: 'SCSS Tokens',
      language: 'scss',
      code: `// Motion tokens
$md-sys-motion-easing-standard: cubic-bezier(0.2, 0.0, 0, 1.0);
$md-sys-motion-easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1.0);
$md-sys-motion-easing-accelerate: cubic-bezier(0.4, 0.0, 1.0, 1.0);
$md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0.0, 0, 1.0);

$md-sys-motion-duration-short1: 50ms;
$md-sys-motion-duration-short2: 100ms;
$md-sys-motion-duration-short3: 150ms;
$md-sys-motion-duration-short4: 200ms;
$md-sys-motion-duration-medium1: 250ms;
$md-sys-motion-duration-medium2: 300ms;
$md-sys-motion-duration-medium3: 350ms;
$md-sys-motion-duration-medium4: 400ms;
$md-sys-motion-duration-long1: 450ms;
$md-sys-motion-duration-long2: 500ms;`
    },
    {
      title: 'CSS Usage',
      language: 'css',
      code: `.button {
  transition: all var(--md-sys-motion-duration-short2)
              var(--md-sys-motion-easing-standard);
}

.card {
  animation: slide-in var(--md-sys-motion-duration-medium2)
             var(--md-sys-motion-easing-decelerate);
}

@keyframes slide-in {
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`
    }
  ];

  animateBox(type: string) {
    const boxes = document.querySelectorAll('.motion-box');
    boxes.forEach(box => {
      if (box.classList.contains(`${type}-easing`)) {
        box.classList.remove('animate');
        setTimeout(() => box.classList.add('animate'), 10);
      }
    });
  }

  animateDuration(duration: number) {
    const boxes = document.querySelectorAll('.duration-box');
    boxes.forEach(box => {
      box.classList.remove('animate');
      setTimeout(() => box.classList.add('animate'), 10);
    });
  }

  toggleFade() {
    this.fadeVisible = !this.fadeVisible;
  }

  toggleScale() {
    this.scaleActive = !this.scaleActive;
  }

  toggleSlide() {
    this.slideActive = !this.slideActive;
  }
}