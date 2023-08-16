function updateBestellingenLocalStorage(bestelling) {
    let bestellingen = JSON.parse(localStorage.getItem('bestellingen')) || [];

    bestellingen.push(bestelling);

    localStorage.setItem('bestellingen', JSON.stringify(bestellingen));
}

const bestellingen = JSON.parse(localStorage.getItem('bestellingen'));


const bestellingenTable = document.getElementById('bestellingenTable');

if (bestellingen && bestellingen.length > 0) {
    bestellingen.forEach((bestelling) => {
        const { bestelId, datumEnTijd, totaalBedrag, winkelmand } = bestelling;
        const BestellingRow = document.createElement('tr');
        const idCell = document.createElement('td');
        const totaalCell = document.createElement('td');
        const datumEnTijdCell = document.createElement('td');
        const productCell = document.createElement('td');

        idCell.textContent = bestelId;
        totaalCell.textContent = totaalBedrag;
        datumEnTijdCell.textContent = datumEnTijd;

        let productsList = Object.entries(winkelmand)
            .map(([productId, quantity]) => `Product ID: ${productId} (Quantity: ${quantity})`)
            .join(', ');

        productCell.innerHTML = productsList;

        BestellingRow.appendChild(idCell);
        BestellingRow.appendChild(totaalCell);
        BestellingRow.appendChild(datumEnTijdCell);
        BestellingRow.appendChild(productCell);

        bestellingenTable.appendChild(BestellingRow);
    });
} else {
    const noOrdersRow = document.createElement('tr');
    const noOrdersCell = document.createElement('td');
    noOrdersCell.textContent = 'No orders found';
    noOrdersCell.colSpan = 3;
    noOrdersRow.appendChild(noOrdersCell);
    bestellingenTable.appendChild(noOrdersRow);
}

const producten = JSON.parse(localStorage.getItem('products'));

const productenTable = document.getElementById('productenTable');

producten.forEach((product) => {
    const { name, price, id, img } = product;
    const productRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const productIdCell = document.createElement('td');
    const imgCell = document.createElement('td');
    const editButton = document.createElement('button');
    const verwijderButton = document.createElement('button');

    editButton.addEventListener('click', function() {
        window.location.href = `admin/edit-product.html?id=${id}`;
    });
    nameCell.innerText = name;
    priceCell.innerText = price;
    productIdCell.innerText = id;
    imgCell.innerText = img;
    editButton.innerText = 'Edit';
    verwijderButton.innerText = 'vewijder';

    productenTable.appendChild(productRow);
    productRow.appendChild(productIdCell);
    productRow.appendChild(nameCell);
    productRow.appendChild(priceCell);
    productRow.appendChild(imgCell);
    productRow.appendChild(editButton);
    productRow.appendChild(verwijderButton);

    verwijderButton.setAttribute('data-id', id);

    verwijderButton.addEventListener('click', function (e) {
        const productId = Number(e.target.getAttribute('data-id'));

        const currentProducten = JSON.parse(localStorage.getItem('products'));

        const updatedProducten = currentProducten.filter(p => p.id != productId);

        localStorage.setItem('products', JSON.stringify(updatedProducten));

        console.log(updatedProducten);

        productenTable.removeChild(productRow);
    });

});

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', function () {
    fetch('js/producten.json')
        .then(response => response.json())
        .then(data => {

            localStorage.setItem('products', JSON.stringify(data));
            populateProductTable(data);
        })
        .catch(error => {
            console.error("Er was een probleem bij het ophalen van het JSON-bestand:", error);
        });
});

function populateProductTable(products) {
    while (productenTable.firstChild) {
        productenTable.removeChild(productenTable.firstChild);
    }
    products.forEach((product) => {
        const { name, price, id, img } = product;
        const productRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const priceCell = document.createElement('td');
        const productIdCell = document.createElement('td');
        const imgCell = document.createElement('td');
        const editButton = document.createElement('button');
        const verwijderButton = document.createElement('button');


        nameCell.innerText = name;
        priceCell.innerText = price;
        productIdCell.innerText = id;
        imgCell.innerText = img;
        editButton.innerText = 'Edit';
        verwijderButton.innerText = 'vewijder';

        productenTable.appendChild(productRow);
        productRow.appendChild(productIdCell);
        productRow.appendChild(nameCell);
        productRow.appendChild(priceCell);
        productRow.appendChild(imgCell);
        productRow.appendChild(editButton);
        productRow.appendChild(verwijderButton);

        verwijderButton.setAttribute('data-id', id);

        verwijderButton.addEventListener('click', function (e) {
            const productId = Number(e.target.getAttribute('data-id'));

            const currentProducten = JSON.parse(localStorage.getItem('products'));

            const updatedProducten = currentProducten.filter(p => p.id != productId);

            localStorage.setItem('products', JSON.stringify(updatedProducten));

            console.log(updatedProducten);

            productenTable.removeChild(productRow);
        });

    });
}
