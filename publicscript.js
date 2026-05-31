async function loadProducts(){

  const res =
  await fetch("/api/products");

  const products =
  await res.json();

  const container =
  document.getElementById("products");

  products.forEach(product => {

    container.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>

        <button
        onclick='addToCart(${JSON.stringify(product)})'>
        Add To Cart
        </button>
      </div>
    `;
  });
}

function addToCart(product){

  let cart =
  JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("Added to cart");
}

loadProducts();
