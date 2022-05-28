

function datetimeToString(date: Date, format='YYYY日MM月DD日HH時'): string
{
    format = format.replace("YYYY", date.getFullYear().toString());
    format = format.replace("YY", date.getFullYear().toString().slice(2,4));
    format = format.replace("MM", (date.getMonth()+1).toString());
    format = format.replace("DD", date.getDate().toString());
    format = format.replace("HH", date.getHours().toString());
    format = format.replace("MI", date.getMinutes().toString());
    return format;
}

export {
    datetimeToString
}