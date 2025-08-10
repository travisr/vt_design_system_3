import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Link {
  label: string;
  url: string;
}

@Component({
  selector: 'demo-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="page-header">
      <h1 class="page-title">{{ title }}</h1>
      @if (description) {
        <p class="page-description">{{ description }}</p>
      }
      @if (mdLink) {
        <a [href]="mdLink" target="_blank" rel="noopener" class="page-link">
          View Material Design Docs →
        </a>
      }
      @if (links && links.length > 0) {
        <div class="page-links">
          @for (link of links; track link.url) {
            <a [href]="link.url" target="_blank" rel="noopener" class="page-link">
              {{ link.label }} →
            </a>
          }
        </div>
      }
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .page-header {
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--md-sys-color-outline-variant, #e5e5e5);
      }

      .page-title {
        font-size: var(--md-sys-typescale-display-small-size, 36px);
        font-weight: var(--md-sys-typescale-display-small-weight, 400);
        line-height: var(--md-sys-typescale-display-small-line-height, 44px);
        color: var(--md-sys-color-on-surface);
        margin: 0 0 var(--md-sys-spacing-8, 8px) 0;
      }

      .page-description {
        font-size: var(--md-sys-typescale-body-large-size, 16px);
        color: var(--md-sys-color-on-surface-variant);
        margin: 0 0 var(--md-sys-spacing-16, 16px) 0;
        max-width: 600px;
      }

      .page-link {
        display: inline-flex;
        align-items: center;
        font-size: var(--md-sys-typescale-body-medium-size, 14px);
        color: var(--md-sys-color-primary);
        text-decoration: none;
        margin-right: var(--md-sys-spacing-16, 16px);

        &:hover {
          text-decoration: underline;
        }
      }

      .page-links {
        display: flex;
        gap: var(--md-sys-spacing-16, 16px);
        flex-wrap: wrap;
      }
    `,
  ],
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() mdLink = '';
  @Input() links: Link[] = [];
}
