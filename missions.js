//////////////////////////////////////////////////////
// Миссии игры
//////////////////////////////////////////////////////

// Тексты миссий
function missions() {
    if (readyForMission()) {

        clearScreen();
        switch (mission) {
        case 0:
            yourMoney = +(Math.random() * 500).toFixed() + yourMoney;
            myNarcotics[0] = +(Math.random() * 10).toFixed() + 5;
            NoteAppBlock.innerHTML = ""; // очищаем статсы при перезапуске игры
            out("<h1>Приключения начинаются!</h1><p>Ты брел по темному переулку в первом часу ночи после конкретной пьянки по поводу увольнения с долбаной работы, на которой ты батрачил как раб, а получал сраные гроши. Последние из этих грошей и ушли на 'торжество'. Именно поэтому, увидев мужика, привалившегося к мусорному баку, ты не стал задаваться вопросом, жив ли он вообще или просто пьян в стельку, а подошел и, покачиваясь, начал методично обшаривать его карманы.</p><p>Найденное заставило тебя немного протрезветь. В твоих руках оказалась туго скрученная котлета купюр, в которой ты, слюнявя пальцы и неловко отгибая уголки, насчитал " + yourMoney + " $. Кроме того, в твоем кармане оказалось целых " + myNarcotics[0] + " пакетиков травы.</p><p>Кажется, судьба подкинула тебе шанс. Не удалось построить карьеру таская мешки с мукой, так может повезет в торговле наркотой?</p><p>Но, даже кошки не гадят у себя дома, поэтому, давай-ка уберемся куда подальше. Готов? Что скажешь?</p>");
            mission += 1;
            out("<p><button id='go'>Вперед! Барыжить!</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseCity(currentCity, currentCityId);
            };
            break;

        case 1:

            out("<h1>Ну что, втянулся?</h1><p>Скажи же, круто, когда в кармане " + yourMoney + " $, ты в модных шмотках, мотаешься по клевым городам, заводишь новые знакомства и отлично расслабляешься по вечерам? Продолжим?</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>Конечно!</button></p>");
                log("mission 1");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;

        case 2:

            out("<h1>Это серьезно.</h1><p>Каково знать что " + yourMoney + " $ теперь твои? Ощущаешь, что нашел дело своей жизни? У тебя действительно неплохо получается и, возможно, стоит начать мечтать о карьере в этом бизнесе. Главное, не вздумай расслабляться!..</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>Я доволен :)</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;
                
        case 3:

            out("<h1>Так держать!</h1><p>Ты на пути к успеху! " + yourMoney + " $ - серьезные деньги, и если ты правильно ими воспользуешься, то совсем скоро тебе понадобится чемодан побольше. Главное - принимай верные решения.</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>К любимой работе!</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;
            
        case 4:

            out("<h1>Так держать!</h1><p>Ты на пути к успеху! " + yourMoney + " $ - серьезные деньги, и если ты правильно ими воспользуешься, то совсем скоро тебе понадобится чемодан побольше. Главное - принимай верные решения.</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>К любимой работе!</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;
     
        case 5:

            out("<h1>Так держать!</h1><p>Ты на пути к успеху! " + yourMoney + " $ - серьезные деньги, и если ты правильно ими воспользуешься, то совсем скоро тебе понадобится чемодан побольше. Главное - принимай верные решения.</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>К любимой работе!</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;

        case 6:

            out("<h1>Так держать!</h1><p>Ты на пути к успеху! " + yourMoney + " $ - серьезные деньги, и если ты правильно ими воспользуешься, то совсем скоро тебе понадобится чемодан побольше. Главное - принимай верные решения.</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>К любимой работе!</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;
                
        case 7:

            out("<h1>Так держать!</h1><p>Ты на пути к успеху! " + yourMoney + " $ - серьезные деньги, и если ты правильно ими воспользуешься, то совсем скоро тебе понадобится чемодан побольше. Главное - принимай верные решения.</p>");
            mission += 1;
            narcoticsKnown = narcoticsKnown < narcotics.length ? narcoticsKnown + 1 : narcoticsKnown;
            out("<p><button id='go'>К любимой работе!</button></p>");
            document.getElementById('go').onclick = function (e) {
                e = e || event;
                chooseNarc(currentCity, currentCityId);
            };
            break;

        }
    }
}

// Проверка на запуск миссий
function readyForMission() {
    if ((mission === 0) || (yourMoney > 3500 && mission === 1) || (yourMoney > 4000 && mission === 2) || (yourMoney > 5000 && mission === 3) || (yourMoney > 10000 && mission === 4) || (yourMoney > 30000 && mission === 5) || (yourMoney > 50000 && mission === 6) || (yourMoney > 100000 && mission === 7)) {
        return true;
    }
}

// проверка на GAME OVER
function gameOver() {
    
    var moneyTemp = 0;
    for (i = 0; i < narcotics.length; i++){
        moneyTemp += myNarcotics[i]*narcPrices[i]; // Смотрим, сколько у нас всего денег в валюте и наркоте
    }
    moneyTemp += yourMoney;
    log(moneyTemp);
    log(currentCityId);
    log(rememberCityId);

    if ( (moneyTemp < travelPrices[0] && rememberCityId !== 0) || (moneyTemp < travelPrices[1] && rememberCityId === 0) )  { // Проверяем, хватает ли нам денег на самый дешевый перелет
        gameInProgress = false;
        outAdd("GAME OVER <br /> Ты потерял все деньги и весь товар...");
        out("<p><button id='restart'>Попробовать еще раз!</button></p>");
        document.getElementById('restart').onclick = function (e) {
            e = e || event;
            //
            // ЗДЕСЬ НАДО ИНИЦИИРОВАТЬ НАЧАЛО ИГРЫ, А ПОКА ПРОСТО ОБНОВЛЯЕМ ПЕРЕМЕННЫЕ!
            //mission = 0;
            //yourMoney = 2500;
            //missions();
            newGame();
        };
    }
}