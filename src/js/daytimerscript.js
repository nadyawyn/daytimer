window.addEventListener('DOMContentLoaded', function () {

	var audStart = new Audio('audio/start.wav'),
		//audStop = new Audio('audio/stop.wav'),
		audChoose = new Audio('audio/choose.wav');


	//Set the number of actions of Start button so far
	let actCounter = 0;
	if (localStorage.length != 0) {
		actCounter = localStorage.length;
	}

	//Setting the VARIABLES for the whole thing

	let actTagList = document.querySelector('.activities'),
		actOutput = document.getElementById('current-activity'),
		startButton = document.querySelector('.button_start'),
		stopButton = document.querySelector('.button_stop'),
		thisHistoryDiv = document.getElementById('history-activity'),
		counterOutputSerial = document.querySelector('.counter__output_serial'),
		counterOutputAccum = document.querySelector('.counter__output_accum'),
		counterOutputTimeline = document.querySelector('.counter__output_timeline'),
		timelineWrapperMarks = document.querySelector('.timeline__wrapper_marks'),
		timelineWrapperDigits = document.querySelector('.timeline__wrapper_digits'),
		//timelineElement = document.querySelector('.timeline__element'),
		//Getting the CURRENT DATE
		thisDate = new Date(),
		thisYear = thisDate.getFullYear(),
		thisMonth = thisDate.getMonth() + 1,
		thisDay = thisDate.getDate(),
		thisTimestamp = thisYear + '-' + thisMonth + '-' + thisDay,
		//COUNTER values
		hoursVal = 0,
		minutesVal = 0,
		secondsVal = 0,
		totalValSec = 0,
		timeInterval = '',

		tagColorBase = {};




	// Getting data from JSON file
	function getDataFromSettings() {
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
					myColor = myActivities[i].color,
					counterOutputItemAccum = document.createElement('div');

				myActy.classList.add('activities__item');

				counterOutputItemAccum.classList.add('counter__output-item_accum');
				counterOutputItemAccum.classList.add(myColor);
				counterOutputItemAccum.style.backgroundColor = myColor;
				counterOutputItemAccum.style.height = Math.floor(tagColorBase[myColor] / 1000 / 60) + 'px';
				//counterOutputItemAccum.id = myColor;

				myActy.innerHTML = '<svg width="16" height="16" viewBox="0 0 32 32"><path fill="' + myColor + '" d="M30.5 0h-12c-0.825 0-1.977 0.477-2.561 1.061l-14.879 14.879c-0.583 0.583-0.583 1.538 0 2.121l12.879 12.879c0.583 0.583 1.538 0.583 2.121 0l14.879-14.879c0.583-0.583 1.061-1.736 1.061-2.561v-12c0-0.825-0.675-1.5-1.5-1.5zM23 12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path></svg>' + '&nbsp;' + myActivities[i].name;
				actTagList.appendChild(myActy);
				myActy.id = myColor;

				counterOutputAccum.appendChild(counterOutputItemAccum);
			}
		}
	}

	//Tags behavior on click
	function chooseActivityTag() {
		actTagList.addEventListener('click', function (e) {
			audChoose.play();
			let tagText = e.target.textContent,
				tagColor = e.target.id;

			actOutput.innerHTML = '<p id="actOutputPar" class="' + tagColor + '" style="background-color: ' + tagColor + '; color:#fff">' + tagText + '</p>';
			startButton.classList.remove('inactive');
			startButton.textContent = 'start';
		});
	}
	//Start button behavior
	function startRecording() {
		startButton.addEventListener('click', function () {
			let thisActName = actOutput.textContent;

			if ((thisActName == '') || (this.classList.contains('inactive'))) {

			} else {
				audStart.play();
				this.classList.add('inactive');
				this.textContent = 'in progress...';
				stopButton.classList.remove('inactive');
				//defining OPERATION TIME
				let thisDateCur = new Date(),
					thisStartTime = new Date().getTime(),
					thisHours = thisDateCur.getHours(),
					thisMinutes = thisDateCur.getMinutes(),
					thisTime = thisHours + ':' + thisMinutes,
					//defining TAG color
					thisPar = document.getElementById('actOutputPar'),
					thisColor = thisPar.className,

					//creating elements for HISTORY output
					thisEntryTime = document.createElement('div'),
					thisEntryName = document.createElement('div'),

					thisEntryDate = document.createElement('div'),
					thisEntryColor = document.createElement('div'),

					thisEntryStart = document.createElement('div'),

					thisEntryStartHours = document.createElement('div'),
					thisEntryStartMin = document.createElement('div'),

					thisEntryDuration = document.createElement('div'),

					//creating elements for TIMER in progress output
					thisTimerInProgress = document.createElement('span'),
					thisTiPhours = document.createElement('span'),
					thisTiPminutes = document.createElement('span'),
					thisTiPseconds = document.createElement('span'),
					thisTiPDividerH = document.createElement('span'),
					thisTiPDividerM = document.createElement('span');

				//setting classes, contents, and adding HISTORY entry to place
				thisEntryTime.classList.add('history__entry-time');
				thisEntryTime.classList.add('num' + actCounter);
				thisEntryTime.textContent = thisTime;

				thisEntryName.classList.add('history__entry-name');
				thisEntryName.textContent = thisActName;
				thisEntryName.classList.add('num' + actCounter);

				thisEntryDate.classList.add('history__entry-date');
				thisEntryDate.classList.add('thishidden');
				thisEntryDate.classList.add('num' + actCounter);
				thisEntryDate.textContent = thisTimestamp;

				thisEntryColor.classList.add('history__entry-color');
				thisEntryColor.classList.add('thishidden');
				thisEntryColor.classList.add('num' + actCounter);
				thisEntryColor.textContent = thisColor;

				thisEntryStart.classList.add('history__entry-start');
				thisEntryStart.classList.add('thishidden');
				thisEntryStart.classList.add('num' + actCounter);
				thisEntryStart.textContent = thisStartTime;

				thisEntryStartHours.classList.add('history__entry-start_hours');
				thisEntryStartHours.classList.add('thishidden');
				thisEntryStartHours.classList.add('num' + actCounter);
				thisEntryStartHours.textContent = thisHours;

				thisEntryStartMin.classList.add('history__entry-start_min');
				thisEntryStartMin.classList.add('thishidden');
				thisEntryStartMin.classList.add('num' + actCounter);
				thisEntryStartMin.textContent = thisMinutes;

				thisEntryDuration.classList.add('history__entry-duration');
				thisEntryDuration.classList.add('num' + actCounter);



				thisHistoryDiv.appendChild(thisEntryDate);
				thisHistoryDiv.appendChild(thisEntryTime);
				thisHistoryDiv.appendChild(thisEntryName);
				thisHistoryDiv.appendChild(thisEntryColor);
				thisHistoryDiv.appendChild(thisEntryStart);
				thisHistoryDiv.appendChild(thisEntryStartHours);
				thisHistoryDiv.appendChild(thisEntryStartMin);
				thisHistoryDiv.appendChild(thisEntryDuration);

				//setting classes, contents, and adding TIMER to place
				thisTimerInProgress.classList.add('timer-in-progress');
				thisTiPhours.classList.add('timer__hours');
				thisTiPhours.textContent = '00';
				thisTiPminutes.classList.add('timer__minutes');
				thisTiPminutes.textContent = '00';
				thisTiPseconds.classList.add('timer__seconds');
				thisTiPseconds.textContent = '00';
				thisTiPDividerH.textContent = ':';
				thisTiPDividerM.textContent = ':';

				thisPar.appendChild(thisTimerInProgress);
				thisTimerInProgress.appendChild(thisTiPhours);
				thisTimerInProgress.appendChild(thisTiPDividerH);
				thisTimerInProgress.appendChild(thisTiPminutes);
				thisTimerInProgress.appendChild(thisTiPDividerM);
				thisTimerInProgress.appendChild(thisTiPseconds);


				//setting up self-updading TIMER values
				timeInterval = setInterval(updateClock, 1000);
			}

		});
	}
	//Dynamic timer update
	function updateClock() {
		//setting variables for TIMER values
		let hours = document.querySelector('.timer__hours'),
			minutes = document.querySelector('.timer__minutes'),
			seconds = document.querySelector('.timer__seconds');

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
	//Stop button behavior
	function stopRecording() {
		stopButton.addEventListener('click', function () {
			if (this.classList.contains('inactive')) {

			} else {
				audStart.play();
				clearInterval(timeInterval);
				stopButton.classList.add('inactive');
				startButton.textContent = 'set a tag';

				//reseting the previous TIMER values
				secondsVal = 0;
				minutesVal = 0;
				hoursVal = 0;
				totalValSec = 0;

				//getting END time
				let resultEndTime = new Date().getTime(),
					//getting data from HISTORY
					resultName = document.querySelectorAll('.num' + actCounter)[2].textContent,
					resultColor = document.querySelectorAll('.num' + actCounter)[3].textContent,
					resultStartTime = document.querySelectorAll('.num' + actCounter)[4].textContent,
					resultStartHours = document.querySelectorAll('.num' + actCounter)[5].textContent,
					resultStartMin = document.querySelectorAll('.num' + actCounter)[6].textContent,

					//getting DURATION
					resultDuration = resultEndTime - +resultStartTime,
					resultDsec = Math.floor((resultDuration / 1000) % 60),
					resultDmin = Math.floor((resultDuration / 1000 / 60) % 60),
					resultDhour = Math.floor((resultDuration / (1000 * 60 * 60)) % 24),

					resultDurationOutput = document.querySelectorAll('.num' + actCounter)[7];

				resultDurationOutput.textContent = resultDhour + ':' + resultDmin + ':' + resultDsec;

				//changing OPACITY of output data
				let actOutputPar = document.getElementById('actOutputPar');
				actOutputPar.style.opacity = '0.3';

				//forming data ARRAY to save
				let resultArray = {
					ind: actCounter,
					date: thisTimestamp,
					name: resultName,
					color: resultColor,
					duration: resultDuration,
					starthours: resultStartHours,
					startmin: resultStartMin
				};
				//saving data to Local Storage

				localStorage.setItem(actCounter, JSON.stringify(resultArray));
				actCounter++;
				getDataFromLocalStorage();
			}


		});
	}
	//Get progress data on refresh
	function getDataFromLocalStoragePrev() {
		for (let i = 0; i < localStorage.length; i++) {

			let myArr = JSON.parse(localStorage.getItem(i));

			if (myArr) {
				let outputWidth = Math.floor(myArr.duration / 1000 / 60),
					outputWidthTimeline = Math.floor(myArr.duration / 1000 / 60 / 5 * 3),
					counterOutputItemSerial = document.createElement('div');

				counterOutputItemSerial.classList.add('counter__output-item');
				counterOutputItemSerial.classList.add('counter__output-item_serial');
				counterOutputItemSerial.style.width = outputWidth + 'px';
				counterOutputItemSerial.style.backgroundColor = myArr.color;

				counterOutputSerial.appendChild(counterOutputItemSerial);

				//Forming previous colored columns on TIMELINE
				drawHistTagOnTimeline(myArr.starthours, myArr.startmin, outputWidthTimeline, myArr.color);
				console.log(myArr.starthours);
				console.log(myArr.startmin);
			}


		}
	}
	//Get data from local storage
	function getDataFromLocalStorage() {

		for (let i = actCounter - 1; i < localStorage.length; i++) {

			let myArr = JSON.parse(localStorage.getItem(i));


			//Forming colored blocks for SERIAL output
			let outputWidth = Math.floor(myArr.duration / 1000 / 60),
				counterOutputItemSerial = document.createElement('div');

			counterOutputItemSerial.classList.add('counter__output-item');
			counterOutputItemSerial.classList.add('counter__output-item_serial');
			counterOutputItemSerial.style.width = outputWidth + 'px';
			counterOutputItemSerial.style.backgroundColor = myArr.color;

			counterOutputSerial.appendChild(counterOutputItemSerial);

			//Forming colored columns for ACCUM output


			let thisCycleHeight = Math.floor(myArr.duration / 1000 / 60),
				previousHeight = 0;
			if (tagColorBase[myArr.color]) {
				previousHeight = Math.floor(tagColorBase[myArr.color] / 1000 / 60);
			} else {

			}

			let counterOutputAccumItem = document.querySelectorAll('.counter__output-item_accum'),

				totalHeight = thisCycleHeight + previousHeight;

			for (let i = 0; i < counterOutputAccumItem.length; i++) {

				if (counterOutputAccumItem[i].classList.contains(myArr.color)) {
					counterOutputAccumItem[i].style.height = totalHeight + 'px';
				}

			}

			//Forming colored colums on TIMELINE
			let widthOnTimeline = Math.floor(myArr.duration / 1000 / 60 / 5 * 3);
			//drawTagOnTimeline(widthOnTimeline, myArr.color);
			drawHistTagOnTimeline(myArr.starthours, myArr.startmin, widthOnTimeline, myArr.color);

		}



	}
	//Count how much time in total is spent on a certain action
	function sumUpSpentTime() {
		let myArrPrev = {};
		for (let i = 0; i < localStorage.length; i++) {

			myArrPrev = JSON.parse(localStorage.getItem(i));

			if (myArrPrev) {
				if (!tagColorBase[myArrPrev.color]) {
					tagColorBase[myArrPrev.color] = myArrPrev.duration;
				} else {
					tagColorBase[myArrPrev.color] = Number(tagColorBase[myArrPrev.color]) + Number(myArrPrev.duration);
				}
			}

		}

	}

	function drawOneHour() {
		for (let i = 0; i < 12; i++) {
			let oneMark = document.createElement('div');
			oneMark.classList.add('timeline__mark');
			if (i == 0) {
				oneMark.classList.add('timeline__mark_high');
			} else if (i == 6) {
				oneMark.classList.add('timeline__mark_mid');
			} else {
				oneMark.classList.add('timeline__mark_low');
			}

			timelineWrapperMarks.appendChild(oneMark);
		}
	}

	function drawTimeline() {
		for (let i = 0; i < 24; i++) {
			drawOneHour();
		}
	}

	function drawDigits() {
		for (let i = 0; i < 24; i++) {
			let oneDigit = document.createElement('div');
			oneDigit.classList.add('timeline__digit');
			oneDigit.textContent = i;
			timelineWrapperDigits.appendChild(oneDigit);
		}

	}

	function drawTagOnTimeline(thisWidth, thisBg) {
		// текущая дата
		let thisDate = new Date(),
			thisElHour = thisDate.getHours(),
			thisElMin = thisDate.getMinutes(),
			timelineElement = document.createElement('div');

		thisElHour = thisElHour * 36;
		thisElMin = Math.floor(thisElMin / 5 * 3);

		let thisElTime = thisElHour + thisElMin;

		timelineElement.classList.add('timeline__element');
		counterOutputTimeline.appendChild(timelineElement);

		timelineElement.style.left = thisElTime + 'px';
		timelineElement.style.width = thisWidth + 'px';
		timelineElement.style.backgroundColor = thisBg;
		// час в текущей временной зоне
		//console.log(thisDate.getHours());
		//console.log(thisDate.getMinutes());
	}

	function drawHistTagOnTimeline(thisTimeHour, thisTimeMin, thisWidth, thisBg) {
		// текущая дата
		let
			thisElHour = thisTimeHour,
			thisElMin = thisTimeMin,
			timelineElement = document.createElement('div');

		thisElHour = thisElHour * 36;
		thisElMin = Math.floor(thisElMin / 5 * 3);

		let thisElTime = thisElHour + thisElMin;

		timelineElement.classList.add('timeline__element');
		counterOutputTimeline.appendChild(timelineElement);

		timelineElement.style.left = thisElTime + 'px';
		timelineElement.style.width = thisWidth + 'px';
		timelineElement.style.backgroundColor = thisBg;
		// час в текущей временной зоне
		//console.log(thisDate.getHours());
		//console.log(thisDate.getMinutes());
	}


	//drawTagOnTimeline(50, 'red');

	sumUpSpentTime();
	getDataFromLocalStoragePrev();
	getDataFromSettings();
	chooseActivityTag();
	startRecording();
	stopRecording();


	drawTimeline();
	drawDigits();

	console.log(tagColorBase);

	function clearLocalStorage() {
		let clearLS = document.getElementById('clearls');

		clearLS.addEventListener('click', function () {
			localStorage.clear();
		});
	}
	clearLocalStorage();
});