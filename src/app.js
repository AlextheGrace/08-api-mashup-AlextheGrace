//bootstrap dependencies
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';



//doesnt work as class property so i have the searchinput globally(does this depend on webpack?)


class MashedApi {
	constructor(element) {
        let _this = this;
        this.root = element;
        this.addEventListeners();
    }

    
    

    addEventListeners() {
        const search = document.querySelector('#search-query');
		const searchButton = document.querySelector('#search-button');
        searchButton.addEventListener('click', () => {
                this.fetchFlickrRequest(search.value);
                //this.fetchSynonymsRequest(search.value);
        });
        
    }


    fetchFlickrRequest(input){
        console.log(input);
    }

    

   
	getSearchQuery() {
		let query = search.value;
		if (!query.length) {
			return;
		}
	}
}

(function() {
	let go = new MashedApi(document.querySelector('#page'));
})();
