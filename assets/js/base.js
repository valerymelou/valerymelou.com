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
   * This methods is executed when the page is fully loaded.
   */
  var load = function() {
    // Remove the `is-loading` class on the body element after 100 milliseconds.
    // Add the `is-ready` class right after that.
    setTimeout(function() {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
    }, 100);
  }

  /**
   * Entry point of the program.
   */
  function vm() {
    window.onload = load;
  }

  vm();
})(window, document);
