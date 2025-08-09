# Parallel Agent Implementation Instructions

## Overview
We need to implement multiple component demonstration pages in parallel using angular-ui-expert agents. The infrastructure is set up, and each agent can work independently on their assigned pages.

## Key Requirements for ALL Agents

### 1. Design System First
- **USE ONLY** design system defaults - no local style overrides
- Components should look exactly as the design system intends
- Import shared styles: `@import '../../../shared/styles/demo-shared.scss';`
- Use CSS variables: `var(--md-sys-*)` for any needed values

### 2. Page Structure Pattern
Every page MUST follow this structure:
```typescript
@Component({
  selector: 'demo-[component-name]',
  standalone: true,
  imports: [
    CommonModule,
    // Material modules needed
    PageHeaderComponent,
    ExampleViewerComponent
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="[Component Name]"
        description="[Brief description]"
        mdLink="https://m3.material.io/components/[component]">
      </demo-page-header>
      
      <!-- Sections with examples -->
    </div>
  `,
  styles: [`@import '../../../shared/styles/demo-shared.scss';`]
})
```

### 3. Demonstration Goals
- Show ALL variants of the component
- Display interactive states (hover, focus, active, disabled)
- Include practical usage examples
- Provide code snippets for each example
- Follow OpenAI-inspired minimal aesthetic

### 4. Shared CSS Classes Available
```scss
.demo-page           // Page container
.demo-section        // Section wrapper
.demo-section-title  // Section heading
.demo-section-description // Section description
.demo-example-row    // Horizontal layout
.demo-example-column // Vertical layout
.demo-grid           // Grid layout
.demo-variant-label  // Small labels for variants
```

### 5. File Locations
All pages go in: `projects/demo/src/app/pages/[category]/[component]/[component].component.ts`

---

## Agent Task Assignments

### Agent 1: Foundation Pages
Create these component pages:
1. **Typography** (`foundation/typography/typography.component.ts`)
   - Show all typescale levels from design system
   - Display Inter font weights
   - Responsive typography examples
   
2. **Colors** (`foundation/colors/colors.component.ts`)
   - Complete color palette
   - Interactive states demo
   - Theme switching demonstration
   
3. **Spacing** (`foundation/spacing/spacing.component.ts`)
   - 8px grid system visualization
   - Spacing scale examples
   - Layout spacing patterns

4. **Motion** (`foundation/motion/motion.component.ts`)
   - Easing curves
   - Duration scales
   - Animation examples

5. **Icons** (`foundation/icons/icons.component.ts`)
   - Common icon sizes
   - Icon button examples
   - Icon with text patterns

### Agent 2: Actions Pages
Create these component pages:
1. **FAB** (`actions/fab/fab.component.ts`)
   - Standard FAB
   - Small/Large FAB
   - Extended FAB
   - Positioning examples

2. **Icon Buttons** (`actions/icon-buttons/icon-buttons.component.ts`)
   - Standard icon buttons
   - Toggle icon buttons
   - Different sizes
   - With tooltips

3. **Segmented Buttons** (`actions/segmented-buttons/segmented-buttons.component.ts`)
   - Single select
   - Multi select
   - With icons
   - Density variants

4. **Chips** (`actions/chips/chips.component.ts`)
   - Assist chips
   - Filter chips
   - Input chips
   - Suggestion chips
   - Interactive states

### Agent 3: Forms Pages
Create these component pages:
1. **Text Fields** (`forms/text-fields/text-fields.component.ts`)
   - Outlined variant
   - With icons (prefix/suffix)
   - Helper text
   - Error states
   - Character counter
   - Multiline/textarea

2. **Select** (`forms/select/select.component.ts`)
   - Basic select
   - Multiple selection
   - With option groups
   - Autocomplete
   - Search select

3. **Checkboxes** (`forms/checkboxes/checkboxes.component.ts`)
   - Standard checkbox
   - Indeterminate state
   - Checkbox groups
   - With descriptions

4. **Radio Buttons** (`forms/radio-buttons/radio-buttons.component.ts`)
   - Radio groups
   - Horizontal/vertical layout
   - With descriptions

5. **Switches** (`forms/switches/switches.component.ts`)
   - Standard switch
   - With icons
   - Switch groups
   - With labels

6. **Sliders** (`forms/sliders/sliders.component.ts`)
   - Continuous slider
   - Discrete slider
   - Range slider
   - With tick marks
   - Custom value display

7. **Date & Time** (`forms/date-time/date-time.component.ts`)
   - Date picker
   - Time picker
   - Date range picker
   - DateTime picker

### Agent 4: Navigation Pages
Create these component pages:
1. **Navigation Bar** (`navigation/navbar/navbar.component.ts`)
   - 3-5 destinations
   - With badges
   - Icon only vs icon+label

2. **Navigation Rail** (`navigation/rail/rail.component.ts`)
   - Collapsed/expanded
   - With FAB
   - Grouping sections

3. **Navigation Drawer** (`navigation/drawer/drawer.component.ts`)
   - Modal variant
   - Standard variant
   - Dismissible variant

4. **Tabs** (`navigation/tabs/tabs.component.ts`)
   - Primary tabs
   - Secondary tabs
   - Scrollable tabs
   - With icons
   - With badges

5. **Top App Bar** (`navigation/app-bar/app-bar.component.ts`)
   - Center-aligned
   - Small/Medium/Large
   - With actions
   - Collapsing variants

### Agent 5: Communication Pages
Create these component pages:
1. **Badges** (`communication/badges/badges.component.ts`)
   - Dot badges
   - Number badges
   - Max value (+99)
   - On different components

2. **Snackbar** (`communication/snackbar/snackbar.component.ts`)
   - Simple message
   - With action
   - Different positions
   - Duration options

3. **Tooltips** (`communication/tooltips/tooltips.component.ts`)
   - All positions
   - Rich tooltips
   - Delay configurations
   - On different elements

4. **Dialogs** (`communication/dialogs/dialogs.component.ts`)
   - Alert dialog
   - Simple dialog
   - Full-screen dialog
   - Form dialog

5. **Sheets** (`communication/sheets/sheets.component.ts`)
   - Bottom sheet
   - Side sheet
   - Modal vs non-modal

### Agent 6: Data Display Pages
Create these component pages:
1. **Cards** (`data-display/cards/cards.component.ts`)
   - Elevated card
   - Filled card
   - Outlined card
   - Interactive cards
   - Card layouts

2. **Lists** (`data-display/lists/lists.component.ts`)
   - Single-line list
   - Two-line list
   - Three-line list
   - With avatars
   - With actions
   - Selection lists

3. **Tables** (`data-display/tables/tables.component.ts`)
   - Basic table
   - With sorting
   - With pagination
   - Expandable rows
   - With selection

4. **Dividers** (`data-display/dividers/dividers.component.ts`)
   - Full-width divider
   - Inset divider
   - Middle divider
   - Vertical divider

### Agent 7: Feedback & Layout Pages
Create these component pages:
1. **Progress** (`feedback/progress/progress.component.ts`)
   - Linear progress
   - Circular progress
   - Determinate/indeterminate
   - Buffer variant

2. **Skeleton** (`feedback/skeleton/skeleton.component.ts`)
   - Text skeleton
   - Card skeleton
   - List skeleton
   - Custom shapes

3. **Loading** (`feedback/loading/loading.component.ts`)
   - Spinner variations
   - Loading overlays
   - Inline loading

4. **Empty States** (`feedback/empty/empty.component.ts`)
   - No data
   - Error states
   - No results
   - With actions

5. **Grid System** (`layout/grid/grid.component.ts`)
   - Column layouts
   - Responsive breakpoints
   - Gap spacing
   - Alignment options

6. **Responsive** (`layout/responsive/responsive.component.ts`)
   - Breakpoint demos
   - Adaptive layouts
   - Hide/show at breakpoints

7. **Expansion Panels** (`layout/expansion/expansion.component.ts`)
   - Accordion mode
   - Multiple expanded
   - With actions
   - Nested panels

---

## Example Code Template

Here's the pattern to follow (from buttons.component.ts):

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ExampleViewerComponent } from '../../../shared/components/example-viewer/example-viewer.component';

@Component({
  selector: 'demo-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    PageHeaderComponent,
    ExampleViewerComponent
  ],
  template: `
    <div class="demo-page">
      <demo-page-header
        title="Buttons"
        description="Buttons help people take action..."
        mdLink="https://m3.material.io/components/buttons">
      </demo-page-header>

      <section class="demo-section">
        <h2 class="demo-section-title">Section Title</h2>
        <p class="demo-section-description">Description</p>

        <demo-example-viewer 
          title="Example Title"
          [code]="exampleCode">
          <!-- Component examples here -->
        </demo-example-viewer>
      </section>
    </div>
  `,
  styles: [`@import '../../../shared/styles/demo-shared.scss';`]
})
export class ButtonsComponent {
  exampleCode = {
    html: `<!-- HTML code -->`,
    ts: `// TypeScript code`
  };
}
```

## Important Notes

1. **NO HARDCODED STYLES** - Use only design system tokens
2. **FOLLOW THE PATTERN** - Use the same structure for consistency
3. **COMPLETE EXAMPLES** - Show all variants and states
4. **WORKING CODE** - All examples must be functional
5. **MINIMAL APPROACH** - OpenAI-inspired clean design

Each agent should create their assigned pages following these guidelines exactly. The infrastructure is ready - just create the component files in the specified locations.