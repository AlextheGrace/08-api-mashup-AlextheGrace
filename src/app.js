//dependencies
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';



//doesnt work as class property so i have the searchinput globally(does this depend on webpack?)
let searchQuery = document.querySelector('#search-query');

class MashedApi {
	constructor() {

        this.addEventListeners();
    }
    fetchFlickrRequest(input){
        console.log(input);
    }

    addEventListeners() {
        this.search = document.querySelector('#search-query').textContent;
		this.searchButton = document.querySelector('#search-button');
        this.searchButton.addEventListener('click', function() {
            this.fetchFlickrRequest(searchQuery);
        });
        
    }

   
	getSearchQuery() {
		let query = searchQuery.value;
		if (!query.length) {
			return;
		}
	}
}

(function() {
	let go = new MashedApi();
})();
