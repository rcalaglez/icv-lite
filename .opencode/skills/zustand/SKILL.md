---
name: zustand
description: Gestión de estado global con Zustand: stores, persistencia, acciones y mejores prácticas
---

# Zustand

## Conceptos Básicos

Zustand es una librería de gestión de estado pequeña y simple.

### Estructura Basic

```typescript
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### Uso en Componente

```typescript
const Component = () => {
  const { count, increment } = useCounterStore();
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

---

## Stores del Proyecto

### useResumeStore

**Ubicación**: `src/hooks/useResumeStore.ts`

```typescript
import useResumeStore from "@/hooks/useResumeStore";

const {
  profiles,
  createProfile,
  updateProfile,
  deleteProfile,
  duplicateProfile,
  getProfile,
  updateProfileTemplate,
} = useResumeStore();
```

**Estado**:
```typescript
interface ResumeState {
  profiles: CVProfile[];
  
  // Actions
  createProfile: () => string;  // returns new ID
  updateProfile: (id: string, data: Partial<ResumeData>) => void;
  deleteProfile: (id: string) => void;
  duplicateProfile: (id: string) => string;  // returns new ID
  getProfile: (id: string) => CVProfile | undefined;
  updateProfileTemplate: (id: string, template: Template) => void;
}
```

### aiConfigStore

**Ubicación**: `src/stores/aiConfigStore.ts`

```typescript
import { useAiConfigStore, isAiConfigured } from "@/stores/aiConfigStore";

const { config, setConfig, clearConfig } = useAiConfigStore();
const configured = isAiConfigured(config);
```

**Estado**:
```typescript
interface AiConfig {
  provider: "gemini" | "openai_compatible";
  apiKey: string;
  model: string;
}

interface AiConfigState {
  config: AiConfig;
  setConfig: (config: AiConfig) => void;
  clearConfig: () => void;
}
```

---

## Patrones de Diseño

### Selectores

```typescript
// Selector completo
const profiles = useResumeStore((state) => state.profiles);

// Selector específico (optimizado)
const profileCount = useResumeStore((state) => state.profiles.length);

// Múltiples
const { profiles, createProfile } = useResumeStore();
```

### Actions con Lógica

```typescript
const useStore = create<State>((set, get) => ({
  items: [],
  
  addItem: (item) => {
    const newItem = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...item,
    };
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },
}));
```

---

## Persistencia

### localStorage

```typescript
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### Zustand Middleware

```typescript
import { persist, createJSONStorage } from "zustand/middleware";

const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      profiles: [],
      // ...
    }),
    {
      name: "icv-profiles",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ profiles: state.profiles }),
    }
  )
);
```

---

## Optimizaciones

### Shallow Equality

```typescript
import { shallow } from "zustand/shallow";

const { name, age } = useStore(
  (state) => ({ name: state.name, age: state.age }),
  shallow
);
```

### Selector con Equality Function

```typescript
const profile = useResumeStore(
  (state) => state.profiles.find((p) => p.id === id),
  (prev, next) => prev?.id === next?.id
);
```

---

## TypeScript con Zustand

### Tipado de Estado y Actions

```typescript
interface UserState {
  user: User | null;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
```

### Tipado de Middleware

```typescript
import { StateStorage } from "zustand/middleware";

const customStorage: StateStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};
```

---

## Errores Comunes

### Mutación directa

```typescript
// ❌ Mal
const addItem = () => {
  state.items.push(newItem);  // mutación directa
};

// ✅ Bien
const addItem = () => {
  set((state) => ({
    items: [...state.items, newItem],
  }));
};
```

### Forgotten dependency

```typescript
// ❌ Mal - set con dependencia externa
const addItem = (newItem) => {
  set((state) => ({
    items: [...state.items, newItem],
  }));
};

// ✅ Bien - acción pura
const addItem = (newItem) => {
  set((state) => ({
    items: [...state.items, { ...newItem, id: crypto.randomUUID() }],
  }));
};
```

---

## Integración con React

###useSyncExternalStore (para fuentes externas)

```typescript
import { useSyncExternalStore } from "react";

const useStore = (selector) => {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getInitialState())
  );
};
```

---

## DevTools

### Redux DevTools

```typescript
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(
    (set) => ({
      // ...
    }),
    { name: "StoreName" }
  )
);
```
