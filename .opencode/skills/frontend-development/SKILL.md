---
name: frontend-development
description: Mejores prácticas de desarrollo frontend: componentes, rendimiento, optimización, patrones React
---

# Frontend Development

## Principios

1. **Composición**: Componer en lugar de heredar
2. **Separación de concerns**: UI lógica separada
3. **Reutilización**: DRY (Don't Repeat Yourself)
4. **Rendimiento**: Optimizar solo cuando sea necesario

---

## Estructura de Componentes

### Componente Simple

```tsx
// src/components/Button.tsx
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ 
  variant = "primary", 
  className,
  children,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Componente con Hooks

```tsx
export const ProfileCard: React.FC<ProfileCardProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Skeleton />;
  
  return (
    <Card>
      <Avatar src={user.avatar} />
      <Name>{user.name}</Name>
    </Card>
  );
};
```

---

## Patrones de Componentes

### Container/Presentational

```tsx
// Presentational - solo UI
const UserListView = ({ users, onSelect }) => (
  <ul>
    {users.map(user => (
      <li onClick={() => onSelect(user.id)}>
        {user.name}
      </li>
    ))}
  </ul>
);

// Container - lógica y estado
const UserList = () => {
  const users = useUsers();
  return <UserListView users={users} onSelect={...} />;
};
```

### Render Props

```tsx
<DataProvider 
  render={({ data, loading }) => (
    <Display data={data} loading={loading} />
  )}
/>
```

### Compound Components

```tsx
const Menu = ({ children }) => (
  <div className="menu">{children}</div>
);

Menu.Item = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

// Uso
<Menu>
  <Menu.Item onClick={...}>Option 1</Menu.Item>
  <Menu.Item onClick={...}>Option 2</Menu.Item>
</Menu>
```

---

## Rendimiento

### React.memo

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // render expensive
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data.id === nextProps.data.id;
});
```

### useMemo

```typescript
const sortedUsers = useMemo(() => {
  return users
    .filter(u => u.active)
    .sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

const userOptions = useMemo(() => 
  users.map(u => ({ label: u.name, value: u.id })),
  [users]
);
```

### useCallback

```typescript
const handleSubmit = useCallback((data: FormData) => {
  submitForm(data);
}, [submitForm]);

// Para event handlers en child memo
<ChildComponent onSubmit={handleSubmit} />
```

### Code Splitting

```typescript
const LazyComponent = lazy(() => import("./HeavyComponent"));

const App = () => (
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
);
```

---

## Estado

### Local vs Global

```typescript
// ✅ Local - solo este componente
const [count, setCount] = useState(0);

// ✅ Global - compartido entre componentes
const { user } = useAuthStore();

// ✅ URL - navegación
const { id } = useParams();

// ✅ Server - datos remotos
const { data } = useQuery(["user", id], fetchUser);
```

### Estado Error

```typescript
const [error, setError] = useState<Error | null>(null);

// Manejo
try {
  await riskyOperation();
} catch (e) {
  setError(e as Error);
}

// Display
if (error) return <ErrorMessage error={error} />;
```

---

## Formularios

### React Hook Form

```typescript
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { name: "" },
});

const onSubmit = (data: FormData) => {
  console.log(data);
};

<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.register("name")} />
  {form.formState.errors.name && <Error>{form.formState.errors.name.message}</Error>}
</form>
```

### Manejo de Arrays

```typescript
const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "items",
});

{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(`items.${index}.name`)} />
    <button type="button" onClick={() => remove(index)}>Remove</button>
  </div>
))}

<button type="button" onClick={() => append({ name: "" })}>Add</button>
```

---

## Estilos

### Tailwind

```tsx
// ✅ Composición de clases
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// ✅ Condicional
<div className={cn(
  "p-4",
  isActive && "bg-blue-500",
  variant === "primary" ? "text-white" : "text-gray"
)}>

// ❌ Evitar valores hardcoded en JS
<div style={{ margin: "1rem" }}>
```

### CSS Modules

```tsx
import styles from "./Component.module.css";

<div className={styles.container}>
  <span className={styles.title}>Title</span>
</div>
```

---

## Accesibilidad

### Semantic HTML

```tsx
// ✅ Semántico
<button>Click me</button>
<nav>...</nav>
<main>...</main>
<article>...</article>

// ❌ No semántico
<div onClick={...}>Click me</div>
```

### ARIA

```tsx
// ✅ Label
<button aria-label="Close modal">
  <X />
</button>

// ✅ Live region
<div aria-live="polite">
  {message}
</div>

// ✅ Descriptción
<input 
  aria-describedby="email-hint"
  id="email"
/>
<span id="email-hint">We'll never share your email</span>
```

---

## Testing de Comportamiento

### Cosas a Testear

1. **Renderizado correcto** con props
2. **Estados** (loading, error, empty)
3. **Interacciones** (clicks, forms)
4. **Actualizaciones** de estado

```tsx
test("shows loading state", () => {
  render(<Component loading />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("calls onSubmit", async () => {
  const onSubmit = vi.fn();
  render(<Form onSubmit={onSubmit} />);
  
  await userEvent.click(screen.getByText("Submit"));
  
  expect(onSubmit).toHaveBeenCalled();
});
```
