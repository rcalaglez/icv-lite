---
name: typescript
description: Mejores prácticas de TypeScript: tipos, generics, utility types, y patrones avanzados
---

# TypeScript

## Tipos Básicos

### Primitive Types

```typescript
let name: string = "John";
let age: number = 30;
let active: boolean = true;
let items: null = null;
let data: undefined = undefined;
```

### Arrays

```typescript
// Dos formas
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
```

### Objects

```typescript
// Type
type User = {
  name: string;
  age: number;
  email?: string;  // Optional
};

// Interface
interface User {
  name: string;
  age: number;
  readonly id: string;  // Readonly
}
```

---

## Interfaces vs Types

### Interface (preferir para objetos)

```typescript
interface ResumeBasics {
  name: string;
  email?: string;
}

// Extender
interface ExtendedBasics extends ResumeBasics {
  phone: string;
}

// Merge
interface ResumeBasics {
  location: Location;
}
```

### Type (para uniones, tuplas, aliases)

```typescript
// Unión
type ID = string | number;

// Tupla
type Point = [number, number];

// Alias
type Status = "pending" | "active" | "completed";
```

---

## Utility Types

### Partial, Required, Readonly

```typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;        // todos opcionales
type RequiredUser = Required<User>;     // todos requeridos
type ReadonlyUser = Readonly<User>;     // todos readonly
```

### Pick, Omit

```typescript
type UserBasic = Pick<User, "name" | "email">;
type UserWithoutAge = Omit<User, "age">;
```

### Record

```typescript
type UsersMap = Record<string, User>;
const users: UsersMap = {
  "1": { name: "John", age: 30 },
  "2": { name: "Jane", age: 25 },
};
```

### NonNullable

```typescript
type NonNull = NonNullable<string | null | undefined>; // string
```

---

## Generics

### Función Generic

```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstElement([1, 2, 3]);      // number
const str = firstElement(["a", "b", "c"]); // string
```

### Interface Generic

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface UserResponse extends ApiResponse<User> {
  data: User;
}
```

### Constraints

```typescript
interface HasName {
  name: string;
}

function greet<T extends HasName>(item: T): string {
  return `Hello, ${item.name}`;
}
```

---

## Type Guards

### typeof

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

### instanceof

```typescript
if (error instanceof Error) {
  console.log(error.message);
}
```

### Custom Type Guard

```typescript
interface Fish { swim(): void; }
interface Bird { fly(): void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

---

## as const

```typescript
// Objeto mutable
const config = {
  env: "production",
  port: 3000,
};

// Inmutable (readonly)
const config = {
  env: "production",
  port: 3000,
} as const;

// Array
const roles = ["admin", "user", "guest"] as const;
```

---

## Null Handling

### Optional Chaining

```typescript
const city = user?.address?.city;
```

### Nullish Coalescing

```typescript
const name = user.name ?? "Anonymous";
```

### Non-null Assertion (cuidado)

```typescript
const name = user.name!;  // Solo si estás seguro
```

---

## Module Augmentation

### Extender tipos existentes

```typescript
// src/types/zod-extensions.ts
import { z } from "zod";

declare module "zod" {
  interface ZodError {
    customMethod(): void;
  }
}
```

---

## Patrones en el Proyecto

### Tipos de Componentes

```typescript
interface Props {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
  isLoading?: boolean;
}

// FC con tipos
export const Component: React.FC<Props> = ({ data, onUpdate }) => { ... };

// Function component
export function Component({ data, onUpdate }: Props) { ... }
```

### Tipos de Hooks

```typescript
interface UseFormManagerProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export const useFormManager = ({ data, onUpdate }: UseFormManagerProps) => {
  // ...
};
```

### Tipos de Eventos

```typescript
// DOM Events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

---

## Errores Comunes

### any

```typescript
// ❌ Evitar
const data: any = getData();

// ✅ Preferir unknown
const data: unknown = getData();
if (isUser(data)) {
  // usar data como User
}
```

### Implicit any

```typescript
// ❌ Mal - inferido como any
function process(item) { ... }

// ✅ Bien - tipo explícito
function process(item: string) { ... }
```

### @ts-ignore

```typescript
// ❌ Evitar
// @ts-ignore
const value = something;

// ✅ Preferir
// @ts-expect-error si es temporal
// @ts-ignore con comentario explaining
```
