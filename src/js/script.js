window.addEventListener('DOMContentLoaded', function () {

	//Set the number of actions of Start button so far
	let actCounter = 0,
		localStorageNumber = localStorage.getItem('actCounter');
	if (localStorageNumber != 0) {
		actCounter = localStorageNumber;
	}


	let activitiesUl = document.querySelector('.activities');

	// Getting data from JSON file

	let requestURL = 'settings.json',
		request = new XMLHttpRequest();

	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();

	request.onload = function () {
		let settingsList = request.response,
			myActivitiesExp = settingsList.activitiesexp;
		showActivities(myActivitiesExp);
	};


	// Outputting the activities in the list

	function showActivities(actList) {
		let myActivities = actList;
		myActivities.sort(function (a, b) {
			let nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});

		for (let i = 0; i < myActivities.length; i++) {

			let myActy = document.createElement('li'),
				myColor = myActivities[i].color;

			myActy.classList.add('activities__item');

			myActy.innerHTML = '<svg width="16" height="16" viewBox="0 0 32 32"><path fill="' + myColor + '" d="M30.5 0h-12c-0.825 0-1.977 0.477-2.561 1.061l-14.879 14.879c-0.583 0.583-0.583 1.538 0 2.121l12.879 12.879c0.583 0.583 1.538 0.583 2.121 0l14.879-14.879c0.583-0.583 1.061-1.736 1.061-2.561v-12c0-0.825-0.675-1.5-1.5-1.5zM23 12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path></svg>' + '&nbsp;' + myActivities[i].name;
			activitiesUl.appendChild(myActy);
			myActy.id = myColor;
		}

	}

	//Tags behavior on click

	let actTagList = document.querySelector('.activities'),
		actOutput = document.getElementById('current-activity');

	actTagList.addEventListener('click', function (e) {
		let tagText = e.target.textContent,
			tagColor = e.target.id;
		//actOutput.textContent = tagText;
		actOutput.innerHTML = '<p id="actOutputPar" class="' + tagColor + '" style="background-color: ' + tagColor + '; color:#fff">' + tagText + '</p>';
		startButton.classList.remove('inactive');
		startButton.textContent = 'start';
	});


	//Start & Stop buttons activation

	let startButton = document.querySelector('.button_start'),
		stopButton = document.querySelector('.button_stop'),
		thisActName = actOutput.textContent,
		thisPar = document.getElementById('actOutputPar');
	//thisColor = thisPar.className;


	startButton.addEventListener('click', function () {
		if ((actOutput.textContent == '') || (this.classList.contains('inactive'))) {

		} else {
			actCounter++;
			localStorage.setItem("actCounter", actCounter);
			this.classList.add('inactive');
			this.textContent = 'in progress...';

			let //thisActName = actOutput.textContent,
				//thisStartTime = new Date().getTime(),
				//thisPar = document.getElementById('actOutputPar'),
				thisColor = thisPar.className,
				//Date operations
				thisDate = new Date(),
				thisYear = thisDate.getFullYear(),
				thisMonth = thisDate.getMonth() + 1,
				thisDay = thisDate.getDate(),
				thisHours = thisDate.getHours(),
				thisMinutes = thisDate.getMinutes(),
				thisTime = thisHours + '-' + thisMinutes,
				thisTimestamp = thisYear + '-' + thisMonth + '-' + thisDay,

				thisEntryTime = document.createElement('div'),
				thisEntryName = document.createElement('div'),
				thisEntryDuration = document.createElement('span'),
				thisEDhours = document.createElement('span'),
				thisEDminutes = document.createElement('span'),
				thisEDseconds = document.createElement('span'),
				thisDividerH = document.createElement('span'),
				thisDividerM = document.createElement('span'),

				thisHistoryDiv = document.getElementById('history-activity');

			thisEntryTime.classList.add('history__entry-time');
			thisEntryTime.textContent = thisTime;
			thisEntryName.classList.add('history__entry-name');
			thisEntryName.textContent = thisActName;
			thisEntryDuration.classList.add('history__entry-duration');
			thisEntryDuration.id = thisTime;
			thisEDhours.classList.add('history__entry-duration_hours');
			thisEDhours.textContent = '00';
			thisEDminutes.classList.add('history__entry-duration_minutes');
			thisEDminutes.textContent = '00';
			thisEDseconds.classList.add('history__entry-duration_seconds');
			thisEDseconds.textContent = '00';
			thisDividerH.textContent = ':';
			thisDividerM.textContent = ':';

			thisHistoryDiv.appendChild(thisEntryTime);
			thisHistoryDiv.appendChild(thisEntryName);
			thisPar.appendChild(thisEntryDuration);
			thisEntryDuration.appendChild(thisEDhours);
			thisEntryDuration.appendChild(thisDividerH);
			thisEntryDuration.appendChild(thisEDminutes);
			thisEntryDuration.appendChild(thisDividerM);
			thisEntryDuration.appendChild(thisEDseconds);

			//Counter
			let hoursVal = 0,
				minutesVal = 0,
				secondsVal = 0,
				totalValSec = 0,
				hours = document.querySelector('.history__entry-duration_hours'),
				minutes = document.querySelector('.history__entry-duration_minutes'),
				seconds = document.querySelector('.history__entry-duration_seconds'),
				testTC = document.querySelector('.testTimeCheck'),

				timeInterval = setInterval(updateClock, 1000);


			function updateClock() {
				totalValSec++;
				testTC.textContent = totalValSec;

				if (secondsVal < 59) {
					secondsVal++;
				} else {
					secondsVal = 0;
					if (minutesVal < 59) {
						minutesVal++;
					} else {
						minutesVal = 0;
						hoursVal++;
					}
				}

				if (secondsVal < 10) {
					seconds.textContent = '0' + secondsVal;
				} else {
					seconds.textContent = secondsVal;
				}
				if (minutesVal < 10) {
					minutes.textContent = '0' + minutesVal;
				} else {
					minutes.textContent = minutesVal;
				}
				if (hoursVal < 10) {
					hours.textContent = '0' + hoursVal;
				} else {
					hours.textContent = hoursVal;
				}

			}
			updateClock();

			let thisArray = {
				date: thisTimestamp,
				name: thisActName,
				color: thisColor,
				//duration: totalValSec
			};
			localStorage.setItem(actCounter, JSON.stringify(thisArray));
			//localStorage.setItem(thisTime, JSON.stringify(thisArray));
			//localStorage.setItem(thisActName, JSON.stringify(thisArrayTwo));

		}

	});


	let clearLS = document.getElementById('clearls');

	clearLS.addEventListener('click', function () {
		localStorage.clear();
	});


});