/*jslint browser: true*/
/*jslint plusplus: true */
/*global $, jQuery, alert, i:true*/

// Нововведения: Новый расчет цен на наркоту, новый расчет цен на перелеты, добавлены кнопки "продать все" и "+10", некоторые декоративные изменения
// кнопка "переждать денёк" (обновление цен не покидая города), подправлен расчет цен наркоты и перелетов, служебное сообщение мигает и исчезает
// режим чтения газеты, который определяет скидку (наценку) на определенную наркоту в определенном городе, учет скидки (наценки) в расчете цен наркоты
// Текстовые квесты с ветвистыми вариантами и различными концовками. Выбор вариантов может запускать некоторые события (вычитание/прибавление денег или изменения в инвентаре)
// Панелька с инвентарем. В инвентаре может отображаться цена покупки наркоты (приложение-запоминалка).Добавление видов наркоты после каждой миссии (с похвалой). Добавление городов после квестов.
// Нормальный перезапуск игры с инициализацией переменных. Сохранение в LocalStorage.


// TODO:
// Начать разработку приложения "Блокнот" с запоминанием цен и скидок
// todo Календарь (сколько дней прошло в игре)

// Инициализируем начальные переменные
var cities = ["Нью-Йорк", "Вашингтон", "Чикаго", "Атланта", "Бостон", "Альбукерки", "Сиэтл", "Балтимор"]; // список городов
var narcotics = ["Трава", "Спайс", "Экстази", "ЛСД", "Метамфетамин", "Кокаин", "Героин", "Х-Х-Х"]; // список наркоты
var narcStartPrices = [78, 324, 597, 871, 1167, 1480, 1827, (Math.random() * 2000 + 1234)]; // стартовые цены на наркоту
var myNarcotics = []; // наркоты в инвентаре (забиваем нулями, чтобы плюсовать числа)
for (i = 0; i < narcotics.length; i++) {
    myNarcotics[i] = 0;
}
var myNarkPrices = []; // сюда будем запоминать почем покупал наркоту (забиваем нулями, чтобы плюсовать числа)
for (i = 0; i < narcotics.length; i++) {
    myNarkPrices[i] = 0;
}
var narcoticsKnown; // стартовое количество известных наркотиков
var citiesKnown; // стартовое количество известных городов
var yourMoney; //начальное количество денег
var mission; // счетчик текущей миссии
var currentQuest; // счетчик текущего квеста
var days; // дней прошло
var daysInCity; // дней в одном городе
var currentCityId; // запоминаем ID текущего города
var currentCity; // имя текущего города / начальное значение (стартовый город)
var rememberCityId;
var narcLimit; // ограничение емкости инвентаря

var travelPrices = []; // храним текущие цены на перелеты
var narcPrices = []; // храним текущие цены на наркоту
var discount; // скидка (1) или наценка (0)
var narcDiscount; // скидка/наценка на наркоту (какая наркота)
var cityNarcDiscount; // город, в котором действует скидка/наценка на наркоту
var minNarcDiscount = 7; // минимальная скидка/наценка на наркоту в %
var maxNarcDiscount = 17; // максимальная скидка/наценка на наркоту в %
var narcDisc = 0; // переменная для расчета скидки/наценки на наркоту
var newsReaded; // читал ли уже газету?
var hasNoteApp; // есть ли приложение для запоминания цен?
var NoteAppBlock = document.querySelector('#noteapp');
var showConsol; // режим отладки (0/1)
var gameInProgress; // в процессе ли игра? (Не закончена ли?)
//localStorage["gameInProgress"] = false;

function newGame() {
    log("new game func started");
    narcoticsKnown = 3; // стартовое количество известных наркотиков
    citiesKnown = 3; // стартовое количество известных городов
    yourMoney = 2500; //начальное количество денег
    mission = 0; // счетчик текущей миссии
    currentQuest = 0; // счетчик текущего квеста
    days = 0; // дней прошло
    daysInCity = 0; // дней в одном городе
    currentCityId = -1; // запоминаем ID текущего города
    currentCity = "Москва"; // начальное значение (стартовый город)
    rememberCityId = -1;
    narcLimit = 100; // ограничение емкости инвентаря (100 единиц изначально)
    travelPrices = []; // храним текущие цены на перелеты
    narcPrices = []; // храним текущие цены на наркоту
    narcDiscount = -1; // скидка/наценка на наркоту (какая наркота)
    cityNarcDiscount = -1; // город, в котором действует скидка/наценка на наркоту
    narcDisc = 0; // переменная для расчета скидки/наценки на наркоту
    newsReaded = 0; // читал ли уже газету?
    hasNoteApp = 1; // есть ли приложение для запоминания цен?
    showConsol = 0; // режим отладки, показывает консоль (0/1)
    gameInProgress = true; // игра в процессе

    setTravelPrices(); // устанавливаем цены на перелеты
    missions();
}

