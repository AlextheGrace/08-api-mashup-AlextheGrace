//dependencies
import 'popper.js';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';





let test = process.env.EXAMPLE_API_KEY;

 let search = document.querySelector(".form-control");
 let searchButton = document.querySelector('#search-button');


searchButton.addEventListener('click',getSearchValue);

getSearchValue = function(){
    console.log("testing");
}