// JavaScript for Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Simple smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Efecto parallax suave en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contador animado para métricas
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + '+';
        if (current >= target) {
            clearInterval(timer);
            element.textContent = target + '+';
        }
    }, 20);
}

// Inicializar contadores cuando sean visibles
const counters = document.querySelectorAll('[data-counter]');
counters.forEach(counter => {
    observer.observe(counter);
    counter.addEventListener('animationstart', () => {
        const target = parseInt(counter.dataset.counter);
        animateCounter(counter, target);
    });
});

// Animación de barras de progreso en skills
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease-out';
            bar.style.width = targetWidth;
        }, 300);
    });
}

// Observar la sección de skills para animar las barras
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Efecto de hover mejorado para las skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Función para alternar footer fijo (opcional)
function toggleFixedFooter() {
    const footer = document.querySelector('footer');
    const body = document.body;
    
    if (footer.classList.contains('footer-fixed')) {
        footer.classList.remove('footer-fixed');
        body.classList.remove('has-fixed-footer');
    } else {
        footer.classList.add('footer-fixed');
        body.classList.add('has-fixed-footer');
    }
}

// Detectar si hay poco contenido y fijar el footer automáticamente
function autoFixFooter() {
    const body = document.body;
    const html = document.documentElement;
    const footer = document.querySelector('footer');
    
    const documentHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
    
    const windowHeight = window.innerHeight;
    
    // Si el contenido es menor que la ventana, fijar el footer
    if (documentHeight <= windowHeight) {
        footer.classList.add('footer-fixed');
        body.classList.add('has-fixed-footer');
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', autoFixFooter);
window.addEventListener('resize', autoFixFooter);

// Mejorar la interactividad de las habilidades
document.addEventListener('DOMContentLoaded', function() {
    const skillBlocks = document.querySelectorAll('.skill-block');
    
    // Añadir efectos de teclado para accesibilidad
    skillBlocks.forEach((block, index) => {
        block.setAttribute('tabindex', '0');
        block.setAttribute('role', 'button');
        block.setAttribute('aria-label', `Habilidad: ${block.querySelector('.skill-block__name').textContent}`);
        
        // Navegación con teclado
        block.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                block.focus();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextBlock = skillBlocks[index + 1] || skillBlocks[0];
                nextBlock.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevBlock = skillBlocks[index - 1] || skillBlocks[skillBlocks.length - 1];
                prevBlock.focus();
            }
        });
        
        // Efectos adicionales al hacer hover
        block.addEventListener('mouseenter', () => {
            // Opcional: agregar sonido o vibración
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
    
    // Observer para activar animaciones cuando la sección sea visible
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skills-visible');
                // Animar los blocks con delay
                const blocks = entry.target.querySelectorAll('.skill-block');
                blocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.style.opacity = '1';
                        block.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});

// Animaciones para las tarjetas de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('#projects .glass-card');
    
    // Observador para animar las tarjetas cuando entren en vista
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200); // Delay progresivo
            }
        });
    }, { threshold: 0.2 });
    
    // Configurar estado inicial y observar tarjetas
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        projectsObserver.observe(card);
    });
    
    // Efectos adicionales de hover para las métricas
    projectCards.forEach(card => {
        const metrics = card.querySelectorAll('.grid-cols-3 > div');
        
        card.addEventListener('mouseenter', () => {
            metrics.forEach((metric, index) => {
                setTimeout(() => {
                    metric.style.transform = 'scale(1.05)';
                    metric.style.transition = 'transform 0.2s ease';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            metrics.forEach(metric => {
                metric.style.transform = 'scale(1)';
            });
        });
    });
    
    // Animación de contadores para las métricas
    function animateProjectMetrics() {
        const metrics = document.querySelectorAll('#projects .text-lg');
        
        metrics.forEach(metric => {
            const text = metric.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            
            if (number && number > 0) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        clearInterval(timer);
                        metric.textContent = text;
                    } else {
                        const suffix = text.includes('%') ? '%' : text.includes('K') ? 'K+' : '+';
                        metric.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    }
    
    // Observar la sección de proyectos para animar métricas
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateProjectMetrics, 800);
                    metricsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        metricsObserver.observe(projectsSection);
    }
});

// Reemplaza la función initModernGradientHero() con esta versión mejorada

function initModernGradientHero() {
    const particlesContainer = document.getElementById('particles-container');
    const hero = document.getElementById('hero');
    
    if (!particlesContainer || !hero) {
        console.log('Elementos del hero no encontrados');
        return;
    }
    
    // Ajustar número de partículas según el dispositivo
    const particleCount = window.innerWidth < 768 ? 40 : window.innerWidth < 1024 ? 60 : 80;
    let mouseParticleCount = 0;
    const maxMouseParticles = 30;
    
    // Crear partículas iniciales
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio pequeño
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición inicial
        resetParticle(particle);
        
        particlesContainer.appendChild(particle);
        
        // Agregar efecto twinkle aleatoriamente
        if (Math.random() < 0.3) {
            particle.classList.add('twinkle');
        }
        
        // Animar
        animateParticle(particle);
    }
    
    function resetParticle(particle) {
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';
        
        return { x: posX, y: posY };
    }
    
    function animateParticle(particle) {
        // Posición inicial
        const pos = resetParticle(particle);
        
        // Propiedades de animación aleatorias
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        // Animar
        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            // Mover en una dirección ligera
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30; // Moverse hacia arriba
            
            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;
            
            // Reiniciar después de que la animación termine
            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);
        }, delay * 1000);
    }
    
    // Interacción con el mouse
    let mouseTimeout;
    let isMouseActive = false;
    
    hero.addEventListener('mousemove', (e) => {
        clearTimeout(mouseTimeout);
        isMouseActive = true;
        
        // Actualizar posición del mouse para efectos CSS
        const rect = hero.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width * 100);
        const mouseY = ((e.clientY - rect.top) / rect.height * 100);
        
        hero.style.setProperty('--mouse-x', mouseX + '%');
        hero.style.setProperty('--mouse-y', mouseY + '%');
        
        // Crear partículas en la posición del mouse (limitado)
        if (mouseParticleCount < maxMouseParticles) {
            mouseTimeout = setTimeout(() => {
                createMouseParticle(e);
            }, 100);
        }
        
        // Movimiento sutil de las esferas de gradiente
        const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
        
        const spheres = document.querySelectorAll('.gradient-sphere');
        spheres.forEach((sphere, index) => {
            const multiplier = (index + 1) * 0.2;
            const currentTransform = sphere.style.transform || '';
            sphere.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px) ${currentTransform.includes('scale') ? currentTransform.split('translate')[1] || '' : ''}`;
        });
        
        // Reset mouse activity
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseActive = false;
        }, 500);
    });
    
    function createMouseParticle(e) {
        if (mouseParticleCount >= maxMouseParticles) return;
        
        const rect = hero.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        
        // Crear partícula temporal
        const particle = document.createElement('div');
        particle.className = 'particle mouse-particle';
        
        // Tamaño pequeño
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición en el mouse
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.8';
        
        particlesContainer.appendChild(particle);
        mouseParticleCount++;
        
        // Animar hacia afuera
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 20 - 10)}%`;
            particle.style.top = `${mouseY + (Math.random() * 20 - 10)}%`;
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0.3)';
            
            // Eliminar después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                    mouseParticleCount--;
                }
            }, 2000);
        }, 10);
    }
    
    // Interacción táctil para móviles
    hero.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        
        if (mouseParticleCount < maxMouseParticles / 2) { // Menos partículas en móvil
            createMouseParticle(touch);
        }
    });
    
    // Efecto de clic/tap
    hero.addEventListener('click', (e) => {
        // Crear múltiples partículas en el punto de clic
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                if (mouseParticleCount < maxMouseParticles) {
                    createMouseParticle(e);
                }
            }, i * 100);
        }
    });
    
    // Limpiar partículas excesivas periódicamente
    setInterval(() => {
        const particles = particlesContainer.querySelectorAll('.particle');
        if (particles.length > particleCount * 3) {
            // Eliminar las partículas más viejas
            for (let i = 0; i < particles.length - particleCount * 2; i++) {
                if (particles[i] && particles[i].parentNode && !particles[i].classList.contains('mouse-particle')) {
                    particles[i].remove();
                }
            }
        }
    }, 5000);
    
    // Optimización de rendimiento: pausar animaciones cuando no están visibles
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (!isVisible) {
                // Pausar animaciones complejas cuando no es visible
                particlesContainer.style.display = 'none';
            } else {
                particlesContainer.style.display = 'block';
            }
        });
    });
    
    visibilityObserver.observe(hero);
    
    console.log('Fondo moderno con gradientes y partículas inicializado');
    
    return {
        destroy: () => {
            if (particlesContainer) {
                particlesContainer.innerHTML = '';
            }
            visibilityObserver.disconnect();
            mouseParticleCount = 0;
        }
    };
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando fondo moderno...');
    
    // Esperar un poco para que el CSS se aplique
    setTimeout(() => {
        window.heroBackground = initModernGradientHero();
    }, 500);
});

// Limpiar al salir
window.addEventListener('beforeunload', () => {
    if (window.heroBackground) {
        window.heroBackground.destroy();
    }
});

// Código de debugging - añadir al final del archivo
// TEMPORAL - para verificar que todo funciona
setTimeout(() => {
    console.log('=== DEBUG INFO ===');
    console.log('Hero element:', document.getElementById('hero'));
    console.log('Canvas element:', document.getElementById('hero-canvas'));
    console.log('Canvas context:', document.getElementById('hero-canvas')?.getContext('2d'));
    console.log('Canvas dimensions:', {
        width: document.getElementById('hero-canvas')?.width,
        height: document.getElementById('hero-canvas')?.height
    });
}, 1000);
