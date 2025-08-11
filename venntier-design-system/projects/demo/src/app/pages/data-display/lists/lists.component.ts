import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  avatar?: string;
  selected?: boolean;
  disabled?: boolean;
  badge?: number;
  timestamp?: string;
}

@Component({
  selector: 'demo-lists',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatBadgeModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Lists"
        description="Lists are continuous, vertical indexes of text or images. They help organize content in a scannable way."
        [links]="resources"
      >
      </demo-page-header>

      <!-- Density Selector for Testing -->
      <demo-example-viewer title="Density Selector">
        <div class="density-selector">
          <mat-form-field>
            <mat-label>Select Density</mat-label>
            <mat-select
              [value]="selectedDensity()"
              (selectionChange)="onDensityChange($event.value)"
              panelWidth="auto"
            >
              @for (option of densityOptions; track option.value) {
                <mat-option [value]="option.value">
                  {{ option.label }} - {{ option.description }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
          <p class="density-info">
            Current density: <strong>{{ selectedDensity() }}</strong>
            <br />
            <small
              >This density will be applied to all lists below to test the MD3 density
              variations.</small
            >
          </p>
        </div>
      </demo-example-viewer>

      <!-- Single Line Lists -->
      <demo-example-viewer title="Single Line Lists">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Basic Single Line</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of basicItems(); track item.id) {
                <mat-list-item>
                  <span matListItemTitle>{{ item.title }}</span>
                </mat-list-item>
              }
            </mat-list>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>With Leading Icons</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of iconItems(); track item.id) {
                <mat-list-item>
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                </mat-list-item>
              }
            </mat-list>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>With Trailing Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of actionItems(); track item.id) {
                <mat-list-item>
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                  <button mat-icon-button matListItemMeta (click)="onItemAction(item.id, 'more')">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                </mat-list-item>
              }
            </mat-list>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>

      <!-- Two Line Lists -->
      <demo-example-viewer title="Two Line Lists">
        <mat-card>
          <mat-card-header>
            <mat-card-title>With Subtitles</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of twoLineItems(); track item.id) {
                <mat-list-item>
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                  <span matListItemLine>{{ item.subtitle }}</span>
                </mat-list-item>
              }
            </mat-list>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>With Avatars and Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of contactItems(); track item.id) {
                <mat-list-item>
                  <div matListItemAvatar class="avatar-placeholder">
                    {{ item.title.charAt(0) }}
                  </div>
                  <span matListItemTitle>{{ item.title }}</span>
                  <span matListItemLine>{{ item.subtitle }}</span>
                  @if (item.badge) {
                    <span matListItemMeta matBadge="{{ item.badge }}" matBadgeColor="accent">
                      <mat-icon>message</mat-icon>
                    </span>
                  } @else {
                    <button mat-icon-button matListItemMeta (click)="onItemAction(item.id, 'call')">
                      <mat-icon>call</mat-icon>
                    </button>
                  }
                </mat-list-item>
              }
            </mat-list>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>

      <!-- Three Line Lists -->
      <demo-example-viewer title="Three Line Lists">
        <mat-card>
          <mat-card-header>
            <mat-card-title>With Descriptions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of threeLineItems(); track item.id) {
                <mat-list-item>
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                  <span matListItemLine>{{ item.subtitle }}</span>
                  <span matListItemLine>{{ item.description }}</span>
                  @if (item.timestamp) {
                    <span matListItemMeta class="timestamp">{{ item.timestamp }}</span>
                  }
                </mat-list-item>
              }
            </mat-list>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>

      <!-- Interactive Lists -->
      <demo-example-viewer title="Interactive Lists">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Navigation List</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-nav-list>
              @for (item of navItems(); track item.id) {
                <a mat-list-item [class.active]="item.selected" (click)="onNavItemClick(item.id)">
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                  @if (item.badge) {
                    <span matListItemMeta matBadge="{{ item.badge }}" matBadgeSize="small"> </span>
                  }
                </a>
              }
            </mat-nav-list>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Selection List</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-selection-list (selectionChange)="onSelectionChange($event)">
              @for (item of selectionItems(); track item.id) {
                <mat-list-option
                  [value]="item.id"
                  [selected]="item.selected"
                  [disabled]="item.disabled"
                >
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                  @if (item.subtitle) {
                    <span matListItemLine>{{ item.subtitle }}</span>
                  }
                </mat-list-option>
              }
            </mat-selection-list>
            <p class="selection-result">Selected: {{ getSelectedItems().join(', ') || 'None' }}</p>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>

      <!-- Complex Lists -->
      <demo-example-viewer title="Complex Lists">
        <mat-card>
          <mat-card-header>
            <mat-card-title>File Manager List</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              @for (item of fileItems(); track item.id) {
                <mat-list-item>
                  @if (item.icon) {
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  }
                  <span matListItemTitle>{{ item.title }}</span>
                  <span matListItemLine>{{ item.subtitle }}</span>
                  <span matListItemLine>{{ item.description }}</span>
                  <div matListItemMeta class="file-actions">
                    <button mat-icon-button (click)="onItemAction(item.id, 'download')">
                      <mat-icon>download</mat-icon>
                    </button>
                    <button mat-icon-button (click)="onItemAction(item.id, 'share')">
                      <mat-icon>share</mat-icon>
                    </button>
                    <button mat-icon-button (click)="onItemAction(item.id, 'delete')">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </mat-list-item>
                @if (!$last) {
                  <mat-divider></mat-divider>
                }
              }
            </mat-list>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './lists.component.scss',
})
export class ListsComponent {
  readonly resources = [{ label: 'M3 Lists Guidelines', url: MD3_DOCS.LISTS }];

