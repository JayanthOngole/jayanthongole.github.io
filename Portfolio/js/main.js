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




const roles = [
    "Simulation Systems Engineer",
    "Real-Time Simulation Specialist",
    "Distributed Simulation Architect",
    "Defence & Training Simulation Engineer"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
    const element = document.getElementById("typing");
    if (!element) return;

    current = roles[i];

    if (isDeleting) {
        element.textContent = current.substring(0, j--);
    } else {
        element.textContent = current.substring(0, j++);
    }

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 40 : 70);
}

type();



