# Propuesta de Diseño Integral para iCV Tools

---

## 1. Introducción y contexto del proyecto

**iCV Tools** es una aplicación SaaS emergente diseñada para simplificar y potenciar la creación de currículums profesionales. En su estado actual, la aplicación ofrece una funcionalidad robusta: permite a los usuarios crear perfiles, editar su contenido a través de un formulario y visualizar el resultado en tiempo real con diferentes plantillas.

Sin embargo, la experiencia de usuario (UX) y la interfaz de usuario (UI) actuales son el resultado de un desarrollo centrado en la funcionalidad, careciendo de una identidad visual definida y de un sistema de diseño coherente. Esta propuesta sienta las bases para la siguiente fase de iCV: transformar una herramienta funcional en un producto pulido, intuitivo y memorable que los usuarios amen usar.

## 2. Objetivos de la mejora de diseño

- **Establecer una Identidad Visual Fuerte:** Crear una estética única y profesional que genere confianza y diferencie a iCV de la competencia.
- **Mejorar la Usabilidad y el Flujo de Usuario:** Rediseñar las interacciones clave para que sean más intuitivas, eficientes y satisfactorias.
- **Crear un Sistema de Diseño Escalable:** Implementar un conjunto de reglas, componentes y tokens que garantice la consistencia y acelere el desarrollo futuro.
- **Priorizar la Claridad y el Foco:** Asegurar que la interfaz sea minimalista, guiando al usuario hacia su objetivo principal —crear un CV excepcional— sin distracciones.

## 3. Personalidad de marca y principios de diseño

### Personalidad de Marca
**Profesional, Moderno, Eficiente y Humano.** La marca debe sentirse como un asistente de carrera experto: confiable, inteligente y siempre dispuesto a ayudar.

### Principios de Diseño
1.  **Claridad sobre todas las cosas:** La interfaz debe ser auto-explicativa. La jerarquía visual debe guiar al usuario de forma natural, eliminando cualquier ambigüedad.
2.  **Eficiencia sin esfuerzo:** Cada clic y cada interacción deben tener un propósito. Optimizar los flujos de trabajo para minimizar la carga cognitiva y el tiempo necesario para completar tareas.
3.  **Estética Minimalista con Propósito:** Cada elemento visual debe justificar su existencia. Usar el espacio en blanco, el color y la tipografía para crear una experiencia limpia y centrada en el contenido.
4.  **Consistencia Escalable:** Diseñar sistemas, no solo pantallas. Crear un lenguaje visual coherente que se pueda aplicar a futuras herramientas y funcionalidades.

## 4. Paleta de colores recomendada

### Razones de la Selección
La paleta está diseñada para transmitir profesionalismo, calma y confianza, con un toque de energía para guiar la acción.

- **Azul Noche (Primario):** Inspira confianza, seriedad y estabilidad. Es un color corporativo clásico que ancla el diseño.
- **Turquesa Vibrante (Acento):** Aporta energía y modernidad. Se usa para llamadas a la acción (botones, enlaces importantes) para guiar al usuario y crear puntos de foco.
- **Grises Neutros (Soporte):** Una escala de grises cuidadosamente seleccionada proporciona estructura y legibilidad sin competir por la atención.
- **Colores de Estado (Feedback):** Colores semánticos para comunicar éxito (verde), advertencia (ámbar) y error (rojo) de forma instantánea.

### Códigos HEX y Ejemplos de Uso

| Rol | Color | HEX | Uso |
| :--- | :--- | :--- | :--- |
| **Fondo Primario** | Blanco Puro | `#FFFFFF` | Background principal de la app. |
| **Fondo Secundario** | Gris Claro | `#F7F9FC` | Paneles laterales, fondos de tarjetas. |
| **Texto Principal** | Azul Noche | `#1D2B48` | Títulos, cuerpo de texto principal. |
| **Texto Secundario** | Gris Oscuro | `#5A647B` | Subtítulos, etiquetas, texto de ayuda. |
| **Acento Primario** | Azul Marino | `#2c3e50` | Botones principales, enlaces, íconos activos. |
| **Bordes** | Gris Suave | `#EAEBEE` | Separadores, bordes de inputs. |
| **Éxito** | Verde | `#28A745` | Notificaciones de guardado, validaciones correctas. |
| **Error** | Rojo | `#DC3545` | Mensajes de error, alertas de eliminación. |

