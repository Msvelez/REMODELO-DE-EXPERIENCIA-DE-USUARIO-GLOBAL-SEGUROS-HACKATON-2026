
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

// Actualizar resumen
function actualizarResumen() {
  const contenedor = document.getElementById('resumen-productos');
  const totalElement = document.getElementById('total-resumen');
  
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

// Procesar compra
function procesarCompra(e) {
  e.preventDefault();
  
  const form = document.getElementById('checkout-form');
  
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
  
  // Validar método de pago
  const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value;
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
  
  // Validar documento
  const documento = document.getElementById('documento');
  if (!documento.files.length) {
    mostrarNotificacion('Por favor carga un documento', 'error');
    return;
  }
  
  // Si todo es válido, generar orden
  const orden = generarOrdenCompra();
  mostrarConfirmacion(orden);
}

// Mostrar confirmación
function mostrarConfirmacion(orden) {
  const modal = document.getElementById('modal-confirmacion');
  const numeroOrden = document.getElementById('numero-orden-modal');
  
  numeroOrden.textContent = orden.numero;
  modal.classList.add('activo');
  
  // Guardar orden en localStorage (para descarga)
  localStorage.setItem('ultima-orden', JSON.stringify(orden));
  
  // Limpiar carrito
  setTimeout(() => {
    carrito = [];
    guardarCarrito();
  }, 2000);
}

// Ir al inicio
function irAlInicio() {
  window.location.href = 'index.html';
}

// Descargar orden (simulado)
function descargarOrden() {
  const orden = JSON.parse(localStorage.getItem('ultima-orden'));
  
  let contenido = `
CONFIRMACIÓN DE COMPRA
${orden.numero}

Fecha: ${orden.fecha}
Total: ${orden.total.toLocaleString('es-CO')}
Artículos: ${orden.items}

Gracias por tu compra.
  `;
  
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${orden.numero}.txt`;
  a.click();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  if (carrito.length === 0) {
    window.location.href = 'marketplace.html';
    return;
  }
  
  actualizarResumen();
  
  // Formato de tarjeta
  const numeroTarjeta = document.getElementById('numero-tarjeta');
  if (numeroTarjeta) {
    numeroTarjeta.addEventListener('input', (e) => {
      let valor = e.target.value.replace(/\D/g, '');
      let formateado = valor.replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = formateado;
    });
  }
  
  // Formato de fecha
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
