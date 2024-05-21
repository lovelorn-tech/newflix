export const listService = {
    createLinkItem: (href, text, anchorIcon = undefined) => {
        const listItem = document.createElement("li");
        listItem.classList = "listItem";
        const anchor = document.createElement("a");
        anchor.href = href;
        if (anchorIcon) {
            const icon = document.createElement("i");
            icon.classList = anchorIcon;
            anchor.appendChild(icon);
        }
        const p = document.createElement("p");
        p.innerText = text;
        anchor.appendChild(p);
        listItem.appendChild(anchor);
        return listItem;
    },
    createSpanItem: (text, iconClass) => {
        const spanElement = document.createElement("span");
        const pElement = document.createElement("p");
        const iconElement = document.createElement("i");
        pElement.innerText = text;
        iconElement.classList = iconClass;
        spanElement.appendChild(pElement);
        spanElement.appendChild(iconElement);
        return spanElement;
    },
    createButtonItem: (text, iconClass) => {
        const buttonElement = document.createElement("button");
        buttonElement.classList = "buttonItem";

        const spanElement = document.createElement("span");

        const pElement = document.createElement("p");
        pElement.innerText = text;
        pElement.style.marginLeft = "0.0625rem";

        const iconElement = document.createElement("i");
        iconElement.classList = iconClass;

        spanElement.appendChild(iconElement);
        spanElement.appendChild(pElement);

        
        const iconSwap = document.createElement("i");
        iconSwap.classList = "fa-solid fa-caret-right";
        
        buttonElement.appendChild(spanElement);
        buttonElement.appendChild(iconSwap);
        
        return buttonElement;
    },
}