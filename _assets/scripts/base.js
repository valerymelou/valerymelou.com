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

const menuToggler = getElement('.menu-toggler');
const sidebarMask = getElement('.sidebar-mask');

/**
 * Toggles the menu
 */
function toggleMenu() {
  const sidebar = getElement('.sidebar');

  document.body.classList.toggle('no-scroll');
  sidebarMask.classList.toggle('visible');
  sidebar.classList.toggle('open');
}

/**
 * Runs when the page is fully loaded.
 */
function load() {
  // Remove the `loading` class on the body element
  document.body.classList.remove('loading');
  document.body.classList.add('ready');
}

sidebarMask.addEventListener('click', toggleMenu);
menuToggler.addEventListener('click', toggleMenu);
window.onload = load;

if (document.getElementById('map')) {
  window.initMap = initMap;
}
