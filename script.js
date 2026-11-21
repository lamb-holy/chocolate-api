const track = document.querySelector("#productsTrack");
const pagination = document.querySelector("#pagination");

let products = [];
let position = 0;


fetch("./file.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts();
        renderPagination();
    });

function renderProducts() {
    track.innerHTML = "";

    products.forEach(product => {
        track.innerHTML += `
            <div class="product">
                <img class="product__image" src="${product.image}" alt="${product.name}">
                <h3 class="product__name">${product.name}</h3>
                <p class="product__type">${product.type}</p>
                <p class="product__price">${product.price} UAH</p>
            </div>
        `;
    });
}

function getVisibleCount() {
    if (window.innerWidth <= 600) return 2;
    if (window.innerWidth <= 900) return 3;

    return 4;
}

function getMaxPosition() {
    return Math.max(0, products.length - getVisibleCount()
    );
}

function renderPagination() {
    pagination.innerHTML = "";

    for (let i = 0; i <= getMaxPosition(); i++) {
        const dot = document.createElement("button");

        dot.classList.add("pagination__dot");

        if (i === position) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            position = i;
            updateSlider();
        });

        pagination.appendChild(dot);
    }
}

function updateSlider() {
    const card = track.querySelector(".product");

    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).gap);
    const step = card.getBoundingClientRect().width + gap;

    track.style.transform = `translateX(-${position * step}px)`;

    renderPagination();
}