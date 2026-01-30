# Testing Guide

## Commands
Run tests from the `codebase/` directory:

```bash
npm test
```

Run production build validation:

```bash
npm run build
```

## Must-Have Coverage
- Task management (add, edit, delete, prioritize): `src/tests/tasks.test.tsx`
- Goal management with themes and categories: `src/tests/goals.test.tsx`
- Progress dashboard metrics: `src/tests/dashboard.test.tsx`
- Calendar day expansion: `src/tests/calendar.test.tsx`
