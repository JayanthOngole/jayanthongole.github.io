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

/* EXPAND / COLLAPSE (works for projects + prototypes + timeline) */

document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {

        const container = btn.closest('.project-card, .prototype-card, .timeline-item');

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

/* Global Gallery -  All Cards */

let currentGallery = [];
let currentIndex = 0;

/* attach click to ALL galleries */
document.querySelectorAll('.prototype-media.gallery').forEach(gallery => {

    const media = gallery.querySelectorAll('img, video');

    media.forEach((item, index) => {
        item.addEventListener('click', () => {

            currentGallery = Array.from(media);
            currentIndex = index;
            openMedia();

        });
    });
});

function openMedia() {

    const modal = document.getElementById("mediaModal");
    const img = document.getElementById("modalImg");
    const video = document.getElementById("modalVideo");
    const caption = document.getElementById("modalCaption");

    const media = currentGallery[currentIndex];

    modal.style.display = "flex";

    // reset
    img.style.display = "none";
    video.style.display = "none";
    video.pause();
    video.src = "";

    if (media.tagName === "IMG") {
        img.style.display = "block";
        img.src = media.src;
    } else {
        video.style.display = "block";
        video.src = media.src;
        video.play();
    }

    caption.textContent = media.dataset.caption || "";
}

function nextMedia() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    openMedia();
}

function prevMedia() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    openMedia();
}

function closeModal() {
    const modal = document.getElementById("mediaModal");
    const video = document.getElementById("modalVideo");

    modal.style.display = "none";
    video.pause();
}






