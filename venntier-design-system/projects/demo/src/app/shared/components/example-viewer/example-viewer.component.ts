import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

interface Example {
  title: string;
  language: string;
  code: string;
}

@Component({
  selector: 'demo-example-viewer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTabsModule],
  template: `
    <div class="example-viewer">
      @if (title) {
        <h3 class="example-title">{{ title }}</h3>
      }
      
      <div class="example-content">
        <ng-content></ng-content>
      </div>
      
      @if (examples && examples.length > 0) {
        <div class="example-actions">
          <button mat-button (click)="toggleCode()">
            <mat-icon>{{ showCode() ? 'code_off' : 'code' }}</mat-icon>
            {{ showCode() ? 'Hide' : 'Show' }} Code
          </button>
        </div>
        
        @if (showCode()) {
          <mat-tab-group class="example-code-tabs">
            @for (example of examples; track example.title) {
              <mat-tab [label]="example.title">
                <div class="demo-code">
                  <pre><code>{{ example.code }}</code></pre>
                </div>
              </mat-tab>
            }
          </mat-tab-group>
        }
      }
      
      @if (code) {
        <div class="example-actions">
          <button mat-button (click)="toggleCode()">
            <mat-icon>{{ showCode() ? 'code_off' : 'code' }}</mat-icon>
            {{ showCode() ? 'Hide' : 'Show' }} Code
          </button>
        </div>
        
        @if (showCode()) {
          <mat-tab-group class="example-code-tabs">
            @if (code.html) {
              <mat-tab label="HTML">
                <div class="demo-code">
                  <pre><code>{{ code.html }}</code></pre>
                </div>
              </mat-tab>
            }
            @if (code.ts) {
              <mat-tab label="TypeScript">
                <div class="demo-code">
                  <pre><code>{{ code.ts }}</code></pre>
                </div>
              </mat-tab>
            }
            @if (code.scss) {
              <mat-tab label="SCSS">
                <div class="demo-code">
                  <pre><code>{{ code.scss }}</code></pre>
                </div>
              </mat-tab>
            }
          </mat-tab-group>
        }
      }
    </div>
  `,
  styles: [`
    .example-viewer {
      background: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--md-sys-shape-corner-medium, 12px);
      margin-bottom: var(--md-sys-spacing-24, 24px);
      overflow: hidden;
    }
    
    .example-title {
      font-size: var(--md-sys-typescale-title-medium-size, 16px);
      font-weight: var(--md-sys-typescale-title-medium-weight, 500);
      margin: 0;
      padding: var(--md-sys-spacing-16, 16px);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-surface-container-low);
    }
    
    .example-content {
      padding: var(--md-sys-spacing-24, 24px);
    }
    
    .example-actions {
      padding: var(--md-sys-spacing-8, 8px) var(--md-sys-spacing-16, 16px);
      border-top: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-surface-container-low);
    }
    
    .example-code-tabs {
      border-top: 1px solid var(--md-sys-color-outline-variant);
      
      ::ng-deep .mat-mdc-tab-body-content {
        padding: 0;
      }
    }
    
    .demo-code {
      background: var(--md-sys-color-surface-container-lowest);
      padding: var(--md-sys-spacing-16, 16px);
      overflow-x: auto;
      
      pre {
        margin: 0;
        font-family: 'JetBrains Mono', 'Consolas', monospace;
        font-size: 13px;
        line-height: 1.5;
      }
      
      code {
        color: var(--md-sys-color-on-surface);
      }
    }
  `]
})
export class ExampleViewerComponent {
  @Input() title = '';
  @Input() code?: { html?: string; ts?: string; scss?: string };
  @Input() examples: Example[] = [];
  
  showCode = signal(false);
  
  toggleCode() {
    this.showCode.update(v => !v);
  }
}