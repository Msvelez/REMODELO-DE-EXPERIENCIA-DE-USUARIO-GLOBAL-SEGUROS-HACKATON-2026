// 1. Acordeón de Preguntas Frecuentes (FAQ)
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('abierto');
  
  // Cierra todas las demás preguntas
  document.querySelectorAll('.preguntas-elemento').forEach(i => i.classList.remove('abierto'));
  
  // Si no estaba abierta, la abre
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
// Corregido: Ahora busca '.como-paso-card' para conectar con las tarjetas de tu HTML
document.querySelectorAll('.como-paso-card').forEach((step) => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.como-paso-card').forEach(s => s.classList.remove('activo'));
    step.classList.add('activo');
  });
});

// 4. Temporizador del Carrusel Automático (Hero Section)
document.addEventListener("DOMContentLoaded", () => {
    // Corregido: Cambiado a querySelector('.carrusel-track') para que conecte con la clase del HTML
    const track = document.querySelector(".carrusel-track");
    
    if (track) {
        const tarjetas = track.querySelectorAll(".carrusel-tarjeta");
        const totalImagenes = tarjetas.length;
        let indiceActual = 0;

        const autoDeslizar = () => {
            indiceActual++;

            if (indiceActual >= totalImagenes) {
                indiceActual = 0;
            }

            // Calcula la posición exacta multiplicando el ancho actual por el índice
            const posicionDestino = track.offsetWidth * indiceActual;
            
            // Fuerza el scroll horizontal al contenedor
            track.scrollLeft = posicionDestino;
        };

        // Ejecuta el deslizamiento cada 3.5 segundos como lo tenías configurado
        setInterval(autoDeslizar, 3500);
    }
});