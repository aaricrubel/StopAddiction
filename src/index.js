import "./styles.css";
import quote from "./quotes.js";

window.addEventListener("scroll", () => {
	if (window.pageYOffset > 1) {
		document.querySelector(".navbar").classList.add("transition");
	} else if (window.pageYOffset === 0) {
		document.querySelector(".navbar").classList.remove("transition");
	}
});

let highestStreak = {
	d: 0,
	h: 0,
	m: 0,
	s: 0
};
localStorage.setItem("highestStreak", JSON.stringify(highestStreak));

const qlen = quote.length;
let q = quote[Math.floor(Math.random() * qlen)];

let motivation = document.querySelector(".motivation");
motivation.innerHTML = `"${q.text}"`;
let author = document.querySelector(".author");
author.innerHTML = `- ${q.author}`;

let day = 0;
let hour = 0;
let minute = 0;
let second = 0;
let stopTime = true;
const counter = document.querySelector(".counter");
const resetBtn = document.querySelector("#reset-btn");
const startBtn = document.querySelector("#start-btn");

let startTimer = () => {
	if (stopTime === true) {
		stopTime = false;
		timerCycle();
	}
};

let stopTimer = () => {
	if (stopTime === false) {
		stopTime = true;
	}
};

var t;
function fun() {
	t = setTimeout(timerCycle, 1000);
}

let timerCycle = () => {
	startBtn.style.backgroundColor = "blue";
	startBtn.innerHTML = "Started";
	if (stopTime === false) {
		second = parseInt(second);
		minute = parseInt(minute);
		hour = parseInt(hour);
		day = parseInt(day);
		second++;
		if (second === 60) {
			minute++;
			second = 0;
		}
		if (minute === 60) {
			hour++;
			minute = 0;
		}
		if (hour === 24) {
			day++;
			hour = 0;
		}
		counter.innerHTML = `${day} days ${hour} hours ${minute} minutes ${second}`;
	}
	fun();
};

startBtn.addEventListener("click", startTimer);
var max = {
	d: 0,
	h: 0,
	m: 0,
	s: 0
};

let resetTimer = () => {
	let updated = JSON.parse(localStorage.getItem("highestStreak"));
	if (day > updated.d) {
		updated.d = day;
	}
	if (hour > updated.h) {
		updated.h = hour;
	}
	if (minute > updated.m) {
		updated.m = minute;
	}
	if (second > updated.s) {
		updated.s = second;
	}
	max = {
		d: updated.d,
		h: updated.h,
		m: updated.m,
		s: updated.s
	};
	localStorage.setItem("highestStreak", JSON.stringify(updated));
	day = 0;
	hour = 0;
	minute = 0;
	second = 0;
	stopTimer();
	clearTimeout(t);
	startBtn.style.backgroundColor = "red";
	startBtn.innerHTML = "Start";
	counter.innerHTML = `${day} days ${hour} hours ${minute} minutes ${second}`;
};
resetBtn.addEventListener("click", resetTimer);

const high = document.querySelector("#high");
high.innerHTML = `Your highest streak is ${max.d} days ${max.h} hours ${max.m} minutes ${max.s} seconds`;

const highLink = document.querySelector("#highLink");
highLink.addEventListener("click", () => {
	high.style.visibility = "visible";
});
