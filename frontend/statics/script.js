document.addEventListener('DOMContentLoaded', function() {
    // Añadir botón de menú móvil
    const header = document.querySelector('header');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.id = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    header.appendChild(mobileMenuButton);

    // Elementos a controlar
    const nav = document.querySelector('nav');
    const authButtons = document.getElementById('auth-buttons');

    // Función para toggle del menú móvil
    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('mobile-menu-visible');
        authButtons.classList.toggle('mobile-menu-visible');
        
        // Cambiar ícono según estado
        if (nav.classList.contains('mobile-menu-visible')) {
            mobileMenuButton.innerHTML = '✕';
        } else {
            mobileMenuButton.innerHTML = '☰';
        }
    });

    // Función para crear carrusel en móvil
    function setupMobileCarousel() {
        if (window.innerWidth <= 700 && !document.querySelector('.carousel-container')) {
            // Crear estructura del carrusel
            const rightColumn = document.getElementById('right-column-content');
            const imgContainers = Array.from(rightColumn.children);
            
            // Eliminar contenedores actuales
            while (rightColumn.firstChild) {
                rightColumn.removeChild(rightColumn.firstChild);
            }
            
            // Crear nuevo contenedor de carrusel
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'carousel-container';
            
            const carouselTrack = document.createElement('div');
            carouselTrack.className = 'carousel-track';
            
            // Imágenes originales
            const img1 = document.getElementById('img');
            const img2 = document.getElementById('img2');
            const img3 = document.getElementById('img3');
            
            // Crear slides
            const images = [img3, img1, img2];
            
            images.forEach((img, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-image';
                const clonedImg = img.cloneNode(true);
                clonedImg.style.position = 'static';
                clonedImg.style.width = index === 0 ? '80%' : '45%';
                slide.appendChild(clonedImg);
                carouselTrack.appendChild(slide);
            });
            
            carouselContainer.appendChild(carouselTrack);
            
            // Añadir indicadores
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            
            for (let i = 0; i < images.length; i++) {
                const dot = document.createElement('span');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    moveToSlide(parseInt(this.dataset.index));
                });
                dotsContainer.appendChild(dot);
            }
            
            rightColumn.appendChild(carouselContainer);
            rightColumn.appendChild(dotsContainer);
            
            // Funcionalidad de deslizamiento
            let currentIndex = 0;
            
            function moveToSlide(index) {
                carouselTrack.style.transform = `translateX(-${index * 100}%)`;
                currentIndex = index;
                
                // Actualizar dots
                document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            
            // Detectar gestos de deslizamiento
            let startX, moveX;
            
            carouselContainer.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            
            carouselContainer.addEventListener('touchmove', function(e) {
                moveX = e.touches[0].clientX;
            });
            
            carouselContainer.addEventListener('touchend', function() {
                const diff = startX - moveX;
                
                if (diff > 50 && currentIndex < images.length - 1) {
                    moveToSlide(currentIndex + 1);
                } else if (diff < -50 && currentIndex > 0) {
                    moveToSlide(currentIndex - 1);
                }
            });
        } else if (window.innerWidth > 700 && document.querySelector('.carousel-container')) {
            // Restaurar vista normal si estamos saliendo de vista móvil
            location.reload();
        }
    }

    // Inicializar carrusel y verificar en redimensión
    setupMobileCarousel();
    window.addEventListener('resize', setupMobileCarousel);
    
    // Animación para elementos al cargar
    function animateOnScroll() {
        const elements = [
            document.querySelector('#left-column h1'),
            document.querySelector('#left-column p'),
            document.querySelector('#div-buttons')
        ];
        
        elements.forEach((el, index) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 300 * (index + 1));
            }
        });
    }
    
    // Aplicar animaciones iniciales a los elementos
    document.querySelector('#left-column h1').style.opacity = '0';
    document.querySelector('#left-column h1').style.transform = 'translateY(20px)';
    document.querySelector('#left-column h1').style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    document.querySelector('#left-column p').style.opacity = '0';
    document.querySelector('#left-column p').style.transform = 'translateY(20px)';
    document.querySelector('#left-column p').style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    document.querySelector('#div-buttons').style.opacity = '0';
    document.querySelector('#div-buttons').style.transform = 'translateY(20px)';
    document.querySelector('#div-buttons').style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Iniciar animaciones después de cargar
    setTimeout(animateOnScroll, 300);
});