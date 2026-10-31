/* sparrow: hiệu ứng tương tác. JS thuần, không thư viện. */
(function () {
  "use strict";

  /* ---------- CẤU HÌNH ----------
     Link LinkedIn: dán URL vào đây để bật đường kẻ + icon cạnh tên ở trang About (cả EN và VI).
     Để trống "" thì cả hai đều ẩn, không render gì. */
  var LINKEDIN_URL = "#";   // TẠM: "#" để xem giao diện, thay bằng URL LinkedIn thật

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
      Array.from(text).forEach(function (ch) {
        var span = document.createElement("span");
        span.className = "char";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty("--c", n++);
        span.textContent = ch;
        line.appendChild(span);
      });
    });
  });

  /* ---------- Trang About: đường kẻ + icon LinkedIn, một hàng giữa tên lớn và khối thông tin ---------- */
  var aboutName = document.querySelector(".about-hero .spaced-title");
  if (LINKEDIN_URL && aboutName) {
    var social = document.createElement("div");
    social.className = "title-social";
    social.setAttribute("data-reveal", "");
    social.style.setProperty("--i", "0");
    // icon: Simple Icons, "LinkedIn" (CC0 1.0), https://simpleicons.org
    social.innerHTML = '<span class="title-social__rule" aria-hidden="true"></span>' +
      '<a href="' + LINKEDIN_URL + '" target="_blank" rel="noopener noreferrer" aria-label="linkedin">' +
      '<svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>';
    aboutName.insertAdjacentElement("afterend", social);
  }

  /* ---------- B1/B2/B3: hiện khi cuộn tới ---------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-typing]");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; })
        .map(function (e) { return e.target; })
        .sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });   // theo thứ tự trong trang
      // các thẻ [data-stagger] hiện lần lượt theo thứ tự trái → phải, trên → dưới,
      // kể cả khi nhiều thẻ vào màn hình cùng lúc; nếu tiêu đề khối cũng vào cùng lúc thì chờ tiêu đề trước
      var headIn = batch.some(function (el) { return el.id === "work-title"; });
      var n = 0;
      batch.forEach(function (el) {
        if (el.hasAttribute("data-stagger")) {
          el.style.transitionDelay = ((headIn ? 2 : 0) + n++) * 0.2 + "s";
        }
        el.classList.add("is-in");
        io.unobserve(el);   // chỉ chạy một lần
      });
    }, { rootMargin: "0px 0px -3% 0px" });   // bắt đầu hiện khi block vừa chạm mép dưới màn hình, chạy dần trong lúc cuộn
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

    // Ảnh từ thứ 2 trở đi chỉ tải khi đến lượt (data-src), tải trước một ảnh để chuyển cảnh mượt
    function load(i) {
      var img = slides[i % slides.length].querySelector("img[data-src]");
      if (img) {
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      }
    }
    window.addEventListener("load", function () { load(1); });

    function next() {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      load(current);
      slides[current].classList.add("is-active");
      load(current + 1);
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