function initGame() {
    log("game initiated");
    
    //localStorage["gameInProgress"] = false; // чтобы не заедало временная заглушка
    
    if (!resumeGame()) {
        log("new game started");
        newGame();
    }
}


// выводим значения (инвентарь)
function showStats() {
    if (showConsol) {
        document.querySelector('#stats').style.display = "block";
        document.querySelector('#consol').style.display = "block";
        document.querySelector('#stats').innerHTML = "<span>У тебя: " + yourMoney + " $</span>"; // выводим деньги
        for (i = 0; i < narcotics.length; i++) {
            if (myNarcotics[i]) {
                document.querySelector('#stats').innerHTML += "<span> | " + narcotics[i] + ": " + myNarcotics[i] + "</span>"; // выводим наркоту, если есть
                if (hasNoteApp) {
                    document.querySelector('#stats').innerHTML += "<span> по " + myNarkPrices[i] + " $</span>"; // выводим цену, за которую покупали
                }
            }
        }
    }
    NoteAppBlock.innerHTML = "<p style='text-decoration: underline; color: #597FA0; font-weight: bold;'>Твоя собственность:</p>";
    NoteAppBlock.innerHTML += "<p style='color: #2aa26f;'>У тебя <strong style='color: #38DE97;'>" + yourMoney + " $</strong></p>"; // выводим деньги
    for (i = 0; i < narcotics.length; i++) {
        if (myNarcotics[i] && (myNarcotics[i] > 0)) {

            if (hasNoteApp) {
                NoteAppBlock.innerHTML += "<p style='font-size: 13px;'>" + narcotics[i] + ": <strong style='font-size: 16px;'>" + myNarcotics[i] + "</strong><span> по <strong>" + myNarkPrices[i] + " $</strong></span></p>"; // выводим цену, за которую покупали, если есть приложение
            } else {
                NoteAppBlock.innerHTML += "<p>" + narcotics[i] + ": <strong>" + myNarcotics[i] + "</strong></p>"; // выводим наркоту, если есть
            }
        } else {
            NoteAppBlock.innerHTML += "<p>&nbsp;</p>";
        }
    }
    NoteAppBlock.innerHTML += "<br/><p style='color: #2aa26f;'>Всего: <strong style='color: #38DE97;'>" + countNark() + "</strong> / <strong style='color: #38DE97;'>" + narcLimit + "</strong></p>"; // дней в игре
    NoteAppBlock.innerHTML += "<br/><p style='color: #2aa26f;'>Дней в деле: <strong style='color: #38DE97;'>" + days + "</strong></p>"; // дней в игре
    
}

// вывод и выбор городов
function chooseCity(currentCity, currentCityId) {
    clearScreen();

    log("Choosecity");

    setTravelPrices(currentCityId);
    out("<p>Вы в аэропорту города <strong>" + currentCity + "</strong>.</p><p>В какой город полетим?</p>");
    for (i = 0;
        (i < citiesKnown) & (i < cities.length); i++) {
        out("<p><button>" + cities[i] + "</button> <span class='prices'>" + travelPrices[i] + " $</span></p>");
    }
    if (currentCityId >= 0) {
        out("<p><button class='return'>Назад в город</button></p>");
    }
    lookClickCity(); // прослушка нажатия на кнопку города
    showStats();
    gameOver();
}

// вывод и выбор наркоты
function chooseNarc(city, cityId) {
    log("chooseNark");
    clearScreen();
    setNarcPrices(cityId);
    out("<p>Вы прибыли в <strong>" + city + "</strong>.</p>" + "<p>" + "Что будем покупать?" + "</p>");
    for (var i = 0;
        (i < narcoticsKnown) & (i < narcotics.length); i++) {
        out("<p><span class='name'>" + narcotics[i] + "</span> <span class='prices'>" + narcPrices[i] + " $" + " </span><button class='buy' id='" + i + "'>Купить</button> <button class='buy10' id='" + i + "'>+10</button> " + " <button class='sell' id='" + i + "'>Продать</button> " + " <button class='sell_all' id='" + i + "'>Продать всё</button> " + "</p>");
    }
    var readNewsButton = "<button class='readnews'>Купить газету (-" + setPaperPrice() + "$)</button>";
    var reReadNewsButton = "<button class='rereadnews'>Перечитать газету</button>";
    out("<p><button class='fly'>В аэропорт!</button><button class='wait'>Переждать денёк (-" + setWaitincityPrice() + "$)</button>" + (newsReaded ? reReadNewsButton : readNewsButton) + "</p>");
    lookClickNark(); // прослушка нажатия на кнопку наркоты
}

