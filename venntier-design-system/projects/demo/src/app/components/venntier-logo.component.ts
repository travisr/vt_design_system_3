import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venntier-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [attr.aria-label]="'Venntier logo'"
    >
      <defs>
        <!-- Define the intersection area -->
        <clipPath id="leftCircleClip">
          <circle cx="12" cy="12" r="10" />
        </clipPath>
        <clipPath id="rightCircleClip">
          <circle cx="24" cy="12" r="10" />
        </clipPath>
      </defs>

      <!-- First draw the white circles -->
      <!-- Left circle - white fill with dark border -->
      <circle
        cx="12"
        cy="12"
        r="10"
        [attr.fill]="circleColor"
        [attr.stroke]="borderColor"
        [attr.stroke-width]="strokeWidth"
      />

      <!-- Right circle - white fill with dark border -->
      <circle
        cx="24"
        cy="12"
        r="10"
        [attr.fill]="circleColor"
        [attr.stroke]="borderColor"
        [attr.stroke-width]="strokeWidth"
      />

      <!-- Then draw the intersection area on top -->
      <circle
        cx="12"
        cy="12"
        r="10"
        [attr.fill]="intersectionColor"
        clip-path="url(#rightCircleClip)"
      />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        transition: all 0.2s ease;
      }

      :host:hover svg {
        transform: scale(1.05);
      }
    `,
  ],
})
export class VenntierLogoComponent {
  @Input() size: number = 32;
  @Input() circleColor: string = 'transparent';
  @Input() borderColor: string = '#2d2d2d';
  @Input() intersectionColor: string = '#4a4a4a';
  @Input() strokeWidth: number = 1.5;
}
