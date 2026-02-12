---
paths: src/components/**/*.jsx, src/components/**/*.tsx, src/pages/**/*.jsx, src/pages/**/*.tsx, src/features/**/*.jsx, src/features/**/*.tsx
---

# Component Rules

## Size Limits

- **200 lines**: Warning - start planning to split
- **300 lines**: Hard limit - must split before proceeding

## Structure

Follow this order in every component:

1. Imports (grouped: React, external, internal, styles)
2. Component definition
3. Hooks (all hooks at the top)
4. Effects
5. Handlers
6. Render (return statement)

## Splitting Large Components

When a component grows too large:

```
LargeComponent.jsx (400 lines)
    ↓ Split into:
├── LargeComponent.jsx      (orchestrates, ~50 lines)
├── SectionA.jsx            (~100 lines)
├── SectionB.jsx            (~100 lines)
└── useLargeComponentData.js (hook for data, ~80 lines)
```

## Pages Must Be Thin

Page components should ONLY:
- Compose feature components
- Handle route-level concerns
- Maximum 50 lines

```jsx
// GOOD: Thin page
export default function DashboardPage() {
  return (
    <PageLayout>
      <DashboardHeader />
      <MetricsSection />
      <ActivityFeed />
    </PageLayout>
  );
}
```

## Anti-Patterns

- Inline styles repeated across components (use shared Button/Card)
- Data fetching directly in components (use hooks)
- Giant render functions with complex conditionals (extract components)
- Prop drilling through many levels (use Context)
