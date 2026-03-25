---
name: uiux-expert
description: Diseño UI/UX: accesibilidad, experiencia de usuario, patrones visuales, diseño responsive
---

# UI/UX Expert

## Principios de UX

### 1. Usabilidad

- **Facilidad de aprendizaje**: Intuitivo desde el primer uso
- **Eficiencia**: Tareas rápidas una vez aprendido
- **Memorabilidad**: Fácil recordar después de tiempo
- **Errores**: Pocos y recuperables
- **Satisfacción**: Experiencia agradable

### 2. Accesibilidad (WCAG)

- **Perceptible**: Información presentable
- **Operable**: Controles usables
- **Comprensible**: Interfaz entendible
- **Robusto**: Compatible con tecnologías asistivas

---

## Componentes UI

### Botones

```tsx
// ✅ Estados claros
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button disabled>Disabled</Button>

// ✅ Tamaños consistentes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Formularios

```tsx
// ✅ Labels asociados
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Placeholder como ayuda, no como label
<input 
  placeholder="e.g. john@example.com"
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email</span>

// ✅ Mensajes de error
{errors.email && (
  <span role="alert">{errors.email.message}</span>
)}
```

### Feedback

```tsx
// ✅ Loading states
{isLoading && <Spinner />}

// ✅ Success feedback
{success && <Toast message="Saved!" />}

// ✅ Error feedback
{error && <Toast message={error} variant="error" />}

// ✅ Empty states
{users.length === 0 && (
  <EmptyState message="No users yet" action={onCreateUser} />
)}
```

---

## Responsive Design

### Breakpoints

```
sm: 640px    # Mobile landscape
md: 768px    # Tablet
lg: 1024px   # Desktop
xl: 1280px   # Large desktop
2xl: 1536px  # Extra large
```

### Ejemplos Tailwind

```tsx
// ✅ Mobile first
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// ✅ Grid adaptativo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// ✅ Ocultar/mostrar
<div className="md:hidden lg:block">

// ✅ Spacing adaptativo
<div className="p-4 md:p-6 lg:p-8">
```

### Navigation

```tsx
// Mobile
<Button 
  className="md:hidden"
  onClick={() => setMenuOpen(true)}
>
  <MenuIcon />
</Button>

// Desktop
<nav className="hidden md:flex">
  {/* Nav items */}
</nav>
```

---

## Formularios UX

### Validación

```tsx
// ✅ Validación en tiempo real
<input 
  {...register("email", {
    required: "Email requerido",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email inválido"
    }
  })}
/>

// ✅ Feedback inmediato
{errors.email && (
  <span className="text-red-500 text-sm">
    {errors.email.message}
  </span>
)}
```

### Long Forms

```tsx
// ✅ Dividir en pasos
<Steps current={step}>
  <Step>Información Personal</Step>
  <Step>Experiencia</Step>
  <Step>Educación</Step>
</Steps>

// ✅ Progress indicator
<Progress value={66} />
<span>2 de 3 completados</span>
```

---

## Micro-interacciones

### Hover States

```tsx
// ✅ Feedback visual
<button className="hover:bg-primary/90 active:scale-95 transition-all">
  Click me
</button>

// ✅ Cursor
<button className="cursor-pointer">
<button className="cursor-not-allowed" disabled>
```

### Animaciones

```tsx
import { motion } from "framer-motion";

// ✅ Entradas
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>

// ✅ Transiciones
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

---

## Diseño Visual

### Espaciado

```tsx
// ✅ Espaciado consistente
<div className="space-y-4">
  <Item />
  <Item />
  <Item />
</div>

// ✅ Grid
<div className="grid gap-4">
  <Card />
  <Card />
</div>
```

### Tipografía

```tsx
// ✅ Jerarquía clara
<h1 className="text-4xl font-bold">Title</h1>
<h2 className="text-2xl font-semibold">Subtitle</h2>
<p className="text-base">Body</p>
<p className="text-sm text-muted-foreground">Caption</p>

// ✅ Line height para texto largo
<p className="leading-relaxed">
  Long text...
</p>
```

### Color

```tsx
// ✅ Semántico
<Button variant="primary">Action</Button>
<Button variant="destructive">Danger</Button>

// ✅ Estados
<span className="text-muted-foreground">Secondary text</span>
<span className="text-destructive">Error</span>
<span className="text-success">Success</span>
```

---

## Loading States

### Skeleton

```tsx
<div className="space-y-4">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-4 w-full" />
</div>
```

### Spinner

```tsx
<button disabled>
  <Spinner className="mr-2" />
  Loading...
</button>
```

### Progress

```tsx
<Progress value={45} />
<Spinner /> Updating...
```

---

## Accesibilidad

### Keyboard Navigation

```tsx
// ✅ Focus visible
<button className="focus:outline-none focus:ring-2 focus:ring-primary">
  Action
</button>

// ✅ Skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>

// ✅ Tab order
<div tabIndex={0}>Focusable</div>
```

### Screen Readers

```tsx
// ✅ Icon buttons con label
<Button aria-label="Close menu">
  <XIcon />
</Button>

// ✅ Visually hidden text
<span className="sr-only">
  Selected: {item.name}
</span>

// ✅ Live regions para updates
<div aria-live="polite">
  {message}
</div>
```
