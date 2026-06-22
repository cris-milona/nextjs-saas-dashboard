# Project Conventions

## 1. Components

Components are written as named arrow function expressions and exported inline with `export const`. No default exports, no separate export statement at the bottom.

```tsx
// ✅ correct
export const MyComponent = () => {
  return <div />;
};

// ❌ wrong — default export
export default function MyComponent() {}

// ❌ wrong — separate export statement
const MyComponent = () => {};
export { MyComponent };
export default MyComponent;
```

**Exception:** Next.js requires default exports for file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`). Those follow this pattern:

```tsx
const DashboardPage = async () => {
  return <div />;
};

export default DashboardPage;
```

Async server components use `async` on the arrow function:

```tsx
export const Topbar = async () => {
  const data = await fetch(...);
  return <header />;
};
```

---

## 2. Import Order

Imports are sorted automatically by ESLint (`import/order` rule). Run `pnpm lint:fix` to auto-fix. The enforced order is:

1. `react` / `react-dom`
2. `next` and its subpaths
3. Third-party packages (e.g. `recharts`, `lucide-react`)
4. Internal aliases (`@/components`, `@/lib`, `@/types`, etc.)
5. Relative imports (`./`, `../`)

Each group is separated by a blank line. Named imports within `{}` are sorted alphabetically.

```ts
// ✅ correct
import { useState } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";

import { updateUserProfile } from "./actions";
```

---

## 3. Formatting

Prettier is configured in `.prettierrc`. Run `pnpm format` to format all files.

| Rule | Value |
|---|---|
| Semicolons | `true` |
| Quotes | double (`"`) |
| Trailing commas | ES5 |
| Print width | 80 |
| Tab width | 2 spaces |

```ts
// ✅ correct
import { cn } from "@/lib/utils";

export const foo = (a: string, b: string) => {
  return cn(a, b);
};
```

### Utility scripts

| Command | What it does |
|---|---|
| `pnpm format` | Format all files with Prettier |
| `pnpm lint` | Check for ESLint errors |
| `pnpm lint:fix` | Auto-fix ESLint errors (including import order) |
