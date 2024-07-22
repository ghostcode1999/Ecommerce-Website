"use strict";

/*---------------------------
    #Helper function to select DOM elements
-----------------------------*/
const select = (selector, all = false) => {
  selector = selector.trim();
  return all
    ? [...document.querySelectorAll(selector)]
    : document.querySelector(selector);
};

/*---------------------------
    #Helper function to handle event listeners
-----------------------------*/
const on = (eventType, selector, listener, all = false) => {
  selector = typeof selector === "string" ? select(selector, all) : selector;

  if (selector) {
    all || selector.length > 1
      ? selector.forEach((element) =>
          element.addEventListener(eventType, listener)
        )
      : selector.addEventListener(eventType, listener);
  }
};

/*---------------------------
    #Helper function to handle load event listeners
-----------------------------*/
const onLoad = (listener) => {
  window.addEventListener("load", listener);
};

/*---------------------------
    #Helper function to handle scroll event listeners
-----------------------------*/
const onScroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/*---------------------------
    #Helper function to scroll to a specific section
-----------------------------*/
function scrollto(selector, offset) {
  const elPos = selector.offsetTop;
  window.scrollTo({
    top: elPos - offset,
    behavior: "smooth",
  });
}

/*---------------------------
    #Add / Remove / Replace / Toggle classes
-----------------------------*/
function addClass(selector, className) {
  if (selector.length > 1) {
    selector.forEach((el) => el.classList.add(className));
    return;
  }

  selector.classList.add(className);
}

function removeClass(selector, className) {
  if (selector.length > 1) {
    selector.forEach((el) => el.classList.remove(className));
    return;
  }

  selector.classList.remove(className);
}

function replaceClass(selector, classToReplace, newClass) {
  if (selector.length > 1) {
    selector.forEach((el) => el.classList.replace(classToReplace, newClass));
    return;
  }

  selector.classList.replace(classToReplace, newClass);
}

function toggleClass(selector, className) {
  if (selector.length > 1) {
    selector.forEach((el) => el.classList.toggle(className));
    return;
  }

  selector.classList.toggle(className);
}

export {
  select,
  on,
  onLoad,
  onScroll,
  scrollto,
  addClass,
  removeClass,
  replaceClass,
  toggleClass,
};
