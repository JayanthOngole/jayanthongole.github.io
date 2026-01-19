document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.querySelector(".hero").style.background =
    `radial-gradient(circle at ${x}% ${y}%, var(--accent), transparent)`;
});
