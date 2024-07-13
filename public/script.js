const books = [
  {
      title: "Book 1",
      description: "Description of Book 1",
      price: 199,
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIS85040iLqAjmJts22r0vXg9RgtfCrxnWZJOMJFt5IqRPukEPtvjxvr699r2VcqaSWpA&usqp=CAU"
  },
  {
      title: "Book 2",
      description: "Description of Book 2",
      price: 199,
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIS85040iLqAjmJts22r0vXg9RgtfCrxnWZJOMJFt5IqRPukEPtvjxvr699r2VcqaSWpA&usqp=CAU"
  },
  // Add more books as needed
];

let cart = [];

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book, index) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-12 col-md-6 col-lg-3';
      colDiv.innerHTML = `
          <div class="card-container" onclick="showDetails(${index})">
              <img class="card-img" src="${book.imgSrc}" alt="Book Image">
              <h5>Price: $${book.price}</h5>
              <button onclick="event.stopPropagation(); addToCart(${index})">Add to Cart</button>
          </div>
      `;
      bookList.appendChild(colDiv);
  });
}

function showDetails(index) {
  const book = books[index];
  document.querySelector('.books-container').style.display = 'none';
  const bookDetailsContainer = document.getElementById('book-details');
  bookDetailsContainer.style.display = 'block';

  document.getElementById('book-title').innerText = book.title;
  document.getElementById('book-description').innerText = book.description;
  document.getElementById('book-price').innerText = 'Price: $' + book.price;
  document.getElementById('book-image').src = book.imgSrc;

  bookDetailsContainer.setAttribute('data-index', index);
}

function goBack() {
  document.getElementById('book-details').style.display = 'none';
  document.querySelector('.books-container').style.display = 'block';
}

function addToCart(index) {
  const book = books[index];
  cart.push(book);
  document.getElementById('cart-count').innerText = cart.length;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(book => {
      total += book.price;
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
          <h5>${book.title} - $${book.price}</h5>
      `;
      cartItems.appendChild(itemDiv);
  });
  document.getElementById('grand-total').innerText = total;
}

function showCart() {
  document.querySelector('.books-container').style.display = 'none';
  document.querySelector('.book-details-container').style.display = 'none';
  document.getElementById('cart-section').style.display = 'block';
}

function hideCart() {
  document.getElementById('cart-section').style.display = 'none';
  document.querySelector('.books-container').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', displayBooks);
