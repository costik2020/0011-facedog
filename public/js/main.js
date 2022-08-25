
console.log("hello world");



// Grab the button

//const testBtn = document.querySelector(".myclass");
let buttonDog = document.querySelector(".button-dog");
let imgDog = document.querySelector(".img-dog");



buttonDog.addEventListener("click", ()=>{
	console.log("button was clicked");

	// Send a fetch request to my server
	fetch("/whoLetTheDogsOut")
		.then( (response)=>{console.log(response)} )
		.catch( (err)=>{console.log(err)} );
});










