var level = 0; // текущий уровень (слой) диалога
var variant = 0; // текущий вариант развития (номер ветки)
var previousVariant = 0; // предыдущий уровень
var placeCounter = 0; // счетчик позиции выбранного варианта в массиве вариантов
var ended = 1; // закончился ли диалог? (1 для старта)
var dialogText = []; // массив реплик
var variantText = []; // массив вариантов выбора
var dialogActions = []; // массив действий
var yourMoneyTemp = 0;

function quest() {


        clearScreen();
        switch (currentQuest) {
        case 0:

            dialogText = [ // открываем основной массив
                
                /*level 1 replica*/
                ["<h1>Ролекс</h1><p>Сияющий огнями вечерний " + currentCity + " встретил тебя приятным теплым ветром и ароматом горячих хот-догов, доносящимся из неприметного лотка. Ты решил взять сразу парочку, к ним бутылочку пивка и не спеша прогуляться до своего отеля, где тебя ждёт уютный одноместный номер. Места уже знакомые и ты срезаешь оставшийся километр переулками. Заталкиваешь в рот последний кусок хот-дога, опустошаешь бутылку и метко бросаешь в мусорый бак, оказавшийся поблизости. Кто-то касается твоего плеча. Ты оборачиваешься. Перед тобой стоит коренастый мужчина в толстовке с глубоко надвинутым капюшоном, из-под которого только щёлочки холодных глаз видны. Лицо его закрыто белой банданой. В руке он держит узкий нож, скорее похожий на небольшой кинжал, который практически упирается тебе в живот. Недожёванный кусок сосиски вываливается из твоего раскрывшегося от удивления рта.</p><p> &mdash; Доставай всё из карманов. Быстро! &mdash; глухо говорит мужчина.</p>"],
                
                /*level 2 replics*/
                ["<p> &mdash; Вот и отлично, &mdash; говорит коренастый, протягивая свободную руку за добычей.</p>",
                "Фраза 2 уровня 2",
                "Фраза 2 уровня 3",
                "Фраза 2 уровня 4"],
                
                /*level 3 replics*/
                [   /* 1 variant*/
                "<p> &mdash; Правильный поступок, дружище. Ведь жизнь дороже, верно? &mdash; грабитель сунул деньги в карман толстовки, глянул исподлобья прямо тебе в глаза и неожиданно, левой рукой, нанес мощный удар прямо в челюсть. Не удержавшись на ногах, ты завалился на бок на грязный, усыпанный окурками асфальт. Когда ты, потирая ушибленную скулу, наконец встал, грабителя уже и след простыл.</p><p> В отеле ты ещё долго не мог уснуть, раздумывая над произошедшим. Ну и из-за гудящей головы. Кажется, этот небольшой инцидент словно что-то надломил в тебе. И сделал тебя сильнее. Ты поклялся сам себе, что больше никому не позволишь себя опустить. И что однажды ты станешь тем, кого никто опустить не посмеет.</p><p> На следующий день, первым делом ты пошел в магазин и купил себе отличный новый ствол за 200 $.</p>",
                "Фраза 3 уровня 2",
                "Фраза 3 уровня 3",
                    /* 2 variant*/
                "Фраза 3 уровня 4",
                "Фраза 3 уровня 5",
                    /* 3 variant*/
                "Фраза 3 уровня 6",
                "Фраза 3 уровня 7",
                "Фраза 3 уровня 8",
                "Фраза 3 уровня 9",
                    /* 4 variant*/
                "Фраза 3 уровня 10"],
                
                /*level 4 replics*/
                [   /* 1 variant*/
                ,
                , 
                    /* 2 variant*/
                 ,
                    /* 3 variant*/
                "Фраза 4 уровня 4",
                "Фраза 4 уровня 5",
                    /* 4 variant*/
                "Фраза 4 уровня 6",
                    /* 5 variant*/
                 ,
                    /* 6 variant*/
                "Фраза 4 уровня 8",
                    /* 7 variant*/
                ,
                    /* 8 variant*/
                ,
                    /* 9 variant*/
                "Фраза 4 уровня 11",
                    /* 10 variant*/
                "Фраза 4 уровня 12"],
                
                /*level 5 replics. End of dialog*/
                [   /* 1 variant*/
                ,
                    /* 2 variant*/
                , 
                    /* 3 variant*/
                ,
                ,
                    /* 4 variant*/
               ,
                    /* 5 variant*/
                ,
                ]
            ]; // закрываем основной массив

/*------------------------------------ОТВЕТЫ------------------------------------*/
                
            variantText = [ // открываем основной массив
                /*level 1 variants*/
                [
                    ["&mdash; Ээээ, да, конечно, погодь. (Начать вытаскивать из карманов " + (yourMoney / 6).toFixed(0) + " $)",
                    "&mdash; Дружище, давай по мирному решим. Чтобы ни у кого потом не было проблем? (Заговаривать зубы)",
                    "Пуститься наутёк.",
                    "Попробовать выбить нож из руки."]
                ],

                /*level 2*/
                [ /*replica 1 variants*/
                    ["Отдать грабителю " + (yourMoney / 6).toFixed(0) + " $.",
                     "Бросить деньги мужику в лицо и попытаться выбить нож из руки.",
                     "Отвлечь грабителя, сделав вид что бросаешь деньги и рвануть прочь."],
                /*replica 2 variants*/
                    ["2ур oтв1 фр2",
                     "2ур oтв2 фр2"],
                /*replica 3 variants*/
                    ["2ур oтв1 фр3",
                     "2ур oтв2 фр3",
                     "2ур oтв3 фр3",
                     "2ур oтв4 фр3"],
                /*replica 4 variants*/
                    ["2ур oтв1 фр4"]
                ],

                /*level 3*/
                [ /*replica 1 *variants*/
                    ["Ну что ж, за дело!"],
                 /*replica 2 *variants*/
                    ["3ур oтв1 фр2"],
                 /*replica 3 *variants*/
                    ["3ур oтв1 фр3",
                     "3ур oтв2 фр3"],
                 /*replica 4 *variants*/
                    ["3ур oтв1 фр4"],
                 /*replica 5 *variants*/
                    ["3ур oтв1 фр5"],
                 /*replica 6 *variants*/
                    ["3ур oтв1 фр6"],
                 /*replica 7 *variants*/
                    ["3ур oтв1 фр7"],
                 /*replica 8 *variants*/
                    ["3ур oтв1 фр8"],
                 /*replica 9 *variants*/
                    ["3ур oтв1 фр9"],
                 /*replica 10 *variants*/
                    ["3ур oтв1 фр10"]
                ],
                
                /*level 4*/
                [ /*replica 1 *variants*/
                    [],
                    [],
                    [],
                    ["Ну что ж, за дело!"],
                 /*replica 2 *variants*/
                    ["4ур oтв1 фр5 - конец квеста"],
                 /*replica 3 *variants*/
                    ["4ур oтв1 фр6 - конец квеста",
                     "4ур oтв2 фр6 - конец квеста"],
                    [],
                 /*replica 4 *variants*/
                    ["4ур oтв1 фр8 - конец квеста"],
                    [],
                    [],
                 /*replica 5 *variants*/
                    ["4ур oтв1 фр11 - конец квеста"],
                 /*replica 6 *variants*/
                    ["4ур oтв1 фр12 - конец квеста"]
                ]
                ]; // закрываем основной массив

    /*------------------------------------ДЕЙСТВИЯ------------------------------------*/

                
            dialogActions = [
                /*level 1 variants*/ 
                [[, , , ]],
                 /*level 2*/
                [ /*replica 1 variants*/ ["yourMoney = yourMoney - (yourMoney / 6).toFixed(0)", , ], /*replica 2 variants*/ [, ], /*replica 3 variants*/ [, , , ], /*replica 4 variants*/ []],
                /*level 3*/
                [ /*replica 1 variants*/ ["yourMoney = yourMoney - 200"], /*replica 2 variants*/ [], /*replica 3 variants*/ [, ], /*replica 4 variants*/ [], /*replica 5 variants*/ [], /*replica 6 variants*/ [], /*replica 7 variants*/ [], /*replica 8 variants*/ [], /*replica 9 variants*/ [], /*replica 10 variants*/ []],
                /*level 4*/
                [ /*replica 1 variants*/ [], /*replica 2 variants*/ [], /*replica 3 variants*/ [], /*replica 4 variants*/ [], /*replica 5 variants*/ [], /*replica 6 variants*/ [, ], /*replica 7 variants*/ [], /*replica 8 variants*/ [], /*replica 9 variants*/ [], /*replica 10 variants*/ [], /*replica 11 variants*/ [], /*replica 12 variants*/ []]
                ]; // закрываем основной массив

            playQuest(); // запускаем квест

            break;

        case 1:


            break;

        case 2:


            break;

        }
    }
    /*
    function variants(variantText) {
        for (var i = 0; i < variantText.length; i++) {
            out("<p><a href='#' id=" + (i + 1) + ">" + (i + 1) + ". " + variantText[i] + "</a></p>");
        }
        chooseVariant(variantText);

    }
    */
