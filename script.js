// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a nav link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(element => {
        observer.observe(element);
    });

    // Form Validation (Contact Page)
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[name="email"]').value;
            const name = form.querySelector('input[name="name"]').value;
            const subject = form.querySelector('input[name="subject"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                highlightErrors();
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                form.querySelector('input[name="email"]').style.borderColor = '#FF6B6B';
                return;
            }

            alert('Form submitted successfully!'); // Replace with actual submission logic (e.g., AJAX to backend)
            form.reset();
            clearErrors();
        });

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#FF6B6B'; // Error color (optional, adjust palette)
                } else {
                    input.style.borderColor = '#006D77'; // Default color
                }
            });
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function highlightErrors() {
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#FF6B6B';
            }
        });
    }

    function clearErrors() {
        form.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = '#006D77';
        });
    }

    // Lightbox for Images (Fine Arts and Tech Solutions)
    const lightboxImages = document.querySelectorAll('.lightbox');
    if (lightboxImages.length > 0) {
        lightboxImages.forEach(image => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                const src = image.getAttribute('src');
                const alt = image.getAttribute('alt');
                showLightbox(src, alt);
            });
        });

        const closeLightbox = document.querySelector('.close-lightbox');
        if (closeLightbox) {
            closeLightbox.addEventListener('click', hideLightbox);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.querySelector('.lightbox-modal')) {
                hideLightbox();
            }
        });

        // Click outside to close lightbox
        document.addEventListener('click', (e) => {
            const lightbox = document.querySelector('.lightbox-modal');
            if (lightbox && !lightbox.querySelector('.lightbox-content').contains(e.target)) {
                hideLightbox();
            }
        });
    }

    function showLightbox(src, alt) {
        let lightbox = document.querySelector('.lightbox-modal');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox-modal';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${src}" alt="${alt}">
                    <span class="close-lightbox">×</span>
                </div>
            `;
            document.body.appendChild(lightbox);
        } else {
            lightbox.querySelector('img').src = src;
            lightbox.querySelector('img').alt = alt;
        }
        lightbox.style.display = 'flex';
    }

    function hideLightbox() {
        const lightbox = document.querySelector('.lightbox-modal');
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    }

    // Dynamic Map (Contact Page) - Requires Google Maps API Key
    const mapElement = document.getElementById('map');
    if (mapElement) {
        function initMap() {
            const artLocation = { lat: 37.7749, lng: -122.4194 }; // Example for Art (San Francisco)
            const techLocation = { lat: 37.7749, lng: -122.4194 }; // Example for Tech (same for now)

            const map = new google.maps.Map(mapElement, {
                zoom: 12,
                center: artLocation,
            });

            new google.maps.Marker({
                position: artLocation,
                map: map,
                title: 'Art Location'
            });

            new google.maps.Marker({
                position: techLocation,
                map: map,
                title: 'Tech Location'
            });
        }

        // Load Google Maps API (replace 'YOUR_API_KEY' with your actual Google Maps API key)
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
});