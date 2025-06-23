// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);

// Load all products from the database
async function loadProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/product', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load products');
        }

        const data = await response.json();
        console.log('Products loaded:', data);

        if (!data.success) {
            throw new Error(data.message || 'Failed to load products');
        }

        displayProducts(data.products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('product-list').innerHTML = `
            <div class="error-message">
                Failed to load products: ${error.message}
            </div>
        `;
    }
}

// Display products in the product list
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    
    if (!products || products.length === 0) {
        productList.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image && product.image.length > 0 ? 
                    `<img src="${product.image[0]}" alt="${product.name}">` : 
                    '<img src="images/no-image.png" alt="No image available">'
                }
            </div>
            <div class="product-info">
                <h3>${product.name || 'No Name'}</h3>
                <p class="model">${Array.isArray(product.description) ? product.description.join(', ') : (product.description || 'No Description')}</p>
                <p class="specs">${product.specifications || 'No Specifications'}</p>
                <p class="price">$${product.price ? product.price.toLocaleString() : '0'}</p>
            </div>
        </div>
    `).join('');
}

// Filter products based on search criteria
function filterProducts() {
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const brandFilter = document.getElementById('filter-brand').value.toLowerCase();
    const modelFilter = document.getElementById('filter-model').value.toLowerCase();
    const priceFilter = parseFloat(document.getElementById('filter-price').value) || Infinity;

    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const model = card.querySelector('.model').textContent.toLowerCase();
        const price = parseFloat(card.querySelector('.price').textContent.replace(/[^0-9.-]+/g, ''));

        const matchesName = name.includes(nameFilter);
        const matchesBrand = model.includes(brandFilter);
        const matchesModel = model.includes(modelFilter);
        const matchesPrice = price <= priceFilter;

        if (matchesName && matchesBrand && matchesModel && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners for filter inputs
document.getElementById('filter-name').addEventListener('input', filterProducts);
document.getElementById('filter-brand').addEventListener('input', filterProducts);
document.getElementById('filter-model').addEventListener('input', filterProducts);
document.getElementById('filter-price').addEventListener('input', filterProducts);
