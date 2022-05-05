

function datetimeToString(date, format='YYYY日MM月DD日HH時') {
    format = format.replace("YYYY", date.getFullYear());
    format = format.replace("YY", date.getFullYear().toString().slice(2,4));
    format = format.replace("MM", (date.getMonth()+1).toString());
    format = format.replace("DD", date.getDate());
    format = format.replace("HH", date.getHours());
    format = format.replace("MI", date.getMinutes());
    return format;
}

export {
    datetimeToString
}