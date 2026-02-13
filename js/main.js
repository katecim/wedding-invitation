import { translations } from './translations.js';

// Force the browser to NOT remember the scroll position
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Ensure ScrollTrigger refreshes its math
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// 1. Create the Timeline
const tl = gsap.timeline({
    paused: true,
    defaults: { 
        ease: "power2.out",
        duration: 1 
    }
});

// 2. Define the Animation Steps
tl.to(".scroll-hint", { 
    opacity: 0, 
    y: 10, 
    duration: 0.3 
})

  .to(".envelope-flap-container", { 
    rotationX: -180, 
    duration: 1.3 
}, "-=0.2")

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
  }, "-=0.4")

  .to(".desk", { 
    filter: "blur(5px)", 
    scale: 0.9, 
    opacity: 0.3, 
    duration: 1.5 
}, "-=1.1");

// 3. Define the trigger Function
const openInvitation = () => {
    if (tl.progress() === 0) { 
        tl.play();

        document.body.style.overflow = 'auto';
    }
};

// 4. Setup All Triggers (Scroll & Click)
ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top+=20 top",
    end: "bottom top",

    onEnter: openInvitation,
    onLeaveBack: () => {
        tl.reverse();
    }
});

// Trigger open when envelope is clicked
const envelope = document.getElementById('envelope-clickable');
const hint = document.getElementById('scroll-hint');

if (envelope) envelope.addEventListener('click', openInvitation);
if (hint) hint.addEventListener('click', openInvitation);

// Language Support
const langSelect = document.getElementById('language-select');

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    const isMobile = window.innerWidth < 800;

    elements.forEach(el => {
      let key = el.getAttribute('data-key');

      if (key === 'scroll-hint' && isMobile) {
          key = 'scroll-hint-mobile';
      }

      if (translations[lang][key]) {
          el.textContent = translations[lang][key];
      }
    });
    
    ScrollTrigger.refresh();
}

langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    updateLanguage(langSelect.value);
});