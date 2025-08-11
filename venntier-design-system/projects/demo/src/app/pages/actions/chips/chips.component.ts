import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

interface Chip {
  id: string;
  label: string;
  selected?: boolean;
  removable?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'demo-chips',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Chips"
        description="Chips help people enter information, make selections, filter content, or trigger actions."
        [links]="resources"
      >
      </demo-page-header>

      <section class="demo-section">
        <h2>Assist Chips</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Assist Chips</mat-card-title>
            <mat-card-subtitle
              >Assist chips represent smart or automated actions that can span multiple
              apps</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="chip-demo">
              <h4>Basic Assist Chips</h4>
              <mat-chip-set>
                <mat-chip>
                  <mat-icon matChipAvatar>schedule</mat-icon>
                  Set reminder
                </mat-chip>
                <mat-chip>
                  <mat-icon matChipAvatar>location_on</mat-icon>
                  Add location
                </mat-chip>
                <mat-chip>
                  <mat-icon matChipAvatar>person_add</mat-icon>
                  Invite friends
                </mat-chip>
                <mat-chip disabled>
                  <mat-icon matChipAvatar>cloud_off</mat-icon>
                  Offline
                </mat-chip>
              </mat-chip-set>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Filter Chips</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Filter Chips</mat-card-title>
            <mat-card-subtitle
              >Filter chips use tags or descriptive words to filter content</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="chip-demo">
              <h4>Category Filters</h4>
              <mat-chip-set>
                @for (filter of categoryFilters(); track filter.id) {
                  <mat-chip
                    [class.mat-mdc-chip-selected]="filter.selected"
                    (click)="toggleCategoryFilter(filter.id)"
                  >
                    {{ filter.label }}
                  </mat-chip>
                }
              </mat-chip-set>
              <p class="filter-result">Active filters: {{ getActiveCategoryFilters() }}</p>
            </div>

            <div class="chip-demo">
              <h4>Price Range Filters</h4>
              <mat-chip-set>
                @for (price of priceFilters(); track price.id) {
                  <mat-chip
                    [class.mat-mdc-chip-selected]="price.selected"
                    (click)="togglePriceFilter(price.id)"
                  >
                    {{ price.label }}
                  </mat-chip>
                }
              </mat-chip-set>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Input Chips</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Input Chips</mat-card-title>
            <mat-card-subtitle
              >Input chips represent discrete pieces of information entered by a
              user</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="chip-demo">
              <h4>Tags</h4>
              <mat-chip-set>
                @for (tag of tags(); track tag.id) {
                  <mat-chip (removed)="removeTag(tag.id)" [removable]="tag.removable">
                    {{ tag.label }}
                    @if (tag.removable) {
                      <mat-icon matChipRemove>cancel</mat-icon>
                    }
                  </mat-chip>
                }
              </mat-chip-set>
              <button mat-stroked-button (click)="addTag()" class="add-chip-button">
                <mat-icon>add</mat-icon>
                Add Tag
              </button>
            </div>

            <div class="chip-demo">
              <h4>Email Recipients</h4>
              <mat-chip-set>
                @for (email of emailChips(); track email.id) {
                  <mat-chip (removed)="removeEmail(email.id)" [removable]="true">
                    <mat-icon matChipAvatar>person</mat-icon>
                    {{ email.label }}
                    <mat-icon matChipRemove>cancel</mat-icon>
                  </mat-chip>
                }
              </mat-chip-set>
              <mat-form-field appearance="outline" class="email-input">
                <mat-label>Add recipient</mat-label>
                <input
                  matInput
                  placeholder="Enter email address"
                  #emailInput
                  (keydown.enter)="addEmail(emailInput.value); emailInput.value = ''"
                />
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Suggestion Chips</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Suggestion Chips</mat-card-title>
            <mat-card-subtitle>
              Suggestion chips help narrow a user's intent by presenting dynamically generated
              suggestions
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="chip-demo">
              <h4>Search Suggestions</h4>
              <mat-chip-set>
                @for (suggestion of searchSuggestions(); track suggestion.id) {
                  <mat-chip (click)="selectSuggestion(suggestion.id)">
                    <mat-icon matChipAvatar>search</mat-icon>
                    {{ suggestion.label }}
                  </mat-chip>
                }
              </mat-chip-set>
            </div>

