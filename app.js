const userLang = (navigator.language || navigator.userLanguage) ?? 'en-US';
const settingsBox = document.getElementById("settingsBox");
const settingsForm = document.getElementById("settingsForm");
const checkboxFieldset = document.getElementById("checkboxFieldset");
const clock12hCheckbox= document.getElementById('clock12hCheckbox');
const quotesCheckbox = document.getElementById('quotesCheckbox');
const darkThemeCheckbox= document.getElementById('darkThemeCheckbox');
const linksIconicBox = document.getElementById('linksIconicBox');
const linksIconicFieldset = document.getElementById('linksIconicFieldset');
const linksLabeledBox = document.getElementById('linksLabeledBox');
const linksLabeledFieldset = document.getElementById('linksLabeledFieldset');
const body = document.getElementById('body');

function getDateTime(format) {
    let completeDate = new Date();
    let dateTime = new Intl.DateTimeFormat(userLang, format).format(completeDate);
    return dateTime;
}

function updateDateTime() {
    currentTime.innerHTML = getDateTime({
        hour    : 'numeric',
        minute  : 'numeric',
        hour12  : (settings != null) ? settings['hour12'] : false
    }).toLowerCase();

    currentDate.innerHTML = getDateTime({
        weekday : 'long',
        month   : 'long',
        day     : 'numeric'
    });

    setTimeout(updateDateTime, 1000);
}

function printQuote() {
    fetch('https://api.quotable.io/random')
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            quote.innerHTML = `'${data.content}'`;
            if (data.author != null) quoteAuthor.innerHTML = `- ${data.author}`;
        });
}

function removeLink(id) {
    document.getElementById(id).remove();
}

function loadSettings() {
    linksIconicBox.querySelectorAll('a').forEach(e => e.remove());
    linksIconicFieldset.querySelectorAll('div').forEach(e => e.remove());
    linksLabeledBox.querySelectorAll('a').forEach(e => e.remove());
    linksLabeledFieldset.querySelectorAll('div').forEach(e => e.remove());

    settings = JSON.parse(localStorage.getItem('settings'));

    if (settings == null) {
        settings = {
            clock12h: false,
            quotes: true,
            darkTheme: false,
            linksIconic: [],
            linksLabeled: []
        }
    }

    clock12hCheckbox.checked = settings.hour12;
    quotesCheckbox.checked = settings.quotes;
    darkThemeCheckbox.checked = settings.darkTheme;

    if (settings.quotes) {
        document.getElementById('quote').style.display = 'inline';
        document.getElementById('quoteAuthor').style.display = 'inline';
        if (!document.getElementById('quote').innerHTML) printQuote();
    } else {
        document.getElementById('quote').style.display = 'none';
        document.getElementById('quoteAuthor').style.display = 'none';
    }

    if (settings.darkTheme) {
        if (!body.classList.contains('dark')) {
            body.classList.add('dark');
        }
    } else if (body.classList.contains('dark')) {
        body.classList.remove('dark');
    }

    // ICONIC LINKS
    for (let id = 0; id < settings.linksIconic.length; id++) {
        let icon = settings.linksIconic[id].icon;
        let url = settings.linksIconic[id].url;
        let item = document.createElement('a');

        item.classList.add('icon', icon);
        item.href = url;

        linksIconicBox.appendChild(item);
        linksIconicFieldset.appendChild(newLinkInput('Iconic', id, icon, url));
    }

    // LABELED LINKS
    for (let id = 0; id < settings.linksLabeled.length; id++) {
        let label = settings.linksLabeled[id].label;
        let url = settings.linksLabeled[id].url;
        let item = document.createElement('a');

        item.classList.add('linkLabeled');
        item.href = url;

        item.appendChild(document.createTextNode(label));
        linksLabeledBox.appendChild(item);
        linksLabeledFieldset.appendChild(newLinkInput('Labeled', id, label, url));
    }
}

function addEmptyLinkIconic() {
    let id = linksIconicFieldset.querySelectorAll('input[type="text"]').length;
    linksIconicFieldset.appendChild(newLinkInput('Iconic', id, ));
}

function addEmptyLinkLabeled() {
    let id = linksLabeledFieldset.querySelectorAll('input[type="text"]').length;
    linksLabeledFieldset.appendChild(newLinkInput('Labeled', id));
}

function newCheckboxInput(id, text) {
    let div = document.createElement('div');
    let input = document.createElement('input');
    let label = document.createElement('label');

    div.classList.add('fieldsetCheckboxBox');

    input.type = 'checkbox';
    input.id = id;
    input.name = id;

    label.htmlFor = id;
    label.innerHTML = text;

    div.appendChild(input);
    div.appendChild(label);

    return div;
}

function newLinkInput(type, id, text, url) {
    let textPlaceholder = (type == 'Iconic') ? 'Icon' : 'Label'

    let div = document.createElement('div');
    let textInput = document.createElement('input');
    let urlInput = document.createElement('input');
    let removeButton = document.createElement('i');

    div.id = `link${type}_${id}`;
    div.classList.add('fieldsetLinkBox');

    textInput.setAttribute('type', 'text');
    textInput.setAttribute('placeholder', textPlaceholder);
    if (typeof text !== 'undefined') textInput.setAttribute('value', text);

    urlInput.setAttribute('type', 'url');
    urlInput.setAttribute('placeholder', 'URL');
    if (typeof url !== 'undefined') urlInput.setAttribute('value', url);

    removeButton.classList.add('redButton', 'ri-close-line');
    removeButton.setAttribute('onclick', `removeLink("${div.id}")`);

    div.appendChild(textInput);
    div.appendChild(urlInput);
    div.appendChild(removeButton);

    return div;
}

function saveSettings() {
    settings = {
        hour12: clock12hCheckbox.checked,
        quotes: quotesCheckbox.checked,
        darkTheme: darkThemeCheckbox.checked,
        linksIconic: [],
        linksLabeled: [],
    };

    let linksIconicLength = linksIconicFieldset.querySelectorAll('.fieldsetLinkBox').length;
    let linksIconicIcons = linksIconicFieldset.querySelectorAll('input[type="text"]');
    let linksIconicURLs = linksIconicFieldset.querySelectorAll('input[type="url"]');

    let linksLabeledLength = linksLabeledFieldset.querySelectorAll('.fieldsetLinkBox').length;
    let linksLabeledIcons = linksLabeledFieldset.querySelectorAll('input[type="text"]');
    let linksLabeledURLs = linksLabeledFieldset.querySelectorAll('input[type="url"]');

    for (let i = 0; i < linksIconicLength; i++) {
        if (linksIconicIcons[i].value == '' || linksIconicURLs[i].value == '') continue;
        settings.linksIconic.push({
            icon: linksIconicIcons[i].value,
            url: linksIconicURLs[i].value
        });
    }

    for (let i = 0; i < linksLabeledLength; i++) {
        if (linksLabeledIcons[i].value == '' || linksLabeledURLs[i].value == '') continue;
        settings.linksLabeled.push({
            label: linksLabeledIcons[i].value,
            url: linksLabeledURLs[i].value
        });
    }

    localStorage.setItem('settings', JSON.stringify(settings));
    loadSettings();
    closeSettingsBox();
}

function cancelSettings() {
    loadSettings();
    closeSettingsBox();
}

function openSettingsBox() {
    settingsBox.style.width = '100%';
}

function closeSettingsBox() {
    settingsBox.style.width = '0';
}

loadSettings();
updateDateTime();
