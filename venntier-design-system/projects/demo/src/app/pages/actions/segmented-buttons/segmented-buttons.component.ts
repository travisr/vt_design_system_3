import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
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
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Segmented Buttons"
        description="Segmented buttons help people select options, switch views, or sort elements."
        [links]="resources"
      >
      </demo-page-header>

      <section class="demo-section">
        <h2>Single Selection</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Single Selection</mat-card-title>
            <mat-card-subtitle>Users can select one option from a set of choices</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="segmented-demo">
              <h4>View Options</h4>
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
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Multi-Selection</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Multi-Selection</mat-card-title>
            <mat-card-subtitle
              >Users can select multiple options from a set of choices</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="segmented-demo">
              <h4>Text Formatting</h4>
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
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Icon-Only Segments</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Icon-Only Segments</mat-card-title>
            <mat-card-subtitle
              >Segmented buttons with only icons for compact layouts</mat-card-subtitle
            >
          </mat-card-header>
          <mat-card-content>
            <div class="segmented-demo">
              <h4>Text Alignment</h4>
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
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Text-Only Segments</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Text-Only Segments</mat-card-title>
            <mat-card-subtitle>Segmented buttons with only text labels</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="segmented-demo">
              <h4>Time Period</h4>
              <mat-button-toggle-group
                [value]="timePeriod()"
                (change)="setTimePeriod($event.value)"
              >
                <mat-button-toggle value="day">Day</mat-button-toggle>
                <mat-button-toggle value="week">Week</mat-button-toggle>
                <mat-button-toggle value="month">Month</mat-button-toggle>
                <mat-button-toggle value="year">Year</mat-button-toggle>
              </mat-button-toggle-group>
            </div>

            <div class="segmented-demo">
              <h4>Priority Level</h4>
              <mat-button-toggle-group [value]="priority()" (change)="setPriority($event.value)">
                <mat-button-toggle value="low">Low</mat-button-toggle>
                <mat-button-toggle value="medium">Medium</mat-button-toggle>
                <mat-button-toggle value="high">High</mat-button-toggle>
                <mat-button-toggle value="urgent">Urgent</mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Disabled States</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Disabled States</mat-card-title>
            <mat-card-subtitle>Some segments can be disabled based on context</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="segmented-demo">
              <h4>Document Actions</h4>
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
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Density Variations</h2>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Density Variations</mat-card-title>
            <mat-card-subtitle>Different sizes for various layout needs</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="density-demo">
              <div class="density-example">
                <h4>Comfortable (Density +1)</h4>
                <mat-button-toggle-group value="option1" class="comfortable">
                  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
                </mat-button-toggle-group>
              </div>

              <div class="density-example">
                <h4>Default (Density 0)</h4>
                <mat-button-toggle-group value="option1">
                  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
                </mat-button-toggle-group>
              </div>

              <div class="density-example">
                <h4>Standard (Density -1)</h4>
                <mat-button-toggle-group value="option1" class="standard">
                  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
                </mat-button-toggle-group>
              </div>

              <div class="density-example">
                <h4>Compact (Density -2)</h4>
                <mat-button-toggle-group value="option1" class="compact">
                  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
                </mat-button-toggle-group>
              </div>

              <div class="density-example">
                <h4>Dense (Density -3)</h4>
                <mat-button-toggle-group value="option1" class="dense">
                  <mat-button-toggle value="option1">Option 1</mat-button-toggle>
                  <mat-button-toggle value="option2">Option 2</mat-button-toggle>
                  <mat-button-toggle value="option3">Option 3</mat-button-toggle>
                </mat-button-toggle-group>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="demo-section">
        <h2>Use Case Examples</h2>
        <p>Common patterns and applications for segmented buttons.</p>
        <div class="demo-example">
          <mat-card class="use-case-card">
            <h4>Chart Type Selector</h4>
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
            <p class="result">Selected: {{ chartType() }}</p>
          </mat-card>

          <mat-card class="use-case-card">
            <h4>Filter Options</h4>
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
            <p class="result">Active filters: {{ filters().join(', ') || 'None' }}</p>
          </mat-card>
        </div>
      </section>

      <demo-example-viewer
        title="Segmented Buttons Implementation"
        [examples]="segmentedButtonExamples"
      >
      </demo-example-viewer>
    </div>
  `,
  styleUrl: './segmented-buttons.component.scss',
})
export class SegmentedButtonsComponent {
  readonly resources = [
    { label: 'M3 Segmented Button Guidelines', url: MD3_DOCS.SEGMENTED_BUTTONS },
  ];

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

  segmentedButtonExamples = [
    {
      title: 'Single Selection',
      language: 'html',
      code: `<mat-button-toggle-group [value]="selectedView" (change)="onViewChange($event.value)">
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
    },
    {
      title: 'Multi-Selection',
      language: 'html',
      code: `<mat-button-toggle-group>
  <mat-button-toggle
    value="bold"
    [class.mat-button-toggle-checked]="selectedFormats.includes('bold')"
    (click)="onFormatToggle('bold', !selectedFormats.includes('bold'))"
  >
    <mat-icon>format_bold</mat-icon>
    Bold
  </mat-button-toggle>
  <mat-button-toggle
    value="italic"
    [class.mat-button-toggle-checked]="selectedFormats.includes('italic')"
    (click)="onFormatToggle('italic', !selectedFormats.includes('italic'))"
  >
    <mat-icon>format_italic</mat-icon>
    Italic
  </mat-button-toggle>
</mat-button-toggle-group>`,
    },
    {
      title: 'Icon-Only Segments',
      language: 'html',
      code: `<mat-button-toggle-group [value]="alignment">
  <mat-button-toggle value="left">
    <mat-icon>format_align_left</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="center">
    <mat-icon>format_align_center</mat-icon>
  </mat-button-toggle>
  <mat-button-toggle value="right">
    <mat-icon>format_align_right</mat-icon>
  </mat-button-toggle>
</mat-button-toggle-group>`,
    },
    {
      title: 'Component Logic',
      language: 'typescript',
      code: `export class MyComponent {
  private _selectedView = signal('list');
  readonly selectedView = this._selectedView.asReadonly();

  setViewMode(mode: string) {
    this._selectedView.set(mode);
  }

  private _filters = signal<string[]>([]);
  
  toggleFilter(filter: string, checked: boolean) {
    this._filters.update(current => 
      checked 
        ? [...current, filter]
        : current.filter(f => f !== filter)
    );
  }
}`,
    },
  ];

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
}
