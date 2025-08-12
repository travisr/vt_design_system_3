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
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Floating Action Button (FAB)"
        description="FABs represent the primary action of a screen and are used for a promoted action."
        [links]="resources"
      >
      </demo-page-header>

      <section class="demo-section">
        <h2 class="demo-section-title">FAB Variants</h2>
        <p class="demo-section-description">
          FABs come in different sizes and styles for various use cases. All variants maintain
          consistent theming.
        </p>

        <demo-example-viewer title="All FAB Types" [code]="variantsCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab color="primary" aria-label="Add item">
                <mat-icon>add</mat-icon>
              </button>
              <span class="demo-label">Standard FAB</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-mini-fab color="primary" aria-label="Edit item">
                <mat-icon>edit</mat-icon>
              </button>
              <span class="demo-label">Mini FAB</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab extended color="primary" aria-label="Create new document">
                <mat-icon>add</mat-icon>
                Create New
              </button>
              <span class="demo-label">Extended FAB</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- FAB Colors -->
      <section class="demo-section">
        <h2 class="demo-section-title">FAB Colors</h2>
        <p class="demo-section-description">
          FABs can use different color variants to match the application's theme and indicate
          different action types.
        </p>

        <demo-example-viewer title="Color Variants" [code]="colorsCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab color="primary" aria-label="Primary action">
                <mat-icon>star</mat-icon>
              </button>
              <span class="demo-label">Primary (Default)</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab color="accent" aria-label="Secondary action">
                <mat-icon>favorite</mat-icon>
              </button>
              <span class="demo-label">Accent</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab color="warn" aria-label="Warning action">
                <mat-icon>warning</mat-icon>
              </button>
              <span class="demo-label">Warn</span>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- FAB States -->
      <section class="demo-section">
        <h2 class="demo-section-title">FAB States</h2>
        <p class="demo-section-description">
          FABs support various interactive states including enabled, disabled, and loading states.
        </p>

        <demo-example-viewer title="Interactive States" [code]="statesCode">
          <div class="demo-flex demo-flex--wrap demo-flex--gap-lg demo-flex--align-center">
            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab color="primary" aria-label="Normal state">
                <mat-icon>add</mat-icon>
              </button>
              <span class="demo-label">Normal</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button mat-fab color="primary" disabled aria-label="Disabled state">
                <mat-icon>add</mat-icon>
              </button>
              <span class="demo-label">Disabled</span>
            </div>

            <div class="demo-flex demo-flex--column demo-flex--gap-sm demo-flex--align-center">
              <button
                mat-fab
                color="primary"
                [disabled]="isLoading()"
                (click)="toggleLoading()"
                aria-label="Loading state"
              >
                <mat-icon>{{ isLoading() ? 'hourglass_empty' : 'cloud_upload' }}</mat-icon>
              </button>
              <span class="demo-label">{{ isLoading() ? 'Loading...' : 'Click to Load' }}</span>
            </div>
          </div>
        </demo-example-viewer>
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
        <p>
          Extended FABs with text labels for clearer action communication. Extended FABs are ideal
          for primary actions that benefit from descriptive text.
        </p>
        <div class="demo-example">
          <div class="extended-fabs">
            <div class="extended-fab-group">
              <h4>Primary Actions</h4>
              <div class="extended-fab-row">
                <button mat-fab extended aria-label="Create new document">
                  <mat-icon>add</mat-icon>
                  Create New
                </button>

                <button mat-fab extended aria-label="Compose new message">
                  <mat-icon>edit</mat-icon>
                  Compose
                </button>

                <button mat-fab extended aria-label="Upload files">
                  <mat-icon>upload</mat-icon>
                  Upload
                </button>
              </div>
            </div>

            <div class="extended-fab-group">
              <h4>Secondary Actions</h4>
              <div class="extended-fab-row">
                <button mat-fab extended color="accent" aria-label="Save current changes">
                  <mat-icon>save</mat-icon>
                  Save Changes
                </button>

                <button mat-fab extended color="accent" aria-label="Share document">
                  <mat-icon>share</mat-icon>
                  Share
                </button>

                <button mat-fab extended color="accent" aria-label="Download file">
                  <mat-icon>download</mat-icon>
                  Download
                </button>
              </div>
            </div>

            <div class="extended-fab-group">
              <h4>States</h4>
              <div class="extended-fab-row">
                <button mat-fab extended [disabled]="isLoading()" aria-label="Processing request">
                  <mat-icon>{{ isLoading() ? 'hourglass_empty' : 'send' }}</mat-icon>
                  {{ isLoading() ? 'Processing...' : 'Send Message' }}
                </button>

                <button mat-fab extended disabled aria-label="Action unavailable">
                  <mat-icon>block</mat-icon>
                  Unavailable
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Extended FAB Usage Guidelines</h2>
        <p>
          Best practices for implementing Extended FABs following Material Design 3 specifications.
        </p>
        <div class="demo-example">
          <div class="guidelines-grid">
            <mat-card class="guideline-card">
              <mat-card-header>
                <mat-card-title>✓ Do</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <ul>
                  <li>Use Extended FABs for primary actions that benefit from descriptive text</li>
                  <li>Keep text concise and action-oriented (1-2 words)</li>
                  <li>Include meaningful icons that reinforce the action</li>
                  <li>Provide proper ARIA labels for accessibility</li>
                  <li>Use consistent placement across your application</li>
                </ul>
              </mat-card-content>
            </mat-card>

            <mat-card class="guideline-card">
              <mat-card-header>
                <mat-card-title>✗ Don't</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <ul>
                  <li>Don't use Extended FABs for secondary or tertiary actions</li>
                  <li>Don't use long text that makes the button too wide</li>
                  <li>Don't place multiple Extended FABs in the same view</li>
                  <li>Don't use Extended FABs without icons</li>
                  <li>Don't override the standard Extended FAB height</li>
                </ul>
              </mat-card-content>
            </mat-card>
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

      <demo-example-viewer title="FAB Implementation" [examples]="fabExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './fab.component.scss',
})
export class FabComponent {
  readonly resources = [{ label: 'M3 FAB Guidelines', url: MD3_DOCS.FAB }];

