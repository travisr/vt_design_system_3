import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VenntierThemeService } from '@venntier/design-system';

interface NavSection {
  title: string;
  path: string;
  items: NavItem[];
  icon: string;
}

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  template: `
    <mat-sidenav-container class="demo-container vt-theme">
      <!-- Sidebar -->
      <mat-sidenav mode="side" opened class="vt-sidenav-standard">
        <nav role="navigation" aria-label="Main navigation">
          <div class="vt-sidenav-header">
            <div class="vt-sidenav-logo">
              <mat-icon>layers</mat-icon>
              <span>Venntier DS</span>
            </div>
          </div>
          
          <div class="vt-sidenav-content">
            @for (section of navSections; track section.title) {
              <div class="vt-nav-section">
                <div class="vt-nav-section-title">
                  {{ section.title }}
                </div>
                <mat-nav-list>
                  @for (item of section.items; track item.path) {
                    <a mat-list-item 
                       [routerLink]="[section.path, item.path]"
                       routerLinkActive="active">
                      @if (item.icon) {
                        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                      }
                      <span matListItemTitle>{{ item.label }}</span>
                    </a>
                  }
                </mat-nav-list>
              </div>
            }
          </div>
        </nav>
      </mat-sidenav>

      <!-- Main Content -->
      <mat-sidenav-content class="demo-content">
        <!-- Top Bar -->
        <header role="banner">
          <mat-toolbar class="demo-toolbar">
            <h1>Venntier Design System</h1>
            <span class="spacer"></span>
            <button mat-icon-button (click)="toggleTheme()" matTooltip="Toggle theme" aria-label="Toggle dark mode">
              <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            </button>
          </mat-toolbar>
        </header>

        <!-- Router Outlet -->
        <main role="main" class="content-wrapper">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly themeService = inject(VenntierThemeService);
  private readonly router = inject(Router);
  
  readonly isDarkMode = this.themeService.isDark;
  readonly themeClass = this.themeService.themeClass;
  
  readonly navSections: NavSection[] = [
    {
      title: 'Foundation',
      path: '/foundation',
      icon: 'foundation',
      items: [
        { label: 'Typography', path: 'typography', icon: 'text_fields' },
        { label: 'Colors & Themes', path: 'colors', icon: 'palette' },
        { label: 'Spacing & Layout', path: 'spacing', icon: 'space_bar' },
        { label: 'Motion', path: 'motion', icon: 'animation' },
        { label: 'Icons', path: 'icons', icon: 'emoji_symbols' }
      ]
    },
    {
      title: 'Actions',
      path: '/actions',
      icon: 'touch_app',
      items: [
        { label: 'Buttons', path: 'buttons', icon: 'smart_button' },
        { label: 'FAB', path: 'fab', icon: 'add_circle' },
        { label: 'Icon Buttons', path: 'icon-buttons', icon: 'radio_button_unchecked' },
        { label: 'Segmented Buttons', path: 'segmented-buttons', icon: 'view_week' },
        { label: 'Chips', path: 'chips', icon: 'label' }
      ]
    },
    {
      title: 'Forms & Inputs',
      path: '/forms',
      icon: 'edit_note',
      items: [
        { label: 'Text Fields', path: 'text-fields', icon: 'text_fields' },
        { label: 'Select', path: 'select', icon: 'arrow_drop_down' },
        { label: 'Checkboxes', path: 'checkboxes', icon: 'check_box' },
        { label: 'Radio Buttons', path: 'radio-buttons', icon: 'radio_button_checked' },
        { label: 'Switches', path: 'switches', icon: 'toggle_on' },
        { label: 'Sliders', path: 'sliders', icon: 'tune' },
        { label: 'Date & Time', path: 'date-time', icon: 'calendar_today' }
      ]
    },
    {
      title: 'Navigation',
      path: '/navigation',
      icon: 'navigation',
      items: [
        { label: 'Navigation Bar', path: 'navbar', icon: 'call_to_action' },
        { label: 'Navigation Rail', path: 'rail', icon: 'view_sidebar' },
        { label: 'Navigation Drawer', path: 'drawer', icon: 'menu_open' },
        { label: 'Tabs', path: 'tabs', icon: 'tab' },
        { label: 'Top App Bar', path: 'app-bar', icon: 'web_asset' }
      ]
    },
    {
      title: 'Communication',
      path: '/communication',
      icon: 'message',
      items: [
        { label: 'Badges', path: 'badges', icon: 'notifications' },
        { label: 'Snackbar', path: 'snackbar', icon: 'announcement' },
        { label: 'Tooltips', path: 'tooltips', icon: 'help' },
        { label: 'Dialogs', path: 'dialogs', icon: 'chat_bubble' },
        { label: 'Sheets', path: 'sheets', icon: 'vertical_split' }
      ]
    },
    {
      title: 'Data Display',
      path: '/data-display',
      icon: 'table_view',
      items: [
        { label: 'Cards', path: 'cards', icon: 'dashboard' },
        { label: 'Lists', path: 'lists', icon: 'list' },
        { label: 'Tables', path: 'tables', icon: 'table_chart' },
        { label: 'Dividers', path: 'dividers', icon: 'horizontal_rule' }
      ]
    },
    {
      title: 'Feedback',
      path: '/feedback',
      icon: 'feedback',
      items: [
        { label: 'Progress', path: 'progress', icon: 'donut_large' },
        { label: 'Skeleton', path: 'skeleton', icon: 'content_copy' },
        { label: 'Loading', path: 'loading', icon: 'loop' },
        { label: 'Empty States', path: 'empty', icon: 'inbox' }
      ]
    },
    {
      title: 'Layout',
      path: '/layout',
      icon: 'dashboard',
      items: [
        { label: 'Grid System', path: 'grid', icon: 'grid_on' },
        { label: 'Responsive', path: 'responsive', icon: 'devices' },
        { label: 'Expansion Panels', path: 'expansion', icon: 'expand_more' }
      ]
    }
  ];
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}// test comment
