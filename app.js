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

addBtn.addEventListener('click', (e) => {
  e.preventDefault();

  addABook();
});
