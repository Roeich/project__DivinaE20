// Custom JavaScript â€“ SEO Safe (Helix Ultimate)
// NON gestisce immagini (delegate a Helix)

document.addEventListener('DOMContentLoaded', function () {

  /* ================================
     Lazy load iframe (YouTube, mappe)
     ================================ */
  document.querySelectorAll('iframe[data-src]').forEach(function (iframe) {
    iframe.src = iframe.dataset.src;
  });

  /* ================================
     Smooth scroll per anchor interni
     ================================ */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

  anchor.addEventListener('click', function (e) {

    const href = this.getAttribute('href');

    // ðŸ”’ Evita href="#" o href vuoti
    if (!href || href === '#' || href.length < 2) return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }

  });

});


  /* ================================
     VIDEO MODAL YOUTUBE
     ================================ */

  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("youtubeFrame");

  if (modal && iframe) {

    const closeBtn = modal.querySelector(".close-video");
    const overlay = modal.querySelector(".video-overlay");

    document.querySelectorAll(".open-video").forEach(function (button) {

      button.addEventListener("click", function () {

        let videoId = this.dataset.video;

        // Se incollano URL completo
        if (videoId.includes("youtube")) {
          try {
            const url = new URL(videoId);
            videoId = url.searchParams.get("v");
          } catch (e) {}
        }

        iframe.src =
          "https://www.youtube.com/embed/" +
          videoId +
          "?autoplay=1&controls=1&rel=0";

modal.classList.add("active");

        document.body.classList.add("video-open");

      });

    });

    function closeModal() {
modal.classList.remove("active");

      iframe.src = "";
      document.body.classList.remove("video-open");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);

  }

});

/* ================================
   Dopo caricamento completo pagina
   (NON influisce su LCP)
   ================================ */
window.addEventListener('load', function () {

  // Classe utile per animazioni post-load
  document.body.classList.add('page-loaded');

  // Tracking (GA / Meta / altri)
  // gtag(...)
  // fbq(...)

  /* ================================
     Pulsanti share (non critici)
     ================================ */
  document.querySelectorAll('.js-share').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(
        btn.dataset.url,
        'share',
        `width=${btn.dataset.width},height=${btn.dataset.height}`
      );
    });
  });

});
/* =====================================================
   READMORE JOOMLA 6 SAFE â€” CON ICONA
===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  const collapsedHeight = 600;

  const allowedItemIds = [186, 193, 194, 195, 102, 196, 197, 198, 199, 203];

  const bodyClasses = document.body.className;

  const allowed = allowedItemIds.some(id =>
    bodyClasses.includes('itemid-' + id)
  );

  if (!allowed) return;

  document.querySelectorAll('.articolo-mio').forEach(function (article) {

    if (article.classList.contains('rma-ready')) return;

    if (article.scrollHeight <= collapsedHeight) return;

    article.style.maxHeight = collapsedHeight + "px";
    article.style.overflow = "hidden";
    article.style.transition = "max-height .5s ease";

    const btn = document.createElement('div');
    btn.className = 'rma-button';

    const text = document.createElement('span');
    text.textContent = 'Leggi tutto ';

    const icon = document.createElement('i');
    icon.className = 'ri-add-circle-line';
    icon.style.marginLeft = "6px";

    btn.appendChild(text);
    btn.appendChild(icon);

    article.after(btn);

    btn.addEventListener('click', function () {

      const isOpen = article.classList.toggle('rma-open');

      if (isOpen) {

        article.style.maxHeight = article.scrollHeight + "px";
        text.textContent = "Chiudi ";
        icon.className = 'ri-close-circle-line';

        setTimeout(function () {
          article.style.maxHeight = "none";
        }, 500);

      } else {

        article.style.maxHeight = collapsedHeight + "px";
        text.textContent = "Leggi tutto ";
        icon.className = 'ri-add-circle-line';

      }

    });

    article.classList.add('rma-ready');

  });

});


