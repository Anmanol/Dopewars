// устанавливаем цены на перелеты
function setTravelPrices(currentCityId) {
    log("Set travel prices");
    if (rememberCityId !== currentCityId) {
        for (i = 0; i < cities.length; i++) { // 0-30 + (40 * городИд +- 0-15 * городИд + 20 = 30 / 50
            travelPrices[i] = +(Math.random() * 30 + (8 * i * i + negativeRandom(15)) * i + 20 + 30 * i).toFixed(0);
        }
        rememberCityId = currentCityId;
    }
}

// устанавливаем новые цены на наркоту
function setNarcPrices(cityId) { // цены зависят от города и положения наркоты в массиве (чем дальше, тем дороже)
    if (rememberCityId !== currentCityId) { // проверяем что приехали в новый город
        for (i = 0; i < narcotics.length; i++) { // = стартовая цена +- 7%стартовой цены + 2-6%(+ cityId 0-7)стартовой цены - специальная новостная скидка/наценка
            if (cityNarcDiscount === currentCityId && narcDiscount === i) { // устанавливаем скидку, если город и наркота совпадают с указанными в новости
                narcDisc = (Math.random() * maxNarcDiscount) + minNarcDiscount; // определяем процент скидки/наценки
                narcDisc = narcDisc > maxNarcDiscount ? maxNarcDiscount : narcDisc; // проверяем, что скидка не больше максимальной
                narcDisc = discount ? -narcDisc : narcDisc; // определяем скидка это или наценка
                log(narcDisc);
                cityNarcDiscount = -1; // обнуляем скидки
                narcDiscount = -1;
            } else {
                narcDisc = 0;
            }
            narcPrices[i] = +(narcStartPrices[i]  +  narcStartPrices[i] * negativeRandom(Math.abs(15-i)) / 100  +  narcStartPrices[i] * negativeRandom(cityId+2) / 100  +  narcStartPrices[i] * narcDisc / 100).toFixed(0);
        }
    }
}

// устанавливаем цену на газету
function setPaperPrice() {
    return (12 + 14 * currentCityId);
}
// устанавливаем цены на пережидание
function setWaitincityPrice() {
    return (17 + 18 * currentCityId + 23 * daysInCity);
}