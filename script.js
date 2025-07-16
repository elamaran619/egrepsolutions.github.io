// --- Existing Mobile Navigation Toggle ---
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

const navSlide = () => {
    nav.classList.toggle('nav-active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    burger.classList.toggle('toggle');
};

if (burger) { // Check if burger exists before adding listener
    burger.addEventListener('click', navSlide);
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            navSlide();
        }
    });
});

// --- Existing Simple Canvas Background Animation ---
const canvas = document.getElementById('networkCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 80;
    const maxDistance = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        initParticles();
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
            this.color = 'rgba(0, 255, 192, 0.7)';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
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
                    ctx.strokeStyle = `rgba(0, 255, 192, ${1 - (distance / maxDistance) * 0.8})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateCanvas);
    }

    resizeCanvas();
    animateCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// --- Existing Text Decryption/Glitch Effect ---
document.addEventListener('DOMContentLoaded', () => {
    const glitchElements = document.querySelectorAll('.glitch-text, .glitch-text-small');

    glitchElements.forEach(el => {
        const originalText = el.getAttribute('data-text');
        const scrambleDuration = 1000;
        const decryptInterval = 50;
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
            }, 30);

            const decryptTimer = setInterval(() => {
                revealProgress++;
                if (revealProgress > original.length) {
                    clearInterval(decryptTimer);
                    clearInterval(scrambleInterval);
                    element.textContent = original;
                }
            }, interval);
        }

        decryptText(el, originalText, scrambleDuration, decryptInterval);
    });
});

// --- New: Achievements Counter Animation ---
const statsGrid = document.querySelector('.stats-grid');
const statItems = document.querySelectorAll('.stat-value');
let animated = false;

const animateCounters = () => {
    if (animated) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statItems.forEach(item => {
                    const target = parseInt(item.getAttribute('data-target'));
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const start = performance.now();

                    const updateCounter = (timestamp) => {
                        const elapsed = timestamp - start;
                        const progress = Math.min(elapsed / duration, 1);
                        current = target * progress;
                        item.textContent = Math.ceil(current).toLocaleString(); // Add comma for thousands

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            item.textContent = target.toLocaleString();
                        }
                    };
                    requestAnimationFrame(updateCounter);
                });
                animated = true; // Set flag to true after animation starts
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    if (statsGrid) {
        observer.observe(statsGrid);
    }
};

// Call the function to set up the observer
// Use DOMContentLoaded to ensure elements are present before observing
document.addEventListener('DOMContentLoaded', animateCounters);


// --- New: Detailed Achievements Table Logic ---
const achievementsData = [
    { date: '2025-06-15', program: 'GlobalTech Solutions', type: 'Broken Access Control', severity: 'Critical', status: 'Resolved', reward: 5000, ref: 'GTS-2025-001' },
    { date: '2025-05-20', program: 'FinSafe Banking', type: 'SQL Injection', severity: 'High', status: 'Resolved', reward: 3500, ref: 'FSB-2025-012' },
    { date: '2025-05-01', program: 'EduConnect Platform', type: 'Cross-Site Scripting (XSS)', severity: 'Medium', status: 'Triaged', reward: 1200, ref: 'ECP-2025-045' },
    { date: '2025-04-22', program: 'HealthFlow App', type: 'Insecure Direct Object Reference (IDOR)', severity: 'High', status: 'Resolved', reward: 2800, ref: 'HFA-2025-003' },
    { date: '2025-03-10', program: 'RetailWave E-commerce', type: 'Information Disclosure', severity: 'Low', status: 'Resolved', reward: 500, ref: 'RWE-2025-089' },
    { date: '2025-02-28', program: 'CloudSecure Services', type: 'Server-Side Request Forgery (SSRF)', severity: 'Critical', status: 'Resolved', reward: 6000, ref: 'CSS-2025-007' },
    { date: '2025-02-05', program: 'GameNexus Studios', type: 'Authentication Bypass', severity: 'High', status: 'Pending', reward: 0, ref: 'GNS-2025-021' },
    { date: '2025-01-18', program: 'DataGuard Systems', type: 'Improper Authorization', severity: 'Medium', status: 'Resolved', reward: 1500, ref: 'DGS-2025-033' },
    { date: '2024-12-01', program: 'Voyage Travel', type: 'Sensitive Data Exposure', severity: 'High', status: 'Resolved', reward: 3000, ref: 'VYT-2024-005' },
    { date: '2024-11-10', program: 'SmartHome IoT', type: 'Broken Authentication', severity: 'Critical', status: 'Resolved', reward: 5500, ref: 'SHI-2024-002' },
    { date: '2024-10-25', program: 'MediCare Portal', type: 'XML External Entity (XXE)', severity: 'Medium', status: 'Triaged', reward: 1000, ref: 'MCP-2024-077' },
    // Add more dummy data here for a longer table
    { date: '2024-09-15', program: 'EduLearn SaaS', type: 'Cross-Site Request Forgery (CSRF)', severity: 'Low', status: 'Resolved', reward: 400, ref: 'ELS-2024-112' },
    { date: '2024-08-05', program: 'FinTrack Budgeting', type: 'SSRF to RCE', severity: 'Critical', status: 'Resolved', reward: 7000, ref: 'FTB-2024-001' },
    { date: '2024-07-20', program: 'CodeBase DevTools', type: 'Path Traversal', severity: 'High', status: 'Resolved', reward: 2000, ref: 'CBD-2024-034' },
    { date: '2024-06-12', program: 'StreamVerse Media', type: 'Unrestricted File Upload', severity: 'Medium', status: 'Pending', reward: 0, ref: 'SVP-2024-060' },
    { date: '2024-05-30', program: 'GameHub Online', type: 'Denial of Service', severity: 'Low', status: 'Resolved', reward: 250, ref: 'GHO-2024-099' },
];

const achievementsTableBody = document.querySelector('#achievementsTable tbody');
const searchInput = document.getElementById('searchAchievements');
const filterSeverity = document.getElementById('filterSeverity');
const sortColumn = document.getElementById('sortColumn');
const noResultsDiv = document.getElementById('noResults');

let currentSortColumn = 'date';
let sortDirection = 'desc'; // Default: newest first

const renderTable = (data) => {
    if (!achievementsTableBody) return; // Exit if table body not found
    achievementsTableBody.innerHTML = ''; // Clear existing rows
    if (data.length === 0) {
        noResultsDiv.style.display = 'block';
        return;
    } else {
        noResultsDiv.style.display = 'none';
    }

    data.forEach(item => {
        const row = achievementsTableBody.insertRow();
        row.insertCell().textContent = item.date;
        row.insertCell().textContent = item.program;
        row.insertCell().textContent = item.type;
        const severityCell = row.insertCell();
        severityCell.textContent = item.severity;
        severityCell.classList.add(`severity-${item.severity.toLowerCase()}`);
        const statusCell = row.insertCell();
        statusCell.textContent = item.status;
        statusCell.classList.add(`status-${item.status.toLowerCase()}`);
        row.insertCell().textContent = item.reward === 0 ? 'N/A' : `$${item.reward.toLocaleString()}`;
        row.insertCell().textContent = item.ref;
    });
};

const filterAndSortTable = () => {
    let filteredData = achievementsData.filter(item => {
        const searchText = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedSeverity = filterSeverity ? filterSeverity.value : '';

        const matchesSearch = item.program.toLowerCase().includes(searchText) ||
                              item.type.toLowerCase().includes(searchText) ||
                              item.ref.toLowerCase().includes(searchText) ||
                              item.severity.toLowerCase().includes(searchText);

        const matchesSeverity = selectedSeverity === '' || item.severity === selectedSeverity;

        return matchesSearch && matchesSeverity;
    });

    // Sort data
    filteredData.sort((a, b) => {
        let valA, valB;
        if (currentSortColumn === 'date') {
            valA = new Date(a.date);
            valB = new Date(b.date);
        } else if (currentSortColumn === 'severity') {
            const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
            valA = severityOrder[a.severity] || 0;
            valB = severityOrder[b.severity] || 0;
        } else if (currentSortColumn === 'program') {
            valA = a.program.toLowerCase();
            valB = b.program.toLowerCase();
        } else {
            return 0; // No sorting for unhandled columns
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    renderTable(filteredData);
};

// Event listeners for filters and sorting - added null checks
if (searchInput) searchInput.addEventListener('keyup', filterAndSortTable);
if (filterSeverity) filterSeverity.addEventListener('change', filterAndSortTable);
if (sortColumn) {
    sortColumn.addEventListener('change', (e) => {
        currentSortColumn = e.target.value;
        // Reset sort direction to default (desc for date, asc for others)
        if (currentSortColumn === 'date') {
            sortDirection = 'desc';
        } else {
            sortDirection = 'asc';
        }
        filterAndSortTable();
    });
}

// Add sorting functionality to table headers
const tableHeaders = document.querySelectorAll('#achievementsTable th');
tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const column = header.dataset.column; // Use data-column attribute directly
        if (!column) return; // Skip if no data-column attribute

        if (currentSortColumn === column) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortColumn = column;
            sortDirection = column === 'date' ? 'desc' : 'asc'; // Default for date is descending
        }

        // Update active sort indicator (optional, but good for UX)
        tableHeaders.forEach(h => {
            h.classList.remove('sort-asc', 'sort-desc');
        });
        header.classList.add(`sort-${sortDirection}`);

        filterAndSortTable();
    });
});


// Initial render of the table on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (achievementsTableBody) {
        filterAndSortTable();
    }
});


// --- New: Testimonial Carousel Logic ---
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let testimonialInterval;

const showSlide = (index) => {
    testimonials.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    if (testimonials[index] && dots[index]) { // Ensure elements exist
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
};

const startCarousel = () => {
    if (testimonials.length > 1) { // Only start if there's more than one slide
        testimonialInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
    }
};

const stopCarousel = () => {
    clearInterval(testimonialInterval);
};

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        stopCarousel(); // Stop auto-play on manual navigation
        const slideIndex = parseInt(e.target.dataset.slide);
        showSlide(slideIndex);
        startCarousel(); // Restart auto-play
    });
});

// Initialize carousel on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (testimonials.length > 0) {
        showSlide(0); // Show first slide immediately
        startCarousel(); // Start auto-play
    }
});