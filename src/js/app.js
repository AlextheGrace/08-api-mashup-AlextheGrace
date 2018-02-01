//bootstrap dependencies
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
/*the axel function which turns jsobject into a long url string.
  i want to learn this to i should brush up on js array manipulation and objekt.key function */ 
import { axelVisar } from './axelmachine.js';




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

      getSearchQuery() {
		let query = search.value;
		if (!query.length) {
			return;
		}
    } 

    renderFlickrImages(images) {
        images.map(image = () => {

        });

    }

    fetchFlickrRequest(input){
    let flickrAPIkey = process.env.FLICKR_API_KEY
    let resourceUrl = `https://api.flickr.com/services/rest/?`;

    let params = {
      method: 'flickr.photos.search',
      api_key: flickrAPIkey,
      text: input,
      sort: 'relevance',
      extras: 'original_format, url_o, url_q',
      license: '2,4,5,6,7',
      per_page: 10,
      format: 'json',
      nojsoncallback: 1,
      dimension_search_mode: "max"
    };

    let flickrQueryParams = axelVisar(params);
    let flickrUrl = `${resourceUrl}${flickrQueryParams}`

    return fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res.photos);
      });
    }
}

    

   

	


(function() {
	let go = new MashedApi(document.querySelector('#page'));
})();
