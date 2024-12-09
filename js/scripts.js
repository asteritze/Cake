document.addEventListener('DOMContentLoaded', function() {
    // Завантаження тортів з API
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            // Беремо перші 8 постів і перетворюємо їх на торти
            const cakes = data.slice(0, 8).map(post => ({
                id: post.id,
                name: `Торт "${post.title.split(' ')[0]}"`,
                price: 300 + Math.floor(Math.random() * 400),
                image: `img/cake${(post.id % 4) + 1}.png`
            }));
            
            // Відображаємо торти
            displayCakes(cakes);
            
            // Ініціалізуємо слайдер після завантаження тортів
            initializeSlider();
        })
        .catch(error => {
            console.error('Помилка завантаження даних:', error);
            document.querySelector('#cakes-gallery').innerHTML = 
                '<div class="error">Помилка завантаження тортів. Спробуйте пізніше.</div>';
        });
});

function displayCakes(cakes) {
    const gallery = document.querySelector('#cakes-gallery');
    gallery.innerHTML = cakes.map(cake => `
        <div class="cake-card">
            <img src="${cake.image}" alt="${cake.name}">
            <div class="cake-info">
                <h3>${cake.name}</h3>
                <span class="price">${cake.price} грн</span>
            </div>
        </div>
    `).join('');
}

function initializeSlider() {
    const gallery = document.querySelector('.gallery');
    const prevButton = document.querySelector('.gallery-button.prev');
    const nextButton = document.querySelector('.gallery-button.next');
    
    // Клонуємо існуючі картки для створення нескінченного слайдера
    const cards = gallery.querySelectorAll('.cake-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        gallery.appendChild(clone);
    });

    let scrollPosition = 0;
    const cardWidth = 310; // Ширина картки + відступ

    nextButton.addEventListener('click', () => {
        scrollPosition += cardWidth;
        if (scrollPosition >= gallery.scrollWidth / 2) {
            scrollPosition = 0;
        }
        gallery.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', () => {
        scrollPosition -= cardWidth;
        if (scrollPosition < 0) {
            scrollPosition = gallery.scrollWidth / 2 - cardWidth;
        }
        gallery.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });

    // Автоматична прокрутка
    setInterval(() => {
        scrollPosition += cardWidth;
        if (scrollPosition >= gallery.scrollWidth / 2) {
            scrollPosition = 0;
        }
        gallery.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }, 5000);
}