  private _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  variantsCode = {
    html: `<!-- Standard FAB -->
<button mat-fab color="primary" aria-label="Add item">
  <mat-icon>add</mat-icon>
</button>

<!-- Mini FAB -->
<button mat-mini-fab color="primary" aria-label="Edit item">
  <mat-icon>edit</mat-icon>
</button>

<!-- Extended FAB -->
<button mat-fab extended color="primary" aria-label="Create new document">
  <mat-icon>add</mat-icon>
  Create New
</button>`,
    ts: `import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';`,
  };

  colorsCode = {
    html: `<!-- Primary (Default) -->
<button mat-fab color="primary" aria-label="Primary action">
  <mat-icon>star</mat-icon>
</button>

<!-- Accent -->
<button mat-fab color="accent" aria-label="Secondary action">
  <mat-icon>favorite</mat-icon>
</button>

<!-- Warn -->
<button mat-fab color="warn" aria-label="Warning action">
  <mat-icon>warning</mat-icon>
</button>`,
    ts: `// FAB colors follow Material Design 3 color system
// Primary: Main brand color (green in this theme)
// Accent: Secondary actions
// Warn: Destructive or warning actions`,
  };

  statesCode = {
    html: `<!-- Normal State -->
<button mat-fab color="primary" aria-label="Normal state">
  <mat-icon>add</mat-icon>
</button>

<!-- Disabled State -->
<button mat-fab color="primary" disabled aria-label="Disabled state">
  <mat-icon>add</mat-icon>
</button>

<!-- Loading State -->
<button mat-fab color="primary" [disabled]="isLoading" (click)="toggleLoading()" aria-label="Loading state">
  <mat-icon>{{ isLoading ? 'hourglass_empty' : 'cloud_upload' }}</mat-icon>
</button>`,
    ts: `export class MyComponent {
  isLoading = false;

  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}`,
  };

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
<button mat-fab extended aria-label="Create new document">
  <mat-icon>add</mat-icon>
  Create New
</button>`,
    },
    {
      title: 'Extended FAB Variations',
      language: 'html',
      code: `<!-- Primary Extended FAB -->
<button mat-fab extended aria-label="Create new document">
  <mat-icon>add</mat-icon>
  Create New
</button>

<!-- Secondary Extended FAB -->
<button mat-fab extended color="accent" aria-label="Save changes">
  <mat-icon>save</mat-icon>
  Save Changes
</button>

<!-- Loading State -->
<button mat-fab extended [disabled]="isLoading" aria-label="Processing">
  <mat-icon>{{isLoading ? 'hourglass_empty' : 'send'}}</mat-icon>
  {{isLoading ? 'Processing...' : 'Send Message'}}
</button>

<!-- Disabled State -->
<button mat-fab extended disabled aria-label="Action unavailable">
  <mat-icon>block</mat-icon>
  Unavailable
</button>`,
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
</button>`,
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
}`,
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
}`,
    },
  ];

  toggleLoading() {
    this._isLoading.set(true);
    setTimeout(() => {
      this._isLoading.set(false);
    }, 2000);
  }
}
