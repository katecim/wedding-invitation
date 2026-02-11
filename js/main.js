import { translations } from './translations.js';
const mm = gsap.matchMedia();

mm.add({
  // Define our breakpoints
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)"
}, (context) => {
  let { isDesktop } = context.conditions;

  const tl = gsap.timeline({
    // Pause on mobile so it only plays when triggered; 
    // Desktop can stay unpaused as scrub handles it.
    paused: !isDesktop, 
    scrollTrigger: {
      trigger: "#scroll-container",
      start: "top top",
      end: isDesktop ? "+=400%" : "+=100%", // Shorter scroll area for mobile
      scrub: isDesktop ? 1 : false,        // Scrub only on desktop
      pin: ".scene-wrapper",
      pinSpacing: true,
      // On mobile, play the timeline once when the user starts scrolling
      onEnter: () => {
        if (!isDesktop) tl.play();
      },
      // Optional: reverse if they scroll back to the very top on mobile
      onLeaveBack: () => {
        if (!isDesktop) tl.reverse();
      },
      invalidateOnRefresh: true
    }
  });

  /* THE ANIMATION STEPS (Shared by both) */
  tl.to(".scroll-hint", { 
      opacity: 0, 
      y: 20, 
      duration: 0.5 
    }, 0)
    .to(".envelope-flap", { 
      rotationX: -180, 
      duration: 1.5, 
      ease: "power2.inOut" 
    })
    .to(".main-invite", { 
      y: -50, 
      duration: 1, 
      ease: "power1.out" 
    }, "-=0.5")
    .to(".invitation-letter", {
      opacity: 1,
      transform: "translate(-50%, -50%)",
      duration: 2,
      ease: "power3.out"
    })
    .to(".desk", { 
      filter: "blur(5px)", 
      scale: 0.9, 
      opacity: 0.3, 
      duration: 2 
    }, "-=2");

  return () => {
    // This clean-up runs when the screen is resized across the breakpoint
    tl.kill();
  };
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