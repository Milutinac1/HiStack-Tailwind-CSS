function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || el.textContent.replace(/[0-9]/g, '');
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const countTo = target;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentCount = Math.round(countTo * progress);

    if (progress >= 1) {
      clearInterval(counter);
      el.textContent = `${target}${suffix}`;
    } else {
      el.textContent = `${currentCount}${suffix}`;
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