const timeContainer = document.querySelector(".time-container");
const notMilliseconds = document.querySelector('.not-milliseconds');
const milliseconds = document.querySelector('.milliseconds');


let startTime = 0;
let elapsedTime = 0;
let mili = 0;
let hrs = 0;
let mins = 0;
let secs = 0;
let intervalId = null;
let paused = true;

timeContainer.addEventListener("click", (event) => {
    event.stopPropagation();
    let classes = event.target.classList;
    if (classes.contains('start-btn'))
        start();
    else if (classes.contains('pause-btn'))
        pause();
    else if (classes.contains('reset-btn'))
        reset();
});


function start() {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(display, 1);
    }
}

function pause() {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
}

function reset() {
    clearInterval(intervalId);
    elapsedTime = 0;
    paused = true;
    notMilliseconds.textContent = '00:00:00';
}

function display() {
    elapsedTime = Date.now() - startTime;

    mili = elapsedTime % 1000;
    secs = Math.floor(elapsedTime / 1000) % 60;
    mins = Math.floor(elapsedTime / 1000 / 60) % 60;
    hrs = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;

    mili = pad(mili, 3);
    secs = pad(secs, 2);
    mins = pad(mins, 2);
    hrs = pad(hrs, 2);

    milliseconds.textContent = `:${mili}`;
    notMilliseconds.textContent = `${hrs}:${mins}:${secs}`;

    function pad(time, length) {
        return String(time).padStart(length, '0');
    }
}
