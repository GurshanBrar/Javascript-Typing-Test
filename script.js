'use strict';

let main = document.getElementById('main');
let textContainer = document.getElementById('text-container');
let resultsContainer = document.getElementById('results');
let wpmText = document.getElementById('wpm');
let accuracyText = document.getElementById('accuracy');
let timeText = document.getElementById('time');

let leaderboardHtmlArr = [
    document.getElementsByClassName('leaderboard-first'),
    document.getElementsByClassName('leaderboard-second'),
    document.getElementsByClassName('leaderboard-third'),
];
let reloadButton = document.getElementById('reload-button');
const invalidKeys = 'F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Escape Tab CapsLock Shift Control Alt Meta ArrowLeft ArrowRight ArrowDown ArrowUp Enter'.split(
    ' ',
);
const text =
    'I hope your day is going well. Thanks for trying out my typing test. Did you know that this project was actually made for Hackclub? Hackclub is a worldwide, student led coding club for teens that strives to provide a comfortable and educational place to collaborate with others!';
const textArr = text.split('');
const htmlArr = textArr.map((item, index, array) => {
    if (item === ' ') {
        return `<span class="space" id="span${index}">${item}</span>`;
    }
    return `<span class="char" id="span${index}">${item}</span>`;
});
let errors = [];
textContainer.innerHTML = htmlArr.join('');
let firstTime = true;
let currentPos = 0;
let backspaceNeeded = false;
let currentTime = 0;
let repeat;
document.addEventListener('keydown', event => {
    if (event.key === ' ') {
        event.preventDefault();
    }
    if (firstTime) {
        firstTime = false;
        repeat = setInterval(() => currentTime++, 1000);
    }
    if (event.location === 0 && !invalidKeys.includes(event.key)) {
        handleKey(event.key);
    }
});

reloadButton.addEventListener('click', () => handlePlayAgain());

function handleKey(key) {
    let span = document.getElementById(`span${currentPos}`).style;
    if (!backspaceNeeded) {
        if (key === textArr[currentPos]) {
            span.color = 'green';
            currentPos++;
        } else {
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'red';
            } else {
                span.color = 'red';
            }
            backspaceNeeded = true;
            errors.push(textArr[currentPos]);
        }
    } else {
        if (event.key === 'Backspace') {
            if (textArr[currentPos] === ' ') {
                span.backgroundColor = 'transparent';
            } else {
                span.color = 'black';
            }
            backspaceNeeded = false;
        }
    }
    if (currentPos === textArr.length) {
        clearInterval(repeat);
        handleEnd();
        return;
    }
}
function handleEnd() {
    let wpm = Math.floor(textArr.length / 5 / (currentTime / 60));
    let accuracy = Math.floor(
        ((textArr.length - errors.length) / textArr.length) * 100,
    );
    let multiples = Math.floor(currentTime / 60);
    let seconds = currentTime - multiples * 60;
    wpmText.innerHTML = `${wpm} wpm`;
    accuracyText.innerHTML = `${accuracy}%`;
    timeText.innerHTML = `${multiples} m ${seconds} s`;

    // Check if localstorage exists
    let scoresArr;
    if (localStorage.length === 0) {
        scoresArr = [];
    } else {
        scoresArr = JSON.parse(localStorage.getItem('scoresArr'));
    }
    scoresArr.push({
        wpm: wpm,
        accuracy: accuracy,
        minutes: multiples,
        seconds: seconds,
    });
    scoresArr.sort((a, b) => b.wpm - a.wpm);
    let leaderboardArr = scoresArr.slice(0, 3);
    localStorage.setItem('scoresArr', JSON.stringify(leaderboardArr));

    leaderboardArr.forEach((item, index, array) => {
        let arr = leaderboardHtmlArr[index];
        arr[0].innerHTML = `${item.wpm} wpm`;
        arr[1].innerHTML = item.wpm;
        arr[2].innerHTML = `${item.accuracy}%`;
        arr[3].innerHTML = `${item.minutes} m ${item.seconds} s`;
    });
    main.style.display = 'none';
    resultsContainer.style.display = 'flex';
}

function handlePlayAgain() {
    // reset variables
    errors = [];
    firstTime = true;
    currentPos = 0;
    backspaceNeeded = false;
    currentTime = 0;
    repeat = null;

    // reset the colors
    for (let element of htmlArr) {
        let span = document.getElementById(`span${htmlArr.indexOf(element)}`);
        span.style.color = 'black';
    }

    // change displays
    main.style.display = 'block';
    resultsContainer.style.display = 'none';
}

function clearStorage() {
    localStorage.clear();

    leaderboardHtmlArr.forEach((item, index, array) => {
        item[0].innerHTML = 'none';
        item[1].innerHTML = 'none';
        item[2].innerHTML = 'none';
        item[3].innerHTML = 'none';
    });
}
