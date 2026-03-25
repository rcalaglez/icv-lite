---
name: react-hooks
description: Patrones y mejores prácticas de React Hooks: useState, useEffect, custom hooks, optimizaciones
---

# React Hooks

## Reglas de Hooks

1. **Solo en Components**: Llamar hooks solo en funciones React
2. **Solo en Top Level**: No llamar en loops, condiciones, o funciones anidadas
3. **Consistencia**: Mismo orden de hooks en cada render

---

## useState

### Patrón Básico

```typescript
const [state, setState] = useState(initialValue);
```

### Tipos de useState

```typescript
// Primitive
const [count, setCount] = useState(0);
const [name, setName] = useState("");

// Object
const [user, setUser] = useState<{ name: string; email: string } | null>(null);

// Array
const [items, setItems] = useState<string[]>([]);
```

### Actualización de Estado

```typescript
// Directo
setCount(5);

// Funcional (para valores anteriores)
setCount(prev => prev + 1);

// Object: siempre nuevo objeto
setUser(prev => ({ ...prev, name: "Nuevo" }));

// Array: inmutable
setItems(prev => [...prev, "nuevo"]);
```

### useState con Tipos

```typescript
// Tipado explícito
const [loading, setLoading] = useState<boolean>(false);

// Inferido
const [loading, setLoading] = useState(false);
```

---

## useEffect

### Patrón Básico

```typescript
useEffect(() => {
  // Effect logic
  
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### Casos de Uso

#### Fetch de Datos

```typescript
useEffect(() => {
  const fetchData = async () => {
    const data = await api.get();
    setData(data);
  };
  
  fetchData();
}, [dependency]);
```

#### Suscripciones

```typescript
useEffect(() => {
  const subscription = events.on('message', handleMessage);
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

#### Document Title

```typescript
useEffect(() => {
  document.title = title;
  
  return () => {
    document.title = originalTitle;
  };
}, [title]);
```

---

## useCallback

### Cuándo Usar

- Pasar callbacks a componentes optimizados (React.memo)
- Dependencias en useEffect
- Evitar re-renders innecesarios

```typescript
const handleSubmit = useCallback((data: FormData) => {
  submitForm(data);
}, [submitForm]);
```

---

## useMemo

### Cuándo Usar

- Cálculos costosos
- Referencia estable para objetos/arrays
- Evitar re-cálculos

```typescript
// Cálculo costoso
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// Referencia estable
const options = useMemo(() => ({
  enableHighAccuracy: true,
  timeout: 5000,
}), []);
```

---

## Custom Hooks

### Estructura

```typescript
// use prefixed name
export const useCounter = (initial: number = 0) => {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);
  
  return { count, increment, decrement, reset };
};
```

### Ejemplos en el Proyecto

#### useResumeStore

```typescript
// Zustand store como hook
import useResumeStore from "@/hooks/useResumeStore";

const { profiles } = useResumeStore();
```

#### useEditorState

```typescript
// Estado del editor
const { profile, hasUnsavedChanges, handleSave } = useEditorState({ profileId });
```

#### useFormManager

```typescript
// Gestión de formulario con React Hook Form
const { form, onSubmit } = useFormManager({ data, onUpdate });
```

#### useCvEvaluation

```typescript
// Evaluación de CV
const { evaluate, isLoading } = useCvEvaluation();
```

---

## Patrones Avanzados

### useRef

```typescript
// Mutable ref sin re-render
const inputRef = useRef<HTMLInputElement>(null);

// Valor que persiste
const countRef = useRef(0);
countRef.current += 1;

// Timer
useEffect(() => {
  const timer = setInterval(() => { ... }, 1000);
  return () => clearInterval(timer);
}, []);
```

### useReducer

```typescript
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement'; amount: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - action.amount };
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

### useContext

```typescript
// Simple
const value = useContext(MyContext);

// Con tipo
const { openModal } = useContext(LayoutContext);
```

---

## Optimizaciones

### React.memo + useCallback

```typescript
const ExpensiveComponent = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
}, (prev, next) => {
  return prev.onClick === next.onClick;
});
```

### Virtualización

Para listas grandes, considerar libraries como `react-window` o `tanstack/virtual`.

---

## Errores Comunes

### No incluir dependencias

```typescript
// ❌ Mal
useEffect(() => {
  fetchData(id);
}, []); // Falta id

// ✅ Bien
useEffect(() => {
  fetchData(id);
}, [id]);
```

### useState con objeto mutado

```typescript
// ❌ Mal
setUser({ ...user, name: "New" });

// ✅ Bien
setUser(prev => ({ ...prev, name: "New" }));
```

### Crear funciones en render

```typescript
// ❌ Mal - nueva función cada render
<button onClick={() => handleClick(id)} />

// ✅ Bien - con useCallback
const handleClick = useCallback((id) => { ... }, []);
<button onClick={() => handleClick(id)} />
```
