// Inicialización: Traemos los datos del carrito salvados en la página anterior
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; 

// Cambiar método de pago
function cambiarMetodoPago(metodo) {
  document.querySelectorAll('.metodo-contenido').forEach(el => el.classList.remove('activo'));
  document.getElementById(`metodo-${metodo}`).classList.add('activo');
}

// Validar documento
function validarDocumento(input) {
  const archivo = input.files[0];
  const estado = document.getElementById('documento-estado');
  
  if (!archivo) {
    estado.innerHTML = '';
    return;
  }
  
  const validacion = validarArchivo(archivo);
  
  if (!validacion.valido) {
    estado.innerHTML = validacion.errores.map(e => `<div class="error-mensaje">${e}</div>`).join('');
    input.value = '';
  } else {
    estado.innerHTML = `
      <div class="documento-cargado">
        ✓ ${archivo.name} cargado correctamente
      </div>
    `;
  }
}

// Función auxiliar interna para calcular montos totales
function calcularTotal() {
  return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// Actualizar resumen: Mapea los productos almacenados en localStorage
function actualizarResumen() {
  const contenedor = document.getElementById('resumen-productos');
  const totalElement = document.getElementById('total-resumen');
  
  if (!contenedor || !totalElement) return;
  
  contenedor.innerHTML = carrito.map((item, index) => `
    <div class="resumen-item">
      <div class="resumen-item-nombre">
        ${item.nombre}<br>
        <span style="color: var(--gris-medio); font-size: 12px;">x${item.cantidad}</span>
      </div>
      <div class="resumen-item-precio">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</div>
    </div>
  `).join('');
  
  totalElement.textContent = `$${calcularTotal().toLocaleString('es-CO')}`;
}

// Procesar compra con validación nativa del formulario
function procesarCompra(e) {
  e.preventDefault();
  
  const form = document.getElementById('checkout-form');
  if (!form) return;
  
  // Validar datos de envío
  const datosEnvio = {
    nombre: form.nombre.value,
    telefono: form.telefono.value,
    direccion: form.direccion.value,
    ciudad: form.ciudad.value,
    departamento: form.departamento.value
  };
  
  const validacionEnvio = validarDatosEnvio(datosEnvio);
  if (!validacionEnvio.valido) {
    mostrarNotificacion(validacionEnvio.errores[0], 'error');
    return;
  }
  
  // Validar método de pago seleccionado
  const opcionPagoChecked = document.querySelector('input[name="metodo-pago"]:checked');
  if (!opcionPagoChecked) {
    mostrarNotificacion('Por favor selecciona un método de pago', 'error');
    return;
  }
  
  const metodoPago = opcionPagoChecked.value;
  let validacionPago = { valido: false, errores: [] };
  
  if (metodoPago === 'tarjeta') {
    const datos = {
      numero: form['numero-tarjeta'].value.replace(/\s/g, ''),
      fecha: form['fecha-expiracion'].value,
      cvv: form.cvv.value,
      titular: form.titular.value
    };
    validacionPago = validarTarjeta(datos);
  } else if (metodoPago === 'efectivo') {
    validacionPago = validarEfectivo({
      proveedor: form['proveedor-efectivo'].value
    });
  } else if (metodoPago === 'billetera') {
    validacionPago = validarBilletera({
      billetera: form['billetera-digital'].value
    });
  }
  
  if (!validacionPago.valido) {
    mostrarNotificacion(validacionPago.errores[0], 'error');
    return;
  }
  
  // Validar carga del documento obligatorio
  const documento = document.getElementById('documento');
  if (!documento || !documento.files.length) {
    mostrarNotificacion('Por favor carga un documento', 'error');
    return;
  }
  
  // Generar orden si todo pasa los filtros
  const orden = generarOrdenCompra();
  mostrarConfirmacion(orden);
}

// Mostrar modal de confirmación y vaciar estado
function mostrarConfirmacion(orden) {
  const modal = document.getElementById('modal-confirmacion');
  const numeroOrden = document.getElementById('numero-orden-modal');
  
  if (numeroOrden) numeroOrden.textContent = orden.numero;
  if (modal) modal.classList.add('activo');
  
  // Almacenar orden estructurada para descarga de archivo
  localStorage.setItem('ultima-orden', JSON.stringify(orden));
  
  // Limpieza del carrito local diferida para evitar saltos en UI
  setTimeout(() => {
    carrito = [];
    localStorage.removeItem('carrito');
    localStorage.removeItem('totalCompra');
  }, 2000);
}

// Retornar a la Landing
function irAlInicio() {
  window.location.href = 'index.html';
}

// Descargar orden generada (Simulación de PDF/Comprobante)
function descargarOrden() {
  const orden = JSON.parse(localStorage.getItem('ultima-orden'));
  if (!orden) return;
  
  let contenido = `
CONFIRMACIÓN DE COMPRA
${orden.numero}

Fecha: ${orden.fecha}
Total: ${orden.total.toLocaleString('es-CO')}
Artículos: ${orden.items}

Gracias por tu compra en GlobalSeguros.
  `;
  
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${orden.numero}.txt`;
  a.click();
}

// Inicialización controlada del DOM en el Checkout
document.addEventListener('DOMContentLoaded', () => {
  // Comprobación amistosa en la consola para saber que los datos llegaron
  console.log("Datos del carrito recuperados:", carrito);

  if (carrito.length === 0) {
    console.warn("El carrito está vacío. Redirigiendo a la tienda...");
    window.location.href = 'marketplace.html';
    return;
  }
  
  // Pintar los datos en las tablas correspondientes
  actualizarResumen();
  
  // Formateador dinámico de Tarjeta de Crédito
  const numeroTarjeta = document.getElementById('numero-tarjeta');
  if (numeroTarjeta) {
    numeroTarjeta.addEventListener('input', (e) => {
      let valor = e.target.value.replace(/\D/g, '');
      let formateado = valor.replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = formateado;
    });
  }
  
  // Formateador dinámico de Fecha de Expiración
  const fechaExpiracion = document.getElementById('fecha-expiracion');
  if (fechaExpiracion) {
    fechaExpiracion.addEventListener('input', (e) => {
      let valor = e.target.value.replace(/\D/g, '');
      if (valor.length >= 2) {
        valor = valor.slice(0, 2) + '/' + valor.slice(2, 4);
      }
      e.target.value = valor;
    });
  }
});