// Variable declarations
// For navbar 1 & navbar 2
const list = document.querySelector('.book-list-link');
const addNew = document.querySelector('.add-new-link');
const contact = document.querySelector('.contact-link');
const dateAndTime = document.querySelector('.date-and-time');
let dateAndTime1 = new Date();

// For Book list page
const caption = document.querySelector('.caption');
const bookList = document.querySelector('.book-list');

// For Add new page
const caption2 = document.querySelector('.caption2');
const addContainer = document.querySelector('.add-container');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
let bookTitleValue;
let bookAuthorValue;
const addbtn = document.querySelector('form');
let bookArray = [];
const errorMsg = document.querySelector('.error-msg');

// For Contact page
const contactContainer = document.querySelector('.contact-container');

// Represents a Book
class Book {
  static addBookItems(item) {
    bookArray.push(item);

    localStorage.setItem('bookCollection', JSON.stringify(bookArray));

    bookTitleValue = '';
    bookAuthorValue = '';
  }

  static addABook(item, index) {
    if (bookArray.length === 0) {
      bookList.classList.remove('.active');
    } else {
      bookList.classList.add('active');

      const bookData = document.createElement('div');
      bookData.classList.add('book-data');
      bookData.id = index;
      bookData.style.paddingTop = '5px';
      bookData.style.paddingBottom = '5px';
      bookData.style.paddingLeft = '10px';
      bookData.style.paddingRight = '10px';

      if (index % 2 === 0) {
        bookData.style.backgroundColor = 'white';
      } else {
        bookData.style.backgroundColor = '#d3d3d3';
      }

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.innerText = 'Remove';
      removeBtn.style.backgroundColor = 'white';
      removeBtn.style.paddingLeft = '10px';
      removeBtn.style.paddingRight = '10px';
      removeBtn.style.width = '85px';
      removeBtn.style.height = '35px';
      removeBtn.style.border = '3px solid black';
      removeBtn.style.boxShadow = '3px 2px 2px 0px rgba(0, 0, 0, 1)';
      removeBtn.style.fontSize = '15.2px';
      removeBtn.style.fontWeight = 'bold';

      bookData.innerHTML = `
        <p class="book-title-text">"${item.title}" by 
          <span class="book-author-text">${item.author}</span>
        </p>
      `;

      const bookTitleText = bookData.querySelector('.book-title-text');
      bookTitleText.style.fontWeight = 'bolder';

      const bookAuthorText = bookData.querySelector('.book-author-text');
      bookAuthorText.style.fontWeight = 'bolder';

      bookData.appendChild(removeBtn);

      bookList.prepend(bookData);

      removeBtn.onclick = () => {
        Book.removeABook(item, index);
      };
    }
  }

  static removeABook(item, index) {
    const bookCollection2 = document.getElementById(index);
    const { author, title } = item;

    bookArray = bookArray.filter(
      (item1) => item1.author !== author && item1.title !== title
    );

    localStorage.setItem('bookCollection', JSON.stringify(bookArray));

    bookList.removeChild(bookCollection2);
  }
}

// Remove all children elements of a parent node
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

dateAndTime.innerHTML = dateAndTime1;

// If local storage is not empty, display the items on the webpage
if (localStorage.getItem('bookCollection')) {
  bookArray = JSON.parse(localStorage.getItem('bookCollection'));

  bookArray.forEach((item, index) => {
    Book.addABook(item, index);
  });

  list.classList.add('blue');
  addNew.classList.remove('blue');
  contact.classList.remove('blue');
  caption.classList.remove('hide');
  bookList.classList.add('active');
  addContainer.classList.add('hide');
  contactContainer.classList.add('hide');
} else {
  localStorage.setItem('bookCollection', '');

  bookArray = [];

  list.classList.add('blue');
  addNew.classList.remove('blue');
  contact.classList.remove('blue');
  caption.classList.remove('hide');
  addContainer.classList.add('hide');
  contactContainer.classList.add('hide');
}

// List link
list.onclick = () => {
  if (localStorage.getItem('bookCollection')) {
    bookArray = JSON.parse(localStorage.getItem('bookCollection'));

    bookArray.forEach((item, index) => {
      Book.addABook(item, index);
    });

    list.classList.add('blue');
    addNew.classList.remove('blue');
    contact.classList.remove('blue');
    caption.classList.remove('hide');
    bookList.classList.add('active');
    addContainer.classList.add('hide');
    contactContainer.classList.add('hide');
  } else {
    localStorage.setItem('bookCollection', '');

    bookArray = [];

    list.classList.add('blue');
    addNew.classList.remove('blue');
    contact.classList.remove('blue');
    caption.classList.remove('hide');
    addContainer.classList.add('hide');
    contactContainer.classList.add('hide');
  }
};

// Add new link
addNew.onclick = () => {
  list.classList.remove('blue');
  contact.classList.remove('blue');
  addNew.classList.add('blue');
  caption.classList.add('hide');
  bookList.classList.remove('active');
  removeAllChildNodes(bookList);
  addContainer.classList.remove('hide');
  contactContainer.classList.add('hide');

  // Add a book event listener
  addbtn.addEventListener('submit', (e) => {
    e.preventDefault();

    let item;

    // Get the form values
    bookTitleValue = bookTitle.value;
    bookAuthorValue = bookAuthor.value;

    if (bookTitleValue !== '' && bookAuthorValue !== '') {
      errorMsg.innerText = '';
      errorMsg.classList.remove('active2');

      item = { title: bookTitleValue, author: bookAuthorValue };

      Book.addBookItems(item);

      Book.addABook(item, bookArray.length - 1);
    } else {
      errorMsg.innerText = "Please enter name of book & author's name.";
      errorMsg.classList.add('active2');
    }
  });
};

// Contact link
contact.onclick = () => {
  list.classList.remove('blue');
  addNew.classList.remove('blue');
  contact.classList.add('blue');
  bookList.classList.remove('active');
  removeAllChildNodes(bookList);
  addContainer.classList.add('hide');
  contactContainer.classList.remove('hide');
};
