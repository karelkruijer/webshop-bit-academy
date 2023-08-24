const nameProductEdit = document.getElementById('editproductNaam');
const priceProductEdit = document.getElementById('editproductprijs');
const imgProductEdit = document.getElementById('editProductImg');

function getURLParameter(name) {
    const regexPattern = `[?|&]${name}=([^&;]+?)(&|#|;|$)`;
    const regex = new RegExp(regexPattern);
    const results = regex.exec(window.location.search) || [null, ""];
    return decodeURIComponent(results[1].replace(/\+/g, '%20')) || null;
}

const productId = getURLParameter('id');

const productData = JSON.parse(localStorage.getItem('products')) || [];
const productToEdit = productData.find(product => product.id == productId);

if (productToEdit) {
    nameProductEdit.value = productToEdit.name || "";
    priceProductEdit.value = productToEdit.price || "";
    imgProductEdit.value = productToEdit.img || "";
}

const editButton = document.getElementById('editproduct');

editButton.addEventListener('click', function () {
    const productsFromStorage = JSON.parse(localStorage.getItem('products')) || [];

    const productIndex = productsFromStorage.findIndex(product => product.id == productId);

    if (productIndex !== -1) {
        productsFromStorage[productIndex].name = nameProductEdit.value;
        productsFromStorage[productIndex].price = parseFloat(priceProductEdit.value);
        productsFromStorage[productIndex].img = imgProductEdit.value;

        localStorage.setItem('products', JSON.stringify(productsFromStorage));

        alert('Product successfully updated!');
    } else {
        alert('Product not found!');
    }
});