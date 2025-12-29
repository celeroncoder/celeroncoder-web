# AGENTS.md - AI Agent Guidelines for celeroncoder.tech

> Personal portfolio website built with Next.js 13 (App Router), TypeScript, and Tailwind CSS.

## Build & Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Next.js ESLint
```

**Note**: No test suite configured.

---

## Project Structure

```
app/                    # Next.js 13 App Router
├── globals.css         # Tailwind CSS + CSS variables
├── layout.tsx          # Root layout with metadata
└── page.tsx            # Main page (client component)

components/
├── ui/                 # Reusable UI primitives (Card, Section, Separator)
├── about.tsx, blogs.tsx, projects.tsx, stack.tsx  # Content sections
├── greeting.tsx, links.tsx, logo.tsx, footer.tsx  # Layout components

lib/
├── hooks.ts            # Custom hooks (useRedirect)
└── utils.ts            # Utility functions (cn)
```

---

## Code Style Guidelines

### TypeScript

- **Strict mode** enabled
- Use `type` imports: `import type { Metadata } from "next"`
- Inline prop types with `React.FC<>`:
  ```tsx
  export const Card: React.FC<{
    children: React.ReactNode;
    className?: string;
  }> = ({ children, className = "" }) => { ... }
  ```
- Export types alongside components when reusable
- **Never use** `as any`, `@ts-ignore`, or `@ts-expect-error`

### Imports (Order)

1. React/Next.js imports
2. External libraries (lucide-react, motion, radix-ui)
3. Internal components (`@/components/...`)
4. Internal utilities (`@/lib/...`)

**Path alias**: Always use `@/` for internal imports.

### Component Patterns

- **Named exports**: `export function Component()` or `export const Component`
- **"use client"** at file top for components using motion, hooks, or event handlers
- **Functional components only**
- **File naming**: kebab-case (`project-card.tsx`)

### Styling (Tailwind CSS)

- Use `cn()` from `@/lib/utils` for conditional classes:
  ```tsx
  className={cn("base-classes", conditional && "extra-classes", className)}
  ```
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` prefixes
- **Dark mode**: Always active (`.dark` class on body)

### Animation Patterns

Uses `motion/react` with consistent fade-in:

```tsx
// Standard animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
/>

// Staggered list (use idx * 0.4 for delay)
{items.map((item, idx) => (
  <motion.div transition={{ duration: 0.8, delay: idx * 0.4 }}>
    <ItemComponent {...item} />
  </motion.div>
))}
```

### Data Patterns

Static data as typed arrays above components:

```tsx
const projects: Project[] = [{ title: "...", description: "..." }];

export function Projects() {
  return <Section title="projects">{projects.map(...)}</Section>;
}
```

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` (13.4.3) | React framework (App Router) |
| `motion` | Animation library |
| `tailwindcss` + `tailwind-merge` + `clsx` | Styling |
| `@radix-ui/react-separator` | Accessible separator |
| `lucide-react` | Icon library |

---

## Common Gotchas

1. **Client components**: Components using `motion`, hooks, or event handlers need `"use client"`
2. **Font loading**: Via `next/font/google`, applied with `style={font.style}`
3. **Anchor navigation**: Section IDs use lowercase (`id={title.toLowerCase()}`)
4. **Dark mode only**: Site is permanently in dark mode
5. **No API routes**: Static portfolio site

---

## Adding New Features

### New Section
1. Create component in `components/`
2. Wrap content in `<Section title="name">`
3. Add `"use client"` if using motion
4. Import in `app/page.tsx`
5. Update `links` array in `page.tsx` and `footer.tsx`

### New Card Type
1. Create in `components/ui/`
2. Export type + component
3. Extend base `<Card>` component
