import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'vt-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [type]="type()"
      (click)="handleClick($event)"
      mat-ripple
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class VtButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly fullWidth = input<boolean>(false);

  readonly vtClick = output<MouseEvent>();

  buttonClasses() {
    return [
      'vt-button',
      `vt-button--${this.variant()}`,
      `vt-button--${this.size()}`,
      this.fullWidth() ? 'vt-button--full-width' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  handleClick(event: MouseEvent) {
    if (!this.disabled()) {
      this.vtClick.emit(event);
    }
  }
}
