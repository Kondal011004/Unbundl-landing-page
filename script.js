/**
 * script.js
 * - Handles:
 *   1) Mobile navigation toggle
 *   2) Smooth scrolling for internal links
 *   3) Simple reveal-on-scroll using IntersectionObserver
 *   4) Contact form submit / clear behavior (demo only — no backend)
 */

document.addEventListener('DOMContentLoaded', function () {
  
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // 
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      
      if (!href || href === '#') return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // 
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  
  document.querySelectorAll('.section, .feature, .workflow-step, .plan').forEach(function (el) {
    revealObserver.observe(el);
  });

  

  
  const form = document.getElementById('contact-form');
  const clearBtn = document.getElementById('clear-btn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      
      const name = (form.name && form.name.value || '').trim();
      const email = (form.email && form.email.value || '').trim();

      if (!name || !email) {
        alert('Please enter your name and email before submitting.');
        return;
      }

      
      alert('Thanks — your message was received. This demo has no backend.');
      form.reset();
    });
  }

  if (clearBtn && form) {
    clearBtn.addEventListener('click', function () {
      form.reset();
    });
  }
});
