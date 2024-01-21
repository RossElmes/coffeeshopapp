let order = [];
  let orderTime = 'test'
  let times = ['8:00','8:10','8:20','8:30','8:40','8:50','9:00']
  let totalPrice = 0.00
  const productList = document.getElementById('product-list');


  const products = [
      { id:1,
        name: 'Latte',
        size:'8oz',
        commentary:'Regular Latte made with Milk',
        price:3.50
      },

      { id:2,
        name: 'Large Latte',
        size:'12oz',
        commentary:'Large Latte made with Milk',
        price:3.70
      },
      { id:1,
        name: 'Oat Latte',
        size:'8oz',
        commentary:'Regular Latte made with Oat Milk',
        price:3.50
      },

      { id:2,
        name: 'Large Oat Latte',
        size:'12oz',
        commentary:'Large Latte made with Oat Milk',
        price:3.70
      },
      { id:1,
        name: 'Coconut Latte',
        size:'8oz',
        commentary:'Regular Latte made with Coconut Milk',
        price:3.50
      },
      { id:2,
        name: 'Large Coconut Latte',
        size:'12oz',
        commentary:'Large Latte made with Coconut Milk',
        price:3.70
      },
      // ... more products with different attributes
      { id:3,
        name: 'Flat White',
        size:'8oz',
        commentary:'Flat White made with Regular Milk',
        price:3.40
      },

      { id:4,
        name: 'Oat Flat White',
        size:'8oz',
        commentary:'Flat White made with Oat Milk',
        price:3.80
      },

      { id:5,
        name: 'Coconut Flat White',
        size:'8oz',
        commentary:'Flat White made with Coconut Milk',
        price:3.80
      },

      { id:3,
        name: 'Americano',
        size:'8oz',
        commentary:'Americano with the option of taking it place or adding milk of your choice',
        price:3.40
      },
    ];


  function updateTotalPrice(){
    order.forEach( item =>{
      totalPrice += parseFloat(item.price)
    })
  }

  function removeObjectById(id) {
    const indexToRemove = order.findIndex(obj => obj.id === id);
    if (indexToRemove !== -1) {
        console.log(order[indexToRemove].price)
      order.splice(indexToRemove, 1);
      updateOrderItems(); // Update the displayed list after removal
    }
  }

  function updateOrderItems() {
    const orderItemsElement = document.getElementById('orderItems');
    orderItemsElement.innerHTML = '';

    order.forEach((item, index) => {
      const listItem = document.createElement('li');
      const deleteButton = document.createElement("button");
      deleteButton.className = 'remove-button'
      deleteButton.textContent = "Remove";
      listItem.textContent = `${item.product}`;

      deleteButton.addEventListener("click", () => {
        removeObjectById(item.id);
        });

      listItem.append(deleteButton)
      orderItemsElement.appendChild(listItem);
    });
  }


    function confirmOrder() {
        
        //Open the modal
        openModal() 

        const confirmationDetails = document.getElementById('confirmationDetails');
        confirmationDetails.innerHTML = '';
        const orderNumber = Math.floor(Math.random() * 1000000) + 1;

        // Update the total price of the order
        updateTotalPrice()

        const listItem = document.createElement('li');
        listItem.textContent = `Total: €${totalPrice.toFixed(2)}`;
        confirmationDetails.appendChild(listItem);
        // reset the form when order is made
        document.getElementById('customerForm').reset();
        document.getElementById('orderNumber').textContent = 'Order ID: '+orderNumber;

  }


    function changeColor(element) {
      // Toggle the "clicked" class to change color on click
      element.classList.toggle('clicked');

      // Set a timeout to remove the "clicked" class after the transition
      setTimeout(() => {
        element.classList.remove('clicked');
      }, 300); // 300ms should match the transition duration
    }


  function displayProducts(products) {
    // Clear existing orders in the UI
    productList.innerHTML = '';

     // Display each order in the UI
    products.forEach((product,index) => {
        const prodItem = document.createElement('div');
        prodItem.id = product.id
        //const AddButton = document.createElement("button");
        //AddButton.textContent = "Add to Order";
        //AddButton.className = 'btn btn-primary'
        prodItem.className = 'panel-body';
        prodItem.innerHTML = `<p class='prod-name'>${product.name}</p>`;
        prodItem.innerHTML += `<p>${product.commentary}</p>`;
        prodItem.innerHTML += `<p>Price: €${product.price.toFixed(2)}</p>`;

        prodItem.addEventListener("click", () => {

        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        // Get selected Product
        const productId = product.id
        const productName = product.name
        const price = product.price.toFixed(2)

        // Create the order item
        const orderItem = { productId: productId
        , product: productName
        , email:email
        , name:name
        , phone:phone
        , orderTime:orderTime
        , price:price};

        // Add the order item to the order
        order.push(orderItem);

        // Display the order items
        updateOrderItems();

        changeColor(prodItem)

        });

        //prodItem.append(AddButton)
        productList.appendChild(prodItem);
    }); 
}

const timeList = document.getElementById('ordertimes-container');

function displayTimes(times) {
    // Clear existing orders in the UI
    timeList.innerHTML = '';

     // Display each order in the UI
    times.forEach((time,index) => {
        const timeItem = document.createElement('div');
        timeItem.id = time
        timeItem.className = 'time-body';
        timeItem.innerHTML = `${time}`;

        timeItem.addEventListener("click",() => {

        orderTime = document.getElementById(`${time}`).innerHTML;
        changeColor(timeItem)

        });

        //prodItem.append(AddButton)
        timeList.appendChild(timeItem);

    }); 
}

/*Modal logic*/
var modal = document.getElementById('myModal');

  function openModal() {
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
    order = []
    orderItemsElement = document.getElementById('orderItems');
    orderItemsElement.innerHTML = '';
    totalPrice = 0.00
  }

// Run fucntions that are needed on load 
displayTimes(times)
displayProducts(products)