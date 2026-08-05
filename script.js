// Copy Email to Clipboard
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailText = document.getElementById('emailText');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('getahunbetsebay63@gmail.com');
            
            // Visual feedback
            const originalText = emailText.innerText;
            emailText.innerText = 'Copied to clipboard!';
            copyEmailBtn.classList.add('bg-accent', 'text-primary');
            copyEmailBtn.classList.remove('bg-primary', 'text-white');
            
            setTimeout(() => {
                emailText.innerText = originalText;
                copyEmailBtn.classList.remove('bg-accent', 'text-primary');
                copyEmailBtn.classList.add('bg-primary', 'text-white');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
}

// Timeline Scroll Animation
const timelineContainer = document.getElementById('timeline-container');
const timelineGlow = document.getElementById('timeline-glow');

if (timelineContainer && timelineGlow) {
    window.addEventListener('scroll', () => {
        const containerRect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Track the vertical center of the viewport relative to the top of the timeline container
        let scrollPosition = (windowHeight / 2) - containerRect.top;
        
        // Calculate the height percentage based on scroll depth
        let heightPercentage = (scrollPosition / containerRect.height) * 100;
        
        // Clamp the height between 0% and 100%
        heightPercentage = Math.max(0, Math.min(heightPercentage, 100));
        
        // Apply the transformation to the height
        timelineGlow.style.height = `${heightPercentage}%`;
    });
}

// ── Stat Counter Animation ──────────────────────────────────────────────────
const statsSection = document.getElementById('stats-section');

if (statsSection) {
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1800; // ms
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target; // ensure exact final value
        };

        requestAnimationFrame(tick);
    };

    // Only trigger once when the stats section first enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(animateCounter);
                observer.disconnect(); // run only once
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

