window.addEventListener('DOMContentLoaded', function () {

	let activitiesUl = document.querySelector('.activities');

	// Getting data from JSON file

	let requestURL = 'settings.json',
		request = new XMLHttpRequest();

	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

	request.onload = function () {
		let settingsList = request.response,
			myActivities = settingsList.activities;
		showActivities(myActivities);
	};


	// Outputting the activities in the list

	function showActivities(actList) {
		let myActivities = actList;
		myActivities.sort();

		for (let i = 0; i < myActivities.length; i++) {

			let myActy = document.createElement('li'),
				myColor = "#ddd";

			myActy.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="' + myColor + '" d="M30.5 0h-12c-0.825 0-1.977 0.477-2.561 1.061l-14.879 14.879c-0.583 0.583-0.583 1.538 0 2.121l12.879 12.879c0.583 0.583 1.538 0.583 2.121 0l14.879-14.879c0.583-0.583 1.061-1.736 1.061-2.561v-12c0-0.825-0.675-1.5-1.5-1.5zM23 12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path></svg>' + '&nbsp;' + myActivities[i];
			activitiesUl.appendChild(myActy);
		}

	}



});