// обработчик клика по кнопке города
function lookClickCity() {
    document.getElementById('main').onclick = function (e) {
        var event = e;
        var target = event.target;
        // нажали "вернуться в город"
        if (target.className == "return") {
            chooseNarc(currentCity, currentCityId);
        }
        for (var i = 0; i < cities.length; i++) {

            // выбрали город
            if (cities[i] == target.innerHTML) {
                if (currentCityId != i) {
                    if (yourMoney >= travelPrices[i]) { // проверяем, хватает ли денег на перелет
                        yourMoney -= travelPrices[i];
                        currentCityId = i;
                        currentCity = target.innerHTML;
                        daysInCity = 0;
                        days += 1;
                        newsReaded = 0;
                        chooseNarc(currentCity, currentCityId); // переходим к выбору наркоты
                        setTravelPrices(); // обновляем цены на перелеты
                        showStats(); // обновляем инвентарь
                        missions(); // играем миссию, если подходит по условиям
                        readyForQuest(); // играем квест, если подходит по условию
                        break;
                    } else {
                        //out("Не хватает денег на перелет в этот город!");
                        outAdd("Не хватает денег на перелет в этот город!");
                    }
                } else {
                    //out("Ты уже и так в этом городе, ёпта!");
                    outAdd("Ты уже и так в этом городе, ёпта!");
                }
            }
        }
    };
}

// обработчик клика на экране покупки наркоты
function lookClickNark() {
    document.getElementById('main').onclick = function (e) {
        var event = e;
        var target = event.target;
        // Нажали "в аэропорт" или "переждать"
        if (target.className === "fly") {
            rememberCityId = currentCityId; // запоминаем текущий город
            chooseCity(currentCity, currentCityId); // переходим к выбору города
        } else if (target.className === "wait") {
            var waitCost = setWaitincityPrice();
            if (yourMoney >= (waitCost)) {
                rememberCityId = -1;
                yourMoney -= (waitCost);
                daysInCity += 1;
                days += 1;
                newsReaded = 0;
                showStats(); // обновляем инвентарь
                chooseNarc(currentCity, currentCityId); // обновляем цены на экране
            } else {
                outAdd("Не хватает денег на ночлег!");
            }
        } else if (target.className === "readnews") {
            var newsCost = setPaperPrice();
            if (yourMoney >= newsCost) {
                yourMoney -= newsCost;
                rememberCityId = currentCityId;
                showStats(); // обновляем инвентарь
                readNews();
            } else {
                outAdd("Не хватает денег на покупку газеты!");
            }
        } else if (target.className === "rereadnews") {
            readNews();
        }
        // нажали на покупку наркоты
        for (var i = 0; i < narcotics.length; i++) {
            if (i == target.id) {
                if (target.className === "buy") {
                    if (countNark() < narcLimit) {
                        log(countNark());
                        log(narcLimit);
                        if (yourMoney >= narcPrices[i]) { // проверяем, хватает ли денег на покупку наркоты
                            yourMoney -= narcPrices[i]; // вычитаем деньги за покупку
                            myNarkPrices[i] = myNarcotics[i] * myNarkPrices[i]; // считаем сумму, для дальнейшего расчета средней цены
                            myNarcotics[i] += 1; // кладем наркоту в инвентарь
                            myNarkPrices[i] = +((myNarkPrices[i] + narcPrices[i]) / myNarcotics[i]).toFixed(0); // запоминаем почем брали
                            showStats(); // обновляем инвентарь
                            break;
                        } else {
                            outAdd("Не хватает денег на покупку этой наркоты!");
                        }
                    } else {
                            outAdd("Не хватает места в инвентаре!");
                    }
                } else if (target.className === "buy10") {
                    if ((countNark() + 9) < narcLimit) {
                        if (yourMoney >= narcPrices[i] * 10) { // проверяем, хватает ли денег на покупку наркоты
                            yourMoney -= narcPrices[i] * 10; // вычитаем деньги за покупку
                            myNarkPrices[i] = myNarcotics[i] * myNarkPrices[i]; // считаем сумму, для дальнейшего расчета средней цены
                            myNarcotics[i] += 10; // кладем наркоту в инвентарь
                            myNarkPrices[i] = +((myNarkPrices[i] + narcPrices[i] * 10) / myNarcotics[i]).toFixed(1); // запоминаем почем брали
                            showStats(); // обновляем инвентарь
                            break;
                        } else {
                            outAdd("Не хватает денег на покупку этой наркоты!");
                        }
                    } else {
                            outAdd("Не хватает места в инвентаре!");
                    }
                } else if (target.className === "sell") {
                    if (myNarcotics[i]) { // проверяем, есть ли в инвентаре эта наркота
                        yourMoney += narcPrices[i]; // прибавляем деньги за продажу
                        myNarcotics[i] -= 1; // вычитаем наркоту из инвентаря
                        showStats(); // обновляем инвентарь
                        break;
                    } else {
                        outAdd("У вас нет этой наркоты!");
                    }
                } else if (target.className === "sell_all") {
                    if (myNarcotics[i]) { // проверяем, есть ли в инвентаре эта наркота
                        yourMoney += (narcPrices[i] * myNarcotics[i]); // прибавляем деньги за продажу
                        myNarcotics[i] = 0; // вычитаем наркоту из инвентаря
                        showStats(); // обновляем инвентарь
                        break;
                    } else {
                        outAdd("У вас нет этой наркоты!");
                    }
                }
            }
        }
    };
}