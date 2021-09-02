const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const booksContainer = document.getElementById('books-container');
const totalFound = document.getElementById('total-found');
const hintsFound = document.getElementById('hints')

searchButton.addEventListener('click', function(){
    const search = searchInput.value;
                                        //<-----empty input Handle
    if(search === ''){           
      totalFound.innerText = 'Invalid input! Please write something'
      hints.innerText = 'Invalid input! Please write something'
    }
    else{
      searchInput.value = '';         //<---clear serch Input
      const url = `https://openlibrary.org/search.json?q=${search}`
      fetch(url)
      .then(res => res.json())
      .then(data =>{
        if(data.numFound === 0){          //handle unexpected input
          hintsFound.innerText = 'Hints Found : Opps! no hints for you bro.'
          totalFound.innerText = 'Showing Result : Opps! no result for you bro.'
        }
        else{
          hintsFound.innerText =`Hints Found : ${data.numFound}`;  
          displayData(data.docs);      //call function
        }
      })
    }
    
});

// <---------------display search result part--------------------------> 

const displayData = books =>{
      booksContainer.innerHTML = '';      //<----clear previous result
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
      totalFound.innerText = `Showing result : ${books.length}`;  //<--update total found result        
    })
}

