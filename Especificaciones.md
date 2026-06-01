# Especificaciones Técnicas - GlobalMás Profesional

## 📋 Tabla de Contenidos
1. [Arquitectura General](#arquitectura-general)
2. [Descripción de Archivos](#descripción-de-archivos)
3. [Funcionalidades por Página](#funcionalidades-por-página)
4. [Validaciones Implementadas](#validaciones-implementadas)
5. [Estructura de Datos](#estructura-de-datos)
6. [Flujos de Usuario](#flujos-de-usuario)
7. [Pruebas Unitarias](#pruebas-unitarias)

---

## Arquitectura General

### Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Almacenamiento**: LocalStorage (carrito, órdenes)
- **Datos**: JSON (productos.json)
- **Tipografía**: Google Fonts (Asap)
- **Versionamiento**: Git

### Estructura de Carpetas Recomendada
```
globalseguros-ecommerce/
├── index.html                 # Home
├── marketplace.html           # Tienda
├── checkout.html              # Pago
├── error_404.html             # Error
├── marca.css                  # Estilos principales
├── validaciones.css           # Estilos de validación
├── main.js                    # JavaScript principal
├── productos.json             # Base de datos
├── README.md                  # Documentación
├── ESPECIFICACIONES.md        # Este archivo
└── multimedia/
    └── (imágenes, logos, etc)
```

---

## Descripción de Archivos

### index.html (Home)
**Tamaño aprox**: 2.5 KB
**Secciones**:
- Navigation bar fijo
- Hero section
- About company
- Featured products
- Testimonios
- FAQ
- Contact form
- CTA final
- Footer

**Elementos JavaScript**:
- Toggle FAQ
- Scroll reveal animations
- Step interaction (como funciona)

### marketplace.html (Tienda)
**Tamaño aprox**: 1.8 KB
**Secciones**:
- Header sticky
- Banner
- Grilla de productos (5 items)
- Carrito sidebar
- Footer

**Elementos JavaScript**:
- Cargar productos desde JSON
- Agregar al carrito
- Actualizar carrito en tiempo real
- Mostrar resumen

### checkout.html (Pago)
**Tamaño aprox**: 3.2 KB
**Pasos**:
1. Datos de envío
2. Método de envío
3. Método de pago (3 opciones)
4. Documentación
5. Confirmación

**Validaciones**:
- Email format
- Teléfono (Colombia)
- Tarjeta (16 dígitos)
- Fecha expiración
- CVV
- Documentos (PDF, PNG, JPG, max 7MB)

### error_404.html
**Tamaño aprox**: 1.2 KB
**Elementos**:
- Diseño creativo
- Animaciones
- Botones de navegación

### marca.css
**Tamaño aprox**: 8 KB
**Contenido**:
- Variables CSS
- Reset y estilos base
- Componentes reutilizables
- Media queries
- Animaciones

### validaciones.css
**Tamaño aprox**: 2 KB
**Contenido**:
- Estilos de error/válido
- Notificaciones
- Modales
- Formularios

### main.js
**Tamaño aprox**: 12 KB
**Módulos**:
1. Gestión de carrito
2. Validaciones
3. Formularios
4. Proceso de compra
5. Manejo de archivos
6. Pruebas unitarias

### productos.json
**Estructura**:
```json
{
  "productos": [
    {
      "id": number,
      "nombre": string,
      "precio": number,
      "descripcion": string,
      "imagen": string,
      "cobertura": string,
      "caracteristicas": string[]
    }
  ]
}
```

---

## Funcionalidades por Página

### HOME (index.html)

#### Componentes Principales

1. **Navigation**
   - Logo clickeable (link a home)
   - Menú de secciones
   - CTA button (Cotizar ahora)
   - Sticky en scroll

2. **Hero**
   - Headline principal
   - Subtítulo
   - Imagen/video fondo
   - CTA primario y secundario
   - Estadísticas de confianza

3. **About Company**
   - Texto de presentación
   - 4 tarjetas de estadísticas
   - Video embebido YouTube

4. **Catálogo (Home)**
   - 3-6 productos destacados
   - Card por producto
   - Botón "Ver todos" → Marketplace

5. **Testimonios**
   - 3 tarjetas en desktop
   - Carrusel en mobile
   - Rating de estrellas
   - Avatar del cliente

6. **FAQ**
   - Acordeón interactivo
   - Toggle con JavaScript
   - 5+ preguntas

7. **Contact**
   - Formulario con validación
   - Mapa embebido
   - Datos de contacto

8. **Footer**
   - Logo y descripción
   - Links de navegación
   - Redes sociales
   - Copyright

---

### MARKETPLACE (marketplace.html)

#### Gestión de Carrito

```javascript
// Estructura del carrito
carrito = [
  {
    id: 1,
    nombre: "GlobalMás Base",
    precio: 35000,
    cantidad: 1
  }
]

// Almacenado en localStorage con key 'carrito'
```

#### Funciones Principales

```javascript
// Cargar productos
cargarProductos() 
  → fetch('productos.json')
  → Retorna array de productos

// Agregar al carrito
agregarAlCarrito(id, nombre, precio)
  → Busca si existe
  → Incrementa cantidad o agrega nuevo
  → Guarda en localStorage
  → Actualiza UI

// Actualizar cantidad
actualizarCantidad(id, cantidad)
  → Modifica cantidad
  → Recalcula total

// Eliminar del carrito
eliminarDelCarrito(id)
  → Filtra el producto
  → Actualiza UI

// Calcular total
calcularTotal()
  → Suma (precio × cantidad) de todos
```

---

### CHECKOUT (checkout.html)

#### Paso 1: Datos de Envío

```javascript
validarDatosEnvio(datos) → {
  nombre: minLength 3,
  telefono: validarTelefono(),
  direccion: minLength 10,
  ciudad: minLength 2,
  departamento: minLength 2
}
```

#### Paso 2: Método de Envío
- Estándar (5-7 días)
- Express (2-3 días)

#### Paso 3: Métodos de Pago

**A. Tarjeta**
```javascript
validarTarjeta(datos) → {
  numero: 16 dígitos,
  fecha: MM/YY vigente,
  cvv: 3 dígitos,
  titular: minLength 3
}
```

**B. Efectivo**
```javascript
validarEfectivo(datos) → {
  proveedor: Efecty | Baloto
}
```

**C. Billetera**
```javascript
validarBilletera(datos) → {
  billetera: Nequi | Daviplata | Movii | Tpaga
}
```

#### Paso 4: Documentación

```javascript
validarArchivo(archivo) → {
  extensión: pdf | png | jpg,
  tamaño: < 7MB
}
```

#### Confirmación

```javascript
generarOrdenCompra() → {
  numero: "ORD-YYYYMMDD-XXXXXX",
  fecha: timestamp,
  total: number,
  items: number
}
```

---

## Validaciones Implementadas

### Email
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
Ejemplos válidos:
- test@example.com ✓
- user.name@domain.co ✓

Ejemplos inválidos:
- invalid.email ✗
- test@domain ✗

### Teléfono (Colombia)
```javascript
/^(\+57|0057|57)?[\s]?(1|3)[\s]?[0-9]{8,10}$/
```
Ejemplos válidos:
- 3101234567 ✓
- 310 123 4567 ✓
- +57 310 1234567 ✓

Ejemplos inválidos:
- 1234567 ✗
- 2201234567 ✗

### Tarjeta
- 16 dígitos numéricos
- Sin espacios al validar

Ejemplos válidos:
- 4532123456789010 ✓
- 4532 1234 5678 9010 ✓

### Fecha de Expiración
```javascript
// Formato MM/YY
// Mes: 01-12
// Año: no puede ser pasado
```

Ejemplos válidos:
- 12/25 ✓
- 01/26 ✓

Ejemplos inválidos:
- 13/25 ✗ (mes inválido)
- 01/20 ✗ (vencida)

### CVV
- 3 dígitos exactos
- Numéricos

Ejemplos válidos:
- 123 ✓
- 456 ✓

Ejemplos inválidos:
- 12 ✗
- abc ✗

### Documentos
- Extensiones: PDF, PNG, JPG
- Tamaño máximo: 7MB
- Validación de tipo MIME

---

## Estructura de Datos

### Producto (JSON)
```json
{
  "id": 1,
  "nombre": "GlobalMás Profesional - Plan Base",
  "precio": 35000,
  "descripcion": "Protección desde gestación hasta primer empleo",
  "imagen": "https://via.placeholder.com/300x200",
  "cobertura": "Educación universitaria completa",
  "caracteristicas": [
    "Desde gestación",
    "Sin examen médico",
    "Cobertura ante incapacidad",
    "Acceso a app de seguimiento"
  ]
}
```

### Carrito (LocalStorage)
```json
[
  {
    "id": 1,
    "nombre": "GlobalMás Profesional - Plan Base",
    "precio": 35000,
    "cantidad": 1
  },
  {
    "id": 3,
    "nombre": "GlobalMás Profesional - Plan Premium",
    "precio": 98000,
    "cantidad": 2
  }
]
```

### Orden (LocalStorage)
```json
{
  "numero": "ORD-20260527-123456",
  "fecha": "27/05/2026, 14:32:15",
  "total": 231000,
  "items": 3
}
```

---

## Flujos de Usuario

### Flujo: Compra Normal
```
1. Usuario entra en home
2. Scroll por página
3. Click en "Ver productos" o "Tienda"
4. En marketplace:
   - Ve los 5 productos
   - Lee descripción
   - Agrega al carrito
   - Ve actualización en contador
   - Puede agregar más productos
5. Click "Finalizar Compra"
6. En checkout:
   - Ingresa datos de envío
   - Selecciona envío
   - Selecciona método de pago
   - Ingresa datos de pago
   - Carga documento
   - Hace clic en "Procesar"
7. Se valida todo
8. Se genera orden
9. Se muestra confirmación
10. Se limpia el carrito
11. Usuario puede descargar orden
```

### Flujo: Validación en Tiempo Real
```
1. Usuario escribe en campo
2. Si es "blur" o tiene error:
   - Se valida el campo
   - Si es inválido:
     - Se agrega clase "error"
     - Se muestra mensaje de error
   - Si es válido:
     - Se agrega clase "valido"
     - Se limpia mensaje de error
3. Usuario vuelve a escribir en campo con error
   - Si ahora es válido:
     - Se remueve clase error
     - Se agrega clase válido
```

### Flujo: Carrito
```
1. Usuario ve producto
2. Click en "Agregar al carrito"
   - Se busca en carrito
   - Si existe: cantidad++
   - Si no existe: se agrega
   - Se guarda en localStorage
   - Se muestra notificación
   - Se actualiza contador
   - Se actualiza vista lateral
3. Usuario puede:
   - Ver carrito
   - Aumentar/disminuir cantidad
   - Eliminar producto
   - Ver total
4. Click en "Finalizar compra"
   - Se va a checkout
   - Se carga el carrito en la página
```

---

## Pruebas Unitarias

### Función: ejecutarPruebas()
Se ejecuta automáticamente al cargar la página.

### Estructura
```javascript
const pruebas = {
  testValidarEmail: () => [...],
  testValidarNumeroTarjeta: () => [...],
  testValidarFechaExpiracion: () => [...],
  testValidarCVV: () => [...],
  testCarrito: () => [...],
  testValidarDatosEnvio: () => [...]
}
```

### Reporte
```
========== INICIANDO PRUEBAS UNITARIAS ==========

📋 testValidarEmail:
────────────────────────────────────────────────
✅ PASADA: Validar email: test@example.com
✅ PASADA: Validar email: otro@domain.co
❌ FALLIDA: Validar email: invalid.email
   Esperado: false, Obtenido: true

...

═══════════════════════════════════════════════
📊 RESULTADO: 20/22 pruebas pasadas
Porcentaje de éxito: 90.91%
═══════════════════════════════════════════════
```

### Casos de Prueba

#### Test: Validar Email
- ✓ Email válido con dominio
- ✓ Email válido con subdomain
- ✓ Email inválido sin @
- ✓ Email vacío

#### Test: Validar Tarjeta
- ✓ 16 dígitos válidos
- ✓ Secuencia diferente válida
- ✓ Menos de 16 dígitos
- ✓ Con letras

#### Test: Validar Fecha
- ✓ Fecha vigente futura
- ✓ Fecha de este mes
- ✓ Fecha vencida
- ✓ Mes inválido

#### Test: Validar CVV
- ✓ 3 dígitos válidos
- ✓ Diferente 3 dígitos
- ✓ Solo 2 dígitos
- ✓ Con letras

#### Test: Carrito
- ✓ Agregar producto al carrito
- ✓ Total > 0 después de agregar

#### Test: Datos Envío
- ✓ Datos válidos aceptados
- ✓ Datos inválidos rechazados

---

## Consideraciones de Rendimiento

### Optimizaciones Implementadas
1. **CSS**
   - Variables para reutilización
   - Media queries eficientes
   - Animaciones GPU-friendly (transform, opacity)

2. **JavaScript**
   - Funciones modularizadas
   - Event delegation donde es posible
   - Caché de consultas DOM
   - LocalStorage para persistencia

3. **Carga**
   - Tipografías de Google Fonts
   - Imágenes placeholders
   - Sin librerías externas (vanilla JS)

### Métricas Esperadas
- Tiempo de carga inicial: < 2s
- Interactividad: < 100ms
- Animaciones: 60 FPS

---

## Restricciones y Limitaciones

### Conocidas
1. No hay validación de fondos en tarjeta
2. No hay conexión a servidor
3. No hay base de datos real
4. Los datos se pierden al cerrar pestaña
5. Las imágenes son placeholders

### Por Diseño
1. Sin frameworks CSS (Tailwind, Bootstrap)
2. Sin frameworks JS (React, Vue, Angular)
3. Sin APIs externas
4. Sin WebGL/3D
5. Sin instalación de dependencias

---

## Accesibilidad

### Implementado
- ✓ Jerarquía semántica de encabezados
- ✓ Atributos alt en imágenes
- ✓ Labels asociados a inputs
- ✓ Contraste de colores suficiente
- ✓ Navegación por teclado
- ✓ Focus visible

### Mejoras Futuras
- [ ] ARIA labels
- [ ] Validación con screenreaders
- [ ] Keyboard navigation mejorada
- [ ] High contrast mode

---

## Documentación Adicional

Consultar:
- `README.md` - Guía general
- `index.html` - Estructura home
- `main.js` - Código fuente
- `marca.css` - Estilos

---

**Última actualización**: Mayo 2026
**Versión**: 1.0
**Estado**: Completado ✅