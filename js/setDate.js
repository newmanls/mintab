const userLang = (navigator.language || navigator.userLanguage) ?? "en-US";

const getDateTime = (format) => {
  let completeDate = new Date();
  let dateTime = new Intl.DateTimeFormat(userLang, format).format(completeDate);
  return dateTime;
}

const updateDateTime = () => {
  currentTime.innerHTML = getDateTime({
    hour    : "numeric",
    minute  : "numeric",
    hour12  : CONFIG.hour12
  });

  currentDate.innerHTML = getDateTime({
    weekday : "long",
    month   : "long",
    day     : "numeric"
  });

  setTimeout(updateDateTime, 1000);
}

updateDateTime();