            <div class="chip-demo">
              <h4>Quick Actions</h4>
              <mat-chip-set>
                <mat-chip (click)="quickAction('weather')">
                  <mat-icon matChipAvatar>wb_sunny</mat-icon>
                  Check weather
                </mat-chip>
                <mat-chip (click)="quickAction('calendar')">
                  <mat-icon matChipAvatar>today</mat-icon>
                  Today's schedule
                </mat-chip>
                <mat-chip (click)="quickAction('news')">
                  <mat-icon matChipAvatar>article</mat-icon>
                  Latest news
                </mat-chip>
              </mat-chip-set>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Chip Variants</h2>
        <p>Different visual styles and configurations for chips.</p>
        <div class="demo-example">
          <div class="variant-demo">
            <mat-card class="variant-card">
              <h4>With Icons</h4>
              <mat-chip-set>
                <mat-chip>
                  <mat-icon matChipAvatar>home</mat-icon>
                  Home
                </mat-chip>
                <mat-chip>
                  <mat-icon matChipAvatar>work</mat-icon>
                  Work
                </mat-chip>
                <mat-chip>
                  <mat-icon matChipAvatar>school</mat-icon>
                  School
                </mat-chip>
              </mat-chip-set>
            </mat-card>

            <mat-card class="variant-card">
              <h4>Text Only</h4>
              <mat-chip-set>
                <mat-chip>JavaScript</mat-chip>
                <mat-chip>TypeScript</mat-chip>
                <mat-chip>Angular</mat-chip>
                <mat-chip>React</mat-chip>
              </mat-chip-set>
            </mat-card>

            <mat-card class="variant-card">
              <h4>Removable</h4>
              <mat-chip-set>
                @for (skill of skills(); track skill.id) {
                  <mat-chip (removed)="removeSkill(skill.id)" [removable]="true">
                    {{ skill.label }}
                    <mat-icon matChipRemove>cancel</mat-icon>
                  </mat-chip>
                }
              </mat-chip-set>
            </mat-card>

            <mat-card class="variant-card">
              <h4>Disabled States</h4>
              <mat-chip-set>
                <mat-chip>Active</mat-chip>
                <mat-chip disabled>Disabled</mat-chip>
                <mat-chip>Another Active</mat-chip>
              </mat-chip-set>
            </mat-card>
          </div>
        </div>
      </section>

      <demo-example-viewer title="Chips Implementation" [examples]="chipExamples">
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './chips.component.scss',
})
export class ChipsComponent {
  readonly resources = [{ label: 'M3 Chips Guidelines', url: MD3_DOCS.CHIPS }];

  private _categoryFilters = signal<Chip[]>([
    { id: '1', label: 'Electronics', selected: false },
    { id: '2', label: 'Clothing', selected: true },
    { id: '3', label: 'Books', selected: false },
    { id: '4', label: 'Home & Garden', selected: true },
    { id: '5', label: 'Sports', selected: false },
  ]);

  private _priceFilters = signal<Chip[]>([
    { id: '1', label: 'Under $25', selected: false },
    { id: '2', label: '$25-$50', selected: true },
    { id: '3', label: '$50-$100', selected: false },
    { id: '4', label: 'Over $100', selected: false },
  ]);

  private _tags = signal<Chip[]>([
    { id: '1', label: 'urgent', removable: true },
    { id: '2', label: 'meeting', removable: true },
    { id: '3', label: 'follow-up', removable: true },
  ]);

  private _emailChips = signal<Chip[]>([
    { id: '1', label: 'john@example.com', removable: true },
    { id: '2', label: 'sarah@example.com', removable: true },
  ]);

  private _searchChips = signal<Chip[]>([]);

  private _quickActions = signal<(Chip & { selected?: boolean })[]>([
    { id: '1', label: 'copy', selected: false },
    { id: '2', label: 'share', selected: false },
    { id: '3', label: 'delete', selected: false },
  ]);

  private _searchSuggestions = signal<Chip[]>([
    { id: '1', label: 'angular components' },
    { id: '2', label: 'material design' },
    { id: '3', label: 'typescript tutorial' },
    { id: '4', label: 'web development' },
  ]);

  private _skills = signal<Chip[]>([
    { id: '1', label: 'Angular', removable: true },
    { id: '2', label: 'TypeScript', removable: true },
    { id: '3', label: 'Material Design', removable: true },
    { id: '4', label: 'RxJS', removable: true },
  ]);

  readonly categoryFilters = this._categoryFilters.asReadonly();
  readonly priceFilters = this._priceFilters.asReadonly();
  readonly tags = this._tags.asReadonly();
  readonly emailChips = this._emailChips.asReadonly();
  readonly searchSuggestions = this._searchSuggestions.asReadonly();
  readonly skills = this._skills.asReadonly();
  readonly searchChips = this._searchChips.asReadonly();
  readonly quickActions = this._quickActions.asReadonly();

