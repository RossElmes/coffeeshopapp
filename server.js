const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


let orderIdCounter = 3;
let orders = [
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
    {
        id: 2,
        products: [
            { name: 'Latte', quantity: 2, price: 3.5 },
            // Add other product details as needed
        ],
        total: 7.0,
        orderTime: '12:30 PM',
        customerNumber: '123-456-7890',
        customerEmail: 'ross@email.com'
    },
];

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Serve the customer page
app.use(express.static('public'));

// Serve the admin dashboard
app.use('/customer', express.static('public'));

// API endpoint to fetch orders (simulated data)
app.get('/api/orders', (req, res) => {
    // Simulated orders dats
    res.json(orders);
});


app.get('/api/availableTimes', (req, res) => {
    // Simulated orders data
    const availableTimes = [
        // Example order structure
        {
            time:'8:00',
        },
        {
            time:'9:00',
        },
        {
            time:'10:00',
        },
        {
            time:'11:00',
        },
    ];

    res.json(availableTimes);
});


// API endpoint to place an order
app.post('/api/placeOrder', async (req, res) => {
    let orderDetails = req.body;

    // Generate a new order ID
    const orderId = orderIdCounter++;

    // Include the generated order ID in the order details
    orderDetails.id = orderId;
    // Function to push the order into the 'orders' array

    // Use an async function to push the order and wait for completion
    await pushOrder(orderDetails);

    // Simulated response (you might send a confirmation or order ID in a real scenario)
    res.json({ message: 'Order placed successfully!' });
});


function pushOrder(orderDetails) {
    return new Promise((resolve) => {
        // Simulate some asynchronous operation (e.g., database operation)
        setTimeout(() => {
            orders.push(orderDetails);
            resolve();
        }, 100); // Simulated delay in milliseconds
    });
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
