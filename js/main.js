const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const booksContainer = document.getElementById('books-container');
const totalFound = document.getElementById('total-found');

searchButton.addEventListener('click', function(){
    const search = searchInput.value;
    const url = `http://openlibrary.org/search.json?q=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.docs))

});

const displayData = books =>{
    // console.log(books.length)
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML =`
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book : ${book.title}</h5>
          <p class="card-text">Author : ${book.author_name}</p>
          <p class="card-text">Publisher : ${book.publisher}</p>
          <p class="card-text">First publish : ${book.first_publish_year}</p>
        </div>
      </div>
      `
      booksContainer.appendChild(div);
      totalFound.innerText = `Total Found :${books.length}`;
        
    })
}

