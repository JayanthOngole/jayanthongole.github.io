const faders = document.querySelectorAll('.fade');

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {

        // Find nearest container (project-card OR timeline-item)
        const container = btn.closest('.project-card, .timeline-item');

        if (container) {
            container.classList.toggle('open');
        }

    });
});


document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("light");
};

/* ===== Scroll Progress Bar ===== */
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / height) * 100;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = progress + '%';
});







