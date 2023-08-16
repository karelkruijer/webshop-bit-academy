const nameProductEdit = document.getElementById('editproductNaam');
const priceProductEdit = document.getElementById('editproductprijs');
const imgProductEdit = document.getElementById('editProductImg');

function getURLParameter(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')
    ) || null;
}

const productId = getURLParameter('id');

const products = JSON.parse(localStorage.getItem('products')) || [];
const productToEdit = products.find(product => product.id == productId);

if (productToEdit) {
    nameProductEdit.value = productToEdit.name || "";
    priceProductEdit.value = productToEdit.price || "";
    imgProductEdit.value = productToEdit.img || "";
}

const editButton = document.getElementById('editproduct');

editButton.addEventListener('click', function() {
    // Haal eerst de huidige producten op uit de local storage.
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Vind de index van het product dat wordt bewerkt.
    const productIndex = products.findIndex(product => product.id == productId);

    if (productIndex !== -1) {
        // Update de waarden van het product op basis van de input velden.
        products[productIndex].name = nameProductEdit.value;
        products[productIndex].price = parseFloat(priceProductEdit.value);
        products[productIndex].img = imgProductEdit.value;

        // Sla de bijgewerkte productenlijst op in de local storage.
        localStorage.setItem('products', JSON.stringify(products));
        
        // Optioneel: toon een bevestigingsbericht of redirect naar een andere pagina.
        alert('Product successfully updated!');
    } else {
        alert('Product not found!');
    }
});