// --- Mobile Navigation Toggle ---
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

const navSlide = () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = ''; // Reset animation
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
};

burger.addEventListener('click', navSlide);

// Close nav when a link is clicked (for mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            navSlide(); // Close the nav
        }
    });
});

// --- Simple Canvas Background Animation (Conceptual - for advanced graphics, consider libraries like p5.js, Three.js) ---
const canvas = document.getElementById('networkCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 80;
    const maxDistance = 150; // Max distance for lines to connect

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = []; // Clear and re-init particles on resize
        initParticles();
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.5; // Slower movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5; // Smaller particles
            this.color = 'rgba(0, 255, 192, 0.7)'; // Primary color with alpha
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 255, 192, ${1 - (distance / maxDistance) * 0.8})`; // Fade based on distance
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();

        requestAnimationFrame(animateCanvas);
    }

    // Initialize and start animation
    resizeCanvas(); // Set initial size and particles
    animateCanvas();
    window.addEventListener('resize', resizeCanvas); // Re-render on resize
}

// --- Text Decryption/Glitch Effect for Hero Title and About Subtitle ---
document.addEventListener('DOMContentLoaded', () => {
    const glitchElements = document.querySelectorAll('.glitch-text, .glitch-text-small');

    glitchElements.forEach(el => {
        const originalText = el.getAttribute('data-text');
        const scrambleDuration = 1000; // milliseconds
        const decryptInterval = 50; // milliseconds per character update
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

        function scrambleText(element, text) {
            let scrambledText = '';
            for (let i = 0; i < text.length; i++) {
                scrambledText += characters[Math.floor(Math.random() * characters.length)];
            }
            element.textContent = scrambledText;
        }

        function decryptText(element, original, duration, interval) {
            let currentText = Array(original.length).fill('');
            let revealProgress = 0;

            const scrambleInterval = setInterval(() => {
                let tempText = '';
                for (let i = 0; i < original.length; i++) {
                    if (i < revealProgress) {
                        tempText += original[i];
                    } else {
                        tempText += characters[Math.floor(Math.random() * characters.length)];
                    }
                }
                element.textContent = tempText;
            }, 30); // Faster scramble update

            const decryptTimer = setInterval(() => {
                revealProgress++;
                if (revealProgress > original.length) {
                    clearInterval(decryptTimer);
                    clearInterval(scrambleInterval);
                    element.textContent = original; // Ensure final text is correct
                }
            }, interval);
        }

        // Trigger decryption on page load
        decryptText(el, originalText, scrambleDuration, decryptInterval);
    });
});