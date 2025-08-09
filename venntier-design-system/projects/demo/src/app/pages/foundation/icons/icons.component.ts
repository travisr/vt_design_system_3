import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';

@Component({
  selector: 'demo-icons',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    PageHeaderComponent,
    ExampleViewerComponent
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Icons"
        description="Icons are visual symbols that represent concepts, objects, or actions. Material Design uses filled and outlined icon styles."
        [links]="[
          { label: 'Material Icons', url: 'https://fonts.google.com/icons' },
          { label: 'M3 Icon Guidelines', url: 'https://m3.material.io/styles/icons' }
        ]">
      </demo-page-header>

      <section class="demo-section">
        <h2>Icon Styles</h2>
        <p>Material Design provides two main icon styles: filled and outlined.</p>
        <div class="demo-example">
          <div class="icon-styles">
            <div class="style-group">
              <h4>Filled Icons</h4>
              <div class="icon-grid">
                <div class="icon-item">
                  <mat-icon>home</mat-icon>
                  <span>home</span>
                </div>
                <div class="icon-item">
                  <mat-icon>favorite</mat-icon>
                  <span>favorite</span>
                </div>
                <div class="icon-item">
                  <mat-icon>star</mat-icon>
                  <span>star</span>
                </div>
                <div class="icon-item">
                  <mat-icon>settings</mat-icon>
                  <span>settings</span>
                </div>
                <div class="icon-item">
                  <mat-icon>person</mat-icon>
                  <span>person</span>
                </div>
                <div class="icon-item">
                  <mat-icon>shopping_cart</mat-icon>
                  <span>shopping_cart</span>
                </div>
              </div>
            </div>
            
            <div class="style-group">
              <h4>Outlined Icons</h4>
              <div class="icon-grid">
                <div class="icon-item">
                  <mat-icon>home</mat-icon>
                  <span>home_outlined</span>
                </div>
                <div class="icon-item">
                  <mat-icon>favorite_border</mat-icon>
                  <span>favorite_border</span>
                </div>
                <div class="icon-item">
                  <mat-icon>star_border</mat-icon>
                  <span>star_border</span>
                </div>
                <div class="icon-item">
                  <mat-icon>settings</mat-icon>
                  <span>settings_outlined</span>
                </div>
                <div class="icon-item">
                  <mat-icon>person_outline</mat-icon>
                  <span>person_outline</span>
                </div>
                <div class="icon-item">
                  <mat-icon>shopping_cart</mat-icon>
                  <span>shopping_cart_outlined</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Sizes</h2>
        <p>Icons can be displayed in different sizes for various contexts.</p>
        <div class="demo-example">
          <div class="size-demo">
            <div class="size-group">
              <h4>18px - Small</h4>
              <mat-icon class="size-18">star</mat-icon>
            </div>
            <div class="size-group">
              <h4>24px - Default</h4>
              <mat-icon class="size-24">star</mat-icon>
            </div>
            <div class="size-group">
              <h4>36px - Medium</h4>
              <mat-icon class="size-36">star</mat-icon>
            </div>
            <div class="size-group">
              <h4>48px - Large</h4>
              <mat-icon class="size-48">star</mat-icon>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Icon Colors</h2>
        <p>Icons adapt to the current theme and can use semantic colors.</p>
        <div class="demo-example">
          <div class="color-demo">
            <div class="color-group">
              <h4>On Surface</h4>
              <mat-icon class="color-on-surface">info</mat-icon>
            </div>
            <div class="color-group">
              <h4>Primary</h4>
              <mat-icon class="color-primary">star</mat-icon>
            </div>
            <div class="color-group">
              <h4>Secondary</h4>
              <mat-icon class="color-secondary">favorite</mat-icon>
            </div>
            <div class="color-group">
              <h4>Error</h4>
              <mat-icon class="color-error">error</mat-icon>
            </div>
            <div class="color-group">
              <h4>Success</h4>
              <mat-icon class="color-success">check_circle</mat-icon>
            </div>
            <div class="color-group">
              <h4>Warning</h4>
              <mat-icon class="color-warning">warning</mat-icon>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Common Icon Categories</h2>
        <p>Examples of frequently used icon categories in applications.</p>
        <div class="demo-example">
          <div class="category-demo">
            <mat-card class="category-card">
              <h4>Navigation</h4>
              <div class="category-icons">
                <mat-icon>menu</mat-icon>
                <mat-icon>arrow_back</mat-icon>
                <mat-icon>arrow_forward</mat-icon>
                <mat-icon>expand_more</mat-icon>
                <mat-icon>expand_less</mat-icon>
                <mat-icon>close</mat-icon>
              </div>
            </mat-card>

            <mat-card class="category-card">
              <h4>Actions</h4>
              <div class="category-icons">
                <mat-icon>add</mat-icon>
                <mat-icon>edit</mat-icon>
                <mat-icon>delete</mat-icon>
                <mat-icon>save</mat-icon>
                <mat-icon>share</mat-icon>
                <mat-icon>download</mat-icon>
              </div>
            </mat-card>

            <mat-card class="category-card">
              <h4>Communication</h4>
              <div class="category-icons">
                <mat-icon>email</mat-icon>
                <mat-icon>phone</mat-icon>
                <mat-icon>chat</mat-icon>
                <mat-icon>notifications</mat-icon>
                <mat-icon>send</mat-icon>
                <mat-icon>forum</mat-icon>
              </div>
            </mat-card>

            <mat-card class="category-card">
              <h4>Media</h4>
              <div class="category-icons">
                <mat-icon>play_arrow</mat-icon>
                <mat-icon>pause</mat-icon>
                <mat-icon>stop</mat-icon>
                <mat-icon>volume_up</mat-icon>
                <mat-icon>image</mat-icon>
                <mat-icon>video_call</mat-icon>
              </div>
            </mat-card>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Interactive Icons</h2>
        <p>Icons in interactive elements like buttons and chips.</p>
        <div class="demo-example">
          <div class="interactive-demo">
            <div class="demo-group">
              <h4>Icon Buttons</h4>
              <button mat-icon-button>
                <mat-icon>favorite</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon>share</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon>more_vert</mat-icon>
              </button>
            </div>

            <div class="demo-group">
              <h4>Buttons with Icons</h4>
              <button mat-raised-button>
                <mat-icon>add</mat-icon>
                Create
              </button>
              <button mat-stroked-button>
                <mat-icon>download</mat-icon>
                Download
              </button>
            </div>

            <div class="demo-group">
              <h4>Chips with Icons</h4>
              <mat-chip-set>
                <mat-chip>
                  <mat-icon matChipAvatar>account_circle</mat-icon>
                  User
                </mat-chip>
                <mat-chip>
                  <mat-icon matChipAvatar>label</mat-icon>
                  Tag
                </mat-chip>
              </mat-chip-set>
            </div>
          </div>
        </div>
      </section>

      <demo-example-viewer
        title="Icon Usage"
        [examples]="iconExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  iconExamples = [
    {
      title: 'Basic Icon Usage',
      language: 'html',
      code: `<!-- Basic icon -->
<mat-icon>star</mat-icon>

<!-- Icon with custom size -->
<mat-icon class="size-48">favorite</mat-icon>

<!-- Colored icon -->
<mat-icon class="color-primary">home</mat-icon>`
    },
    {
      title: 'Icon Sizes (SCSS)',
      language: 'scss',
      code: `.icon-18 {
  font-size: 18px;
  width: 18px;
  height: 18px;
}

.icon-24 {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

.icon-36 {
  font-size: 36px;
  width: 36px;
  height: 36px;
}`
    },
    {
      title: 'Icon Colors (SCSS)',
      language: 'scss',
      code: `.color-primary {
  color: var(--md-sys-color-primary);
}

.color-secondary {
  color: var(--md-sys-color-secondary);
}

.color-error {
  color: var(--md-sys-color-error);
}`
    },
    {
      title: 'Interactive Icons',
      language: 'html',
      code: `<!-- Icon button -->
<button mat-icon-button>
  <mat-icon>favorite</mat-icon>
</button>

<!-- Button with icon -->
<button mat-raised-button>
  <mat-icon>add</mat-icon>
  Create New
</button>

<!-- Chip with icon -->
<mat-chip>
  <mat-icon matChipAvatar>person</mat-icon>
  User Name
</mat-chip>`
    }
  ];
}