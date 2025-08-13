import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

@Component({
  selector: 'demo-segmented-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page" [ngClass]="selectedDensity() === 'default' ? '' : selectedDensity()">
      <demo-page-header
        title="Segmented Buttons"
        description="Segmented buttons help people select options, switch views, or sort elements."
        [mdLink]="docLinks.SEGMENTED_BUTTONS"
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
              >This density will be applied to all segmented buttons below to test the MD3 density
              variations.</small
            >
          </p>
        </div>
      </demo-example-viewer>

      <!-- Single Selection -->
      <section class="demo-section">
        <h2 class="demo-section-title">Single Selection</h2>
        <p class="demo-section-description">
          Users can select one option from a set of choices. Perfect for view modes, sorting
          options, or filter categories.
        </p>

        <demo-example-viewer title="View Options" [code]="singleSelectionCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group [value]="viewMode()" (change)="setViewMode($event.value)">
              <mat-button-toggle value="list">
                <mat-icon>view_list</mat-icon>
                List
              </mat-button-toggle>
              <mat-button-toggle value="grid">
                <mat-icon>view_module</mat-icon>
                Grid
              </mat-button-toggle>
              <mat-button-toggle value="card">
                <mat-icon>view_agenda</mat-icon>
                Cards
              </mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected view: <strong>{{ viewMode() }}</strong>
            </p>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Multi-Selection -->
      <section class="demo-section">
        <h2 class="demo-section-title">Multi-Selection</h2>
        <p class="demo-section-description">
          Users can select multiple options from a set of choices. Perfect for text formatting,
          filters, or feature toggles.
        </p>

        <demo-example-viewer title="Text Formatting" [code]="multiSelectionCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group>
              <mat-button-toggle
                value="bold"
                [class.mat-button-toggle-checked]="textFormats().includes('bold')"
                (click)="toggleTextFormat('bold', !textFormats().includes('bold'))"
              >
                <mat-icon>format_bold</mat-icon>
                Bold
              </mat-button-toggle>
              <mat-button-toggle
                value="italic"
                [class.mat-button-toggle-checked]="textFormats().includes('italic')"
                (click)="toggleTextFormat('italic', !textFormats().includes('italic'))"
              >
                <mat-icon>format_italic</mat-icon>
                Italic
              </mat-button-toggle>
              <mat-button-toggle
                value="underline"
                [class.mat-button-toggle-checked]="textFormats().includes('underline')"
                (click)="toggleTextFormat('underline', !textFormats().includes('underline'))"
              >
                <mat-icon>format_underlined</mat-icon>
                Underline
              </mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected formats: <strong>{{ textFormats().join(', ') || 'None' }}</strong>
            </p>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Icon-Only Segments -->
      <section class="demo-section">
        <h2 class="demo-section-title">Icon-Only Segments</h2>
        <p class="demo-section-description">
          Segmented buttons with only icons for compact layouts. Perfect for toolbars and
          space-constrained interfaces.
        </p>

        <demo-example-viewer title="Text Alignment" [code]="iconOnlyCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group [value]="alignment()" (change)="setAlignment($event.value)">
              <mat-button-toggle value="left">
                <mat-icon>format_align_left</mat-icon>
              </mat-button-toggle>
              <mat-button-toggle value="center">
                <mat-icon>format_align_center</mat-icon>
              </mat-button-toggle>
              <mat-button-toggle value="right">
                <mat-icon>format_align_right</mat-icon>
              </mat-button-toggle>
              <mat-button-toggle value="justify">
                <mat-icon>format_align_justify</mat-icon>
              </mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected alignment: <strong>{{ alignment() }}</strong>
            </p>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Text-Only Segments -->
      <section class="demo-section">
        <h2 class="demo-section-title">Text-Only Segments</h2>
        <p class="demo-section-description">
          Segmented buttons with only text labels. Clean and minimal for text-based options.
        </p>

        <demo-example-viewer title="Time Period Selection" [code]="textOnlyCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group [value]="timePeriod()" (change)="setTimePeriod($event.value)">
              <mat-button-toggle value="day">Day</mat-button-toggle>
              <mat-button-toggle value="week">Week</mat-button-toggle>
              <mat-button-toggle value="month">Month</mat-button-toggle>
              <mat-button-toggle value="year">Year</mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected period: <strong>{{ timePeriod() }}</strong>
            </p>
          </div>
        </demo-example-viewer>

        <demo-example-viewer title="Priority Level" [code]="priorityCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group [value]="priority()" (change)="setPriority($event.value)">
              <mat-button-toggle value="low">Low</mat-button-toggle>
              <mat-button-toggle value="medium">Medium</mat-button-toggle>
              <mat-button-toggle value="high">High</mat-button-toggle>
              <mat-button-toggle value="urgent">Urgent</mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected priority: <strong>{{ priority() }}</strong>
            </p>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Disabled States -->
      <section class="demo-section">
        <h2 class="demo-section-title">Disabled States</h2>
        <p class="demo-section-description">
          Some segments can be disabled based on context or user permissions.
        </p>

        <demo-example-viewer title="Document Actions" [code]="disabledStatesCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group
              [value]="documentAction()"
              (change)="setDocumentAction($event.value)"
            >
              <mat-button-toggle value="edit">
                <mat-icon>edit</mat-icon>
                Edit
              </mat-button-toggle>
              <mat-button-toggle value="share">
                <mat-icon>share</mat-icon>
                Share
              </mat-button-toggle>
              <mat-button-toggle value="delete" disabled>
                <mat-icon>delete</mat-icon>
                Delete
              </mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected action: <strong>{{ documentAction() }}</strong>
              <br />
              <small>Delete action is disabled (no permission)</small>
            </p>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Density Variations -->
      <section class="demo-section">
        <h2 class="demo-section-title">Density Variations</h2>
        <p class="demo-section-description">
          Different sizes for various layout needs. Use the density selector above to test all
          variations.
        </p>

        <demo-example-viewer title="All Density Levels" [code]="densityVariationsCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-lg">
            <div class="density-example">
              <h4>Comfortable (52dp height)</h4>
              <mat-button-toggle-group value="option1" class="comfortable">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="density-example">
              <h4>Default (48dp height)</h4>
              <mat-button-toggle-group value="option1">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="density-example">
              <h4>Compact (40dp height)</h4>
              <mat-button-toggle-group value="option1" class="compact">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="density-example">
              <h4>Dense (36dp height)</h4>
              <mat-button-toggle-group value="option1" class="dense">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Use Case Examples -->
      <section class="demo-section">
        <h2 class="demo-section-title">Use Case Examples</h2>
        <p class="demo-section-description">
          Common patterns and applications for segmented buttons in real-world interfaces.
        </p>

        <demo-example-viewer title="Chart Type Selector" [code]="chartTypeCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group [value]="chartType()" (change)="setChartType($event.value)">
              <mat-button-toggle value="bar">
                <mat-icon>bar_chart</mat-icon>
                Bar
              </mat-button-toggle>
              <mat-button-toggle value="line">
                <mat-icon>show_chart</mat-icon>
                Line
              </mat-button-toggle>
              <mat-button-toggle value="pie">
                <mat-icon>pie_chart</mat-icon>
                Pie
              </mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Selected chart: <strong>{{ chartType() }}</strong>
            </p>
          </div>
        </demo-example-viewer>

        <demo-example-viewer title="Filter Options" [code]="filterOptionsCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-md">
            <mat-button-toggle-group>
              <mat-button-toggle
                value="new"
                [class.mat-button-toggle-checked]="filters().includes('new')"
                (click)="toggleFilter('new', !filters().includes('new'))"
              >
                New
              </mat-button-toggle>
              <mat-button-toggle
                value="popular"
                [class.mat-button-toggle-checked]="filters().includes('popular')"
                (click)="toggleFilter('popular', !filters().includes('popular'))"
              >
                Popular
              </mat-button-toggle>
              <mat-button-toggle
                value="sale"
                [class.mat-button-toggle-checked]="filters().includes('sale')"
                (click)="toggleFilter('sale', !filters().includes('sale'))"
              >
                On Sale
              </mat-button-toggle>
              <mat-button-toggle
                value="featured"
                [class.mat-button-toggle-checked]="filters().includes('featured')"
                (click)="toggleFilter('featured', !filters().includes('featured'))"
              >
                Featured
              </mat-button-toggle>
            </mat-button-toggle-group>
            <p class="demo-result">
              Active filters: <strong>{{ filters().join(', ') || 'None' }}</strong>
            </p>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Color Variants -->
      <section class="demo-section">
        <h2 class="demo-section-title">Color Variants</h2>
        <p class="demo-section-description">
          MD3 color scheme variants for different contexts and emphasis levels.
        </p>

        <demo-example-viewer title="Color Scheme Examples" [code]="colorVariantCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-lg">
            <div class="color-example">
              <h4>Default (Surface Colors)</h4>
              <mat-button-toggle-group value="option1">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="color-example">
              <h4>Primary Color Scheme</h4>
              <mat-button-toggle-group value="option1" class="primary-variant">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="color-example">
              <h4>Secondary Color Scheme</h4>
              <mat-button-toggle-group value="option1" class="secondary-variant">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="color-example">
              <h4>Tertiary Color Scheme</h4>
              <mat-button-toggle-group value="option1" class="tertiary-variant">
                <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                <mat-button-toggle value="option3">Option 3</mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </div>
        </demo-example-viewer>
      </section>

      <!-- Interactive States & Elevation -->
      <section class="demo-section">
        <h2 class="demo-section-title">Interactive States & Elevation</h2>
        <p class="demo-section-description">
          MD3 elevation and state layer feedback for hover, focus, and pressed interactions.
        </p>

        <demo-example-viewer title="Interactive Feedback" [code]="interactiveStatesCode">
          <div class="demo-flex demo-flex--column demo-flex--gap-lg">
            <div class="interactive-example">
              <h4>Hover & Focus States</h4>
              <p>Hover over buttons to see elevation changes and state layers.</p>
              <mat-button-toggle-group value="option1">
                <mat-button-toggle value="option1">Hover Me</mat-button-toggle>
                <mat-button-toggle value="option2">Focus Me</mat-button-toggle>
                <mat-button-toggle value="option3">Press Me</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="interactive-example">
              <h4>Selected State Elevation</h4>
              <p>Selected buttons have elevated appearance with enhanced hover states.</p>
              <mat-button-toggle-group value="option2">
                <mat-button-toggle value="option1">Unselected</mat-button-toggle>
                <mat-button-toggle value="option2">Selected</mat-button-toggle>
                <mat-button-toggle value="option3">Unselected</mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </div>
        </demo-example-viewer>
      </section>
    </div>
  `,
  styleUrl: './segmented-buttons.component.scss',
})
export class SegmentedButtonsComponent {
  readonly docLinks = MD3_DOCS;

  // Density management
  private _selectedDensity = signal('default');
  readonly selectedDensity = this._selectedDensity.asReadonly();

  readonly densityOptions = [
    { value: 'default', label: 'Default', description: 'Standard spacing (48dp height)' },
    { value: 'comfortable', label: 'Comfortable', description: 'Relaxed spacing (52dp height)' },
    { value: 'compact', label: 'Compact', description: 'Dense spacing (40dp height)' },
    { value: 'dense', label: 'Dense', description: 'Very dense spacing (36dp height)' },
  ];

  // Component state
  private _viewMode = signal('list');
  private _textFormats = signal<string[]>([]);
  private _alignment = signal('left');
  private _timePeriod = signal('week');
  private _priority = signal('medium');
  private _documentAction = signal('edit');
  private _chartType = signal('bar');
  private _filters = signal<string[]>(['popular']);

  readonly viewMode = this._viewMode.asReadonly();
  readonly textFormats = this._textFormats.asReadonly();
  readonly alignment = this._alignment.asReadonly();
  readonly timePeriod = this._timePeriod.asReadonly();
  readonly priority = this._priority.asReadonly();
  readonly documentAction = this._documentAction.asReadonly();
  readonly chartType = this._chartType.asReadonly();
  readonly filters = this._filters.asReadonly();

  setViewMode(mode: string) {
    this._viewMode.set(mode);
  }

  toggleTextFormat(format: string, checked: boolean) {
    this._textFormats.update((current) =>
      checked ? [...current, format] : current.filter((f) => f !== format),
    );
  }

  setAlignment(alignment: string) {
    this._alignment.set(alignment);
  }

  setTimePeriod(period: string) {
    this._timePeriod.set(period);
  }

  setPriority(priority: string) {
    this._priority.set(priority);
  }

  setDocumentAction(action: string) {
    this._documentAction.set(action);
  }

  setChartType(type: string) {
    this._chartType.set(type);
  }

  toggleFilter(filter: string, checked: boolean) {
    this._filters.update((current) =>
      checked ? [...current, filter] : current.filter((f) => f !== filter),
    );
  }

  onDensityChange(density: string) {
    this._selectedDensity.set(density);
  }

  // Code examples for demo-example-viewer
  readonly singleSelectionCode = {
    html: `<mat-button-toggle-group [value]="viewMode()" (change)="setViewMode($event.value)">
  <mat-button-toggle value="list">
    <mat-icon>view_list</mat-icon>
    List
  </mat-button-toggle>
  <mat-button-toggle value="grid">
    <mat-icon>view_module</mat-icon>
    Grid
  </mat-button-toggle>
  <mat-button-toggle value="card">
    <mat-icon>view_agenda</mat-icon>
    Cards
  </mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

// Component logic
private _viewMode = signal('list');
readonly viewMode = this._viewMode.asReadonly();

setViewMode(mode: string) {
  this._viewMode.set(mode);
}`,
  };

  readonly multiSelectionCode = {
    html: `<mat-button-toggle-group>
  <mat-button-toggle
    value="bold"
    [class.mat-button-toggle-checked]="textFormats().includes('bold')"
    (click)="toggleTextFormat('bold', !textFormats().includes('bold'))"
  >
    <mat-icon>format_bold</mat-icon>
    Bold
  </mat-button-toggle>
  <mat-button-toggle
    value="italic"
    [class.mat-button-toggle-checked]="textFormats().includes('italic')"
    (click)="toggleTextFormat('italic', !textFormats().includes('italic'))"
  >
    <mat-icon>format_italic</mat-icon>
    Italic
  </mat-button-toggle>
  <mat-button-toggle
    value="underline"
    [class.mat-button-toggle-checked]="textFormats().includes('underline')"
    (click)="toggleTextFormat('underline', !textFormats().includes('underline'))"
  >
    <mat-icon>format_underlined</mat-icon>
    Underline
  </mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Multi-selection logic
private _textFormats = signal<string[]>([]);
readonly textFormats = this._textFormats.asReadonly();

toggleTextFormat(format: string, checked: boolean) {
  this._textFormats.update(current =>
    checked
      ? [...current, format]
      : current.filter(f => f !== format)
  );
}`,
  };

  readonly iconOnlyCode = {
    html: `<mat-button-toggle-group [value]="alignment()" (change)="setAlignment($event.value)">
  <mat-button-toggle value="left">
    <mat-icon>format_align_left</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="center">
    <mat-icon>format_align_center</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="right">
    <mat-icon>format_align_right</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="justify">
    <mat-icon>format_align_justify</mat-icon>
  </mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Icon-only alignment logic
private _alignment = signal('left');
readonly alignment = this._alignment.asReadonly();

setAlignment(alignment: string) {
  this._alignment.set(alignment);
}`,
  };

  readonly textOnlyCode = {
    html: `<mat-button-toggle-group [value]="timePeriod()" (change)="setTimePeriod($event.value)">
  <mat-button-toggle value="day">Day</mat-button-toggle>
  <mat-button-toggle value="week">Week</mat-button-toggle>
  <mat-button-toggle value="month">Month</mat-button-toggle>
  <mat-button-toggle value="year">Year</mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Text-only period logic
private _timePeriod = signal('week');
readonly timePeriod = this._timePeriod.asReadonly();

setTimePeriod(period: string) {
  this._timePeriod.set(period);
}`,
  };

  readonly priorityCode = {
    html: `<mat-button-toggle-group [value]="priority()" (change)="setPriority($event.value)">
  <mat-button-toggle value="low">Low</mat-button-toggle>
  <mat-button-toggle value="medium">Medium</mat-button-toggle>
  <mat-button-toggle value="high">High</mat-button-toggle>
  <mat-button-toggle value="urgent">Urgent</mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Priority level logic
private _priority = signal('medium');
readonly priority = this._priority.asReadonly();

setPriority(priority: string) {
  this._priority.set(priority);
}`,
  };

  readonly disabledStatesCode = {
    html: `<mat-button-toggle-group [value]="documentAction()" (change)="setDocumentAction($event.value)">
  <mat-button-toggle value="edit">
    <mat-icon>edit</mat-icon>
    Edit
  </mat-button-toggle>
  <mat-button-toggle value="share">
    <mat-icon>share</mat-icon>
    Share
  </mat-button-toggle>
  <mat-button-toggle value="delete" disabled>
    <mat-icon>delete</mat-icon>
    Delete
  </mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Document action logic with disabled state
private _documentAction = signal('edit');
readonly documentAction = this._documentAction.asReadonly();

setDocumentAction(action: string) {
  this._documentAction.set(action);
}`,
  };

  readonly densityVariationsCode = {
    html: `<!-- Comfortable density -->
<mat-button-toggle-group value="option1" class="comfortable">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>

<!-- Default density -->
<mat-button-toggle-group value="option1">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>

<!-- Compact density -->
<mat-button-toggle-group value="option1" class="compact">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>

<!-- Dense density -->
<mat-button-toggle-group value="option1" class="dense">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>`,
    scss: `// Density variations using MD3 mixins
.comfortable {
  @include mat.button-toggle-density(1);
}

.compact {
  @include mat.button-toggle-density(-1);
}

.dense {
  @include mat.button-toggle-density(-2);
}`,
  };

  readonly chartTypeCode = {
    html: `<mat-button-toggle-group [value]="chartType()" (change)="setChartType($event.value)">
  <mat-button-toggle value="bar">
    <mat-icon>bar_chart</mat-icon>
    Bar
  </mat-button-toggle>
  <mat-button-toggle value="line">
    <mat-icon>show_chart</mat-icon>
    Line
  </mat-button-toggle>
  <mat-button-toggle value="pie">
    <mat-icon>pie_chart</mat-icon>
    Pie
  </mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Chart type selection logic
private _chartType = signal('bar');
readonly chartType = this._chartType.asReadonly();

setChartType(type: string) {
  this._chartType.set(type);
}`,
  };

  readonly filterOptionsCode = {
    html: `<mat-button-toggle-group>
  <mat-button-toggle
    value="new"
    [class.mat-button-toggle-checked]="filters().includes('new')"
    (click)="toggleFilter('new', !filters().includes('new'))"
  >
    New
  </mat-button-toggle>
  <mat-button-toggle
    value="popular"
    [class.mat-button-toggle-checked]="filters().includes('popular')"
    (click)="toggleFilter('popular', !filters().includes('popular'))"
  >
    Popular
  </mat-button-toggle>
  <mat-button-toggle
    value="sale"
    [class.mat-button-toggle-checked]="filters().includes('sale')"
    (click)="toggleFilter('sale', !filters().includes('sale'))"
  >
    On Sale
  </mat-button-toggle>
</mat-button-toggle-group>`,
    ts: `// Multi-selection filter logic
private _filters = signal<string[]>(['popular']);
readonly filters = this._filters.asReadonly();

toggleFilter(filter: string, checked: boolean) {
  this._filters.update(current =>
    checked
      ? [...current, filter]
      : current.filter(f => f !== filter)
  );
}`,
  };

  readonly colorVariantCode = {
    html: `<!-- Default (Surface Colors) -->
<mat-button-toggle-group value="option1">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>

<!-- Primary Color Scheme -->
<mat-button-toggle-group value="option1" class="primary-variant">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>

<!-- Secondary Color Scheme -->
<mat-button-toggle-group value="option1" class="secondary-variant">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>

<!-- Tertiary Color Scheme -->
<mat-button-toggle-group value="option1" class="tertiary-variant">
  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
</mat-button-toggle-group>`,
    scss: `// Color variant overrides using MD3 tokens
.primary-variant {
  @include mat.button-toggle-overrides((
    selected-state-background-color: var(--mat-sys-color-primary-container),
    selected-state-text-color: var(--mat-sys-color-on-primary-container),
    background-color: var(--mat-sys-color-surface),
    text-color: var(--mat-sys-color-primary),
    divider-color: var(--mat-sys-color-outline-variant),
  ));
}

.secondary-variant {
  @include mat.button-toggle-overrides((
    selected-state-background-color: var(--mat-sys-color-secondary-container),
    selected-state-text-color: var(--mat-sys-color-on-secondary-container),
    background-color: var(--mat-sys-color-surface),
    text-color: var(--mat-sys-color-secondary),
    divider-color: var(--mat-sys-color-outline-variant),
  ));
}

.tertiary-variant {
  @include mat.button-toggle-overrides((
    selected-state-background-color: var(--mat-sys-color-tertiary-container),
    selected-state-text-color: var(--mat-sys-color-on-tertiary-container),
    background-color: var(--mat-sys-color-surface),
    text-color: var(--mat-sys-color-tertiary),
    divider-color: var(--mat-sys-color-outline-variant),
  ));
}`,
  };

  readonly interactiveStatesCode = {
    html: `<!-- Hover & Focus States -->
<mat-button-toggle-group value="option1">
  <mat-button-toggle value="option1">Hover Me</mat-button-toggle>
  <mat-button-toggle value="option2">Focus Me</mat-button-toggle>
  <mat-button-toggle value="option3">Press Me</mat-button-toggle>
</mat-button-toggle-group>

<!-- Selected State Elevation -->
<mat-button-toggle-group value="option2">
  <mat-button-toggle value="option1">Unselected</mat-button-toggle>
  <mat-button-toggle value="option2">Selected</mat-button-toggle>
  <mat-button-toggle value="option3">Unselected</mat-button-toggle>
</mat-button-toggle-group>`,
    scss: `// MD3 Elevation tokens for interactive feedback
.mat-button-toggle {
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: var(--mat-sys-elevation-level1);
  }

  &:focus-visible {
    box-shadow: var(--mat-sys-elevation-level1);
  }

  &:active {
    box-shadow: var(--mat-sys-elevation-level0);
  }

  &.mat-button-toggle-checked {
    box-shadow: var(--mat-sys-elevation-level1);

    &:hover {
      box-shadow: var(--mat-sys-elevation-level2);
    }

    &:active {
      box-shadow: var(--mat-sys-elevation-level1);
    }
  }
}`,
  };
}
