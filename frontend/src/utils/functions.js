export const isMobile = () => {
  return window.innerWidth <= 425 ? true : false;
};

export const toggleElement = (e, c) => {
  let elems = document.querySelector(c + ".active");
  if (elems !== null) {
    elems.classList.remove("active");
  }
  e.currentTarget.classList.toggle("active");
};

export const currentNotebook = () => {
  return document.getElementsByClassName("sidebar__notebook--item active")[0]
    .title;
};

export const createElementFromHTML = htmlString => {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.getElementsByClassName("p1")[0]
    ? div.getElementsByClassName("p1")[0].innerText
    : div.innerText;
};

export const limitText = (string, limit) => {
  if (string.length > limit) string = string.substring(0, limit) + "...";
  return string;
};

export const isEmpty = str => {
  return !str || 0 === str.length;
};

export const clearFields = () => {
  document.getElementsByClassName("main--title")[0].innerHTML = "";
  document.getElementsByClassName("main--section")[0].innerHTML = "";
};
