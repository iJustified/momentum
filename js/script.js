// Время
const time = document.querySelector('.time');

function showTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString()

    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}
showTime();

// Дата
const dateSite = document.querySelector('.date');

function showDate() {
    const date = new Date();
    // const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const currentDate = date.toLocaleDateString('en-GB', options);
    
    dateSite.textContent = currentDate;
    setTimeout(showDate, 1000);
}
showDate()

// Приветствие
const greeting = document.querySelector('.greeting');
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;

function getTimeOfDay() {
    const date = new Date()
    const currentTime = date.getHours()

    if(currentTime >= 0 && currentTime < 6) {return 'night'}
    if(currentTime >= 6 && currentTime < 12) {return 'morning'}
    if(currentTime >= 12 && currentTime < 18) {return 'afternoon'}
    if(currentTime >= 18) {return 'evening'}

    setTimeout(getTimeOfDay, 1000);
}
getTimeOfDay()

function showGreeting() {
    greeting.textContent = greetingText;
    setTimeout(showGreeting, 1000);
}
showGreeting()

// Сохраняем имя и город
const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)

// Фоновое изображение
const body = document.body;

function getRandomNum() {
    // min = Math.ceil(min);
    // max = Math.floor(max);

    // return Math.floor(Math.random() * (max - min) + min);

    randomNum = Math.floor(Math.random() * 20) + 1;
}
getRandomNum()

// randomNum = function (min, max) {
//     min = Math.ceil(1);
//     max = Math.floor(20);

//     return Math.floor(Math.random() * (20 - 1) + 1);
// }
// console.log(randomNum());

function setBg() {
    let timeOfDay = getTimeOfDay();
    // let bgNum = randomNum(1, 20).toString().padStart(2, '0');
    let bgNum = randomNum.toString().padStart(2, '0');

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/iJustified/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {      
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/iJustified/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    };
}
setBg()

// Слайдер
var randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
    randomNum += 1        
    if(randomNum > 20) {randomNum = 1}

    setBg()
}
function getSlidePrev() {
    randomNum -= 1
    if(randomNum < 1) {randomNum = 20}

    setBg()
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// виджет погоды
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

city.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather()
    }
})

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;  
    const res = await fetch(url);
    const data = await res.json(); 

    if(data.cod === '404' || data.cod === '400'){
        weatherError.textContent = 'City not found';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    } else {
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Ветер ${Math.round(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность ${Math.round(data.main.humidity)}`;
    }

    // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}
// getWeather()
setTimeout(() => {
    getWeather()
}, 500)

// цитата
async function getQuotes() {  
    const quotes = './data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    const quoteText = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const changeQuote = document.querySelector('.change-quote')
    
    quoteText.textContent = data[randomNum].text;
    author.textContent = data[randomNum].author;

    changeQuote.addEventListener('click', function() {
        getRandomNum();
        quoteText.textContent = data[randomNum].text;
        author.textContent = data[randomNum].author;
        console.log('hi');
    })
    
    // console.log(quoteText);
    // console.log(data);
}
getQuotes();

// плеер
import playList from './playList';
// console.log(playList);

const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play');

let isPlay = false;
let playNum = 0;

function playAudio() {
    if(!isPlay) {
        audio.src = playList[playNum].src;
        audio.play();
        playBtn.classList.add('pause');
        isPlay = true;
        liList[playNum].style.opacity = '1';
    } else {
        audio.src = playList[playNum].src;
        audio.pause();
        playBtn.classList.remove('pause');
        isPlay = false;
        liList[playNum].style.opacity = '0.8';
    }
};
playBtn.addEventListener('click', playAudio);

function playNext() {
    playNum += 1
    if(playNum > 5) {playNum = 0}
    audio.src = playList[playNum].src;
    audio.play();
    
    liList.forEach( function (el) {
        el.style.opacity = '0.8';
    });
    liList[playNum].style.opacity = '1';
};
const playNextBtn = document.querySelector('.play-next');
playNextBtn.addEventListener('click', playNext);

function playPrev() {
    playNum -= 1
    if(playNum < 0) {playNum = 5}
    audio.src = playList[playNum].src;
    audio.play();

    liList.forEach( function (el) {
        el.style.opacity = '0.8';
    });
    liList[playNum].style.opacity = '1';
};
const playPrevBtn = document.querySelector('.play-prev');
playPrevBtn.addEventListener('click', playPrev);

// плейлист
// const li = document.createElement('li');
const playListContainer = document.querySelector('.play-list')

playList.forEach( function (el, index) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    playListContainer.append(li);
    li.textContent = playList[index].title;
});

audio.addEventListener('ended', (event) => {
    playNext()
});

const liList = document.querySelectorAll('.play-item')

// for (let li of liList) {
//     // console.log(li);
// }
// console.log(liList[1].style.style.opacity = '1');

// setTimeout(function () {
//     const liList = document.querySelectorAll('.play-item')
//     console.log(liList.length);

//     for (let lip of liList) {
//         console.log(lip[1]);
//     }
// }, 3000); 
