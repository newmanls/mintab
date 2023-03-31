const CONFIG = {
    hour12  : false
}

const ICONS = [
    {
        icon: "ri-youtube-fill",
        link: "https://www.youtube.com/"
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
    }
]

const LIST_ITEMS = [
    {
        name: "music",
        link: "https://music.youtube.com"
    },
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

const userLang = (navigator.language || navigator.userLanguage) ?? "en-US";

function getDateTime(format) {
    let completeDate = new Date();
    let dateTime = new Intl.DateTimeFormat(userLang, format).format(completeDate);
    return dateTime;
}

function updateDateTime() {
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

function printIcons() {
    for (const icon of ICONS) {
        let currentItem = document.createElement("a");
        let currentItemIcon = document.createElement("span");

        currentItem.classList.add("icon");
        currentItem.href = icon.link;

        currentItemIcon.classList.add("fas");
        currentItemIcon.classList.add(icon.icon);

        currentItem.append(currentItemIcon);
        iconsContainer.appendChild(currentItem);
    }
}

function printListItems() {
    for (const listItem of LIST_ITEMS) {
        let currentItem = document.createElement("a");

        currentItem.classList.add("listItem");
        currentItem.href = listItem.link;

        currentItem.appendChild(document.createTextNode(listItem.name));
        listContainer.appendChild(currentItem);
    }
};

function printQuote() {
    let api = `https://api.quotable.io/random`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            quote.innerHTML = `"${ data.content }"`;
            if (data.author != null) quoteAuthor.innerHTML = `- ${ data.author }`;
        });  
};

updateDateTime();
printIcons();
printListItems();
printQuote();
