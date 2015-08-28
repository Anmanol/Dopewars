function supportsLocalStorage() {
    log("Storage checked");
    return ('localStorage' in window) && window['localStorage'] !== null;
}

function saveGameState() {
    if (!supportsLocalStorage()) {
        return false;
    }
    
    log(gameInProgress);
    rememberCityId = currentCityId; // запоминаем текущий город  чтобы цены не изменились
    localStorage["gameInProgress"] = gameInProgress;
    localStorage["yourMoney"] = yourMoney;
    localStorage["narcoticsKnown"] = narcoticsKnown; // стартовое количество известных наркотиков
    localStorage["citiesKnown"] = citiesKnown; // стартовое количество известных городов
    localStorage["mission"] = mission; // счетчик текущей миссии
    localStorage["currentQuest"] = currentQuest; // счетчик текущего квеста
    localStorage["days"] = days; // дней прошло
    localStorage["narcLimit"] = narcLimit; // ограничение инвентаря
    localStorage["daysInCity"] = daysInCity; // дней в одном городе
    localStorage["currentCityId"] = currentCityId; // запоминаем ID текущего города
    localStorage["currentCity"] = currentCity; // начальное значение (стартовый город)
    localStorage["rememberCityId"] = rememberCityId;
    for (var i = 0; i < cities.length; i++) {
        localStorage["travelPrices." + i] = travelPrices[i]; // храним текущие цены на перелеты
    }
    for (var i = 0; i < narcotics.length; i++) {
        localStorage["narcPrices." + i] = narcPrices[i]; // храним текущие цены на наркоту
    }
    for (var i = 0; i < myNarcotics.length; i++) {
        localStorage["myNarcotics." + i] = myNarcotics[i]; // наркоты в инвентаре
    }
    for (var i = 0; i < myNarkPrices.length; i++) {
        localStorage["myNarkPrices." + i] = myNarkPrices[i]; // храним текущие цены на наркоту
    }
    localStorage["narcDiscount"] = narcDiscount; // скидка/наценка на наркоту (какая наркота)
    localStorage["cityNarcDiscount"] = cityNarcDiscount; // город, в котором действует скидка/наценка на наркоту
    localStorage["narcDisc"] = narcDisc; // переменная для расчета скидки/наценки на наркоту
    localStorage["newsReaded"] = newsReaded; // читал ли уже газету?
    localStorage["hasNoteApp"] = hasNoteApp; // есть ли приложение для запоминания цен?
    localStorage["showConsol"] = showConsol; // режим отладки, показывает консоль (0/1)
    
    log(localStorage["gameInProgress"]);
    log("game saved");
    return true;
}

function resumeGame() {
    if (!supportsLocalStorage()) {
        return false;
    }
    //log(gameInProgress);
    //log(localStorage["gameInProgress"]);
    gameInProgress = (localStorage["gameInProgress"] == "true");

    log(gameInProgress);
    if (!gameInProgress) {
        return false;
    }
    log("game resumed");
    yourMoney = +localStorage["yourMoney"];
    narcoticsKnown = parseInt(localStorage["narcoticsKnown"]); // стартовое количество известных наркотиков
    citiesKnown = parseInt(localStorage["citiesKnown"]); // стартовое количество известных городов
    mission = parseInt(localStorage["mission"]); // счетчик текущей миссии
    currentQuest = parseInt(localStorage["currentQuest"]); // счетчик текущего квеста
    days = parseInt(localStorage["days"]); // дней прошло
    narcLimit = parseInt(localStorage["narkLimit"]); // ограничение инвентаря
    daysInCity = parseInt(localStorage["daysInCity"]); // дней в одном городе
    currentCityId = parseInt(localStorage["currentCityId"]); // запоминаем ID текущего города
    currentCity = localStorage["currentCity"]; // начальное значение (стартовый город)
        
    log(rememberCityId);

    rememberCityId = parseInt(localStorage["rememberCityId"]);
    log("rememberCityId");
    log(rememberCityId);
    for (var i = 0; i < cities.length; i++) {
        travelPrices[i] = parseInt(localStorage["travelPrices." + i]); // храним текущие цены на перелеты
        log(travelPrices[i]);
    }
    for (var i = 0; i < narcotics.length; i++) {
        narcPrices[i] = parseInt(localStorage["narcPrices." + i]); // храним текущие цены на наркоту
        log(narcPrices[i]);
    }
    for (var i = 0; i < myNarcotics.length; i++) {
        myNarcotics[i] = parseInt(localStorage["myNarcotics." + i]); // наркоты в инвентаре
        log(myNarcotics[i]);
    }
    for (var i = 0; i < myNarkPrices.length; i++) {
        myNarkPrices[i] = parseInt(localStorage["myNarkPrices." + i]); // храним текущие цены на наркоту
        log(myNarkPrices[i]);
    }
    narcDiscount = parseInt(localStorage["narcDiscount"]); // скидка/наценка на наркоту (какая наркота)
    cityNarcDiscount = parseInt(localStorage["cityNarcDiscount"]); // город, в котором действует скидка/наценка на наркоту
    narcDisc = parseInt(localStorage["narcDisc"]); // переменная для расчета скидки/наценки на наркоту
    newsReaded = parseInt(localStorage["newsReaded"]); // читал ли уже газету?
    hasNoteApp = parseInt(localStorage["hasNoteApp"]); // есть ли приложение для запоминания цен?
    showConsol = parseInt(localStorage["showConsol"]); // режим отладки, показывает консоль (0/1)
    showStats(); // выводим статсы
    chooseNarc(currentCity, currentCityId); // возвращаемся в город
    return true;
}
