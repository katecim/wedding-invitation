import { translations } from './translations.js';

// Force scroll to top on refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// 1. Create the Timeline
const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut" }
});

// 2. Define the Animation Steps
tl.to(".scroll-hint", { opacity: 0, y: 20, duration: 0.5 })
  .to(".envelope-flap", { rotationX: -180, duration: 1.2 })
  .to(".main-invite", { y: -50, duration: 0.8 }, "-=0.3")
  .to(".invitation-letter", {
      opacity: 1,
      transform: "translate(-50%, -50%)",
      duration: 1.5,
      ease: "power3.out",
      pointerEvents: "auto"
  })
  .to(".desk", { filter: "blur(5px)", scale: 0.9, opacity: 0.3, duration: 1.5 }, "-=1.5");

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
    end: "top+=10 top",
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
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    ScrollTrigger.refresh();
}

langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});