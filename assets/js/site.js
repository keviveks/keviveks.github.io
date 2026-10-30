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
