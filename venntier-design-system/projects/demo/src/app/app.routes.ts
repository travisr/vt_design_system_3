import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/foundation/typography', pathMatch: 'full' },

  // Foundation
  {
    path: 'foundation',
    children: [
      {
        path: 'typography',
        loadComponent: () =>
          import('./pages/foundation/typography/typography.component').then(
            (m) => m.TypographyComponent,
          ),
      },
      {
        path: 'colors',
        loadComponent: () =>
          import('./pages/foundation/colors/colors.component').then((m) => m.ColorsComponent),
      },
      {
        path: 'spacing',
        loadComponent: () =>
          import('./pages/foundation/spacing/spacing.component').then((m) => m.SpacingComponent),
      },
      {
        path: 'elevation',
        loadComponent: () =>
          import('./pages/foundation/elevation/elevation.component').then(
            (m) => m.ElevationComponent,
          ),
      },
      {
        path: 'motion',
        loadComponent: () =>
          import('./pages/foundation/motion/motion.component').then((m) => m.MotionComponent),
      },
      {
        path: 'icons',
        loadComponent: () =>
          import('./pages/foundation/icons/icons.component').then((m) => m.IconsComponent),
      },
    ],
  },

  // Actions
  {
    path: 'actions',
    children: [
      {
        path: 'buttons',
        loadComponent: () =>
          import('./pages/actions/buttons/buttons.component').then((m) => m.ButtonsComponent),
      },
      {
        path: 'fab',
        loadComponent: () =>
          import('./pages/actions/fab/fab.component').then((m) => m.FabComponent),
      },
      {
        path: 'icon-buttons',
        loadComponent: () =>
          import('./pages/actions/icon-buttons/icon-buttons.component').then(
            (m) => m.IconButtonsComponent,
          ),
      },
      {
        path: 'segmented-buttons',
        loadComponent: () =>
          import('./pages/actions/segmented-buttons/segmented-buttons.component').then(
            (m) => m.SegmentedButtonsComponent,
          ),
      },
      {
        path: 'chips',
        loadComponent: () =>
          import('./pages/actions/chips/chips.component').then((m) => m.ChipsComponent),
      },
    ],
  },

  // Forms
  {
    path: 'forms',
    children: [
      {
        path: 'text-fields',
        loadComponent: () =>
          import('./pages/forms/text-fields/text-fields.component').then(
            (m) => m.TextFieldsComponent,
          ),
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./pages/forms/select/select.component').then((m) => m.SelectComponent),
      },
      {
        path: 'checkboxes',
        loadComponent: () =>
          import('./pages/forms/checkboxes/checkboxes.component').then(
            (m) => m.CheckboxesComponent,
          ),
      },
      // { path: 'radio-buttons', loadComponent: () => import('./pages/forms/radio-buttons/radio-buttons.component').then(m => m.RadioButtonsComponent) },
      // { path: 'switches', loadComponent: () => import('./pages/forms/switches/switches.component').then(m => m.SwitchesComponent) },
      // { path: 'sliders', loadComponent: () => import('./pages/forms/sliders/sliders.component').then(m => m.SlidersComponent) },
      // { path: 'date-time', loadComponent: () => import('./pages/forms/date-time/date-time.component').then(m => m.DateTimeComponent) },
    ],
  },

  // Navigation
  {
    path: 'navigation',
    children: [
      // { path: 'navbar', loadComponent: () => import('./pages/navigation/navbar/navbar.component').then(m => m.NavbarComponent) },
      // { path: 'rail', loadComponent: () => import('./pages/navigation/rail/rail.component').then(m => m.RailComponent) },
      // { path: 'drawer', loadComponent: () => import('./pages/navigation/drawer/drawer.component').then(m => m.DrawerComponent) },
      // { path: 'tabs', loadComponent: () => import('./pages/navigation/tabs/tabs.component').then(m => m.TabsComponent) },
      // { path: 'app-bar', loadComponent: () => import('./pages/navigation/app-bar/app-bar.component').then(m => m.AppBarComponent) },
    ],
  },

  // Communication
  {
    path: 'communication',
    children: [
      // { path: 'badges', loadComponent: () => import('./pages/communication/badges/badges.component').then(m => m.BadgesComponent) },
      // { path: 'snackbar', loadComponent: () => import('./pages/communication/snackbar/snackbar.component').then(m => m.SnackbarComponent) },
      // { path: 'tooltips', loadComponent: () => import('./pages/communication/tooltips/tooltips.component').then(m => m.TooltipsComponent) },
      // { path: 'dialogs', loadComponent: () => import('./pages/communication/dialogs/dialogs.component').then(m => m.DialogsComponent) },
      // { path: 'sheets', loadComponent: () => import('./pages/communication/sheets/sheets.component').then(m => m.SheetsComponent) },
    ],
  },

  // Data Display
  {
    path: 'data-display',
    children: [
      // { path: 'cards', loadComponent: () => import('./pages/data-display/cards/cards.component').then(m => m.CardsComponent) },
      // { path: 'lists', loadComponent: () => import('./pages/data-display/lists/lists.component').then(m => m.ListsComponent) },
      // { path: 'tables', loadComponent: () => import('./pages/data-display/tables/tables.component').then(m => m.TablesComponent) },
      // { path: 'dividers', loadComponent: () => import('./pages/data-display/dividers/dividers.component').then(m => m.DividersComponent) },
    ],
  },

  // Feedback
  {
    path: 'feedback',
    children: [
      // { path: 'progress', loadComponent: () => import('./pages/feedback/progress/progress.component').then(m => m.ProgressComponent) },
      // { path: 'skeleton', loadComponent: () => import('./pages/feedback/skeleton/skeleton.component').then(m => m.SkeletonComponent) },
      // { path: 'loading', loadComponent: () => import('./pages/feedback/loading/loading.component').then(m => m.LoadingComponent) },
      // { path: 'empty', loadComponent: () => import('./pages/feedback/empty/empty.component').then(m => m.EmptyComponent) },
    ],
  },

  // Layout
  {
    path: 'layout',
    children: [
      // { path: 'grid', loadComponent: () => import('./pages/layout/grid/grid.component').then(m => m.GridComponent) },
      // { path: 'responsive', loadComponent: () => import('./pages/layout/responsive/responsive.component').then(m => m.ResponsiveComponent) },
      // { path: 'expansion', loadComponent: () => import('./pages/layout/expansion/expansion.component').then(m => m.ExpansionComponent) },
    ],
  },
];
