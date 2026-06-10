document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DYNAMIC TYPING EFFECT (Hero Section)
    // ==========================================
    const dynamicText = document.querySelector(".hero-title span");
    const phrases = ["Belle.", "a Web Developer.", "a Designer.", "a Tech Explorer."];
    let phraseIdx = 0;
    let letterIdx = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            dynamicText.textContent = currentPhrase.substring(0, letterIdx - 1);
            letterIdx--;
        } else {
            dynamicText.textContent = currentPhrase.substring(0, letterIdx + 1);
            letterIdx++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letterIdx === currentPhrase.length) {
            typeSpeed = 1500; 
            isDeleting = true;
        } else if (isDeleting && letterIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length; 
            typeSpeed = 500; 
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();

    // ==========================================
    // 2. SCROLL SPY (Active Link Highlighting)
    // ==========================================
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSectionId)) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 3. REVEAL ON SCROLL (Projects & Skills)
    // ==========================================
    const revealElements = document.querySelectorAll(".project-card, .skill-item");

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                
                if (entry.target.classList.contains("skill-item")) {
                    const progressBar = entry.target.querySelector(".progress");
                    const targetWidth = progressBar.getAttribute("data-width");
                    progressBar.style.width = targetWidth;
                }
                
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 
    });

    revealElements.forEach(element => {
        revealOnScrollObserver.observe(element);
    });
});