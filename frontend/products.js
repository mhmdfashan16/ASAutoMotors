const products = [
  {
    name: "Honda Dio",
    brand: "Honda",
    model: "Dio",
    price: 670000,
    run: "28,029 km",
    image: "images/bike_id_01.jpg"
  },
  {
    name: "TVS Ntorq 125",
    brand: "TVS",
    model: "Ntorq 125",
    price: 750000,
    run: "18,127 km",
    image: "images/bike_id_02.jpg"
  },
  {
    name: "Hero Pleasure",
    brand: "Hero",
    model: "Pleasure",
    price: 450000,
    run: "30,554 km",
    image: "images/bike_id_03.jpg"
  },

  {
    name: "Honda Activa",
    brand: "Honda",
    model: "Activa",
    price: 450000,
    run: "27,986 km",
    image: "images/bike_id_04.jpg"

  },

  {
    name: "Honda",
    brand: "Honda",
    model: "Dio 110",
    price: 450000,
    run: "27,833 km",
    image: "images/bike_id_05.jpg"
  },

  {
    name: "Honda Activa",
    brand: "Honda",
    model: "Activa",
    price: 620000,
    run: "26,056 km",
    image: "images/bike_id_06.jpg"
  },
  
  {
    name: "Honda Grazia",
    brand: "Honda",
    model: "Grazia",
    price: 770000,
    run: "12,077 km",
    image: "images/bike_id_07.jpg"
  },
  
  {

    name: "TVS Xl heavy duty",
    brand: "TVS",
    model: "Xl heavy duty",
    price: 260000,
    run: "9,441 km",
    image: "images/bike_id_08.jpg"
  },
  
  {
    name: "Hero Stream",
    brand: "Hero",
    model: "Stream",
    price: 130000,
    run: "12,112 km",
    image: "images/bike_id_09.jpg"
  },
  
  {
    name: "TVS XI super heavy duty",
    brand: "TVS",
    model: "XI heavy duty",
    price: 260000,
    run: "18,488 km",
    image: "images/bike_id_10.jpg"
  },
  
  {
    name: "Honda Super cub 50",
    brand: "Honda",
    model: "Super cub 50",
    price: 250000,
    run: "30,994 km",
    image: "images/bike_id_11.jpg"
  },
  
  {
    name: "Honda Cb shine",
    brand: "Honda",
    model: "Cb shine",
    price: 450000,
    run: "30,994 km",
    image: "images/bike_id_12.jpg"
  },
  
  {
    name: "Hero Honda Passion pro",
    brand: "Hero Honda",
    model: "Passion pro",
    price: 250000,run: "23,166 km",
    image: "images/bike_id_13.jpg"
  },
  
  {
    name: "Hero Honda Passion pro",
    brand: "Hero Honda",
    model: "Passion pro",
    price: 280000,
    run: "15,577 km",
    image: "images/bike_id_14.jpg"
  },
  
  {
    name: "TVS Max r 100",
    brand: "TVS",
    model: "Max r 100",
    price: 350000,
    run: "37,006 km",
    image: "images/bike_id_15.jpg"
  },

  {
    name: "Honda Chaly",
    brand: "Honda",
    model: "Chaly",
    price: 130000,
    run: "31,795 km",
    image: "images/bike_id_16.jpg"
  },
  
  {
    name: "Honda Cd 125 benly",
    brand: "Honda",
    model: "Cd 125 benly",
    price: 580000,
    run: "12,565 km",
    image: "images/bike_id_17.jpg"
  },

  {
    name: "Yamaha Fzs",
    brand: "Yamaha",
    model: "Fzs",
    price: 1020000,
    run: "10,093 km",
    image: "images/bike_id_18.jpg"
  },

  {
    name: "TVS Wego",
    brand: "TVS",
    model: "Wego",
    price: 660000,
    run: "25,951 km",
    image: "images/bike_id_19.jpg"
  },

];

function renderProducts(productArray) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (productArray.length === 0) {
    container.innerHTML = `<p style="color: white; text-align: center;">No bikes match the selected filters.</p>`;
    return;
  }

  productArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "bike-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <button onclick="toggleDetails(this)">More Details</button>
      <div class="bike-details" style="display: none;">
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Model:</strong> ${product.model}</p>
        <p><strong>Run:</strong> ${product.run}</p>
        <p><strong>Price:</strong> LKR ${product.price.toLocaleString()}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterProducts() {
  const name = document.getElementById("filter-name").value.toLowerCase();
  const brand = document.getElementById("filter-brand").value.toLowerCase();
  const model = document.getElementById("filter-model").value.toLowerCase();
  const price = parseInt(document.getElementById("filter-price").value);

  const filtered = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(name);
    const matchesBrand = product.brand.toLowerCase().includes(brand);
    const matchesModel = product.model.toLowerCase().includes(model);
    const matchesPrice = isNaN(price) || product.price <= price;

    return matchesName && matchesBrand && matchesModel && matchesPrice;
  });

  renderProducts(filtered);
}

function toggleDetails(button) {
  const details = button.nextElementSibling;
  const isVisible = details.style.display === "block";

  if (isVisible) {
    details.style.display = "none";
    button.textContent = "More Details";
  } else {
    details.style.display = "block";
    button.textContent = "Hide Details";
  }
}

// Show all products on page load
window.onload = () => renderProducts(products);
