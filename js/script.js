
let totaalBedrag = 0;
let winkelmand = {};
let products;


function addToCart(product, hoeveelheid) {
    const producthoeveelheid = parseInt(hoeveelheid.value);

    if (winkelmand.hasOwnProperty(product.id)) {
        winkelmand[product.id] += producthoeveelheid;
    } else {
        winkelmand[product.id] = producthoeveelheid;
    }

    updateWinkelmandLocalStorage();
    calculateTotaalBedrag();
    populateShoppingCart();
    updateCartIcon();
}

function updateTotaalBedrag() {
    const totaalBedragInHTML = document.getElementById('totaalBedrag');
    totaalBedragInHTML.innerText = totaalBedrag.toFixed(2);
}

function updateWinkelmandLocalStorage() {
    localStorage.setItem('winkelmand', JSON.stringify(winkelmand));
}

function createShoppingCartItem(product, hoeveelheid) {
    const divShoppingCart = document.querySelector('.cart-items');
    const productShoppincart = document.createElement('div');
    const infoProductShoppingcart = document.createElement('p');
    const imgProductShoppingcart = document.createElement('img');
    const verwijderProductShoppingCart = document.createElement('button');
    const productInfo = `naam: ${product.name}, Prijs: €${product.price.toFixed(2)}, Aantal: `;

    productShoppincart.setAttribute('data-product-id', product.id);
    const HoeveelheidElelement = document.createElement('p');
    HoeveelheidElelement.textContent = hoeveelheid;
    HoeveelheidElelement.id = 'quantity';



    productShoppincart.id = 'productShoppincart';
    verwijderProductShoppingCart.innerText = 'verwijder';
    infoProductShoppingcart.id = 'infoProductShoppingCart';
    imgProductShoppingcart.id = 'imgProductShoppingcart';
    infoProductShoppingcart.textContent = productInfo;
    productShoppincart.id = product.id;
    imgProductShoppingcart.src = product.img;

    divShoppingCart.appendChild(productShoppincart);
    productShoppincart.appendChild(verwijderProductShoppingCart);
    productShoppincart.appendChild(HoeveelheidElelement);
    productShoppincart.appendChild(infoProductShoppingcart);
    productShoppincart.appendChild(imgProductShoppingcart);

    verwijderProductShoppingCart.onclick = function () {
        delete winkelmand[product.id];
        updateWinkelmandLocalStorage();
        calculateTotaalBedrag();
        productShoppincart.remove();
        updateCartIcon();
    };
}

if (localStorage.getItem('products')) {
    loadProductsFromLocalStorage();
} else {
    fetch('js/producten.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('products', JSON.stringify(data));
            loadProductsFromLocalStorage();
        })
        .catch(error => {
            console.log('Er is een fout opgetreden:', error);
        });
}

function loadProductsFromLocalStorage() {
    products = JSON.parse(localStorage.getItem('products') || '[]');
    products.forEach(product => {
        const divProduct = document.createElement('div');
        divProduct.classList.add('product');
        const imgProduct = document.createElement('img');
        const ProductNaam = document.createElement('p');
        const prijsProduct = document.createElement('p');
        const Hoeveelheid = document.createElement('input');
        const toevoegenAanWinkelmand = document.createElement('button');

        imgProduct.src = product.img;
        ProductNaam.textContent = "Naam: " + product.name;
        prijsProduct.textContent = "Prijs: €" + product.price.toFixed(2);
        Hoeveelheid.type = 'number';
        Hoeveelheid.value = 1;
        toevoegenAanWinkelmand.innerText = 'voeg toe aan winkelmand';
        divProduct.id = product.id;

        const divProducten = document.getElementById('producten');
        divProducten.appendChild(divProduct);

        divProduct.appendChild(imgProduct);
        divProduct.appendChild(ProductNaam);
        divProduct.appendChild(prijsProduct);
        divProduct.appendChild(Hoeveelheid);
        divProduct.appendChild(toevoegenAanWinkelmand);

        toevoegenAanWinkelmand.addEventListener('click', function () {
            addToCart(product, Hoeveelheid);

            const totalProductsInCart = getTotalProductsInCart();
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.setAttribute('data-count', totalProductsInCart);
        });
    });

    loadShoppingCartFromLocalStorage();
    populateShoppingCart();
}