  // Density selector for testing MD3 density variations
  selectedDensity = signal('default');

  readonly densityOptions = [
    { value: 'dense', label: 'Dense (-3) - Most compact', description: 'MD3 highest density' },
    { value: 'compact', label: 'Compact (-2) - More compact', description: 'MD3 high density' },
    {
      value: 'standard',
      label: 'Standard (-1) - Slightly compact',
      description: 'MD3 medium density',
    },
    { value: 'default', label: 'Default (0) - Comfortable', description: 'MD3 default density' },
  ];

  // Basic single line items
  private _basicItems = signal<ListItem[]>([
    { id: '1', title: 'Inbox' },
    { id: '2', title: 'Starred' },
    { id: '3', title: 'Sent Mail' },
    { id: '4', title: 'Drafts' },
    { id: '5', title: 'All Mail' },
    { id: '6', title: 'Trash' },
    { id: '7', title: 'Spam' },
  ]);

  // Items with icons
  private _iconItems = signal<ListItem[]>([
    { id: '1', title: 'Documents', icon: 'folder' },
    { id: '2', title: 'Images', icon: 'image' },
    { id: '3', title: 'Videos', icon: 'movie' },
    { id: '4', title: 'Music', icon: 'music_note' },
    { id: '5', title: 'Downloads', icon: 'download' },
  ]);

  // Items with actions
  private _actionItems = signal<ListItem[]>([
    { id: '1', title: 'Project Alpha', icon: 'work' },
    { id: '2', title: 'Team Meeting Notes', icon: 'event_note' },
    { id: '3', title: 'Budget Report', icon: 'assessment' },
    { id: '4', title: 'Client Presentation', icon: 'present_to_all' },
  ]);

  // Two line items
  private _twoLineItems = signal<ListItem[]>([
    { id: '1', title: 'Photos', subtitle: '15 items', icon: 'photo_library' },
    { id: '2', title: 'Recipes', subtitle: '8 items', icon: 'restaurant' },
    { id: '3', title: 'Work', subtitle: '23 items', icon: 'work' },
    { id: '4', title: 'Vacation', subtitle: '45 items', icon: 'flight' },
  ]);

  // Contact items with avatars
  private _contactItems = signal<ListItem[]>([
    { id: '1', title: 'Alice Johnson', subtitle: 'Available', badge: 3 },
    { id: '2', title: 'Bob Smith', subtitle: 'Away' },
    { id: '3', title: 'Carol Davis', subtitle: 'Busy', badge: 1 },
    { id: '4', title: 'David Wilson', subtitle: 'Available' },
  ]);

