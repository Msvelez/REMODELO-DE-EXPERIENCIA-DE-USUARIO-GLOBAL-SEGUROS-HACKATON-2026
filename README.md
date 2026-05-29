# GlobalMás Profesional - Proyecto Final Lenguajes Digitales III
Sitio web de e-commerce para la venta de productos de seguros educativos, desarrollado con HTML5 semántico, CSS3 responsivo, y JavaScript vanilla.

📋 Contenido del Proyecto
globalseguros-ecommerce/
├── index.html              # Página de inicio (home)
├── marketplace.html        # Tienda/catálogo de productos
├── checkout.html          # Proceso de compra (pago y envío)
├── error_404.html         # Página de error 404
├── marca.css              # Estilos globales
├── main.js                # JavaScript principal
└── README.md             # Este archivo

🎯 Características Implementadas
    
### 1. HTML5 Semántico
* Etiquetas semánticas correctas (`<nav>`, `<section>`, `<footer>`, `<header>`, `<article>`)
* Jerarquía de encabezados coherente (`h1`, `h2`, `h3`)
* Formulario de contacto con validación HTML5
* Formulario de compra completo
* Imágenes con atributo `alt` descriptivo
* Metaetiquetas completas (`charset`, `viewport`, `description`)

### 2. CSS3 Diseño y Estilización
* Archivos CSS externos organizados
* Flexbox y CSS Grid implementados
* Variables CSS para colores y tipografías
* Tipografías externas desde Google Fonts (Asap)
* Diseño responsivo: móvil (<480px), tablet (481-1024px), escritorio (>1024px)
* Animaciones y transiciones CSS (hover, scroll reveal, etc.)
* Paleta de colores consistente

### 3. JavaScript Vanilla
* Manipulación del DOM
* Validación de formulario en tiempo real
* Sistema de carrito de compras (`localStorage`)
* Proceso de compra completo
* Pruebas unitarias positivas implementadas

### 4. Git y Deploy
* Historial de commits descriptivos en español
* Estructura de carpetas organizada
* Desplegado en GitHub Pages

---

🚀 Características Avanzadas (Puntos Extra)

### Formularios
* Validación HTML5 de email, requeridos, etc.
* Validación en tiempo real con JavaScript
* Mensajes de error dinámicos
* Feedback visual (campos válidos/inválidos)

### JavaScript Avanzado
* **Validación de fechas usando objeto Date:** Validación de fecha de expiración de tarjetas para verificar que no esté vencida.
* **Funcionalidades avanzadas:**
    * Sistema de carrito completo
    * Validación de tarjeta (16 dígitos)
    * Validación de CVV (3 dígitos)
    * Validación de teléfono (Colombia)
    * Cálculo de totales dinámicos

### Responsividad
* Diseño responsive soportado para tablets (481px - 1024px)
* Media queries para móvil y escritorio
* Interfaces adaptables a todos los tamaños

---

📱 Páginas Desarrolladas

### 1. Home (index.html)
* Hero section con propuesta de valor
* Sección "Sobre la empresa" con estadísticas
* Catálogo destacado de servicios
* Testimonios de clientes
* FAQ interactivo
* Formulario de contacto con validación
* Sección de beneficios
* CTA (Call To Action) final

### 2. Marketplace/Tienda (marketplace.html)
* Banner de bienvenida
* Grilla de productos
* Información detallada por producto
* Carrito de compras en tiempo real
* Contador visual del carrito
* Resumen de compra
* Botón para proceder a checkout

### 3. Checkout (checkout.html)
Proceso de compra completo implementando el algoritmo del PDF:
* **Paso 1: Datos de Envío** (Nombre mín. 3 caracteres, teléfono Colombia, dirección, ciudad y departamento).
* **Paso 2: Método de Envío** (Estándar 5-7 días / Express 2-3 días).
* **Paso 3: Métodos de Pago**
    * *Tarjeta Débito/Crédito:* Selección de banco, número (16 dígitos), titular, vencimiento (MM/YY) y CVV (3 dígitos).
    * *Pago en Efectivo:* Selección de proveedor (Efecty, Baloto) con generación de referencia y límite de 96 horas.
    * *Billeteras Digitales:* Nequi, Daviplata, Movii, Tpaga.
* **Paso 4: Documentación (Seguros):** Carga de documento (PDF, PNG, JPG; máx. 7MB) con feedback visual.
* **Confirmación:** Generación de número de orden (`ORD-YYYYMMDD-XXXXXX`), modal de confirmación, descarga de orden y limpieza automática del carrito.

### 4. Página de Error 404
* Diseño creativo, consistente y animaciones atractivas.
* Breadcrumb de navegación y botones de retorno.

---

🔐 Validaciones Implementadas

* **Validación de Email:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
* **Validación de Teléfono (Colombia):** `/^(\+57|0057|57)?[\s]?(1|3)[\s]?[0-9]{8,10}$/`
* **Validación de Tarjeta:** 16 dígitos exactos en formato numérico.
* **Validación de Fecha de Expiración:** Formato MM/YY, mes válido (1-12) y verificación de no vencimiento.
* **Validación de CVV:** 3 dígitos exactos.
* **Validación de Documentos:** Extensiones PDF, PNG, JPG (Máx. 7MB).

---

📊 Pruebas Unitarias
Se implementaron **22 pruebas unitarias positivas** ejecutables en la consola del navegador mediante la función:
```javascript
ejecutarPruebas()