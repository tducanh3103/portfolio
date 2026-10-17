/* sparrow — hiệu ứng tương tác. JS thuần, không thư viện. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- D2: menu mobile ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    // đóng khi bấm link trong menu hoặc nhấn Esc
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // phóng to màn hình sang cỡ desktop thì tự đóng
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- A5: tách chữ thành từng ký tự ---------- */
  document.querySelectorAll("[data-typing]").forEach(function (el) {
    var n = 0;
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    el.querySelectorAll(".line").forEach(function (line) {
      var text = line.textContent;
      line.textContent = "";
      line.setAttribute("aria-hidden", "true");
      Array.from(text).forEach(function (ch) {
        var span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--c", n++);
        span.textContent = ch;
        line.appendChild(span);
      });
    });
  });

  /* ---------- B1/B2/B3: hiện khi cuộn tới ---------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-typing]");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);   // chỉ chạy một lần
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- D1: slideshow ảnh hero ---------- */
  var slides = document.querySelectorAll(".hero__slide");
  if (slides.length > 1 && !reduceMotion) {
    var current = 0;
    var timer = null;
    var heroVisible = true;

    function next() {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }
    function start() { if (!timer) timer = setInterval(next, 5000); }
    function stop() { clearInterval(timer); timer = null; }
    function update() { (heroVisible && !document.hidden) ? start() : stop(); }

    // dừng khi tab bị ẩn hoặc hero đã cuộn khỏi màn hình
    document.addEventListener("visibilitychange", update);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        update();
      }).observe(slides[0].parentElement);
    }
    update();
  }
})();
