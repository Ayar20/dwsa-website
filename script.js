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
});
