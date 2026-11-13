// Efeitos visuais: brilho que acompanha o mouse e onda ao clicar nos botões.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.documentElement; let t = 0, x = 0, y = 0;
  addEventListener("pointermove", e => {
    x = e.clientX; y = e.clientY;
    if (!t) t = requestAnimationFrame(() => { t = 0; root.style.setProperty("--mx", x + "px"); root.style.setProperty("--my", y + "px"); });
  }, { passive: true });
  document.addEventListener("pointerdown", e => {
    const b = e.target.closest(".b,.o"); if (!b || b.disabled) return;
    const c = b.getBoundingClientRect(), d = Math.max(c.width, c.height) * 2, s = document.createElement("span");
    s.className = "rp";
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - c.left - d / 2}px;top:${e.clientY - c.top - d / 2}px`;
    b.appendChild(s); setTimeout(() => s.remove(), 650);
  });
})();
