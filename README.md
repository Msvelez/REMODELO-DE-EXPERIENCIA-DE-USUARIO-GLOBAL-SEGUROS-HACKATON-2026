# Global Seguros - Plataforma Digital Modular

## 👥 Miembros del Grupo
* **María Sofía Vélez Arrubla** — [GitHub Profile](https://github.com/Msvelez)
* **Emily Vanesa Chisaba Rivera** — [GitHub Profile](https://github.com/lychee-zzz)
* **Angye Paola Laverde Pérez** — [GitHub Profile](https://github.com/angyelaverde)

---

## 📝 Descripción del Proyecto
Este proyecto es una plataforma web interactiva diseñada para **Global Seguros S.A.**, una entidad enfocada en la comercialización de soluciones financieras, fondos de pensión voluntaria y seguros educativos. La aplicación está dirigida a un público familiar y profesionales independientes que buscan blindar su patrimonio frente a la inflación y garantizar la estabilidad del mañana de forma simple y digital.

### Funcionalidades Clave
* **Landing Page de Conversión:** Presentación del portafolio con secciones dinámicas de dolor, valor y una experiencia de usuario (UX) fluida y sin fricciones.
* **Tienda Virtual (Marketplace):** Un catálogo dinámico conectado a un archivo de datos estructurado (`productos.json`) que permite agregar, modificar cantidades y eliminar asistencias médicas o seguros en tiempo real.
* **Flujo de Simulación de Pago (Checkout):** Un ecosistema modular con validación nativa de formularios, máscaras interactivas de tarjetas de crédito y carga de documentación obligatoria.

### Solución Técnica del Reto
El núcleo del reto de la aseguradora y el flujo del e-commerce se resolvieron de forma **100% nativa en el Frontend** utilizando la API de **`localStorage`**. Esto permitió crear un puente de memoria persistente entre páginas independientes (`marketplace.html` $\rightarrow$ `checkout.html`), garantizando que el desglose de los productos seleccionados y el cálculo exacto del subtotal se mantengan e impriman correctamente en el resumen sin depender de servidores o bases de datos complejas durante la simulación.

---

## 💻 Requisitos Mínimos
Para ejecutar, visualizar y probar la plataforma correctamente en un entorno local, se requiere el siguiente software preinstalado:

* **Navegador Web Moderno:** Google Chrome, Mozilla Firefox o Microsoft Edge con soporte para JavaScript (ES6+).
* **Editor de Código:** Visual Studio Code (o similar).
* **Servidor Local de Desarrollo (Obligatorio):** Extensión **Live Server** para Visual Studio Code o un entorno local equivalente. *Nota: Es indispensable para resolver las restricciones de seguridad (CORS) del navegador al realizar peticiones asíncronas (`fetch`) al archivo `productos.json`.*

---

## 🛠️ Recursos y Herramientas

### Software y Gestión de Código
* **Lenguajes:** HTML5, CSS3 (Animaciones y maquetación responsiva) y JavaScript Nativo (Vanilla JS).
* **Control de Versiones:** Git y GitHub para el despliegue del repositorio.
* **Tipografía:** Google Fonts (Familia tipográfica *Asap* integrada mediante CDN).

### Recursos Externos y de Terceros
* **Bancos de Imágenes y Multimedia:** Elementos visuales mock y avatares vectoriales integrados mediante URLs de marcadores de posición optimizados para pruebas de carga.
* **Diseño e Iconografía:** Emojis nativos unicode integrados directamente en el marcado HTML para optimizar el rendimiento y la velocidad de renderizado de la interfaz.