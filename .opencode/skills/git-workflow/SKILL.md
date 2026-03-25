---
name: git-workflow
description: Flujo de trabajo Git: ramas, commits, merge, y comandos esenciales
---

# Git Workflow

## Estructura de Ramas

```
main                    # Producción (deployado)
├── feature/[nombre]   # Nuevas features
├── bugfix/[nombre]    # Bug fixes
├── hotfix/[nombre]    # Fix urgentes en producción
└── refactor/[nombre] # Refactorizaciones
```

## Comandos Esenciales

### Estado y Log

```bash
# Ver estado
git status

# Ver historial
git log --oneline -10
git log --oneline --graph -20

# Ver diferencias
git diff
git diff --staged
git diff main..feature/rama
```

### Ramas

```bash
# Crear rama desde main
git checkout -b feature/nueva-feature

# Cambiar rama
git checkout nombre-rama

# Ver ramas
git branch -a

# Ver rama actual
git branch

# Eliminar rama (local)
git branch -d nombre-rama

# Eliminar rama (force)
git branch -D nombre-rama

# Renombrar rama
git branch -m antiguo nuevo
```

### Staging y Commits

```bash
# Ver estado
git status

# Agregar archivos
git add archivo.txt
git add .                    # todo
git add -p                   # interactivo

# Agregar y commit en uno
git commit -am "mensaje"

# Commit
git commit -m "tipo(ámbito): descripción"

# Enmendar commit (cuidado)
git commit --amend
git commit --amend -m "nuevo mensaje"
```

### Sincronización

```bash
# Traer cambios
git fetch origin

# Pull (fetch + merge)
git pull

# Push
git push origin nombre-rama

# Push con upstream
git push -u origin nombre-rama

# Push force (cuidado)
git push --force
```

### Merge y Rebase

```bash
# Merge rama a actual
git merge feature/rama

# Merge sin fast-forward
git merge --no-ff feature/rama

# Rebase (cuidado)
git rebase main

# Abortar rebase
git rebase --abort
```

### Reset y Revert

```bash
# Soft reset (mantiene cambios en staging)
git reset --soft HEAD~1

# Mixed reset (mantiene cambios working directory)
git reset HEAD~1

# Hard reset (descarta todo)
git reset --hard HEAD~1

# Revert (crea nuevo commit que deshace)
git revert HEAD
git revert abc123
```

---

## Convenciones de Commits

### Formato

```
<tipo>(<ámbito>): <descripción>

[opcional: cuerpo]

[opcional: footer]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Bug fix |
| `refactor` | Refactorización |
| `docs` | Documentación |
| `style` | Estilos |
| `chore` | Mantenimiento |
| `test` | Tests |
| `perf` | Rendimiento |
| `ci` | CI/CD |

### Ejemplos

```
feat(evaluation): add ATS evaluator service
fix(ui): restore Form export and resolve module imports
refactor(ai): gate evaluation behind configured client
docs(sdd): add cv-evaluation documentation
style(template): adjust margins in Harvard Minimal
chore(deps): update react-router-dom to v7.6.3
```

---

## Flujo de Trabajo Típico

### Nueva Feature

```bash
# 1. Asegurarse en main
git checkout main
git pull origin main

# 2. Crear rama
git checkout -b feature/nueva-feature

# 3. Trabajar
# ... hacer cambios ...

# 4. Commit
git add .
git commit -m "feat(feature): initial implementation"

# 5. Push
git push -u origin feature/nueva-feature

# 6. Cuando lista para merge
git checkout main
git pull
git merge feature/nueva-feature
git push origin main

# 7. Eliminar rama (opcional)
git branch -d feature/nueva-feature
```

### Bug Fix

```bash
# Desde main
git checkout main
git pull

# Crear rama de fix
git checkout -b bugfix/descripcion-fix

# Trabajar y commit
git add .
git commit -m "fix(área): corrige problema"

# Merge a main
git checkout main
git merge bugfix/descripcion-fix
git push

# Eliminar
git branch -d bugfix/descripcion-fix
```

---

## Mejores Prácticas

### Commits Atómicos

- ✅ Un commit por cambio logical
- ✅ Commits pequeños y focalizados
- ❌ No mezclar múltiples features en uno

### Mensajes Claros

- ✅ Primera línea descriptiva (< 72 caracteres)
- ✅ Usar imperativo ("add" no "added")
- ❌ "Fixed stuff" o "asdf"

### Mantener main Limpio

- ✅ Mergeear solo código listo para producción
- ✅ Eliminar ramas después de merge
- ✅ Usar feature branches

### Sincronización Regular

```bash
# Antes de empezar trabajo
git checkout main
git pull

# Antes de merge
git fetch origin
git rebase main
```

---

## Troubleshooting

### Conflictos

```bash
# Ver conflictos
git status

# Resolver y continuar
git add .
git commit -m "resolve: merge conflicts"
```

### Deshacer Cambios

```bash
# Descartar cambios locales
git checkout -- archivo
git restore archivo

# Todo el directorio
git checkout .
git restore .
```

### Rama "Detached"

```bash
# Ver dónde estás
git status

# Volver a branch
git checkout nombre-rama
```

---

## Gitignore

Archivos ignorados en el proyecto:

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```
