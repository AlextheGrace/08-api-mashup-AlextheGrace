//bootstrap dependencies
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

/*the axel function which turns jsobject into a long url string.
  i want to learn this to i should brush up on js array manipulation and  theobject.key function */

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
			this.fetchSynonymsRequest();
		});
	}

	getSearchQuery() {
		let query = search.value;
		if (!query.length) {
			return;
		}
	}

	renderFlickrImages(images) {
		const imageContainer = document.querySelector('.container');
		imageContainer.innerHTML = '';
		images.map(function(pic) {
			let image = new Image(200, 200);
			let link = document.createElement('a');
			link.setAttribute('href', `${pic.url_o}`);
			image.src = `${pic.url_o}`;
			link.append(image);
			return imageContainer.appendChild(link);
		});
	}

	fetchFlickrRequest(input) {
		let flickrAPIkey = '3217401972bbfbe982ebee49a2300045';
		let resourceUrl = `https://api.flickr.com/services/rest/?`;

		let params = {
			method: 'flickr.photos.search',
			api_key: flickrAPIkey,
			text: input,
			sort: 'relevance',
			extras: 'original_format, url_o, url_q',
			license: '2,4,5,6,7',
			per_page: 12,
			format: 'json',
			nojsoncallback: 1,
			dimension_search_mode: 'max'
		};

		let flickrQueryParams = axelVisar(params);
		let flickrUrl = `${resourceUrl}${flickrQueryParams}`;

		return fetch(flickrUrl).then(res => res.json()).then(res => {
			this.renderFlickrImages(res.photos.photo);
		});

		


	}
	fetchSynonymsRequest() {

		let wordApiBaseURL = `http://words.bighugelabs.com/api/2/`,
		wordapikey = `24ab9280fa062ba3076b0ea31a378166`,
		
		apiWordInput = `/eat/json`;


		let synonymURL = `${wordApiBaseURL}${wordapikey}${apiWordInput}`;


		return fetch(synonymURL).then(res => {
			res.json.then(data => console.log(data));
		});



		
	}
}

(function() {
	let go = new MashedApi(document.querySelector('#page'));
})();
