export const displayService = {
  displayElement: (itemId, display = "flex") => {
    const item = document.getElementById(`${itemId}`);
    if (item) {
      if (item.style.display === display) {
        item.style.display = "none";
      } else {
        item.style.display = display;
        item.focus();
      }
    }
  },
  displayOnHoverElement: (dropDownId) => {
    document.getElementById(dropDownId).style.display = "block";
  },
  hideOnBlurElement: (event, dropDownId) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      const dropDown = document.getElementById(dropDownId);
      dropDown.style.display = "none";
    }
  },
};
