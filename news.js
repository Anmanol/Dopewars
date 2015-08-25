var prasesWhat = [];
var newsImg = 'images/news.png'; // картинка подложка под новости
var newsDivImg = new Image();
    newsDivImg.src = newsImg;

function readNews() {
    if (!newsReaded) {
        cityNarcDiscount = +(Math.random() * (citiesKnown - 1)).toFixed(0);
        narcDiscount = +(Math.random() * (narcoticsKnown - 1)).toFixed(0);
        discount = +(Math.random() * 1).toFixed(0);
        newsReaded = 1;
    }
    //showNews("<h3>Полицейская сводка</h3><p>Управление полиции города <strong>" + cities[cityNarcDiscount] +
    //    "</strong> сообщает об увеличении количества разбойных нападений, связанных, скорее всего, с <strong>" + (discount ? ' низкими ценами' : 'высокими ценами') + "</strong> на <strong>" + narcotics[narcDiscount] + "</strong>.</p>");
    var newsPhrases = ["<h3>Полицейская сводка</h3><p>Управление полиции города <strong>" + cities[cityNarcDiscount] + "</strong> сообщает об увеличении количества разбойных нападений, связанных, скорее всего, с <strong>" + (discount ? ' низкими ценами' : 'высокими ценами') + "</strong> на <strong>" + narcotics[narcDiscount] + "</strong>.</p>", 
                   "<h3>Городская сводка</h3><p>В городе <strong>" + cities[cityNarcDiscount] + "</strong> зафиксировано резкое увеличение количества заявлений о разбойных нападениях. Повышение криминальной активности связывают с <strong>" + (discount ? ' падением цен' : 'ростом цен') + "</strong> на <strong>" + narcotics[narcDiscount] + "</strong>.</p>"];
    showNews(newsPhrases[(Math.random() * (newsPhrases.length-1)).toFixed(0)]);
}

function showNews(news) {
    clearScreen();
    out("<div class='newscontainer' id='newscontainer'><div class='newstext'>" + news + "</div></div>" + "<p><button id='gotnews'>Всё ясно</button></p>");
    var newsDivCopy = newsDivImg.cloneNode(true);
    newscontainer.insertBefore(newsDivCopy, newscontainer.firstChild);
    document.getElementById('gotnews').onclick = function (e) {
        e = e || event;
        chooseNarc(currentCity, currentCityId);
    };
}