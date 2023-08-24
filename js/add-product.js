const nameProductAdd = document.getElementById('AddproductNaam');
const priceProductAdd = document.getElementById('Addproductprijs');
const imgProductAdd = document.getElementById('addProductImg');

let producten = JSON.parse(localStorage.getItem('products')) || [];

function addProduct() {
    let newName = nameProductAdd.value;
    let newPrice = parseFloat(priceProductAdd.value);
    let newImg = imgProductAdd.value;

    let highestId = 0;
    producten.forEach(product => {
        let currentId = parseInt(product.id);
        if (currentId > highestId) {
            highestId = currentId;
        }
    });
    let newId = highestId + 1;
    let newProduct = {
        name: newName,
        price: newPrice,
        id: newId,
        img: newImg,
    };
    producten.push(newProduct);

    localStorage.setItem('products', JSON.stringify(producten));
}

document.getElementById('addproduct').addEventListener('click', addProduct);