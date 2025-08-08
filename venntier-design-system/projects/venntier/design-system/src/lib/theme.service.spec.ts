import { TestBed } from '@angular/core/testing';
import { VenntierThemeService } from './theme.service';

describe('VenntierThemeService', () => {
  let service: VenntierThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenntierThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme', () => {
    expect(service.isDark()).toBe(false);
  });

  it('should toggle theme state', () => {
    expect(service.isDark()).toBe(false);
    
    service.toggleTheme();
    expect(service.isDark()).toBe(true);
    
    service.toggleTheme();
    expect(service.isDark()).toBe(false);
  });

  it('should set theme explicitly', () => {
    service.setTheme(true);
    expect(service.isDark()).toBe(true);
    
    service.setTheme(false);
    expect(service.isDark()).toBe(false);
  });

  it('should update document data-theme attribute when toggling', () => {
    const documentElement = document.documentElement;
    
    service.toggleTheme();
    expect(documentElement.getAttribute('data-theme')).toBe('dark');
    
    service.toggleTheme();
    expect(documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should update document data-theme attribute when setting theme', () => {
    const documentElement = document.documentElement;
    
    service.setTheme(true);
    expect(documentElement.getAttribute('data-theme')).toBe('dark');
    
    service.setTheme(false);
    expect(documentElement.getAttribute('data-theme')).toBe('light');
  });
});