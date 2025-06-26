// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form submission
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.phone || !data.address || !data['postal-code']) {
            alert('必須項目を入力してください。');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('正しいメールアドレスを入力してください。');
            return;
        }
        
        // Phone validation (Japanese format)
        const phoneRegex = /^[\d-+()]+$/;
        if (!phoneRegex.test(data.phone)) {
            alert('正しい電話番号を入力してください。');
            return;
        }
        
        // Postal code validation
        const postalRegex = /^\d{3}-?\d{4}$/;
        if (!postalRegex.test(data['postal-code'])) {
            alert('正しい郵便番号を入力してください。（例：123-4567）');
            return;
        }
        
        // Store customer data temporarily
        sessionStorage.setItem('customerData', JSON.stringify(data));
        
        // Redirect to Stripe payment link
        // Replace with your actual Stripe payment link
        const stripePaymentLink = 'https://buy.stripe.com/your-payment-link';
        
        // For demo purposes, show alert
        alert('フォーム情報を保存しました。\nStripeの決済ページに移動します。\n\n※実際の運用時はStripeの決済リンクを設定してください。');
        
        // In production, uncomment this line:
        // window.location.href = stripePaymentLink;
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-item, .farmer-card, .recipe-card, .crisis-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});

// Mobile menu toggle (for future implementation)
function createMobileMenu() {
    const nav = document.querySelector('nav .container');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';
    
    // Show button on mobile
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
        }
    });
    
    nav.appendChild(menuButton);
}

// Initialize mobile menu on load
document.addEventListener('DOMContentLoaded', createMobileMenu);