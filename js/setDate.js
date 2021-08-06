const updateDate = () => {
  const completeDate = new Date();
  const timeOptions = {
    hour    : "numeric",
    minute  : "numeric",
    hour12  : CONFIG.hour12
  }
  const timeFormat = 
    new Intl.DateTimeFormat(CONFIG.locale, timeOptions).format(completeDate);
  const dateOptions = {
    weekday : "long",
    month   : "long",
    day     : "numeric"
  }
  const dateFormat = 
    new Intl.DateTimeFormat(CONFIG.locale, dateOptions).format(completeDate);

  currentTime.innerHTML = timeFormat;
  currentDate.innerHTML = dateFormat;

  setTimeout(updateDate, 1000);
}

updateDate();
