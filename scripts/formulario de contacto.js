document.getElementById('form-contacto').addEventListener('submit', function(e) {
  e.preventDefault();

  document.querySelectorAll('.campo').forEach(c => c.classList.remove('error', 'ok'));
  document.querySelectorAll('.campo-error').forEach(e => e.textContent = '');

  let valido = true;

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const asunto  = document.getElementById('asunto').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const terminos = document.getElementById('terminos').checked;

  if (nombre.length < 3) {
    error('nombre', 'Ingresa tu nombre completo.');
    valido = false;
  } else ok('nombre');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error('email', 'Ingresa un correo válido.');
    valido = false;
  } else ok('email');

  if (!asunto) {
    error('asunto', 'Selecciona un asunto.');
    valido = false;
  } else ok('asunto');

  if (mensaje.length < 10) {
    error('mensaje', 'El mensaje debe tener al menos 10 caracteres.');
    valido = false;
  } else ok('mensaje');

  if (!terminos) {
    document.getElementById('err-terminos').textContent = 'Debes aceptar la política de privacidad.';
    valido = false;
  }

  if (!valido) return;

  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(function() {
    document.getElementById('form-exito').style.display = 'block';
    document.getElementById('form-contacto').reset();
    document.querySelectorAll('.campo').forEach(c => c.classList.remove('ok', 'error'));
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
  }, 800);
});

function error(id, msg) {
  document.getElementById('campo-' + id).classList.add('error');
  document.getElementById('err-' + id).textContent = msg;
}

function ok(id) {
  document.getElementById('campo-' + id).classList.add('ok');
}