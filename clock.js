// часы без даты
// window.onload = function(){
//   window.setInterval(function(){
//   let now = new Date();
//   let clock = document.getElementById("clock");
//   clock.innerHTML = now.toLocaleTimeString();
//   },1000);
// };

// часы с датой
(function (htmlClock) {

  // задаем массив дня и месяца для часов
  function watch(e) {
      const document = htmlClock.document;
      this.elem = document.getElementById(e);
      this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      this.days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  }

  // добавляем 0 если время меньше 10
  watch.prototype.addZero = function (i) {
      if (i < 10) {
          i = "0" + i;
          return i;
      }
      return i;
  };

  // добавляем дату + время для часов
  watch.prototype.updateClock = function () {
      let now = new htmlClock.Date();
      let year = now.getFullYear();
      let month = now.getMonth();
      let dayNo = now.getDay();
      let day = now.getDate();
      let hour = this.addZero(now.getHours());
      let minute = this.addZero(now.getMinutes());
      let second = this.addZero(now.getSeconds());
      // let result = this.days[dayNo] + ", " + day + " " + this.months[month] + " " + year + " " + hour + ":" + minute + ":" + second;
      let resultClock = hour + ":" + minute + ":" + second;
      let resultDate = this.days[dayNo] + ", " + day + " " + this.months[month] + " " + year;
      let self = this;
      // выводим часы
      self.elem.innerHTML = resultClock + "<br><br>" + resultDate;
      // обновляем часы каждую секунду
      htmlClock.setTimeout(function () {
          self.updateClock();
      }, 1000);
      
      // добавляем приветствие
      let greeting = document.getElementById("greeting");
      if(hour >= 6 && hour <= 11) {greeting.innerHTML = "Доброе утро, ";}
      if(hour >= 12 && hour <= 17) {greeting.innerHTML = "Добрый день, ";}
      if(hour >= 18 && hour <= 23) {greeting.innerHTML = "Добрый вечер, ";}
      if(hour >= 00 && hour <= 5) {greeting.innerHTML = "Доброй ночи, ";}
  };
  htmlClock.Clock = watch;
}(window));

// регистрируем обнову часов
function eventClock(elem, evType, fn, useCapture) {
  if (elem.addEventListener) {
      elem.addEventListener(evType, fn, useCapture);
  } else if (elem.attachEvent) {
      elem.attachEvent('on' + evType, fn);
  } else {
      elem['on' + evType] = fn;
  }
}

// добавляем часы на страницу
eventClock(window, "load", function () {
  if (document.getElementById("clock")) {
      let clock = new Clock("clock");
      clock.updateClock();
  }
});
// часы end

// имя
document.addEventListener('DOMContentLoaded', function() {
  let userName = document.querySelector('[name="user-name"].user-name');

  if (userName) {
    userName.value = localStorage.getItem("user-name-input") || "";

    userName.addEventListener('input', function() {
      localStorage.setItem("user-name-input", this.value);
    });
  }
});