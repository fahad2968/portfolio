/* ==========================================================================
   Personal Portfolio - Main JavaScript
   Author: Fahad Bin Ali
   Features: Mobile Menu, Back-to-Top, Project Filter, Contact Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initBackToTop();
  initProjectFilter();
  initContactForm();
  updateFooterYear();
});

/* --------------------------------------------------------------------------
   1. মোবাইল নেভিগেশন মেনু (সব পেজে কাজ করবে)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  // কোনো লিংকে ক্লিক করলে মোবাইল মেনু অটো বন্ধ হবে
  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

/* --------------------------------------------------------------------------
   2. ব্যাক-টু-টপ বাটন (পেজ নিচে স্ক্রল করলে দেখাবে)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   3. প্রজেক্ট ফিল্টারিং (শুধু projects.html পেজে কাজ করবে)
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // আগের active ক্লাস সরিয়ে নতুন বাটনে বসানো
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      const selectedCategory = this.getAttribute('data-filter');

      // ক্যাটাগরি মিলিয়ে কার্ড দেখানো বা লুকানো
      projectCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. কন্টাক্ট ফর্ম ভ্যালিডেশন (শুধু contact.html পেজে কাজ করবে)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusBox = document.getElementById('formStatus');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // পেজ রিলোড হওয়া আটকাবে

    // আগের এরর মেসেজগুলো পরিষ্কার করা
    clearErrors();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
    const selectedServices = document.querySelectorAll('input[name="services"]:checked');

    let isValid = true;

    // নাম চেক করা
    if (fullName.length < 3) {
      showError('nameError', 'Please enter your full name (at least 3 characters).');
      isValid = false;
    }

    // ইমেইল ফরম্যাট চেক করা
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    // ড্রপডাউন (Subject) চেক করা
    if (subject === '') {
      showError('subjectError', 'Please select a topic from the dropdown.');
      isValid = false;
    }

    // রেডিও বাটন চেক করা
    if (!contactMethod) {
      showError('radioError', 'Please select your preferred reply method.');
      isValid = false;
    }

    // চেকবক্স চেক করা (অন্তত একটি সিলেক্ট করতে হবে)
    if (selectedServices.length === 0) {
      showError('checkboxError', 'Please check at least one area of interest.');
      isValid = false;
    }

    // মেসেজ (Textarea) চেক করা
    if (message.length < 10) {
      showError('messageError', 'Please write a message of at least 10 characters.');
      isValid = false;
    }

    // সব ঠিক থাকলে কনফার্মেশন দেখাবে
    if (isValid) {
      statusBox.className = 'form-status success';
      statusBox.textContent =
        'Thank you, ' + fullName + '! Your message has been validated and recorded successfully.';
      form.reset();
    } else {
      statusBox.className = 'form-status error';
      statusBox.textContent = 'Please fix the highlighted errors above before submitting.';
    }
  });
}

// এরর দেখানোর হেল্পার ফাংশন
function showError(elementId, errorMessage) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
}

// সব এরর ক্লিয়ার করার ফাংশন
function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-msg');
  errorMessages.forEach(function (el) {
    el.textContent = '';
  });

  const statusBox = document.getElementById('formStatus');
  if (statusBox) {
    statusBox.className = 'form-status';
    statusBox.textContent = '';
  }
}

/* --------------------------------------------------------------------------
   5. ফুটারে বর্তমান সাল অটোমেটিক আপডেট করা
   -------------------------------------------------------------------------- */
function updateFooterYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}