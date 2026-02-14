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

const buttons = document.querySelectorAll('.prototype-filters button');
const indicator = document.querySelector('.filter-indicator');

function moveIndicator(btn) {
    const rect = btn.getBoundingClientRect();
    const parentRect = btn.parentElement.getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    indicator.style.left = (rect.left - parentRect.left) + "px";
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        moveIndicator(btn);

        const filter = btn.dataset.filter;

        document.querySelectorAll('.prototype-card').forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.classList.remove('hide');
                card.style.display = "block";
            } else {
                card.classList.add('hide');
                setTimeout(() => card.style.display = "none", 200);
            }
        });
    });
});

/* set initial indicator */
window.addEventListener('load', () => {
    const active = document.querySelector('.prototype-filters button.active');
    if (active) moveIndicator(active);
});


/* MODAL */
function openModal(src) {
    document.getElementById("mediaModal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

function closeModal() {
    document.getElementById("mediaModal").style.display = "none";
}







