import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';
import { MD3_DOCS } from '../../../shared/constants/documentation-links';

interface TableElement {
  id: number;
  name: string;
  position: number;
  weight: number;
  symbol: string;
  category: string;
  discovered: number;
  selected?: boolean;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  salary: number;
  startDate: Date;
  status: 'active' | 'inactive' | 'pending';
}

@Component({
  selector: 'demo-tables',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatMenuModule,
    PageHeaderComponent,
    ExampleViewerComponent,
  ],
  template: `
    <div
      class="demo-page"
      [ngClass]="{
        dense: selectedDensity() === 'dense',
        compact: selectedDensity() === 'compact',
        standard: selectedDensity() === 'standard',
      }"
    >
      <demo-page-header
        title="Tables"
        description="Tables display information in a way that's easy to scan, so that users can look for patterns and insights."
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
              >Watch the table padding and font sizes change as you select different
              densities.</small
            >
          </p>
        </div>
      </demo-example-viewer>

      <!-- Basic Table -->
      <demo-example-viewer title="Basic Table">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Periodic Elements</mat-card-title>
            <mat-card-subtitle>Basic data table with sorting</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="basicTableData" matSort class="demo-table">
              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>No.</th>
                <td mat-cell *matCellDef="let element">{{ element.position }}</td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let element">{{ element.name }}</td>
              </ng-container>

              <ng-container matColumnDef="weight">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Weight</th>
                <td mat-cell *matCellDef="let element">{{ element.weight }}</td>
              </ng-container>

              <ng-container matColumnDef="symbol">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Symbol</th>
                <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="basicDisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: basicDisplayedColumns"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>

      <!-- Table with Selection -->
      <demo-example-viewer title="Table with Selection">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Employee Directory</mat-card-title>
            <mat-card-subtitle>Table with row selection and actions</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="table-actions">
              <span class="selection-info">
                {{ selectedEmployees().length }} of {{ employeeData.length }} selected
              </span>
              @if (selectedEmployees().length > 0) {
                <div class="bulk-actions">
                  <button mat-button color="primary">
                    <mat-icon>email</mat-icon>
                    Email Selected
                  </button>
                  <button mat-button color="warn">
                    <mat-icon>delete</mat-icon>
                    Delete Selected
                  </button>
                </div>
              }
            </div>

            <table mat-table [dataSource]="employeeData" matSort class="demo-table">
              <ng-container matColumnDef="select">
                <th mat-header-cell *matHeaderCellDef>
                  <mat-checkbox
                    (change)="$event ? toggleAllEmployees() : null"
                    [checked]="allEmployeesSelected()"
                    [indeterminate]="someEmployeesSelected()"
                  ></mat-checkbox>
                </th>
                <td mat-cell *matCellDef="let row">
                  <mat-checkbox
                    (click)="$event.stopPropagation()"
                    (change)="$event ? toggleEmployee(row) : null"
                    [checked]="isEmployeeSelected(row)"
                  ></mat-checkbox>
                </td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let element">{{ element.name }}</td>
              </ng-container>

              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Position</th>
                <td mat-cell *matCellDef="let element">{{ element.position }}</td>
              </ng-container>

              <ng-container matColumnDef="department">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Department</th>
                <td mat-cell *matCellDef="let element">{{ element.department }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let element">
                  <mat-chip [class]="'status-' + element.status">
                    {{ element.status | titlecase }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item>
                      <mat-icon>edit</mat-icon>
                      Edit
                    </button>
                    <button mat-menu-item>
                      <mat-icon>visibility</mat-icon>
                      View Details
                    </button>
                    <button mat-menu-item color="warn">
                      <mat-icon>delete</mat-icon>
                      Delete
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="employeeDisplayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: employeeDisplayedColumns"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </demo-example-viewer>

      <!-- Code Examples -->
      <demo-example-viewer title="Table Examples" [examples]="tableExamples"> </demo-example-viewer>
    </div>
  `,
  styleUrl: './tables.component.scss',
})
export class TablesComponent {
  readonly resources = [{ label: 'M3 Tables Guidelines', url: MD3_DOCS.TABLES }];

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