## 5. Tipografía

### Fuente Primaria: Onest
Se propone **Onest** (disponible en Google Fonts) como fuente principal. Es una tipografía sans-serif geométrica con terminaciones redondeadas, lo que le da un carácter moderno, amigable y muy legible. Su variedad de pesos nos permite establecer una jerarquía clara.

### Jerarquía Textual
La clave es el contraste entre los títulos y el resto del texto. Los títulos deben ser grandes, con un peso considerable para captar la atención.

- **H1 (Título de Pantalla):** `font-size: 2.5rem (40px)`, `font-weight: 700`
- **H2 (Título de Sección):** `font-size: 1.75rem (28px)`, `font-weight: 600`
- **H3 (Subtítulo / Título de Tarjeta):** `font-size: 1.25rem (20px)`, `font-weight: 600`
- **Cuerpo de Texto:** `font-size: 1rem (16px)`, `font-weight: 400`
- **Texto Grande (Botones):** `font-size: 1.125rem (18px)`, `font-weight: 500`
- **Etiquetas / Ayuda:** `font-size: 0.875rem (14px)`, `font-weight: 400`

### Ejemplos de Estilos CSS
```css
:root {
  --font-primary: 'Onest', sans-serif;
}

h1 {
  font-family: var(--font-primary);
  font-size: 2.5rem;
  font-weight: 700;
  color: #1D2B48;
}

button {
  font-family: var(--font-primary);
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}
```

## 6. Guía de componentes

### Header
- **Altura:** `80px`
- **Contenido:** Logo a la izquierda. Acciones principales (Guardar, Previsualizar) y menú de perfil a la derecha.
- **Sombra:** Una sombra sutil (`box-shadow: 0 2px 4px rgba(0,0,0,0.05)`) para separarlo del contenido.

### Botones
El texto debe ser el protagonista.
- **Padding:** `16px 32px` para el botón primario.
- **Border-radius:** `12px` para un look moderno y suave.
- **Estados:**
  - **Default:** Color de acento sólido (`#00A79D`) con texto blanco.
  - **Hover:** Ligero oscurecimiento del fondo (`#008F86`) y una sutil elevación (`transform: translateY(-2px)`). Transición suave (`transition: all 0.2s ease-in-out`).
  - **Activo:** Un `box-shadow` interior para dar la sensación de ser presionado.
  - **Deshabilitado:** Fondo gris claro (`#EAEBEE`) con texto gris oscuro (`#A0A7B8`).

### Controles de Formulario (Inputs, Textarea)
- **Padding:** `12px 16px`.
- **Border:** `1px solid #EAEBEE`.
- **Border-radius:** `8px`.
- **Focus:** El borde cambia al color de acento (`#00A79D`) y se añade un `box-shadow` sutil del mismo color.

## 7. Diseño de pantallas clave

### Pantalla Inicial / Dashboard
Actualmente es una simple lista. Debe evolucionar a un dashboard que inspire acción y sea escalable.

- **Layout:** Una cuadrícula de tarjetas (`grid`).
- **Header:** Título "Mis Perfiles" (H1) y un botón grande y prominente "Crear Nuevo Perfil" con el color de acento.
- **Tarjeta de Perfil:**
  - **Contenido:** Nombre del perfil (H3), fecha de última modificación, y una miniatura visual de la plantilla seleccionada.
  - **Acciones (al hacer hover):** Iconos para "Editar", "Previsualizar", "Duplicar" y "Eliminar" aparecen con una superposición semitransparente.
- **Wireframe ASCII:**
  ```
  +----------------------------------------------------------------------+
  | iCV Logo                                     [Crear Nuevo Perfil +]  |
  +----------------------------------------------------------------------+
  |                                                                      |
  |  Mis Perfiles                                                        |
  |                                                                      |
  |  +-----------------+   +-----------------+   +-----------------+     |
  |  | [Miniatura CV]  |   | [Miniatura CV]  |   | [Miniatura CV]  |     |
  |  |                 |   |                 |   |                 |     |
  |  | Perfil "Senior" |   | Perfil "Startup"|   | Perfil "Freelance"|   |
  |  | Mod: Ayer       |   | Mod: 2 sem.     |   | Mod: 1 mes      |     |
  |  +-----------------+   +-----------------+   +-----------------+     |
  |                                                                      |
  +----------------------------------------------------------------------+
  ```

