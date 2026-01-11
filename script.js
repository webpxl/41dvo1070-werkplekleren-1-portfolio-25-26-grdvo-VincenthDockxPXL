
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');


    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}


function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}



function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-6 col-lg-4';
        projectCard.innerHTML = `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-card-img">
                <div class="project-card-body">
                    <h5 class="project-card-title">${project.title}</h5>
                    <p class="project-card-text">${project.description}</p>
                    <div class="tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="btn btn-primary btn-sm">View Project</a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
}


document.addEventListener('DOMContentLoaded', function() {

    setupMobileMenu();


    updateActiveNavLink();

    renderProjects();

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();


            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;


            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                showAlert('Please fill in all fields', 'danger');
                return;
            }


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }


            showAlert('Message sent successfully! Thank you for reaching out.', 'success');


            contactForm.reset();


            console.log('Contact Form Data:', { name, email, message });
        });
    }


    setupSmoothScroll();


    updateActiveNavLink();
});


function showAlert(message, type) {

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;


    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.insertBefore(alertDiv, contactSection.firstChild);


        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}


function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');


            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();


                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }


                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function setupActiveNavLink() {
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}


function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTopBtn';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #d4af37;
        color: #16213e;
        border: 2px solid #d4af37;
        border-radius: 0;
        width: 50px;
        height: 50px;
        font-size: 18px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.4s ease;
        box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
        font-weight: bold;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(scrollBtn);


    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });


    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.4)';
        scrollBtn.style.background = '#b8956a';
        scrollBtn.style.borderColor = '#b8956a';
    });

    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.25)';
        scrollBtn.style.background = '#d4af37';
        scrollBtn.style.borderColor = '#d4af37';
    });
}


document.addEventListener('DOMContentLoaded', createScrollToTopButton);


function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}


window.addEventListener('load', setupScrollAnimation);


console.log('Portfolio initialized successfully!');

