//bootstrap dependencies
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/override.css';

/*the axel function which turns jsobject into a long url string.
  i want to learn this to i should brush up on js array manipulation and  theobject.key function */

import {
	axelVisar
} from './axelmachine.js';

//doesnt work as class property so i have the searchinput globally(does this depend on webpack?)

class MashedApi
{
	constructor(element) {
		let _this = this;
		this.root = element;
		this.addEventListeners();
	}

	addEventListeners() {
		const search = document.querySelector('#search-query');
		const searchButton = document.querySelector('#search-button');
		const wordList = document.querySelector('.list-group');

		searchButton.addEventListener('click', () => {
			this.fetchFlickrRequest(search.value);
			this.fetchSynonymsRequest(search.value);
		});
	}

	fetchOnSynonyms(word) {
		this.fetchFlickrRequest(word.target.textContent);
		this.fetchSynonymsRequest(word.target.textContent);
	}

	getSearchQuery() {
		let query = search.value;
		if (!query.length) {
			return;
		}
	}

	renderFlickrImages(images) {
		const imageContainer = document.querySelector('#images-container');
		imageContainer.innerHTML = '';
		images.map(function (pic) {
			let image = new Image(200, 200);
			let link = document.createElement('a');
			link.setAttribute('href', `${pic.url_o}`);
			image.src = `${pic.url_o}`;
			link.append(image);
			return imageContainer.appendChild(link);
		});
	}


	renderSynonyms(words) {
		const wordContainer = document.querySelector('#words-container');
		wordContainer.innerHTML = '';
		const header = document.createElement('h5').textContent('did you mean..');
		let wordUl = document.createElement("ul");
		wordUl.classList.add('list-group');

		words.map(function (word) {	
			let li = document.createElement('button');
			li.classList.add("list-group-item");
			li.textContent = word;
			wordUl.appendChild(li);
			
			return wordContainer.appendChild(wordUl);
			
		});
		//adds event listener to word container after returning appended words
		wordUl.addEventListener("click",(event) => {
			this.fetchOnSynonyms(event);
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
	fetchSynonymsRequest(input) {

		let wordApiBaseURL = `http://words.bighugelabs.com/api/2/`,
			wordapikey = `24ab9280fa062ba3076b0ea31a378166`,
			apiWordInput = `/${input}/json`;


		let synonymURL = `${wordApiBaseURL}${wordapikey}${apiWordInput}`;


		return fetch(synonymURL).then(res => {
			res.json().then(data => { 
				this.renderSynonyms(data.noun.syn);
				console.log(data.noun.syn);

			});
		});
	}
	RequestFromSynonyms(wordInput) {
		console.log(wordInput.target.textContent);
	}
}

(function () {
	let go = new MashedApi(document.querySelector('#page'));
})();