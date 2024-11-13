export default function getDate(date) {
    const newDate=Date.parse(date);
    const dayFinish="";
    const getHours=newDate.getHours();
    const getMinute=newDate.getMinutes();
    const day=newDate.getDay();
    dayFinish+=`${getHours<=9?(`0${getHours}`):(getHours)}:${getMinute<=9?(`0${getMinute}`):(getMinute)},${day}`;
    return dayFinish;
}
