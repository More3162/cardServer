const currentTime = () => {
    const now = new Date();

    // פונקציה לעיצוב ערכים כך שיהיו באורך של לפחות 2 תווים
    const padZero = (num) => num.toString().padStart(2, '0');

    return {
        year: now.getFullYear().toString(),
        month: padZero(now.getMonth() + 1), // חודש הוא מאינדקס 0
        day: padZero(now.getDate()),
        hours: padZero(now.getHours()),
        minutes: padZero(now.getMinutes()),
        seconds: padZero(now.getSeconds())
    };
}

module.exports = currentTime;



/* 
    // בניית התאריך והזמן בפורמט המבוקש
    const date = `${padZero(now.getDate())}/${padZero(now.getMonth() + 1)}/${now.getFullYear()}`;
    const time = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;

    return {
        date,
        time  
    }; */