  // Three line items
  private _threeLineItems = signal<ListItem[]>([
    {
      id: '1',
      title: 'Design System Update',
      subtitle: 'New components and tokens available',
      description: 'Updated button styles, new color tokens, and improved accessibility features',
      icon: 'design_services',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      title: 'Team Standup',
      subtitle: 'Daily sync meeting',
      description: 'Review progress, discuss blockers, and plan next steps for the sprint',
      icon: 'groups',
      timestamp: '1 day ago',
    },
    {
      id: '3',
      title: 'Code Review',
      subtitle: 'Pull request #247',
      description: 'Review implementation of new authentication flow and security updates',
      icon: 'code',
      timestamp: '3 days ago',
    },
  ]);

  // Navigation items
  private _navItems = signal<ListItem[]>([
    { id: '1', title: 'Dashboard', icon: 'dashboard', selected: true },
    { id: '2', title: 'Projects', icon: 'folder', badge: 5 },
    { id: '3', title: 'Tasks', icon: 'task_alt', badge: 12 },
    { id: '4', title: 'Calendar', icon: 'event' },
    { id: '5', title: 'Reports', icon: 'analytics' },
    { id: '6', title: 'Settings', icon: 'settings' },
  ]);

  // Selection items
  private _selectionItems = signal<ListItem[]>([
    {
      id: '1',
      title: 'Enable notifications',
      subtitle: 'Get alerts for important updates',
      icon: 'notifications',
      selected: true,
    },
    {
      id: '2',
      title: 'Auto-save drafts',
      subtitle: 'Automatically save your work',
      icon: 'save',
      selected: false,
    },
    { id: '3', title: 'Dark mode', subtitle: 'Use dark theme', icon: 'dark_mode', selected: true },
    {
      id: '4',
      title: 'Analytics tracking',
      subtitle: 'Help improve the app',
      icon: 'analytics',
      selected: false,
      disabled: true,
    },
  ]);

  // File items
  private _fileItems = signal<ListItem[]>([
    {
      id: '1',
      title: 'presentation.pptx',
      subtitle: 'Modified 2 hours ago',
      description: '2.4 MB • Microsoft PowerPoint',
      icon: 'slideshow',
    },
    {
      id: '2',
      title: 'budget-2024.xlsx',
      subtitle: 'Modified yesterday',
      description: '1.8 MB • Microsoft Excel',
      icon: 'table_chart',
    },
    {
      id: '3',
      title: 'project-notes.docx',
      subtitle: 'Modified 3 days ago',
      description: '456 KB • Microsoft Word',
      icon: 'description',
    },
  ]);

  // Computed getters for reactive data
  basicItems = this._basicItems.asReadonly();
  iconItems = this._iconItems.asReadonly();
  actionItems = this._actionItems.asReadonly();
  twoLineItems = this._twoLineItems.asReadonly();
  contactItems = this._contactItems.asReadonly();
  threeLineItems = this._threeLineItems.asReadonly();
  navItems = this._navItems.asReadonly();
  selectionItems = this._selectionItems.asReadonly();
  fileItems = this._fileItems.asReadonly();

  onDensityChange(density: string): void {
    this.selectedDensity.set(density);
  }

  onItemAction(itemId: string, action: string): void {
    console.log(`Action "${action}" on item "${itemId}"`);
  }

  onNavItemClick(itemId: string): void {
    this._navItems.update((items) =>
      items.map((item) => ({ ...item, selected: item.id === itemId })),
    );
  }

  onSelectionChange(event: MatSelectionListChange): void {
    // Update all items based on the selection change event
    this._selectionItems.update((items) =>
      items.map((item) => {
        const option = event.options.find((opt) => opt.value === item.id);
        return option ? { ...item, selected: option.selected } : item;
      }),
    );
  }

  getSelectedItems(): string[] {
    return this.selectionItems()
      .filter((item) => item.selected)
      .map((item) => item.title);
  }
}
