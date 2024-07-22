let products = [];

let productItemId;

// #Load products
//------------------------
function loadProducts(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => (products = data));
}

// #Get matching product
//-------------------------

function getProduct(productId) {
  const matchingProduct = products.find((product) => product.id === productId);

  return matchingProduct;
}

// #Generate product item HTML
//-------------------------

export { products, productItemId, loadProducts, getProduct };
