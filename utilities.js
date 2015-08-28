function countNark() {
    log("countNark call");
    var currentNarcAmount = 0;
    for (i = 0; i < narcotics.length; i++) {
        currentNarcAmount += myNarcotics[i]; // Смотрим, сколько у нас всего денег в валюте и наркоте
    }
    log(currentNarcAmount);
    return currentNarcAmount;
}