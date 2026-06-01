# 📝 Ejemplo: Cómo Actualizar index.html

## Paso 1: Agregar CSS de Validaciones

En la sección `<head>` de tu `index.html` original, después de `<link rel="stylesheet" href="marca.css">`, agrega:

```html
<head>
  <!-- ... otros meta tags ... -->
  <link href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="marca.css">
  <link rel="stylesheet" href="validaciones.css">  <!-- ← AGREGAR ESTA LÍNEA -->
</head>
```

---

## Paso 2: Agregar Link a la Tienda

En el `<nav>` de tu `index.html`, modifica la lista de enlaces:

### ANTES:
```html
<nav>
  <div class="logotipo">
    <img src="logo-globalseguros-2025.svg" alt="Global Seguros Logo" class="logotipo-imagen">
  </div>
  <ul>
    <li><a href="#journey">Cómo funciona</a></li>
    <li><a href="#beneficios">Beneficios</a></li>
    <li><a href="#faq">Preguntas</a></li>
    <li><a href="#cta" class="navegacion-llamado-accion">Cotizar ahora</a></li>
  </ul>
</nav>
```

### DESPUÉS:
```html
<nav>
  <div class="logotipo">
    <img src="logo-globalseguros-2025.svg" alt="Global Seguros Logo" class="logotipo-imagen">
  </div>
  <ul>
    <li><a href="#journey">Cómo funciona</a></li>
    <li><a href="#beneficios">Beneficios</a></li>
    <li><a href="#faq">Preguntas</a></li>
    <li><a href="marketplace.html" class="navegacion-llamado-accion">Cotizar ahora</a></li>
  </ul>
</nav>
```

**Cambio**: `<a href="#cta"...>` → `<a href="marketplace.html"...>`

---

## Paso 3: Agregar Notificaciones

Antes del `</body>` de tu `index.html`, agrega:

### ANTES:
```html
  <script src="main.js"></script>
</body>
</html>
```

### DESPUÉS:
```html
  <!-- Contenedor de notificaciones -->
  <div data-notificaciones></div>
  
  <script src="main.js"></script>
</body>
</html>
```

---

## Paso 4: Cambiar ID de Formulario

Si tu formulario de contacto tiene un ID diferente, actualiza en `main.js`:

**En main.js, línea ~170:**

```javascript
function inicializarValidacionFormulario() {
  const formulario = document.querySelector('form[name="contacto"]');  // ← AQUÍ
  
  if (!formulario) return;
  
  // ... resto del código
}
```

Si tu formulario es:
```html
<form id="contact-form" name="contact">
  <!-- campos -->
</form>
```

Cambia la línea a:
```javascript
const formulario = document.querySelector('form[name="contact"]');
```

---

## Paso 5: Actualizar Botón CTA

Si tu botón de contacto tiene un ID diferente, actualiza:

**En main.js, busca:**
```javascript
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  // ...
});
```

El código debe funcionar automáticamente.

---

## Paso 6: Asegura la Estructura de Carpetas

```
tu-proyecto/
├── index.html              ✓ Tu archivo original
├── marca.css               ✓ Tu archivo original
├── marketplace.html        ← NUEVO
├── checkout.html           ← NUEVO
├── error_404.html          ← NUEVO
├── main.js                 ← NUEVO
├── productos.json          ← NUEVO
├── validaciones.css        ← NUEVO
├── README.md               ← NUEVO
└── multimedia/
    ├── logo-globalseguros-2025.svg
    ├── logo2-1.png
    └── ...tus imágenes
```

---

## Paso 7: Prueba Todo

1. **Home**: Abre `index.html`
   - ✓ Navegación funciona
   - ✓ Botón "Cotizar" va a `marketplace.html`
   - ✓ Validación de contacto funciona

2. **Marketplace**: Click "Cotizar"
   - ✓ Ve los 5 productos
   - ✓ Puede agregar al carrito
   - ✓ Contador se actualiza
   - ✓ Resumen se actualiza

3. **Checkout**: Click "Finalizar Compra"
   - ✓ Validación en tiempo real
   - ✓ Métodos de pago funcionan
   - ✓ Carga de documento funciona
   - ✓ Genera orden de compra

4. **404**: Visita URL inexistente
   - ✓ Muestra página 404
   - ✓ Puede volver al inicio

---

## Paso 8: Pruebas en Consola

Abre Developer Tools (F12) y ejecuta en consola:

```javascript
// Ver contenido del carrito
console.log(carrito);

// Ejecutar pruebas
ejecutarPruebas();

// Probar validación de email
validarEmail("test@example.com");  // true

// Probar validación de tarjeta
validarNumeroTarjeta("4532123456789010");  // true
```

---

## Ejemplo Completo: index.html Mínimo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GlobalMás Profesional</title>
  <link href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="marca.css">
  <link rel="stylesheet" href="validaciones.css">
</head>
<body>

<!-- NAV CON LINK A TIENDA -->
<nav>
  <div class="logotipo">
    <img src="logo-globalseguros-2025.svg" alt="Global Seguros Logo" class="logotipo-imagen">
  </div>
  <ul>
    <li><a href="#journey">Cómo funciona</a></li>
    <li><a href="#beneficios">Beneficios</a></li>
    <li><a href="#faq">Preguntas</a></li>
    <li><a href="marketplace.html" class="navegacion-llamado-accion">Cotizar ahora</a></li>
  </ul>
</nav>

<!-- TUS SECCIONES DE CONTENIDO -->
<!-- hero, sobre empresa, catálogo, testimonios, faq, contacto, footer -->
<!-- ... toda tu estructura original ... -->

<!-- FOOTER -->
<footer>
  <!-- ... tu contenido ... -->
</footer>

<!-- CONTENEDOR DE NOTIFICACIONES -->
<div data-notificaciones></div>

<!-- SCRIPTS -->
<script src="main.js"></script>
</body>
</html>
```

---

## Checklist de Integración

- [ ] `validaciones.css` linkeado en `<head>`
- [ ] Link a `marketplace.html` en navegación
- [ ] `main.js` cargado antes de `</body>`
- [ ] `<div data-notificaciones></div>` presente
- [ ] Todos los archivos en la misma carpeta
- [ ] `productos.json` en la carpeta raíz
- [ ] Probado en navegador
- [ ] Pruebas unitarias pasan

---

## Posibles Problemas

### "Carrito no se guarda"
Solución: Verifica que `localStorage` no esté deshabilitado en navegador

### "Validaciones no funcionan"
Solución: Revisa que `main.js` esté cargado DESPUÉS del HTML

### "Estilos de validación no aparecen"
Solución: Verifica que `validaciones.css` esté linkeado en `<head>`

### "Contacto no valida"
Solución: Asegúrate que tu formulario tenga `name="contacto"` o actualiza el selector en `main.js`

---

## Preguntas Frecuentes

**¿Debo mantener mi código original?**
Sí, solo agrega los nuevos archivos y actualiza los links.

**¿Puedo cambiar los estilos?**
Sí, toda la personalización está en `marca.css` (que es tuyo).

**¿Qué sucede si cambio el nombre de los archivos?**
Deberás actualizar todos los imports (href, src, etc.)

**¿Funciona sin conexión a internet?**
Sí, todo es local. Solo Google Fonts necesita internet.

---

**¡Listo! Tu proyecto está 100% funcional.** ✨