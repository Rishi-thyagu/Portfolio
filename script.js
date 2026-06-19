// ========================
// TYPEWRITER
// ========================
const roles = [
  "CS Student @ REC Chennai",
  "Building AI-powered tools",
  "Aspiring Software Engineer",
  "Learning something new daily",
  "Open to internships"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWrite() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeWrite, delay);
}

setTimeout(typeWrite, 800);

// ========================
// NAVBAR SCROLL
// ========================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ========================
// MOBILE MENU
// ========================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

function closeMobile() {
  mobileNav.classList.remove('open');
}

// close on outside click
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.remove('open');
  }
});

// ========================
// SCROLL REVEAL
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Also reveal section titles on scroll
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .section-label, .section-sub').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  sectionObserver.observe(el);
});

// ========================
// CONTACT FORM
// ========================
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('form-btn');
  const success = document.getElementById('form-success');
  const name = document.getElementById('f-name').value;
  const email = document.getElementById('f-email').value;
  const msg = document.getElementById('f-msg').value;

  // Open mail client
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.open(`mailto:rishi.thyagu@gmail.com?subject=${subject}&body=${body}`);

  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#22c55e';
  success.classList.remove('hidden');

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    success.classList.add('hidden');
    e.target.reset();
  }, 4000);
}

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================
// ACTIVE NAV LINK
// ========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) {
      current = s.getAttribute('id');
    }
  });

  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent2)';
    }
  });
});