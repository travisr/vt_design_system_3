import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-fab',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    PageHeaderComponent,
    ExampleViewerComponent
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Floating Action Button (FAB)"
        description="FABs represent the primary action of a screen and are used for a promoted action."
        [links]="resources">
      </demo-page-header>

      <section class="demo-section">
        <h2>FAB Variants</h2>
        <p>FABs come in different sizes and styles for various use cases.</p>
        <div class="demo-example">
          <div class="fab-variants">
            <div class="fab-group">
              <h4>Standard FAB</h4>
              <button mat-fab aria-label="Add item">
                <mat-icon>add</mat-icon>
              </button>
            </div>

            <div class="fab-group">
              <h4>Mini FAB</h4>
              <button mat-mini-fab aria-label="Edit item">
                <mat-icon>edit</mat-icon>
              </button>
            </div>

            <div class="fab-group">
              <h4>Extended FAB</h4>
              <button mat-fab extended>
                <mat-icon>add</mat-icon>
                Create New
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>FAB Colors</h2>
        <p>FABs can use different color variants to match the application's theme.</p>
        <div class="demo-example">
          <div class="fab-colors">
            <div class="color-group">
              <h4>Primary (Default)</h4>
              <button mat-fab>
                <mat-icon>star</mat-icon>
              </button>
            </div>

            <div class="color-group">
              <h4>Accent</h4>
              <button mat-fab color="accent">
                <mat-icon>favorite</mat-icon>
              </button>
            </div>

            <div class="color-group">
              <h4>Warn</h4>
              <button mat-fab color="warn">
                <mat-icon>warning</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>FAB States</h2>
        <p>FABs support various interactive states including disabled and loading states.</p>
        <div class="demo-example">
          <div class="fab-states">
            <div class="state-group">
              <h4>Normal</h4>
              <button mat-fab>
                <mat-icon>add</mat-icon>
              </button>
            </div>

            <div class="state-group">
              <h4>Disabled</h4>
              <button mat-fab disabled>
                <mat-icon>add</mat-icon>
              </button>
            </div>

            <div class="state-group">
              <h4>Loading</h4>
              <button mat-fab [disabled]="isLoading()" (click)="toggleLoading()">
                <mat-icon>{{ isLoading() ? 'hourglass_empty' : 'cloud_upload' }}</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Common FAB Icons</h2>
        <p>Examples of commonly used icons for different FAB actions.</p>
        <div class="demo-example">
          <div class="common-fabs">
            <div class="fab-example">
              <button mat-fab matTooltip="Create new item">
                <mat-icon>add</mat-icon>
              </button>
              <span>Create</span>
            </div>

            <div class="fab-example">
              <button mat-fab matTooltip="Edit current item">
                <mat-icon>edit</mat-icon>
              </button>
              <span>Edit</span>
            </div>

            <div class="fab-example">
              <button mat-fab matTooltip="Send message">
                <mat-icon>send</mat-icon>
              </button>
              <span>Send</span>
            </div>

            <div class="fab-example">
              <button mat-fab matTooltip="Share content">
                <mat-icon>share</mat-icon>
              </button>
              <span>Share</span>
            </div>

            <div class="fab-example">
              <button mat-fab matTooltip="Navigate">
                <mat-icon>navigation</mat-icon>
              </button>
              <span>Navigate</span>
            </div>

            <div class="fab-example">
              <button mat-fab matTooltip="Call">
                <mat-icon>call</mat-icon>
              </button>
              <span>Call</span>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Extended FAB Variations</h2>
        <p>Extended FABs with text labels for clearer action communication.</p>
        <div class="demo-example">
          <div class="extended-fabs">
            <button mat-fab extended>
              <mat-icon>add</mat-icon>
              Create New
            </button>

            <button mat-fab extended>
              <mat-icon>edit</mat-icon>
              Edit Document
            </button>

            <button mat-fab extended>
              <mat-icon>upload</mat-icon>
              Upload File
            </button>

            <button mat-fab extended color="accent">
              <mat-icon>save</mat-icon>
              Save Changes
            </button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>FAB Positioning</h2>
        <p>Examples of how FABs are typically positioned in layouts.</p>
        <div class="demo-example">
          <div class="positioning-demo">
            <mat-card class="layout-example">
              <h4>Bottom Right (Most Common)</h4>
              <div class="layout-container">
                <div class="content-area">
                  <p>Main content area...</p>
                </div>
                <button mat-fab class="fab-bottom-right">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
            </mat-card>

            <mat-card class="layout-example">
              <h4>Bottom Center</h4>
              <div class="layout-container">
                <div class="content-area">
                  <p>Main content area...</p>
                </div>
                <button mat-fab class="fab-bottom-center">
                  <mat-icon>navigation</mat-icon>
                </button>
              </div>
            </mat-card>
          </div>
        </div>
      </section>

      <demo-example-viewer
        title="FAB Implementation"
        [examples]="fabExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './fab.component.scss'
})
export class FabComponent {
  readonly resources = [
    { label: 'M3 FAB Guidelines', url: MD3_DOCS.FAB }
  ];

  private _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  fabExamples = [
    {
      title: 'Basic FAB Usage',
      language: 'html',
      code: `<!-- Standard FAB -->
<button mat-fab aria-label="Add item">
  <mat-icon>add</mat-icon>
</button>

<!-- Mini FAB -->
<button mat-mini-fab aria-label="Edit item">
  <mat-icon>edit</mat-icon>
</button>

<!-- Extended FAB -->
<button mat-fab extended>
  <mat-icon>add</mat-icon>
  Create New
</button>`
    },
    {
      title: 'FAB Colors',
      language: 'html',
      code: `<!-- Primary (default) -->
<button mat-fab>
  <mat-icon>star</mat-icon>
</button>

<!-- Accent -->
<button mat-fab color="accent">
  <mat-icon>favorite</mat-icon>
</button>

<!-- Warn -->
<button mat-fab color="warn">
  <mat-icon>warning</mat-icon>
</button>`
    },
    {
      title: 'FAB Positioning (CSS)',
      language: 'scss',
      code: `.fab-fixed {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}

.fab-bottom-center {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}

.fab-inline {
  margin: 8px;
}`
    },
    {
      title: 'FAB with Actions',
      language: 'typescript',
      code: `export class MyComponent {
  onCreateNew() {
    // Handle create action
    console.log('Creating new item...');
  }

  onEdit() {
    // Handle edit action
    console.log('Editing item...');
  }
}`
    }
  ];

  toggleLoading() {
    this._isLoading.set(true);
    setTimeout(() => {
      this._isLoading.set(false);
    }, 2000);
  }
}