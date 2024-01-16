class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Order {
    constructor() {
        this.products = [];
    }

    addProduct(product, quantity, milkType, size) {
        const existingProduct = this.products.find(p => p.id === product.id && p.milkType === milkType && p.size === size);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            this.products.push({ ...product, quantity, milkType, size });
        }
    }

    calculateTotal() {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    updateOrderSummary() {
        const orderSummary = document.getElementById('order-summary');
        const total = this.calculateTotal();
        orderSummary.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    }
}

const latte = new Product("latte", "Latte", 3.5);

const coffeeOrder = new Order();

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const orderSummary = document.getElementById('order-summary');
    const orderTimeDropdown = document.getElementById('order-time');

    // Fetch initial data including available times when the page loads
    fetchData();

    productList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('quantity-btn')) {
            const action = target.dataset.action;
            const productItem = target.closest('.product-item');
            const productId = productItem.dataset.productid;
            const milkType = productItem.querySelector('.milk-type-dropdown').value;
            const size = productItem.querySelector('.size-dropdown').value;

            if (action === 'increase') {
                coffeeOrder.addProduct(latte, 1, milkType, size);
            } else if (action === 'decrease') {
                coffeeOrder.addProduct(latte, -1, milkType, size);
            }

            coffeeOrder.updateOrderSummary();
        }
    });

    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', async () => {
        // Additional logic for handling customer info and placing order
        const orderTime = document.getElementById('order-time').value;
        const customerNumber = document.getElementById('customer-number').value;
        const customerEmail = document.getElementById('customer-email').value;

        console.log(orderTime)
        console.log(customerNumber)
        console.log(customerEmail)

        // Prepare order details
        const orderDetails = {
            id:3,
            products: coffeeOrder.products,
            total: coffeeOrder.calculateTotal(),
            orderTime,
            customerNumber,
            customerEmail,
            status:'Ordered'
        };

        // Send the order to the server
        fetch('http://localhost:3000/api/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order Placed:', data);
            // Reset the order details after placing the order
            coffeeOrder.products = [];
            coffeeOrder.updateOrderSummary();
            resetForm();
        })
        .catch(error => console.error('Error placing order:', error));
    });
});

function fetchData() {
    // Fetch available times from the server
    fetch('http://localhost:3000/api/availableTimes')
        .then(response => response.json())
        .then(availableTimes => {
            console.log('Fetched Available Times:', availableTimes);
            updateAvailableTimes(availableTimes);
        })
        .catch(error => console.error('Error fetching available times:', error));
}

function updateAvailableTimes(availableTimes) {
    const orderTimeDropdown = document.getElementById('order-time');

    // Clear existing options in the dropdown
    orderTimeDropdown.innerHTML = '';

    availableTimes.forEach(time => {
        console.log(time.time)
        const option = document.createElement('option');
        option.value = time.time;
        option.textContent = time.time;
        orderTimeDropdown.appendChild(option);
    });
}

function resetForm() {
    // Reset customer information form
    document.getElementById('customer-number').value = '';
    document.getElementById('customer-email').value = '';
}
