document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.observe-me');
    elementsToObserve.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 26, 47, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(10, 26, 47, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 5%';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just a generic hash
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ── Dynamic Bookshelf Loader ──────────────────────────────────────────
    async function loadDynamicBookshelf() {
        const grid = document.querySelector('.bookshelf-grid');
        if (!grid) return;

        // Cache the fallback static HTML in case of API failure
        const fallbackHtml = grid.innerHTML;

        // Show a premium glassmorphic loading/skeleton state
        grid.innerHTML = `
            <div class="book-card observe-me visible" style="height: 400px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.01); border: 1px dashed rgba(255,255,255,0.05); grid-column: 1 / -1; border-radius: 12px;">
                <div style="text-align: center; color: var(--color-text-muted);">
                    <div class="spinner" style="width: 32px; height: 32px; border: 3px solid rgba(212, 160, 23, 0.1); border-radius: 50%; border-top-color: var(--color-gold); animation: spin 1s linear infinite; margin: 0 auto 12px;"></div>
                    <span style="font-family: var(--font-accent); font-size: 0.9rem; letter-spacing: 1px;">LOADING DIGITAL BOOKSHELF...</span>
                </div>
            </div>
        `;

        // Inject spin animation styles dynamically if not already present
        if (!document.getElementById('skeleton-spin-styles')) {
            const style = document.createElement('style');
            style.id = 'skeleton-spin-styles';
            style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }

        try {
            const response = await fetch('/api/get-books');
            if (!response.ok) {
                grid.innerHTML = fallbackHtml;
                return;
            }

            const result = await response.json();
            if (!result.success || !result.data || result.data.length === 0) {
                grid.innerHTML = fallbackHtml;
                return;
            }

            const books = result.data;
            let html = '';

            books.forEach((book, index) => {
                const delayClass = index === 1 ? ' delay-1' : index === 2 ? ' delay-2' : '';
                const priceDisplay = book.price && book.price.toLowerCase() !== 'free'
                    ? `<span style="text-decoration:line-through;font-size:0.8em;color:#a0aec0;margin-right:8px;">${book.price}</span>Free`
                    : 'Free';

                // Helper to resolve Google Drive covers to actual thumbnails (works for images and PDF first pages)
                let coverUrl = book.cover_image_url;
                if (coverUrl && coverUrl.includes('drive.google.com')) {
                    const match = coverUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || coverUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) {
                        coverUrl = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
                    }
                }

                html += `
                    <div class="book-card observe-me${delayClass}">
                        <div class="book-cover">
                            <img src="${coverUrl}" alt="${book.title}" onerror="this.style.display='none'; this.parentElement.style.background='rgba(201,168,76,0.1)'">
                        </div>
                        <div class="book-info">
                            <h3>${book.title}</h3>
                            <p>${book.description || 'Premium digital material available for download.'}</p>
                            <div class="book-price">${priceDisplay}</div>
                            <a href="/api/download?url=${encodeURIComponent(book.download_url)}&filename=${encodeURIComponent(book.title.replace(/\s+/g, '_') + '.pdf')}" download class="btn-primary btn-sm glow-effect" style="display:inline-block;text-align:center;">Download Free</a>
                        </div>
                    </div>
                `;
            });

            grid.innerHTML = html;

            // Re-observe newly injected elements for scroll animations
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
            const newObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, observerOptions);
            grid.querySelectorAll('.observe-me').forEach(el => newObserver.observe(el));

        } catch (err) {
            console.warn('Dynamic bookshelf unavailable, showing static content.', err);
            grid.innerHTML = fallbackHtml;
        }
    }

    loadDynamicBookshelf();

    // Handle Registration Form Submission
    const campaignForm = document.getElementById('campaign-form');
    if (campaignForm) {
        campaignForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = campaignForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                program: document.getElementById('program').value
            };

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Registration Successful! Welcome to the DWSA Campaign.');
                    campaignForm.reset();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ── Mobile Menu Toggle ────────────────────────────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ── P.R.I.D.E. Accordion Logic ─────────────────────────────────────────
    const prideItems = document.querySelectorAll('.pride-item');
    
    prideItems.forEach(item => {
        const header = item.querySelector('.pride-header');
        const body = item.querySelector('.pride-body');
        
        if (header && body) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other items first (accordion behavior)
                prideItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherHeader = otherItem.querySelector('.pride-header');
                        const otherBody = otherItem.querySelector('.pride-body');
                        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                        if (otherBody) otherBody.style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    header.setAttribute('aria-expanded', 'false');
                    body.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        }
    });

    // Open the first item (P) by default
    const firstPrideItem = document.querySelector('.pride-item');
    if (firstPrideItem) {
        const header = firstPrideItem.querySelector('.pride-header');
        const body = firstPrideItem.querySelector('.pride-body');
        if (header && body) {
            firstPrideItem.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + "px";
        }
    }
});
