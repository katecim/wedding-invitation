import { translations } from './translations.js';

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');

    // If a lang is in the URL, use it; otherwise use the dropdown's default
    if (lang && translations[lang]) {
        langSelect.value = lang;
        updateLanguage(lang);
    } else {
        updateLanguage(langSelect.value);
    }
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Timeline
const tl = gsap.timeline({
    paused: true,
    defaults: { 
        ease: "power2.out",
        duration: 1 
    }
});

// Animation Steps
tl.to(".scroll-hint", { 
    opacity: 0, 
    y: 1, 
    duration: 0.5
})

  .to(".envelope-flap-container", { 
    rotationX: 180, 
    duration: 1.3 
}, "-=0.3")

  .to(".main-invite", { 
    y: -80,
    rotation: -1.5,
    duration: 1.2 
}, "-=1.0")

  .to(".invitation-letter", {
      opacity: 1,
      transform: "translate(-50%, -50%)",
      duration: 1.1,
      ease: "back.out(1.1)",
      pointerEvents: "auto"
  }, "-=0.3")

  .to(".desk", { 
    filter: "blur(5px)", 
    scale: 0.9, 
    opacity: 0.3, 
    duration: 1.5 
}, "-=1.1");

// Trigger Function
const openInvitation = () => {
    if (tl.progress() === 0) { 
        tl.play();
    }
};

// Trigger open when envelope is clicked
const envelope = document.getElementById('envelope-clickable');
const hint = document.getElementById('scroll-hint');

if (envelope) envelope.addEventListener('click', openInvitation);
if (hint) hint.addEventListener('click', openInvitation);

// Language Support
const langSelect = document.getElementById('language-select');

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');

    elements.forEach(el => {
      let key = el.getAttribute('data-key');

      if (translations[lang][key]) {
          el.textContent = translations[lang][key];
      }
    });
    
    // Update the URL without reloading the page
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lang=' + lang;
    window.history.pushState({ path: newurl }, '', newurl);

    // Refresh GSAP if any text changes affected layout heights
    if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
    }
}

langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    updateLanguage(langSelect.value);
});