function chooseVariant(variantText) {
    document.getElementById('main').onclick = function (e) {
        e = e || event;
        var event = e;
        var target = event.target.id; // получаем номер ответа по которому щелкнули
        log("target: " + target);
        for (var i = 0; i < variantText[level][variant].length; i++) { // 
            log("i: " + i);
            placeCounter = 0; // обнуляем счетчик позиции
            if (+target === i) {

                log("chosen");
                if (dialogActions[level][variant][i]) { // выполняем действие диалога, если есть
                    eval(dialogActions[level][variant][i]);
                }
                for (var a = 0; a < variant; a++) {
                    log("variantText[level].length: " + variantText[level].length);
                    log("a: " + a);
                    for (var b = 0; b < variantText[level][a].length; b++) {
                        log("variantText[level][i].length: " + variantText[level][a].length);
                        log("b: " + b)
                        placeCounter += 1; // ищем позицию в массиве ответов уровня
                    }
                }
                placeCounter += i;
                log(placeCounter);
                variant = placeCounter;
                log("variant: " + variant);
                level++;
                playQuest();
                break;

            }
        }
    };
}

function playQuest() {
    if (ended) {
        level = 0; // обнуляем текущий уровень (слой) диалога
        variant = 0; // обнуляем текущий вариант развития (номер ветки)
        previousVariant = 0; // предыдущий уровень
        ended = 0; // диалог начался
    }
    clearScreen();
    log("screen cleared");
    showStats();
          log("dialogText[level]: " + dialogText[level]);
    if (!!dialogText[level][variant]) { // если реплика есть - выводим диалог, если нет - завершаем его и возвращаемся в город
        log("variantText[level][variant]: " + variantText[level][variant]);
        out(dialogText[level][variant]); // выводим текущую реплику диалога
        for (var i = 0; i < variantText[level][variant].length; i++) { // выводим варианты выбора
            out("<p><a href='#' id=" + (i) + ">" + (i + 1) + ". " + variantText[level][variant][i] + "</a></p>");
        }
        previousVariant = variant;
        chooseVariant(variantText); // отслеживаем клик по варианту
    } else {
        log("ended");
        ended = 1;
        currentQuest += 1;
        chooseNarc(currentCity, currentCityId); // возвращаемся в город

    }
}

function readyForQuest() {
    if (currentQuest === 0 && yourMoney >= 3200) {
        quest();
        citiesKnown = citiesKnown < cities.length ? citiesKnown + 1 : citiesKnown;
    }
}