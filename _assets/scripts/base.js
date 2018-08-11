import { initMap } from './map';

/**
 * Returns the first element matching the given selector or a dummy element.
 *
 * @param {String} selector
 *
 * @return {HTMLElement}
 */
function getElement(selector) {
  return document.querySelector(selector) || document.createElement('_');
}

/**
 * Toggles the menu
 */
function toggleMenu() {
  let asideMask = getElement('.st-AsideMask');
  let aside = getElement('.st-Aside');

  document.body.classList.toggle('noscroll');
  asideMask.classList.toggle('st-AsideMask-visible');
  aside.classList.toggle('st-Aside-open');
}

/**
 * Runs when the page is fully loaded.
 */
function load() {
  // Remove the `loading` class on the body element
  document.body.classList.remove('loading');
  document.body.classList.add('ready');
}

let menuToggler = getElement('.st-Header_MenuToggler');
let asideMask = getElement('.st-AsideMask');

asideMask.addEventListener('click', toggleMenu);
menuToggler.addEventListener('click', toggleMenu);
window.onload = load;

if (document.getElementById('map')) {
  window.initMap = initMap;
}
