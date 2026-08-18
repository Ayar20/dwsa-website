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

    // ── Dynamic Video Loader ─────────────────────────────────────────────
    async function loadDynamicVideo() {
        const videoSection = document.getElementById('intro-video');
        if (!videoSection) return;

        try {
            const response = await fetch('/api/get-video');
            if (!response.ok) return;

            const result = await response.json();
            if (!result.success || !result.data) return;

            const video = result.data;

            // Handle visibility toggle
            if (video.is_active === false) {
                videoSection.style.display = 'none';
                return;
            } else {
                videoSection.style.display = '';
            }

            // Update title
            const titleEl = videoSection.querySelector('.section-title');
            if (titleEl && video.title) {
                if (video.title.includes('DWSA')) {
                    titleEl.innerHTML = video.title.replace('DWSA', '<span class="highlight-gold">DWSA</span>');
                } else {
                    titleEl.textContent = video.title;
                }
            }

            // Update subtitle / description
            const descEl = videoSection.querySelector('.section-header p');
            if (descEl && video.subtitle) {
                descEl.textContent = video.subtitle;
            }

            // Update video player
            const wrapper = videoSection.querySelector('.video-wrapper');
            if (wrapper && video.video_url) {
                const url = video.video_url.trim();

                // YouTube match
                const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (ytMatch && ytMatch[1]) {
                    wrapper.innerHTML = `
                        <iframe src="https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0" 
                                title="${video.title || 'DWSA Intro Video'}" 
                                style="width: 100%; aspect-ratio: 16/9; display: block; border: none;" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen></iframe>
                    `;
                    return;
                }

                // Vimeo match
                const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
                if (vimeoMatch && vimeoMatch[1]) {
                    wrapper.innerHTML = `
                        <iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" 
                                title="${video.title || 'DWSA Intro Video'}" 
                                style="width: 100%; aspect-ratio: 16/9; display: block; border: none;" 
                                allow="autoplay; fullscreen; picture-in-picture" 
                                allowfullscreen></iframe>
                    `;
                    return;
                }

                // Google Drive preview
                if (url.includes('drive.google.com')) {
                    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
                    if (driveMatch && driveMatch[1]) {
                        wrapper.innerHTML = `
                            <iframe src="https://drive.google.com/file/d/${driveMatch[1]}/preview" 
                                    title="${video.title || 'DWSA Intro Video'}" 
                                    style="width: 100%; aspect-ratio: 16/9; display: block; border: none;" 
                                    allow="autoplay"></iframe>
                        `;
                        return;
                    }
                }

                // Direct video (mp4 / webm / local file)
                const posterAttr = video.poster_url ? `poster="${video.poster_url}"` : '';
                wrapper.innerHTML = `
                    <video controls preload="metadata" ${posterAttr} class="intro-video">
                        <source src="${url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            }
        } catch (err) {
            console.warn('Dynamic video loader error:', err);
        }
    }

    loadDynamicVideo();

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

    // ── App Switcher Interactive Dropdown ─────────────────────────
    const appSwitcher = document.getElementById('AppSwitcher');
    const appSwitcherToggle = document.getElementById('app-switcher-toggle');

    if (appSwitcher && appSwitcherToggle) {
        appSwitcherToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = appSwitcher.classList.contains('active');
            appSwitcher.classList.toggle('active');
            appSwitcherToggle.setAttribute('aria-expanded', !isActive);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!appSwitcher.contains(e.target)) {
                appSwitcher.classList.remove('active');
                appSwitcherToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ── 🤖 Dynamic Campaign Advert Loader ──────────────────────────────────
    async function loadCampaignAdvert() {
        try {
            const res = await fetch('/api/get-advert');
            if (!res.ok) return;
            const result = await res.json();
            if (!result.success || !result.data) return;

            const adv = result.data;
            if (adv.title) {
                const titleEl = document.getElementById('adv-title');
                if (titleEl) titleEl.innerHTML = adv.title.replace('ACADEMY', '<span class="highlight-gold">ACADEMY</span>');
            }
            if (adv.sub_badge) {
                const el = document.getElementById('adv-sub-badge');
                if (el) el.textContent = adv.sub_badge;
            }
            if (adv.tagline) {
                const el = document.getElementById('adv-badge-tag');
                if (el) el.textContent = adv.tagline;
            }
            if (adv.description) {
                const el = document.getElementById('adv-description');
                if (el) el.textContent = adv.description;
            }
            if (adv.early_bird_price) {
                const el = document.getElementById('adv-early-price');
                if (el) el.textContent = adv.early_bird_price;
            }
            if (adv.early_bird_sub) {
                const el = document.getElementById('adv-early-sub');
                if (el) el.textContent = adv.early_bird_sub;
            }
            if (adv.standard_price) {
                const el = document.getElementById('adv-standard-price');
                if (el) el.textContent = adv.standard_price;
            }
            if (adv.split_pay_price) {
                const el = document.getElementById('adv-split-price');
                if (el) el.textContent = adv.split_pay_price;
            }
            if (adv.whatsapp_number) {
                const el = document.getElementById('adv-whatsapp-no');
                if (el) el.textContent = adv.whatsapp_number;
            }
        } catch (err) {
            console.log('Using pre-rendered advert content');
        }
    }
    loadCampaignAdvert();

    // ── Application Modal Handlers & Deep-Linking ─────────────────────────
    const applyModal = document.getElementById('apply-modal');
    const receiptModal = document.getElementById('receipt-modal');
    const closeApplyBtn = document.getElementById('close-apply-modal');
    const closeReceiptBtn = document.getElementById('close-receipt-modal');
    const applyForm = document.getElementById('bootcamp-apply-form');
    const applyStatus = document.getElementById('apply-form-status');

    function openApplyModal() {
        if (applyModal) applyModal.classList.add('active');
    }
    function closeApplyModal() {
        if (applyModal) applyModal.classList.remove('active');
    }

    // Attach click listener to all Apply buttons
    document.querySelectorAll('.open-apply-btn, a[href="#apply"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openApplyModal();
        });
    });

    if (closeApplyBtn) closeApplyBtn.addEventListener('click', closeApplyModal);
    if (closeReceiptBtn) closeReceiptBtn.addEventListener('click', () => receiptModal.classList.remove('active'));

    // Check URL hash for social link share (#apply or #register)
    if (window.location.hash === '#apply' || window.location.hash === '#register') {
        setTimeout(openApplyModal, 300);
    }

    // Handle Application Form Submission
    if (applyForm) {
        applyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-apply-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting Registration...';
            if (applyStatus) applyStatus.style.display = 'none';

            const name = document.getElementById('apply-name').value;
            const email = document.getElementById('apply-email').value;
            const phone = document.getElementById('apply-phone').value;
            const learning_mode = document.getElementById('apply-mode').value;
            const payment_option = document.getElementById('apply-tier').value;

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        learning_mode,
                        payment_option,
                        program: 'AI Coding Academy'
                    })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    closeApplyModal();

                    // Update receipt modal
                    document.getElementById('receipt-user-name').textContent = name;
                    document.getElementById('receipt-plan-amount').textContent = payment_option;

                    // Setup WhatsApp confirmation link
                    const waText = encodeURIComponent(
                        `Hello DWSA Team, I just registered for the AI Coding Academy!\n` +
                        `Name: ${name}\n` +
                        `Tier: ${payment_option}\n` +
                        `Mode: ${learning_mode}\n` +
                        `Attached is my payment proof.`
                    );
                    const waBtn = document.getElementById('wa-confirm-btn');
                    if (waBtn) waBtn.href = `https://wa.me/2347082135071?text=${waText}`;

                    // Show Receipt Modal
                    if (receiptModal) receiptModal.classList.add('active');
                    applyForm.reset();
                } else {
                    if (applyStatus) {
                        applyStatus.textContent = result.message || 'Error registering. Please try again.';
                        applyStatus.style.color = '#ff4d4d';
                        applyStatus.style.display = 'block';
                    }
                }
            } catch (err) {
                console.error('Registration Submission Error:', err);
                if (applyStatus) {
                    applyStatus.textContent = 'Connection error. Please check your network.';
                    applyStatus.style.color = '#ff4d4d';
                    applyStatus.style.display = 'block';
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

// Copy Account Number Helper Function
window.copyAcc = function(num, btn) {
    navigator.clipboard.writeText(num).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.style.background = '#4ade80';
        btn.style.color = '#0a1a2f';
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
};


