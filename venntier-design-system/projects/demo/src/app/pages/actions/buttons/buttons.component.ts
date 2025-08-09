import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';

@Component({
  selector: 'demo-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PageHeaderComponent,
    ExampleViewerComponent
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Buttons"
        description="Buttons help people take action, such as sending an email, sharing a document, or liking a comment."
        mdLink="https://m3.material.io/components/buttons">
      </demo-page-header>

      <!-- Button Variants -->
      <section class="demo-section">
        <h2 class="demo-section-title">Button Variants</h2>
        <p class="demo-section-description">
          Material Design 3 offers five button types. Each type has its own emphasis level and use case.
        </p>

        <demo-example-viewer 
          title="All Button Types"
          [code]="variantsCode">
          <div class="demo-example-row">
            <button mat-fab color="primary">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-fab extended color="primary">
              <mat-icon>add</mat-icon>
              Extended FAB
            </button>
            <button mat-raised-button color="primary">Elevated</button>
            <button mat-flat-button color="primary">Filled</button>
            <button mat-flat-button>Filled Tonal</button>
            <button mat-stroked-button>Outlined</button>
            <button mat-button>Text</button>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Interactive States -->
      <section class="demo-section">
        <h2 class="demo-section-title">Interactive States</h2>
        <p class="demo-section-description">
          Buttons have multiple interactive states including enabled, hovered, focused, pressed, and disabled.
        </p>

        <demo-example-viewer 
          title="Button States"
          [code]="statesCode">
          <div class="demo-grid cols-3">
            <div class="demo-example-column">
              <span class="demo-variant-label">Enabled</span>
              <button mat-flat-button color="primary">Primary</button>
            </div>
            <div class="demo-example-column">
              <span class="demo-variant-label">Disabled</span>
              <button mat-flat-button color="primary" disabled>Primary</button>
            </div>
            <div class="demo-example-column">
              <span class="demo-variant-label">Loading</span>
              <button mat-flat-button color="primary" disabled>
                <mat-spinner diameter="20" style="display: inline-block; margin-right: 8px;"></mat-spinner>
                Loading...
              </button>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- With Icons -->
      <section class="demo-section">
        <h2 class="demo-section-title">Buttons with Icons</h2>
        <p class="demo-section-description">
          Icons can reinforce the button's action and improve visual recognition.
        </p>

        <demo-example-viewer 
          title="Icon Buttons"
          [code]="iconCode">
          <div class="demo-example-row">
            <button mat-flat-button color="primary">
              <mat-icon>send</mat-icon>
              Send Email
            </button>
            <button mat-stroked-button>
              <mat-icon>download</mat-icon>
              Download
            </button>
            <button mat-button>
              <mat-icon>share</mat-icon>
              Share
            </button>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Button Groups -->
      <section class="demo-section">
        <h2 class="demo-section-title">Button Groups</h2>
        <p class="demo-section-description">
          Related actions can be grouped together for better organization.
        </p>

        <demo-example-viewer 
          title="Grouped Actions"
          [code]="groupCode">
          <div class="demo-example-row">
            <button mat-stroked-button>Cancel</button>
            <button mat-flat-button color="primary">Save</button>
          </div>
        </demo-example-viewer>
      </section>
    </div>
  `,
  styles: [`
    @import '../../../shared/styles/demo-shared.scss';
  `]
})
export class ButtonsComponent {
  variantsCode = {
    html: `<button mat-fab color="primary">
  <mat-icon>add</mat-icon>
</button>
<button mat-raised-button color="primary">Elevated</button>
<button mat-flat-button color="primary">Filled</button>
<button mat-flat-button>Filled Tonal</button>
<button mat-stroked-button>Outlined</button>
<button mat-button>Text</button>`,
    ts: `import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';`
  };

  statesCode = {
    html: `<button mat-flat-button color="primary">Enabled</button>
<button mat-flat-button color="primary" disabled>Disabled</button>`
  };

  iconCode = {
    html: `<button mat-flat-button color="primary">
  <mat-icon>send</mat-icon>
  Send Email
</button>`
  };

  groupCode = {
    html: `<div class="button-group">
  <button mat-stroked-button>Cancel</button>
  <button mat-flat-button color="primary">Save</button>
</div>`
  };
}