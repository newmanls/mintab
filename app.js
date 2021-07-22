const ICONS = [
  {
    icon: "ri-youtube-fill",
    link: "https://www.youtube.com/"
  },
  {
    icon: "ri-play-circle-fill",
    link: "https://music.youtube.com/"
  },
  {
    icon: "ri-whatsapp-fill",
    link: "https://web.whatsapp.com/"
  },
  {
    icon: "ri-reddit-fill",
    link: "https://www.reddit.com/"
  },
  {
    icon: "ri-github-fill",
    link: "https://www.github.com/"
  },
]

const LIST_ITEMS = [
  {
    name: "netflix",
    link: "https://www.netflix.com/"
  },
  {
    name: "r/unixporn",
    link: "https://www.reddit.com/r/unixporn/"
  },
  {
    name: "r/firefoxcss",
    link: "https://www.reddit.com/r/firefoxcss/"
  },
]

/*============================================================================*/

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const updateDate = () => {
  // Create a new Date object and get the complete Date/Time information
  const completeDate = new Date();

  // Time Variables
  let currentHour = formatDigit(completeDate.getHours());
  let currentMinute = formatDigit(completeDate.getMinutes());

  // Date Variables
  let currentDay = completeDate.getDay();
  let currentNumber = completeDate.getDate();
  let currentMonth = completeDate.getMonth();

  // Update the Time
  /*
  currentTime.innerHTML = `${
    currentHour % 12 == 0 ? "12" : currentHour % 12
  }:${currentMinute} ${currentHour > 11 ? "PM" : "AM"}`;
  */
  currentTime.innerHTML = `${currentHour}:${currentMinute}`;

  // Update the Date
  currentDate.innerHTML = `${DAYS[currentDay]},
    ${MONTHS[currentMonth]} ${currentNumber}`;

  // Create a Loop
  setTimeout(() => {
    updateDate();
  }, 1000);
};

const formatDigit = (digit) => {
  return digit > 9 ? `${digit}` : `0${digit}`;
};

const printIcons = () => {
  for (const card of ICONS) {
    let currentItem = document.createElement("a");
    let currentItemIcon = document.createElement("i");

    currentItem.classList.add("icon");
    currentItem.href = card.link;

    currentItemIcon.classList.add(card.icon);

    currentItem.append(currentItemIcon);
    iconsContainer.appendChild(currentItem);
  }
};

const printListItems = () => {
  for (const listItem of LIST_ITEMS) {
    let currentItem = document.createElement("a");

    currentItem.classList.add("listItem");
    currentItem.href = listItem.link;

    currentItem.appendChild(document.createTextNode(listItem.name));
    listContainer.appendChild(currentItem);
  }
};

printIcons();
printListItems();
updateDate();
