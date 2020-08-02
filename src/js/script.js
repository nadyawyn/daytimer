window.addEventListener('DOMContentLoaded', function () {

	let testOutput = document.querySelector('.test');

	// Getting data from JSON file

	let requestURL = 'settings.json',
		request = new XMLHttpRequest();

	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

	request.onload = function () {
		var activitiesList = request.response;
		console.log(activitiesList);
	};


});