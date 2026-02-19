// Portafolio JavaScript - Animaciones e Interacciones
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Cursor personalizado
    function initCursor() {
        if (!cursor || !cursorDot) return;
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateCursor() {
            // Suavizar movimiento del cursor principal
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            // Movimiento inmediato del punto
            dotX = mouseX;
            dotY = mouseY;
            
            cursor.style.left = cursorX - 20 + 'px';
            cursor.style.top = cursorY - 20 + 'px';
            
            cursorDot.style.left = dotX - 2 + 'px';
            cursorDot.style.top = dotY - 2 + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        updateCursor();
        
        // Efectos hover para elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category, .tech-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--secondary-color)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
            });
        });
    }
    
    // Partículas de fondo
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Navegación moderna mejorada
    function initNavigation() {
        const scrollProgressBar = document.querySelector('.scroll-progress-bar');
        const themeToggle = document.getElementById('theme-toggle');
        
        // Barra de progreso de scroll
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (scrollProgressBar) {
                scrollProgressBar.style.width = scrollPercent + '%';
            }
        }
        
        // Scroll efecto en navbar
        window.addEventListener('scroll', () => {
            updateScrollProgress();
            
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Navegación suave mejorada
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 90;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Actualizar link activo con animación
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    const indicator = l.querySelector('.nav-indicator');
                    if (indicator) {
                        indicator.style.transform = 'translateX(-50%) scaleX(0)';
                    }
                });
                
                link.classList.add('active');
                const activeIndicator = link.querySelector('.nav-indicator');
                if (activeIndicator) {
                    setTimeout(() => {
                        activeIndicator.style.transform = 'translateX(-50%) scaleX(1)';
                    }, 100);
                }
                
                // Cerrar menú móvil con animación
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
        
        // Menú hamburguesa mejorado
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevenir scroll del body cuando el menú está abierto
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Toggle de tema
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark-theme');
                const icon = themeToggle.querySelector('i');
                
                if (document.documentElement.classList.contains('dark-theme')) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
                
                // Guardar preferencia
                localStorage.setItem('theme', 
                    document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light'
                );
            });
            
            // Cargar tema guardado
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark-theme');
                themeToggle.querySelector('i').className = 'fas fa-sun';
            }
        }
        
        // Animación del logo
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Activar link según sección visible con mejor detección
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const indicator = link.querySelector('.nav-indicator');
                        if (indicator) {
                            indicator.style.transform = 'translateX(-50%) scaleX(0)';
                        }
                        
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                            if (indicator) {
                                indicator.style.transform = 'translateX(-50%) scaleX(1)';
                            }
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Efecto hover en los iconos del navbar
        navLinks.forEach(link => {
            const icon = link.querySelector('i');
            if (icon) {
                link.addEventListener('mouseenter', () => {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                });
                
                link.addEventListener('mouseleave', () => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                });
            }
        });
    }
    
    // Animaciones de entrada
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Elementos a animar
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Agregar clases de animación a elementos
        document.querySelectorAll('.about-text, .about-skills').forEach((el, index) => {
            el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        
        document.querySelectorAll('.skill-category, .project-card').forEach(el => {
            el.classList.add('fade-in');
        });
    }
    
    // Contador animado para estadísticas
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 50;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 50);
                    
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Barras de progreso de habilidades
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                    
                    skillObserver.unobserve(bar);
                }
            });
        });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    // Filtros de proyectos
    function initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Actualizar botón activo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filtrar proyectos
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // Formulario de contacto
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Aquí puedes agregar la lógica para enviar el formulario
                // const formData = new FormData(contactForm);
                
                // Simulación de envío exitoso
                alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
                contactForm.reset();
            });
        }
    }
    
    // Efecto typewriter mejorado
    function initTypewriter() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        // Usar solo CSS para la animación más consistente
        const texts = ['Hola, soy ', 'Hello, I am ', '¡Hola, soy '];
        let textIndex = 0;
        
        // Establecer el texto inicial
        typingElement.textContent = texts[0];
        
        // Cambiar texto cada ciclo de animación
        function changeText() {
            textIndex = (textIndex + 1) % texts.length;
            typingElement.textContent = texts[textIndex];
        }
        
        // Cambiar texto cada 4 segundos (duración de la animación CSS)
        setInterval(changeText, 4000);
    }
    
    // Scroll suave para indicador
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.querySelector('#sobre-mi');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // Efecto parallax sutil
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.profile-bg');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `rotate(${scrolled * speed * 0.01}deg)`;
            });
        });
    }
    
    // Inicializar todas las funciones
    function init() {
        initResponsiveRuntime();
        createParticles();
        initCursor();
        initNavigation();
        initScrollAnimations();
        initCounters();
        initSkillBars();
        initProjectFilters();
        initContactForm();
        initTypewriter();
        initScrollIndicator();
        initParallax();
        
        // Ocultar loader si existe
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        }
        
        // Agregar clase loaded al body
        document.body.classList.add('loaded');
    }
    
    // Ejecutar inicialización
    init();
});

// Función para cambiar tema (si decides agregar toggle)
function toggleTheme() {
    document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', document.documentElement.classList.contains('light-theme') ? 'light' : 'dark');
}

// Manejar errores de imágenes
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x400/333/fff?text=Imagen+No+Disponible';
    }
}, true);

// Optimización de rendimiento
const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
};

// Aplicar throttle a eventos de scroll para optimización
window.addEventListener('scroll', throttle(() => {
    // Lógica de scroll optimizada se maneja en las funciones individuales
}, 16));

// Runtime responsive para elementos dinámicos
function initResponsiveRuntime() {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // Cursor dinámico: desactivar en touch
    if (isTouch) {
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

    // Partículas dinámicas según ancho
    const particlesContainer = document.getElementById('particles');
    const renderParticles = () => {
        if (!particlesContainer) return;
        particlesContainer.innerHTML = '';
        const w = window.innerWidth;
        const count = w <= 480 ? 12 : w <= 768 ? 20 : w <= 1024 ? 30 : 50;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 10 + 's';
            p.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(p);
        }
    };

    renderParticles();

    // Cerrar menú móvil al volver a desktop
    const syncMenuByWidth = () => {
        if (window.innerWidth > 1023 && navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderParticles();
            syncMenuByWidth();
        }, 150);
    });
}