### Vista de Perfil y Flujo de Edición
La vista actual de dos paneles es funcional. La mejora se centrará en la jerarquía y la limpieza.

- **Header de la Vista:**
  - Izquierda: Botón para "Volver" al dashboard. El nombre del perfil editable.
  - Centro: Selector de plantillas, más visual, quizás con miniaturas.
  - Derecha: Toggle "Editar / Previsualizar". Botón "Guardar" (deshabilitado si no hay cambios). Menú "..." con acciones secundarias (Exportar, Duplicar, Eliminar).
- **Panel de Formulario:** Agrupar secciones con `Card` o separadores. Mejorar la jerarquía de los campos.
- **Panel de Previsualización:** Eliminar todo el cromo innecesario. El CV debe "respirar" sobre un fondo limpio.

### Vistas Secundarias (Modales)
Para acciones como "Eliminar", usar un `AlertDialog`.
- **Diseño:** Centrado en la pantalla con un overlay oscuro.
- **Contenido:** Título claro y conciso ("¿Eliminar este perfil?"). Descripción del riesgo ("Esta acción no se puede deshacer.").
- **Acciones:** Botón de confirmación (rojo, destructivo) y botón de "Cancelar" (estilo secundario/outline).

## 8. Consistencia y sistema de diseño

### Tokens de Diseño
Todos los valores de diseño (colores, tipografía, espaciado, radios) deben ser definidos como **tokens** (variables CSS o en un objeto de tema de JS/TS).

```css
/* Ejemplo de tokens de color */
:root {
  --color-primary: #00A79D;
  --color-text: #1D2B48;
  --spacing-unit: 4px;
  --border-radius-medium: 12px;
}
```
Esto asegura que si necesitamos ajustar un color o un tamaño, el cambio se propaga por toda la aplicación de forma consistente.

### Homogeneidad
Reutilizar los componentes base (`Button`, `Card`, `Input`) en todas las pantallas. Cualquier variación debe ser intencional y justificada por el contexto.

## 9. Accesibilidad y responsive

- **Contraste:** La paleta de colores seleccionada ha sido verificada para cumplir con los ratios de contraste WCAG AA para texto normal y grande.
- **Legibilidad:** La jerarquía tipográfica y el generoso interlineado aseguran una fácil lectura.
- **Navegación por Teclado:** Todos los elementos interactivos (botones, enlaces, inputs) deben tener estados de foco claros y ser navegables usando la tecla `Tab`.
- **Responsive:** El diseño debe ser fluido. Usar `flexbox` y `grid` para que los layouts se adapten desde pantallas móviles (apilando paneles) hasta monitores anchos.

## 10. Conclusiones y próximos pasos

Esta propuesta de diseño transforma iCV de una simple herramienta a una experiencia de usuario de alta calidad. Establece una base sólida y escalable que no solo mejora la estética y la usabilidad actuales, sino que también prepara a la aplicación para un crecimiento futuro.

**Próximos Pasos (Enfoque en Estilo):**

1.  **Refinar Estilos de Componentes Avanzados:**
    - Aplicar la guía de estilo a componentes más complejos como `Select`, `DropdownMenu`, `AlertDialog`, `Tabs`, `Separator`, `Label`, `Textarea`, `Form`.
    - Asegurar la consistencia visual y de interacción en todos los estados (hover, focus, active, disabled).
2.  **Optimización de Micro-interacciones y Animaciones:**
    - Revisar y ajustar todas las transiciones y animaciones para que sean sutiles, fluidas y mejoren la percepción de velocidad y respuesta.
    - Explorar animaciones para elementos específicos como la carga de datos o la validación de formularios.
3.  **Revisión de la Jerarquía Visual y Espaciado:**
    - Realizar una auditoría visual completa para asegurar que la jerarquía tipográfica y el uso del espacio en blanco sean óptimos en todas las pantallas.
    - Ajustar paddings y margins para mejorar la legibilidad y la estética general.
4.  **Implementación de Temas (Claro/Oscuro):**
    - Desarrollar un sistema de temas que permita a los usuarios alternar entre un modo claro y un modo oscuro, respetando la paleta de colores definida.
