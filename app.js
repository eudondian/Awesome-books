// Variable declarations
const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const addBtn = document.querySelector('.add-btn');
let bookTitleValue; 
let bookAuthorValue;

let bookCollectionArray = [
  {
    num: 2,
    title: 'Lorem ipsum',
    author: 'Testero Testyy'
  },

  {
    num: 1,
    title: 'Second Book',
    author: 'Testero Testyy'
  }
];

let bookCollectionObject = {};

// Function declarations
function addABook(){
  bookCollectionObject = {
    num: bookCollectionArray.length + 1,
    title: bookTitle.value,
    author: bookAuthor.value
  }

  bookCollectionArray.unshift(bookCollectionObject);
  console.log(bookCollectionObject);
  console.log(bookCollectionArray);
}

function displayBook(){
  let booklistContainer;
  
  bookCollectionArray.map((book, index) => {
    if (index === 0){
      booklistContainer = document.createElement('div');
      booklistContainer.className = `booklist-${book.num}`;

      booklistContainer.innerHTML = `
        <label for="book-${book.num}">${book.title}</label><br>
        <small>${book.author}</small><br>
        <input type="button" id="book-${book.num}" value="Remove" >
        <hr>
      `;
    } else {
      return;
    }
  });

  bookList.prepend(booklistContainer);
}

// Add a book button
addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  addABook();
  displayBook();
});