  chipExamples = [
    {
      title: 'Basic Chip Usage',
      language: 'html',
      code: `<!-- Basic chip set -->
<mat-chip-set>
  <mat-chip>Chip 1</mat-chip>
  <mat-chip>Chip 2</mat-chip>
  <mat-chip>Chip 3</mat-chip>
</mat-chip-set>

<!-- Chip with icon -->
<mat-chip>
  <mat-icon matChipAvatar>home</mat-icon>
  Home
</mat-chip>`,
    },
    {
      title: 'Filter Chips',
      language: 'html',
      code: `<mat-chip-set multiple>
  @for (filter of filters; track filter.id) {
    <mat-chip 
      [selected]="filter.selected"
      (click)="toggleFilter(filter.id)">
      {{ filter.label }}
    </mat-chip>
  }
</mat-chip-set>`,
    },
    {
      title: 'Removable Chips',
      language: 'html',
      code: `<mat-chip-set>
  @for (item of items; track item.id) {
    <mat-chip 
      (removed)="remove(item.id)"
      [removable]="true">
      {{ item.label }}
      <mat-icon matChipRemove>cancel</mat-icon>
    </mat-chip>
  }
</mat-chip-set>`,
    },
    {
      title: 'Component Logic',
      language: 'typescript',
      code: `export class ChipComponent {
  private _filters = signal<Chip[]>([
    { id: '1', label: 'Option 1', selected: false },
    { id: '2', label: 'Option 2', selected: true }
  ]);

  toggleFilter(id: string) {
    this._filters.update(filters =>
      filters.map(f => f.id === id ? { ...f, selected: !f.selected } : f)
    );
  }

  removeItem(id: string) {
    this._items.update(items => items.filter(item => item.id !== id));
  }
}`,
    },
  ];

  toggleCategoryFilter(id: string) {
    this._categoryFilters.update((filters) =>
      filters.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f)),
    );
  }

  togglePriceFilter(id: string) {
    this._priceFilters.update((filters) =>
      filters.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f)),
    );
  }

  getActiveCategoryFilters(): string {
    const active = this._categoryFilters()
      .filter((f) => f.selected)
      .map((f) => f.label);
    return active.length > 0 ? active.join(', ') : 'None';
  }

  addTag() {
    const newTag: Chip = {
      id: Date.now().toString(),
      label: `tag-${this._tags().length + 1}`,
      removable: true,
    };
    this._tags.update((tags) => [...tags, newTag]);
  }

  removeTag(id: string) {
    this._tags.update((tags) => tags.filter((tag) => tag.id !== id));
  }

  addEmail(email: string) {
    if (email.trim() && email.includes('@')) {
      const newEmail: Chip = {
        id: Date.now().toString(),
        label: email.trim(),
        removable: true,
      };
      this._emailChips.update((emails) => [...emails, newEmail]);
    }
  }

  removeEmail(id: string) {
    this._emailChips.update((emails) => emails.filter((email) => email.id !== id));
  }

  selectSuggestion(id: string) {
    const suggestion = this._searchSuggestions().find((s) => s.id === id);
    if (suggestion) {
      // Add the selected suggestion to the search chips
      this._searchChips.update((chips) => [
        ...chips,
        {
          id: `search-${Date.now()}`,
          label: suggestion.label,
          removable: true,
        },
      ]);
      // Clear the suggestion after selection
      this._searchSuggestions.update((suggestions) => suggestions.filter((s) => s.id !== id));
    }
  }

  quickAction(action: string) {
    // Handle different quick actions
    switch (action) {
      case 'copy':
        // In a real app, copy to clipboard
        this._quickActions.update((actions) =>
          actions.map((a) => ({ ...a, selected: a.label === action })),
        );
        break;
      case 'share':
        // In a real app, open share dialog
        this._quickActions.update((actions) =>
          actions.map((a) => ({ ...a, selected: a.label === action })),
        );
        break;
      case 'delete':
        // In a real app, show delete confirmation
        this._quickActions.update((actions) =>
          actions.map((a) => ({ ...a, selected: a.label === action })),
        );
        break;
    }
    // Reset selection after a short delay for visual feedback
    setTimeout(() => {
      this._quickActions.update((actions) => actions.map((a) => ({ ...a, selected: false })));
    }, 1000);
  }

  removeSkill(id: string) {
    this._skills.update((skills) => skills.filter((skill) => skill.id !== id));
  }
}
