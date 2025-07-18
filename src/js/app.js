document.addEventListener('DOMContentLoaded', function(){
    escrituraDinamica();
    scrollNav();
    initScrollToTopButton();
    AOS.init({
        duration: 1000,
        once: true
    });
});

function escrituraDinamica(){
    const typed = new Typed('#typed', {
        strings: ['Frontend Developer', 'Diseñador Web', 'JavaScript Developer', 'Backend Developer', 'Full Stack Developer'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
};


function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion a');
    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        });
    });
};

function initScrollToTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const progressPath = document.getElementById('progressPath');
    const pathLength = progressPath.getTotalLength();

    // Establece los valores iniciales del trazo
    progressPath.style.strokeDasharray = pathLength;
    progressPath.style.strokeDashoffset = pathLength;

    // Evento de scroll para actualizar el progreso
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;

        if (scroll > 100) {
            scrollTopBtn.classList.remove('hide');
        } else {
            scrollTopBtn.classList.add('hide');
        }
    });

    // Evento para subir al inicio
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
