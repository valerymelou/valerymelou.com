(function (window, document, undefined) {
  'use strict';

  /**
   * Returns the first element matching the given selector or a dummy element.
   *
   * @param {String} selector The selector to use
   */
  var getElement = function (selector) {
    return document.querySelector(selector) || document.createElement('_');
  }

  /**
   * Toggles the nav collapse.
   */
  var toggleNavCollapse = function() {
    var navCollapse = getElement('.site-Nav_Collapse');
    navCollapse.classList.toggle('site-Nav_Collapse-collapsed');
  }

  /**
   * This methods is executed when the page is fully loaded.
   */
  var load = function() {
    // Remove the `is-loading` class on the body element after 100 milliseconds.
    setTimeout(function() {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
    }, 100);
  }

  /**
   * Entry point of the program.
   */
  function vm() {
    var navCollapseToggler = getElement('.site-Nav_Toggler');

    navCollapseToggler.addEventListener('click', toggleNavCollapse);
    window.onload = load;
  }

  vm();
})(window, document);
