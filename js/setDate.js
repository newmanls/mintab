const updateDate = () => {
  const completeDate = new Date();
  const userLang = navigator.language || navigator.userLanguage;

  const timeOptions = {
    hour    : "numeric",
    minute  : "numeric",
    hour12  : CONFIG.hour12
  }
  const timeFormat = 
    new Intl.DateTimeFormat(userLang ?? "en-US", timeOptions).format(completeDate);
  const dateOptions = {
    weekday : "long",
    month   : "long",
    day     : "numeric"
  }
  const dateFormat = 
    new Intl.DateTimeFormat(userLang ?? "en-US", dateOptions).format(completeDate);

  currentTime.innerHTML = timeFormat;
  currentDate.innerHTML = dateFormat;

  setTimeout(updateDate, 1000);
}

updateDate();
