// Inicialización del estado global del carrito 
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; 

// FUNCIÓN: Conexión real al archivo JSON externo
async function cargarProductos() {
  try {
    const respuesta = await fetch('productos.json'); // Requiere usar Live Server en VS Code
    
    if (!respuesta.ok) {
      throw new Error(`Error al cargar el JSON: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos;
    
  } catch (error) {
    console.error("Hubo un problema obteniendo los productos desde el JSON:", error);
    // Mock de respaldo por seguridad
    return {
      productos: [
        { 
          id: 1, 
          nombre: "GlobalMás Profesional", 
          descripcion: "Asegura el futuro educativo superior de tus hijos con flexibilidad total.", 
          precio: 150000, 
          caracteristicas: ["Protección Integral", "Respaldo Financiero Garantizado"], 
          imagen: "https://via.placeholder.com/280x200/deebf7/002060?text=GlobalM%C3%A1s" 
        },
        { 
          id: 2, 
          nombre: "GlobalPregrado", 
          descripcion: "La solución ideal diseñada para cubrir costos universitarios con anticipación.", 
          precio: 220000, 
          caracteristicas: ["Rendimiento Seguro", "Desembolsos Directos"], 
          imagen: "https://via.placeholder.com/280x200/deebf7/002060?text=GlobalPregrado" 
        }
      ]
    };
  }
}

// Cargar productos en pantalla al iniciar el DOM
document.addEventListener('DOMContentLoaded', async () => {
  const datosProductos = await cargarProductos();
  const gridProductos = document.getElementById('productos-grid');
  
  if (gridProductos) {
    gridProductos.innerHTML = ''; 
    
    datosProductos.productos.forEach(producto => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'producto-card';
      tarjeta.innerHTML = `
        <div class="producto-imagen">
          <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.parentElement.innerHTML='💼'">
        </div>
        <div class="producto-contenido">
          <h3 class="producto-nombre">${producto.nombre}</h3>
          <p class="producto-descripcion">${producto.descripcion}</p>
          <ul class="producto-caracteristicas">
            ${producto.caracteristicas.slice(0, 2).map(c => `<li>${c}</li>`).join('')}
          </ul>
          <div class="producto-precio">$${producto.precio.toLocaleString('es-CO')}</div>
          <p class="producto-precio-mensual">por mes</p>
          <button class="btn-agregar">Agregar al Carrito</button>
        </div>
      `;
      
      tarjeta.querySelector('.btn-agregar').addEventListener('click', () => {
          agregarAlCarrito(producto.id, producto.nombre, producto.precio);
      });

      gridProductos.appendChild(tarjeta);
    });
  }
  
  actualizarVistaCarrito();
});

// Lógica operativa del Carrito de compras
function agregarAlCarrito(id, nombre, precio) {
  const itemExistente = carrito.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  actualizarVistaCarrito();
}

function calcularTotal() {
  return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// Actualiza las cantidades de inputs de forma fluida
function actualizarCantidad(id, nuevaCantidad) {
  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad = parseInt(nuevaCantidad);
    if (isNaN(item.cantidad) || item.cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
  }
  actualizarVistaCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarVistaCarrito();
}
 
// RENDERIZADO INTERACTIVO: Sincroniza la interfaz y guarda el estado en el navegador
function actualizarVistaCarrito() {
  const contenedor = document.querySelector('[data-carrito-items]');
  const totalElement = document.querySelector('[data-carrito-total]');
  const resumenContainer = document.getElementById('carrito-resumen-container');
  const btnCheckout = document.getElementById('btn-checkout');
  const contadorElement = document.querySelector('[data-carrito-contador]');
  
  // Guardado de persistencia clave para conectar con la página de checkout
  localStorage.setItem('carrito', JSON.stringify(carrito));

  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<div class="carrito-vacio">Tu carrito está vacío</div>';
    if (resumenContainer) resumenContainer.style.display = 'none';
    if (btnCheckout) btnCheckout.style.display = 'none';
    if (contadorElement) contadorElement.style.display = 'none';
  } else {
    contenedor.innerHTML = carrito.map(item => `
      <div class="carrito-item" data-producto-id="${item.id}">
        <div class="carrito-info">
          <h4>${item.nombre}</h4>
          <p>$${item.precio.toLocaleString('es-CO')}</p>
        </div>
        <div class="carrito-cantidad">
          <button class="btn-cantidad" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">−</button>
          <input type="number" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${item.id}, this.value)">
          <button class="btn-cantidad" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
        </div>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">✕</button>
      </div>
    `).join('');
    
    const total = calcularTotal();
    if (totalElement) {
      totalElement.textContent = `$${total.toLocaleString('es-CO')}`;
    }
    if (resumenContainer) resumenContainer.style.display = 'block';
    if (btnCheckout) btnCheckout.style.display = 'block';
    
    if (contadorElement) {
      const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      contadorElement.textContent = totalItems;
      contadorElement.style.display = 'flex';
    }
  }
}
 
// Redirección con empaquetado final de seguridad
function irAlCheckout() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('totalCompra', calcularTotal());
  window.location.href = 'checkout.html';
}
