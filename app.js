const bookList = document.querySelector('.book-list');
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const adbtn = document.querySelector('form');
let bookArray = [];

function removeABook(bookInfo, index) {
  const bookCollection2 = document.getElementById(index);
  const { author, title } = bookInfo;
  bookArray = bookArray.filter((item) => item.author !== author && item.title !== title);
  localStorage.setItem('bookCollection', JSON.stringify(bookArray));
  bookList.removeChild(bookCollection2);
}

function addABook(bookInfo, index) {
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
  bookList.appendChild(bookData);
  removeBtn.onclick = () => {
    removeABook(bookInfo, index);
  };
}

function addBookItems(item) {
  bookArray.push({

    title: bookTitle.value,
    author: bookAuthor.value,
  });
  localStorage.setItem('bookCollection', JSON.stringify(bookArray));
  bookTitle.value = '';
  bookAuthor.value = '';
  addABook(item, bookArray.length - 1);
}

function updateUI() {
  if (localStorage.getItem('bookCollection')) {
    bookArray = JSON.parse(localStorage.getItem('bookCollection'));
    bookArray.forEach((bookInfo, index) => {
      addABook(bookInfo, index);
    });
  } else {
    localStorage.setItem('bookCollection', '');
    bookArray = [];
  }
}

updateUI();

adbtn.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookItems({
    title: bookTitle.value,
    author: bookAuthor.value,
  });
});
