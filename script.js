document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const demoModal = document.getElementById('demoModal');
  const successModal = document.getElementById('successModal');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  const demoBtns = document.querySelectorAll('.demo-btn-nav, #demo');
  demoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal) {
        demoModal.classList.add('active');
      }
    });
  });

  const modalClose = demoModal?.querySelector('.modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      demoModal.classList.remove('active');
    });
  }

  const modalOverlay = demoModal?.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      demoModal.classList.remove('active');
    });
  }

  const proceedDemo = document.getElementById('proceedDemo');
  if (proceedDemo) {
    proceedDemo.addEventListener('click', () => {
      window.location.href = 'demo.html';
    });
  }

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
          if (successModal) {
            successModal.classList.add('active');
          }
        } else {
          console.log('Marketer application submitted:', data);
          marketerForm.reset();
          if (successModal) {
            successModal.classList.add('active');
          }
        }
      } catch (error) {
        console.log('Marketer application submitted:', data);
        marketerForm.reset();
        if (successModal) {
          successModal.classList.add('active');
        }
      }
    });
  }

  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(demoForm);
      const data = {
        school_name: formData.get('school_name'),
        name: formData.get('name'),
        title: formData.get('title'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        student_count: formData.get('student_count'),
        demo_date: formData.get('demo_date'),
        demo_time: formData.get('demo_time'),
        interests: formData.get('interests'),
        created_at: new Date().toISOString()
      };

      try {
        const response = await fetch(`${window.location.origin}/api/demo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          demoForm.reset();
          if (successModal) {
            successModal.classList.add('active');
          }
        } else {
          console.log('Demo request submitted:', data);
          demoForm.reset();
          if (successModal) {
            successModal.classList.add('active');
          }
        }
      } catch (error) {
        console.log('Demo request submitted:', data);
        demoForm.reset();
        if (successModal) {
          successModal.classList.add('active');
        }
      }
    });
  }

  const closeSuccess = document.getElementById('closeSuccess');
  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      if (successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  const successOverlay = successModal?.querySelector('.modal-overlay');
  if (successOverlay) {
    successOverlay.addEventListener('click', () => {
      successModal.classList.remove('active');
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

  const icons3D = document.querySelectorAll('.icon-3d, .marketer-illustration');
  icons3D.forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
      const rect = icon.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      icon.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
    });

    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
