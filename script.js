// Ombre de l'en-tête au défilement
var entete = document.querySelector('.entete');
function onScroll() { entete.classList.toggle('scrolled', window.scrollY > 10); }
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Filtres du catalogue
document.querySelectorAll('.filtres').forEach(function (barre) {
  var grille = barre.nextElementSibling;
  barre.addEventListener('click', function (e) {
    var bouton = e.target.closest('button');
    if (!bouton) return;
    barre.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', b === bouton);
    });
    var choix = bouton.dataset.f;
    grille.querySelectorAll('[data-cat]').forEach(function (el) {
      el.hidden = choix !== 'tout' && el.dataset.cat !== choix;
    });
  });
});

// Image absente : on garde le motif de remplacement
document.querySelectorAll('.photo img').forEach(function (img) {
  img.addEventListener('error', function () { img.remove(); });
});

// Lien actif dans le menu
var liens = document.querySelectorAll('.entete nav a');
var sections = Array.prototype.map.call(liens, function (a) {
  return document.querySelector(a.getAttribute('href'));
}).filter(Boolean);
if ('IntersectionObserver' in window) {
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        liens.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { spy.observe(s); });

  // Apparition au défilement
  var cibles = document.querySelectorAll('.intro, .feature-txt, .feature .photo, .grille figure, .artisans article, .contact, .bloc > h2');
  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('vu'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  cibles.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
}

// Formulaire de contact (front-end uniquement)
var form = document.querySelector('.contact form');
if (form) {
  var msg = form.querySelector('.form-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = 'شكراً لك، تم استلام رسالتك وسنتواصل معك قريباً.';
    form.reset();
  });
}