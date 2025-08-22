import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-typography',
  standalone: true,
  imports: [CommonModule, MatCardModule, PageHeaderComponent],

  template: `
    <div class="demo-page">
      <demo-page-header
        title="Typography"
        description="The Venntier Design System uses Inter as its primary typeface with a refined type scale for optimal readability."
        [mdLink]="docLinks.TYPOGRAPHY"
      >
      </demo-page-header>

      <section class="demo-section">
        <h2 class="demo-section-title">Display Styles</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Display Typography</mat-card-title>
            <mat-card-subtitle
              >Large, attention-grabbing text for hero sections and major
              headings</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="typography-sample">
              <span class="type-label">Display Large · 56px · 200</span>
              <p class="mat-display-large">Build amazing products</p>
            </div>
            <div class="typography-sample">
              <span class="type-label">Display Medium · 44px · 200</span>
              <p class="mat-display-medium">Build amazing products</p>
            </div>
            <div class="typography-sample">
              <span class="type-label">Display Small · 36px · 300</span>
              <p class="mat-display-small">Build amazing products</p>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2 class="demo-section-title">Headline Styles</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Headline Typography</mat-card-title>
            <mat-card-subtitle
              >Section headers and page titles for content hierarchy</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="typography-sample">
              <span class="type-label">Headline Large · 32px · 450</span>
              <p class="mat-headline-large">Create powerful interfaces</p>
            </div>
            <div class="typography-sample">
              <span class="type-label">Headline Medium · 28px · 450</span>
              <p class="mat-headline-medium">Create powerful interfaces</p>
            </div>
            <div class="typography-sample">
              <span class="type-label">Headline Small · 24px · 400</span>
              <p class="mat-headline-small">Create powerful interfaces</p>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2 class="demo-section-title">Body & Label Styles</h2>
        <div class="demo-card-grid">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Title Typography</mat-card-title>
              <mat-card-subtitle>For section headers and emphasis</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="typography-sample">
                <span class="type-label">Title Large · 22px · 450</span>
                <p class="mat-title-large">Section titles and emphasis</p>
              </div>
              <div class="typography-sample">
                <span class="type-label">Title Medium · 18px · 450</span>
                <p class="mat-title-medium">Subsection headers</p>
              </div>
              <div class="typography-sample">
                <span class="type-label">Title Small · 16px · 450</span>
                <p class="mat-title-small">Card titles and labels</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>Body Typography</mat-card-title>
              <mat-card-subtitle>For main content and readable text</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="typography-sample">
                <span class="type-label">Body Large · 16px · 400</span>
                <p class="mat-body-large">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div class="typography-sample">
                <span class="type-label">Body Medium · 14px · 400</span>
                <p class="mat-body-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div class="typography-sample">
                <span class="type-label">Body Small · 12px · 400</span>
                <p class="mat-body-small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>Label Typography</mat-card-title>
              <mat-card-subtitle>For buttons, form labels, and UI elements</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="typography-sample">
                <span class="type-label">Label Large · 14px · 450</span>
                <p class="mat-label-large">BUTTON TEXT</p>
              </div>
              <div class="typography-sample">
                <span class="type-label">Label Medium · 12px · 450</span>
                <p class="mat-label-medium">SMALL BUTTON</p>
              </div>
              <div class="typography-sample">
                <span class="type-label">Label Small · 11px · 450</span>
                <p class="mat-label-small">CAPTION TEXT</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </section>
    </div>
  `,
})
export class TypographyComponent {
  readonly docLinks = MD3_DOCS;
}