  onDensityChange(density: string) {
    this.selectedDensity.set(density);
  }

  // Basic table data
  basicDisplayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  basicTableData: TableElement[] = [
    {
      id: 1,
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      category: 'Nonmetal',
      discovered: 1766,
    },
    {
      id: 2,
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      category: 'Noble gas',
      discovered: 1868,
    },
    {
      id: 3,
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      category: 'Alkali metal',
      discovered: 1817,
    },
    {
      id: 4,
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      category: 'Alkaline earth metal',
      discovered: 1798,
    },
    {
      id: 5,
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      category: 'Metalloid',
      discovered: 1808,
    },
    {
      id: 6,
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      category: 'Nonmetal',
      discovered: -3750,
    },
    {
      id: 7,
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      category: 'Nonmetal',
      discovered: 1772,
    },
    {
      id: 8,
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      category: 'Nonmetal',
      discovered: 1774,
    },
    {
      id: 9,
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      category: 'Halogen',
      discovered: 1886,
    },
    {
      id: 10,
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      category: 'Noble gas',
      discovered: 1898,
    },
  ];

  // Employee table data with selection
  employeeDisplayedColumns: string[] = [
    'select',
    'name',
    'position',
    'department',
    'status',
    'actions',
  ];
  employeeData: Employee[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Senior Developer',
      department: 'Engineering',
      email: 'alice@company.com',
      salary: 95000,
      startDate: new Date('2022-01-15'),
      status: 'active',
    },
    {
      id: 2,
      name: 'Bob Smith',
      position: 'Product Manager',
      department: 'Product',
      email: 'bob@company.com',
      salary: 105000,
      startDate: new Date('2021-03-10'),
      status: 'active',
    },
    {
      id: 3,
      name: 'Carol Davis',
      position: 'UX Designer',
      department: 'Design',
      email: 'carol@company.com',
      salary: 85000,
      startDate: new Date('2022-06-01'),
      status: 'active',
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'DevOps Engineer',
      department: 'Engineering',
      email: 'david@company.com',
      salary: 90000,
      startDate: new Date('2023-01-20'),
      status: 'pending',
    },
    {
      id: 5,
      name: 'Eva Brown',
      position: 'Marketing Manager',
      department: 'Marketing',
      email: 'eva@company.com',
      salary: 80000,
      startDate: new Date('2021-11-05'),
      status: 'inactive',
    },
  ];

  private _selectedEmployees = signal<Employee[]>([]);
  selectedEmployees = this._selectedEmployees.asReadonly();

  allEmployeesSelected = computed(
    () =>
      this.employeeData.length > 0 && this.selectedEmployees().length === this.employeeData.length,
  );

  someEmployeesSelected = computed(
    () => this.selectedEmployees().length > 0 && !this.allEmployeesSelected(),
  );

  toggleAllEmployees() {
    if (this.allEmployeesSelected()) {
      this._selectedEmployees.set([]);
    } else {
      this._selectedEmployees.set([...this.employeeData]);
    }
  }

  toggleEmployee(employee: Employee) {
    const selected = this.selectedEmployees();
    const index = selected.findIndex((e) => e.id === employee.id);

    if (index >= 0) {
      this._selectedEmployees.set(selected.filter((e) => e.id !== employee.id));
    } else {
      this._selectedEmployees.set([...selected, employee]);
    }
  }

  isEmployeeSelected(employee: Employee): boolean {
    return this.selectedEmployees().some((e) => e.id === employee.id);
  }

  tableExamples = [
    {
      title: 'Basic Table Setup',
      language: 'html',
      code: `<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let element">{{ element.name }}</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
</table>`,
    },
    {
      title: 'Table with Selection',
      language: 'html',
      code: `<ng-container matColumnDef="select">
  <th mat-header-cell *matHeaderCellDef>
    <mat-checkbox (change)="toggleAll()" [checked]="allSelected()"></mat-checkbox>
  </th>
  <td mat-cell *matCellDef="let row">
    <mat-checkbox [checked]="isSelected(row)" (change)="toggle(row)"></mat-checkbox>
  </td>
</ng-container>`,
    },
  ];
}
