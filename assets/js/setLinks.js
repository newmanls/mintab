const printIcons = () => {
  for (const card of ICONS) {
    let currentItem = document.createElement("a");
    let currentItemIcon = document.createElement("span");

    currentItem.classList.add("icon");
    currentItem.href = card.link;

    currentItemIcon.classList.add("fas");
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
