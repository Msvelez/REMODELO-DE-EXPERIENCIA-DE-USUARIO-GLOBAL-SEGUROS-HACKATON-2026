
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('abierto');
  document.querySelectorAll('.preguntas-elemento').forEach(i => i.classList.remove('abierto'));
  if (!isOpen) item.classList.add('abierto');
}

// scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.dolor-tarjeta, .beneficio-tarjeta, .testimonio-tarjeta, .experiencia-paso').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// pasos
document.querySelectorAll('.como-paso').forEach((step, i) => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.como-paso').forEach(s => s.classList.remove('activo'));
    step.classList.add('activo');
  });
});

// Carrusel
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carrusel-track");
    
    if (track) {
        const tarjetas = track.querySelectorAll(".carrusel-tarjeta");
        const totalImagenes = tarjetas.length;
        let indiceActual = 0;

        const autoDeslizar = () => {
            // Incrementamos el índice para pasar a la siguiente imagen
            indiceActual++;

            // Si llegamos al final (después de la tercera), reseteamos al primer elemento
            if (indiceActual >= totalImagenes) {
                indiceActual = 0;
            }

            // Calculamos la posición exacta multiplicando el ancho del contenedor por el índice
            const posicionDestino = track.offsetWidth * indiceActual;
            
            // Forzamos el scroll horizontal a esa posición exacta
            track.scrollLeft = posicionDestino;
        };

        // Configura el temporizador (3500 milisegundos = 3.5 segundos)
        setInterval(autoDeslizar, 3500);
    }
});