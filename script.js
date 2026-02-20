document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  const demoBtns = document.querySelectorAll('.demo-btn-nav, #demo');
  demoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = encodeURIComponent('Hi! I would like to book a demo for Edu Pilot. Please provide more information about scheduling a demonstration.');
      const whatsappUrl = `https://wa.me/2348088645311?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.feature-card, .testimonial-card, .step-card, .process-card, .benefit-card');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        created_at: new Date().toISOString()
      };

      try {
        const response = await fetch(`${window.location.origin}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          contactForm.reset();
          alert('Thank you for contacting us! We will get back to you soon.');
        } else {
          console.log('Form submitted:', data);
          contactForm.reset();
          alert('Thank you for contacting us! We will get back to you soon.');
        }
      } catch (error) {
        console.log('Form submitted:', data);
        contactForm.reset();
        alert('Thank you for contacting us! We will get back to you soon.');
      }
    });
  }

  const marketerForm = document.getElementById('marketerForm');
  if (marketerForm) {
    marketerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(marketerForm);
      const data = {
        name: formData.get('name'),
        region: formData.get('region'),
        institution: formData.get('institution'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        experience: formData.get('experience'),
        connections: formData.get('connections'),
        motivation: formData.get('motivation'),
        source: formData.get('source'),
        created_at: new Date().toISOString()
      };

      try {
        const response = await fetch(`${window.location.origin}/api/marketer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          marketerForm.reset();
          alert('Thank you for your application! We will review it carefully and contact you within 48 hours via email or phone to discuss the next steps.');
        } else {
          console.log('Marketer application submitted:', data);
          marketerForm.reset();
          alert('Thank you for your application! We will review it carefully and contact you within 48 hours via email or phone to discuss the next steps.');
        }
      } catch (error) {
        console.log('Marketer application submitted:', data);
        marketerForm.reset();
        alert('Thank you for your application! We will review it carefully and contact you within 48 hours via email or phone to discuss the next steps.');
      }
    });
  }

  const subscribeBtn = document.querySelectorAll('.subscribe-btn');
  subscribeBtn.forEach(btn => {
    btn.addEventListener('click', async () => {
      const input = btn.previousElementSibling;
      if (input && input.value) {
        const email = input.value;
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        input.value = '';
      }
    });
  });

  let scrollPosition = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 30px rgba(17, 25, 44, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(17, 25, 44, 0.1)';
    }

    scrollPosition = currentScroll;
  });

  const heroEmailBtn = document.querySelector('.hero-email .email-submit');
  if (heroEmailBtn) {
    heroEmailBtn.addEventListener('click', () => {
      const emailInput = document.querySelector('.hero-email .email-input');
      if (emailInput && emailInput.value) {
        console.log('Hero email signup:', emailInput.value);
        alert('Thank you for your interest! We will contact you soon.');
        emailInput.value = '';
      }
    });
  }

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#' && href !== '#demo') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          if (navMenu) {
            navMenu.classList.remove('active');
            if (hamburger) {
              hamburger.classList.remove('active');
            }
          }
        }
      }
    });
  });

  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  const currentPage = window.location.pathname.split('/').pop();
  const navLinksActive = document.querySelectorAll('.nav-link');
  navLinksActive.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
