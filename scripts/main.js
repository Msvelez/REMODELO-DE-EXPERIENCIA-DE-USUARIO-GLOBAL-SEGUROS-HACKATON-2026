// 1. Acordeón de Preguntas Frecuentes (FAQ)
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('abierto');
  
  document.querySelectorAll('.preguntas-elemento').forEach(i => i.classList.remove('abierto'));
  
  if (!isOpen) item.classList.add('abierto');
}

// 2. Animación de entrada con Scroll (Intersection Observer)
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

// 3. Interacción de los 3 pasos fijos (Sección "Cómo Funciona")
document.querySelectorAll('.como-paso-card').forEach((step) => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.como-paso-card').forEach(s => s.classList.remove('activo'));
    step.classList.add('activo');
  });
});

// 4. Carrusel 
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carrusel-track");
    
    if (track) {
        const tarjetas = track.querySelectorAll(".carrusel-tarjeta");
        const totalImagenes = tarjetas.length;
        let indiceActual = 0;

        const autoDeslizar = () => {
            // 1. Avanzamos al siguiente índice
            indiceActual++;

            // 2. Si ya pasó de la tercera tarjeta (índice 3), resetea a la primera (0)
            if (indiceActual >= totalImagenes) {
                indiceActual = 0;
            }

            // 3. Tomamos el ancho exacto de una tarjeta en ese instante
            const anchoTarjeta = track.clientWidth; 
            
            /* 4. Forzamos al contenedor a moverse horizontalmente 
                  multiplicando el ancho por el índice (0, 1 o 2) */
            track.scrollLeft = anchoTarjeta * indiceActual;
        };

        // 5. Configurado para ejecutarse estrictamente cada 3 segundos (3000ms)
        setInterval(autoDeslizar, 3000);
    }
});
window.onload = function() {
    const track = document.getElementById("carrusel-track");
    
    if (track) {
        const tarjetas = track.querySelectorAll(".carrusel-tarjeta");
        const totalImagenes = tarjetas.length;
        let indiceActual = 0;

        const autoDeslizar = () => {
            indiceActual++;

            if (indiceActual >= totalImagenes) {
                indiceActual = 0; // Vuelve a la primera imagen
            }

            // Tu cálculo original exacto
            const posicionDestino = track.offsetWidth * indiceActual;
            track.scrollLeft = posicionDestino;
        };

        // Tu tiempo original de 3.5 segundos
        setInterval(autoDeslizar, 3500);
    }
};