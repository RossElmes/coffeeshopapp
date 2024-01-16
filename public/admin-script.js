console.log('Script loaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event');
    
    const ordersList = document.getElementById('orders-list');

    fetchOrders()
    // Simulate fetching orders from a server ever 10s
    setInterval(()=>{fetchOrders();},10000)

    // You can periodically fetch orders or use websockets for real-time updates

    function fetchOrders() {
        // Fetch orders from the server
        fetch('http://localhost:3000/api/orders')
            .then(response => response.json())
            .then(orders => {
                console.log('Fetched Orders:', orders);
                // Display orders in the admin dashboard
                displayOrders(orders);
            })
            .catch(error => console.error('Error fetching orders:', error));

        console.log('ran')
    }

    function displayOrders(orders) {
        // Clear existing orders in the UI
        ordersList.innerHTML = '';

        // Display each order in the UI
        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `<p>Order ID: ${order.id}</p>`;
            orderItem.innerHTML += `<p>Products: ${order.products.map(p => p.name).join(', ')}</p>`;
            orderItem.innerHTML += `<p>Total: $${order.total.toFixed(2)}</p>`;
            orderItem.innerHTML += `<p>Order Time: ${order.orderTime}</p>`;
            orderItem.innerHTML += `<p>Customer Number: ${order.customerNumber}</p>`;
            orderItem.innerHTML += `<p>Customer Email: ${order.customerEmail}</p>`;
            ordersList.appendChild(orderItem);
        });
    }
});
