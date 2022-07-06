// Variable declarations
const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
let bookTitleValue;
let bookAuthorValue;
const adbtn = document.querySelector('form');
let bookArray = [];

// Represents a Book
class Book {
  static addBookItems(item) {
    bookArray.push(item);
    console.log(bookArray);

    localStorage.setItem('bookCollection', JSON.stringify(bookArray));

    bookTitleValue = '';
    bookAuthorValue = '';
  }

  static addABook(bookInfo, index) {
    const bookData = document.createElement('div');
    bookData.classList.add('bookData');
    bookData.id = index;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = 'REMOVE';
    bookData.innerHTML = `
      <p class="book-title">${bookInfo.title}</p>
      <p class="book-author">${bookInfo.author}</p>
    `;
    bookData.appendChild(removeBtn);
    bookList.prepend(bookData);
    removeBtn.onclick = () => {
      Book.removeABook(bookInfo, index);
    };
  }

  static removeABook(bookInfo, index) {
    const bookCollection2 = document.getElementById(index);
    const { author, title } = bookInfo;
    bookArray = bookArray.filter(
      (item) => item.author !== author && item.title !== title
    );
    localStorage.setItem('bookCollection', JSON.stringify(bookArray));
    bookList.removeChild(bookCollection2);
  }
}

// If local storage is not empty, display the items on the webpage
if (localStorage.getItem('bookCollection')) {
  bookArray = JSON.parse(localStorage.getItem('bookCollection'));
  bookArray.forEach((bookInfo, index) => {
    Book.addABook(bookInfo, index);
  });
} else {
  localStorage.setItem('bookCollection', '');
  bookArray = [];
}

// Add a book event listener
/* adbtn.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the form values
  bookTitleValue = bookTitle.value;
  bookAuthorValue = bookAuthor.value;

  let item = { title: bookTitleValue, author: bookAuthorValue };

  Book.addBookItems(item);

  Book.addABook(item, bookArray.length - 1);
}); */
