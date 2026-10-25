function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || el.textContent.replace(/[0-9]/g, '');
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;

    const progress = Math.min(frame / totalFrames, 1);
    const currentCount = Math.round(target * progress);

    el.textContent = `${prefix}${currentCount}${suffix}`;

    if (progress >= 1) {
      clearInterval(counter);
    }
  }, frameDuration);
}

const counters = document.querySelectorAll('[data-target]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5,
});

counters.forEach(counter => {
  observer.observe(counter);
});