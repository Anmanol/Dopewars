//////////////////////////////////////////////////////
// СЛУЖЕБНЫЕ ФУНКЦИИ ВЫВОДА
//////////////////////////////////////////////////////

// функция вывода на экран
function out(out, stats) {
    document.querySelector('#main').innerHTML += out;
    if (stats) {
        document.querySelector('#stats').innerHTML = out;
    }
    consol(showConsol);
}

// вывод предупредительных сообщений
function outAdd(out) {
    if (!document.getElementById('outadd')) {
        var newDiv = document.createElement('p');
        newDiv.id = "outadd";
        document.getElementById('main').appendChild(newDiv);
    }
    document.getElementById('outadd').innerHTML = out;
    setTimeout(function () {
        newDiv.parentNode.removeChild(newDiv);
    }, 3000);
}

// Вывод отладочной информации
function consol(show) {
    if (show) {
        document.querySelector('#consol').innerHTML = "<span> remCityId: " + rememberCityId + " <b>/</b> </span>";
        document.querySelector('#consol').innerHTML += "<span> currentCityId: " + currentCityId + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> currentCity: " + currentCity + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> mission: " + mission + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> currentQuest: " + currentQuest + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> daysInCity: " + daysInCity + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> narcoticsKnown: " + narcoticsKnown + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> citiesKnown: " + citiesKnown + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> narcotics.length: " + narcotics.length + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> discount: " + discount + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> cityNarcDiscount: " + cityNarcDiscount + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> narcDiscount: " + narcDiscount + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> narcDisc: " + narcDisc + " <b>/</b></span>";
        document.querySelector('#consol').innerHTML += "<span> gameInProgress: " + gameInProgress + " <b>/</b></span>";

                document.querySelector('#consol').innerHTML += "<span> level: " + (level+1) + " <b>/</b></span>";
                document.querySelector('#consol').innerHTML += "<span> variant: " + (variant+1) + " <b>/</b></span>";
                document.querySelector('#consol').innerHTML += "<span> previousVariant: " + (previousVariant+1) + " <b>/</b></span>";

        document.querySelector('#consol').innerHTML += "<button id='cheat1'>Quest!</button>";
        document.querySelector('#consol').innerHTML += "<button id='cheat2'>City +1</button>";
        document.querySelector('#consol').innerHTML += "<button id='cheat3'>Narcotic +1</button>";
        document.querySelector('#consol').innerHTML += "<button id='cheat4'>Money +10 000</button>";
        document.querySelector('#consol').innerHTML += "<button id='cheat5'>Save Game</button>";
        document.querySelector('#consol').innerHTML += "<button id='cheat6'>New Game</button>";
        document.querySelector('#consol').innerHTML += "<button id='cheat7'>Reset Game</button>";


            document.getElementById('cheat1').onclick = function () {
                quest();
            };
            document.getElementById('cheat2').onclick = function () {
                citiesKnown+=1;
            };
            document.getElementById('cheat3').onclick = function (e) {
                narcoticsKnown+=1;
            };
            document.getElementById('cheat4').onclick = function (e) {
                yourMoney+=10000;
            };
            document.getElementById('cheat5').onclick = function (e) {
               // gameInProgress = true;
                saveGameState();
            };
            document.getElementById('cheat6').onclick = function (e) {
                newGame();
            };
            document.getElementById('cheat7').onclick = function (e) {
                localStorage["gameInProgress"] = false;
            };
    } else {
        document.getElementById("consol").style.display = 'none';
    }
}

// вывод в консоль
function log(logme) {
    console.log(logme);
}

// функция очистки экрана
function clearScreen() {
    document.querySelector('#main').innerHTML = '';
}

// случайное число от -val до +val.
function negativeRandom(val) {
    return (Math.random() * val) - (Math.random() * val);
}