function loadShoppingCartFromLocalStorage() {
    const storedWinkelmand = localStorage.getItem('winkelmand');
    if (storedWinkelmand) {
        winkelmand = JSON.parse(storedWinkelmand);
        calculateTotaalBedrag();
        populateShoppingCart();
        updateCartIcon();
    }
}



document.querySelector('.cart-icon').addEventListener('click', function () {
    document.querySelector('.cart-dropdown').classList.toggle('show');
});

document.addEventListener('click', function (event) {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (!cartDropdown.contains(event.target) && cartDropdown.classList.contains('show')) {
        cartDropdown.classList.remove('show');
    }
});


function calculateTotaalBedrag() {
    totaalBedrag = 0;
    for (const productId in winkelmand) {
        if (winkelmand.hasOwnProperty(productId)) {
            const productQuantity = winkelmand[productId];
            const product = products.find(p => p.id === productId);
            if (product) {
                totaalBedrag += product.price * productQuantity;
            }
        }
    }
    updateTotaalBedrag();
}

function populateShoppingCart() {
    const cartItemsContainer = document.querySelector('.cart-items');

    for (const productId in winkelmand) {
        if (winkelmand.hasOwnProperty(productId)) {
            const producthoeveelheid = winkelmand[productId];
            const product = products.find(p => p.id === productId);

            if (product) {
                const existingCartItem = cartItemsContainer.querySelector(`[data-product-id="${productId}"]`);

                if (existingCartItem) {
                    let quantityElement = existingCartItem.querySelector('#quantity');
                    if (!quantityElement) {
                        quantityElement = document.createElement('p');
                        quantityElement.id = 'quantity';
                        existingCartItem.appendChild(quantityElement);
                    }
                    quantityElement.textContent = ` ${producthoeveelheid}`;
                } else {
                    createShoppingCartItem(product, producthoeveelheid);
                }
            }
        }
    }
}

function getTotalProductsInCart() {
    let totalProducts = 0;
    for (const productId in winkelmand) {
        if (winkelmand.hasOwnProperty(productId)) {
            totalProducts += winkelmand[productId];
        }
    }
    return totalProducts;
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    const totalProductsInCart = getTotalProductsInCart();

    const cartCountElement = cartIcon.querySelector('.cart-count');
    cartCountElement.textContent = totalProductsInCart;
    cartCountElement.style.display = totalProductsInCart === 0 ? 'none' : 'block';
}

let AdminId = parseInt(localStorage.getItem('AdminId')) || 0;

document.getElementById('afrekenen').addEventListener('click', function () {
    const datumEnTijd = getCurrentDateAndTime();
    const winkelmandLocalStorage = JSON.parse(localStorage.getItem('winkelmand'));

    if (winkelmandLocalStorage) {
        AdminId++;
        localStorage.setItem('AdminId', AdminId);

        const bestelId = `${AdminId}`;


        const bestelling = {
            bestelId: bestelId,
            datumEnTijd: datumEnTijd,
            totaalBedrag: totaalBedrag,
            winkelmandLocalStorage: winkelmand,
        };
        updateBestellingenLocalStorage(bestelling);
        populateShoppingCart();
        updateCartIcon();

        localStorage.removeItem('winkelmand');
    } else {
        console.log('winkelmand is leeg');
    }
});

function getCurrentDateAndTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function updateBestellingenLocalStorage(bestelling) {
    let bestellingen = JSON.parse(localStorage.getItem('bestellingen')) || [];

    bestellingen.push(bestelling);

    localStorage.setItem('bestellingen', JSON.stringify(bestellingen));
}

document.getElementById("afrekenen").addEventListener("click", function () {
    window.location.href = "besteling.html";
});