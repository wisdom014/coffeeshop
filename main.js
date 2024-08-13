function filterCards(category) {
    const cards = document.querySelectorAll('.card'); // Select all card elements
    cards.forEach(card => {
        const cardCategory = card.querySelector('.text.head').textContent; // Get the text of the card head
        if (category === 'All' || cardCategory === category) {
            card.style.display = 'inline-flex'; // Show the card if it matches the category
        } else {
            card.style.display = 'none'; // Hide the card if it doesn't match
        }
    });
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(image, name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cart.push({ image, name, price: parseFloat(price), quantity: 1 }); // Add new item with quantity
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
    alert(`${name} added to cart!`);
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '<h2>Your Cart</h2>'; // Clear previous cart items and add title
    let total = 0; // Initialize total

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img" />
            <p id="cart-text"><strong>${item.name}<span> - </span></strong> $${item.price.toFixed(2)} x <span id="quantity-${item.name}">${item.quantity}</span></p>
            <button onclick="updateQuantity('${item.name}', 1)" id="crease">+</button>
            <button onclick="updateQuantity('${item.name}', -1)" id="crease">-</button>
            <button onclick="removeItem('${item.name}')" id="remove"">Remove</button> <!-- Remove button -->
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity; // Calculate total for each item
    });

    const totalDisplay = document.createElement('p');
    totalDisplay.innerHTML = `Total: $${total.toFixed(2)}`; // Display total
    cartContainer.appendChild(totalDisplay);

    const buyButton = document.createElement('button');
    buyButton.innerText = 'Buy';
    buyButton.onclick = () => buyItems();
    cartContainer.appendChild(buyButton);
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name); // Remove item if quantity is 0
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        displayCart(); // Refresh cart display
    }
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Refresh cart display
}

function buyItems() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart'); // Clear cart from localStorage
    cart = []; // Clear cart array
    displayCart(); // Refresh cart display
}

// Call to display cart items on page load if in cart.html
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}