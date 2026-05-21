function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('abierto');
  document.querySelectorAll('.preguntas-elemento').forEach(i => i.classList.remove('abierto'));
  if (!isOpen) item.classList.add('abierto');
}

// Smooth reveal on scroll
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

// How-steps interaction
document.querySelectorAll('.como-paso').forEach((step, i) => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.como-paso').forEach(s => s.classList.remove('activo'));
    step.classList.add('activo');
  });
});