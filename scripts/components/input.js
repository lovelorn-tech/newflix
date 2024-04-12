export const inputService = {
  validate: (event, props) => {
    if (
      props.ignoreEmpty &&
      (event.target.value === "" || event.target.value === null)
    ) {
      event.target.style.backgroundColor = "hsla(246, 20%, 97%, 1)";
      props.small.style.display = "none";
      return true;
    }
    if (props.regex) {
      if (event.target.value !== null && props.regex.test(event.target.value.trim())) {
        event.target.style.backgroundColor = "hsla(246, 20%, 97%, 1)";
        props.small.style.display = "none";
        return true;
      } else {
        event.target.style.backgroundColor = "hsla(346, 100%, 85%, 0.5)";
        props.small.style.display = "block";
        return false;
      }
    }
    return true;
  },
};
