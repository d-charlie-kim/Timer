const $hourButton = document.querySelector('.hour-num');
const $minButton = document.querySelector('.min-num');
const $secButton = document.querySelector('.sec-num');
const $pButton = document.getElementById('play-pause');
const $resetButton = document.getElementById('reset');
const storage = {
	start: false,
	input: false,
	hrs: 0,
	min: 0,
	sec: 0,
	hrsIntervalID: null,
	minIntervalID: null,
	secIntervalID: null,
}

render();

$hourButton.addEventListener('click', () => {
	storage.hrs += 1;
	checkInput();
});

$minButton.addEventListener('click', () => {
	storage.min += 1;
	checkInput();
});

$secButton.addEventListener('click', () => {
	storage.sec += 10;
	checkInput();
});

$pButton.addEventListener('click', () => {
	if (!storage.input)
		return;

	if (storage.start) {
		storage.start = false;
		storage.classList.add('pause');
	}
	else {
		storage.start = true;
		storage.classList.remove('pause');
		timerStart();
	}
})

$resetButton.addEventListener('click', clear);

function clear() {
	storage.start = false;
	clearInterval(storage.hrsIntervalID);
	clearInterval(storage.minIntervalID);
	clearInterval(storage.secIntervalID);
	storage.hrs = 0;
	storage.min = 0;
	storage.sec = 0;
	render();
}

function checkInput() {
	if (storage.sec >= 60) {
		storage.min += 1;
		storage.sec = 0;
	}
	if (storage.min >= 60) {
		storage.hrs += 1;
		storage.min = 0;
	}
	if (storage.hrs >= 99) {
		storage.hrs = 99;
	}
	render();
}

function render() {
	if (storage.hrs === 0 && storage.min === 0 && storage.sec === 0) {
		storage.input = false;
		$resetButton.classList.add('disabled');
		$pButton.classList.add('disabled');
	}
	else if (!storage.input) {
		storage.input = true;
		$resetButton.classList.remove('disabled');
		$pButton.classList.remove('disabled');
	}

	if (storage.hrs < 10)
		$hourButton.innerText = '0' + storage.hrs;
	else
		$hourButton.innerText = storage.hrs;
	if (storage.min < 10)
		$minButton.innerText = '0' + storage.min;
	else
		$minButton.innerText = storage.min;
	if (storage.sec < 10)
		$secButton.innerText = '0' + storage.sec;
	else
		$secButton.innerText = storage.sec;
}

function timerStart() {
	storage.secIntervalID = setInterval(function () {
		if (storage.min === 0 && storage.hrs === 0 && storage.sec === 0)
			clear();

		storage.sec--;
		if (storage.sec === 0) {
			storage.sec = 60;
			storage.min--;
		}
		if (storage.min === 0) {
			storage.min = 60;
			storage.hrs--;
		}
		render();
	}, 1000);

	// storage.minIntervalID = setInterval(function () {
	// 	min++;
	// 	if (min == 60) {
	// 		min = 0;
	// 	} else if (min < 10) {
	// 		min = "0" + min;
	// 	}
	// 	document.getElementById("min").innerText = min;
	// }, 60000);

	// storage.hrsIntervalID = setInterval(function () {
	// 	hour++;
	// 	if (hour < 10) {
	// 		hour = "0" + hour;
	// 	}
	// 	document.getElementById("hour").innerText = hour;
	// }, 3600000);
}


window.onload = function () {

	let timer_sec;
	let timer_min;
	let timer_hour;
	let timer_micro;

	let timer = 0;

	//click start button
	document.getElementById("start").addEventListener("click", function () {
		//console.log(timer);
		if (timer > 0) {
			return;
		}

		var micro = parseInt(document.getElementById("micro").innerText);
		var sec = parseInt(document.getElementById("sec").innerText);
		var min = parseInt(document.getElementById("min").innerText);
		var hour = parseInt(document.getElementById("hour").innerText);

		//start seconds
		timer_micro = setInterval(function () {
			micro++;
			if (micro == 100) {
				micro = "00";
			} else if (micro < 10) {
				micro = "0" + micro;
			}
			document.getElementById("micro").innerText = micro;
		}, 10);

		//start seconds
		timer_sec = setInterval(function () {
			//console.log(i);
			sec++;
			if (sec == 60) {
				sec = "00";
			} else if (sec < 10) {
				sec = "0" + sec;
			}
			document.getElementById("sec").innerText = sec;
		}, 1000);

		//start minutes
		timer_min = setInterval(function () {
			min++;

			if (min == 60) {
				min = 0;
			} else if (min < 10) {
				min = "0" + min;
			}

			document.getElementById("min").innerText = min;
		}, 60000);

		//start hours
		timer_hour = setInterval(function () {
			//console.log(hour);
			hour++;

			if (hour < 10) {
				hour = "0" + hour;
			}

			document.getElementById("hour").innerText = hour;

		}, 3600000);

		timer++;
		//console.log(timer);
	});

	//click stop button
	document.getElementById("stop").addEventListener("click", function () {
		stop();
	});

	function stop() {
		clearInterval(timer_micro);
		clearInterval(timer_sec);
		clearInterval(timer_min);
		clearInterval(timer_hour);

		timer--;
		if (timer < 0)
			timer = 0;
	}

	//click clear button
	document.getElementById("clear").addEventListener("click", function () {
		stop();
		document.getElementById("micro").innerText = "00";
		document.getElementById("sec").innerText = "00";
		document.getElementById("min").innerText = "00";
		document.getElementById("hour").innerText = "00";
	});
}