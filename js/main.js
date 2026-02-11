import { translations } from './translations.js';

// Force scroll to top on refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// 1. Create the Timeline once
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
      ease: "power3.out"
  })
  .to(".desk", { filter: "blur(5px)", scale: 0.9, opacity: 0.3, duration: 1.5 }, "-=1.5");

// 3. Simple ScrollTrigger to act as a "Play" button
ScrollTrigger.create({
    trigger: "#scroll-container",
    start: "top+=50 top", // Triggers after 50px of scroll
    end: "bottom bottom",

    onEnter: () => {
        tl.play();
        // Lock the scroll after the animation starts
        document.body.style.overflow = 'hidden';

        // After the animation finished, unlock it so the user can scroll back up
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 2500);
    },

    onLeaveBack: () => {
        // This fires when the user scrolls back to the top 20px
        tl.reverse();
    }
});

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