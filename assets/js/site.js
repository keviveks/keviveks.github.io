(function () {
  var header = document.querySelector(".site-header");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sections = document.querySelectorAll(".reveal");
  var timeline = document.querySelector(".timeline");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var hero = document.querySelector(".hero");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hero && !reduce && finePointer) {
    var frame = 0;
    var hovering = false;
    var glowX = 0;
    var glowY = 0;

    hero.addEventListener("pointermove", function (event) {
      var rect = hero.getBoundingClientRect();
      glowX = event.clientX - rect.left;
      glowY = event.clientY - rect.top;
      hovering = true;
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        hero.style.setProperty("--glow-x", glowX + "px");
        hero.style.setProperty("--glow-y", glowY + "px");
        if (hovering) hero.classList.add("is-glowing");
      });
    });

    hero.addEventListener("pointerleave", function () {
      hovering = false;
      hero.classList.remove("is-glowing");
    });
  }

  function showSettled() {
    sections.forEach(function (section) {
      section.classList.add("is-in");
    });
    if (timeline) timeline.classList.add("is-drawn");
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showSettled();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".reveal-item").forEach(function (item, index) {
          item.style.transitionDelay = index * 60 + "ms";
        });
        entry.target.classList.add("is-in");
        if (entry.target.id === "experience" && timeline) {
          timeline.classList.add("is-drawn");
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
