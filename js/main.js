gsap.registerPlugin(ScrollTrigger);

// 1. Setup the timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    pin: ".scene-wrapper",
  }
});

tl
  /* PHASE 1: Open the envelope */
    tl.to(".scroll-hint", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power1.out"
    }, 0)

  .to(".envelope-flap", {
    rotationX: -180, 
    duration: 1.5,
    ease: "power2.inOut"
  })

  /* PHASE 2: The Invite "Peek" */
  .to(".main-invite", {
    y: -50,
    duration: 1,
    ease: "power1.out"
  }, "-=0.5")

  /* PHASE 3: The Letter Reveal */
  // The letter fades in and slides up to cover the envelope
  .to(".invitation-letter", {
    opacity: 1,
    transform: "translate(-50%, -50%)", // Moves to exact center
    duration: 2,
    ease: "power3.out"
  })

  /* OPTIONAL: Blur the background desk as the letter appears */
  .to(".desk", {
    filter: "blur(5px)",
    scale: 0.9,
    opacity: 0.3,
    duration: 2
  }, "-=2"); // Happens simultaneously with the letter reveal


const langSelect = document.getElementById('language-select');

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Optional: Refresh ScrollTrigger in case text length changes layout
    ScrollTrigger.refresh();
}

langSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});