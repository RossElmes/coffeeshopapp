const express = require('express');
const app = express();
const port = 3000;

// Serve the customer page
app.use(express.static('public'));

// Serve the admin dashboard
app.use('/customer', express.static('public'));

// API endpoint to fetch orders (simulated data)
app.get('/api/orders', (req, res) => {
    // Simulated orders data
    const orders = [
        // Example order structure
        {
            id: 1,
            products: [
                { name: 'Latte', quantity: 2, price: 3.5 },
                // Add other product details as needed
            ],
            total: 7.0,
            orderTime: '12:30 PM',
            customerNumber: '123-456-7890',
            customerEmail: 'example@email.com'
        },
        // Add more orders as needed
    ];

    res.json(orders);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
