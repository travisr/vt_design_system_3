import { Component, signal } from '@angular/core';
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
  isDarkMode = signal(false);
  activeSection = 'typography';  // Default section
  selectedTab = 0;
  
  // Form field values
  emailValue = '';
  countryValue = 'us';
  languageValue = 'en';
  inputValue = '';
  selectValue = 'option1';
  
  // Checkbox and radio values
  checkbox1 = false;
  checkbox2 = true;
  checkbox3 = false;
  checkboxValue = false;
  radioValue = 'monthly';
  
  // Toggle values
  toggle1 = false;
  toggle2 = true;
  toggle3 = false;
  slideToggleValue = false;
  
  tableData = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  ];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  
  constructor(private snackBar: MatSnackBar) {}
  
  toggleTheme() {
    this.isDarkMode.update(v => !v);
    document.documentElement.setAttribute(
      'data-theme',
      this.isDarkMode() ? 'dark' : 'light'
    );
  }
  
  showSnackbar() {
    this.snackBar.open('This is a snackbar message!', 'Close', {
      duration: 3000,
    });
  }
}