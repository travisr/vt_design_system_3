import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { VenntierThemeService } from '@venntier/design-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TitleCasePipe,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './sidebar-demo.component.html',
  styleUrl: './sidebar-demo.component.scss'
})
export class AppComponent {
  private readonly themeService = inject(VenntierThemeService);
  
  // Signals for reactive state
  readonly isDarkMode = this.themeService.isDark;
  readonly themeClass = this.themeService.themeClass;
  readonly activeSection = signal('typography');
  readonly selectedTab = signal(0);
  
  // Form field signals
  readonly emailValue = signal('');
  readonly countryValue = signal('us');
  readonly languageValue = signal('en');
  readonly inputValue = signal('');
  readonly selectValue = signal('option1');
  
  // Checkbox and radio signals
  readonly checkbox1 = signal(false);
  readonly checkbox2 = signal(true);
  readonly checkbox3 = signal(false);
  readonly checkboxValue = signal(false);
  readonly radioValue = signal('monthly');
  
  // Toggle signals
  readonly toggle1 = signal(false);
  readonly toggle2 = signal(true);
  readonly toggle3 = signal(false);
  readonly slideToggleValue = signal(false);
  
  // Table data as signals
  readonly tableData = signal([
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  ]);
  readonly displayedColumns = signal(['position', 'name', 'weight', 'symbol']);
  
  // Computed property example
  readonly formIsValid = computed(() => {
    return this.emailValue().includes('@') && this.inputValue().length > 0;
  });
  
  private readonly snackBar = inject(MatSnackBar);
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }
  
  setSelectedTab(index: number): void {
    this.selectedTab.set(index);
  }
  
  showSnackbar(): void {
    this.snackBar.open('This is a snackbar message!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  
  // Helper methods for form bindings with signals
  updateEmailValue(value: string): void {
    this.emailValue.set(value);
  }
  
  updateCountryValue(value: string): void {
    this.countryValue.set(value);
  }
  
  updateLanguageValue(value: string): void {
    this.languageValue.set(value);
  }
  
  updateInputValue(value: string): void {
    this.inputValue.set(value);
  }
  
  updateSelectValue(value: string): void {
    this.selectValue.set(value);
  }
  
  updateRadioValue(value: string): void {
    this.radioValue.set(value);
  }
}