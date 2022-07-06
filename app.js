// Variable declarations
const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
let bookTitleValue;
let bookAuthorValue;
const addbtn = document.querySelector('form');
let bookArray = [];

// Represents a Book
class Book {
  static addBookItems(item) {
    bookArray.push(item);

    localStorage.setItem('bookCollection', JSON.stringify(bookArray));

    bookTitleValue = '';
    bookAuthorValue = '';
  }

  static addABook(item, index) {
    if (bookArray.length === 0){
      bookList.classList.remove('.active');
      return;
    } else {
      bookList.classList.add('active');

      const bookData = document.createElement('div');
      bookData.classList.add('book-data');
      bookData.id = index;
      
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

      bookData.style.paddingTop = '5px';
      bookData.style.paddingBottom = '5px';
      bookData.style.paddingLeft = '10px';
      bookData.style.paddingRight = '10px';

      (index%2 === 0) ? bookData.style.backgroundColor = 'white' : bookData.style.backgroundColor = '#d3d3d3';

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

// If local storage is not empty, display the items on the webpage
if (localStorage.getItem('bookCollection')) {
  bookArray = JSON.parse(localStorage.getItem('bookCollection'));
  
  bookArray.forEach((item, index) => {
    Book.addABook(item, index);
  });
} else {
  localStorage.setItem('bookCollection', '');
  
  bookArray = [];
}

// Add a book event listener
addbtn.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let item;

  // Get the form values
  bookTitleValue = bookTitle.value;
  bookAuthorValue = bookAuthor.value;

  if (bookTitleValue !== '' || bookAuthorValue !== ''){
    item = { title: bookTitleValue, author: bookAuthorValue };
    
    Book.addBookItems(item);

    Book.addABook(item, bookArray.length - 1);
  } else {
    return;
  }
});
