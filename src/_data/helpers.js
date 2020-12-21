module.exports = {
  /**
   * Returns some attributes based on whether the
   * link is active or a parent of an active item.
   *
   * @param {String} itemURL The link in question
   * @param {String} pageURL The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemURL, pageURL) {
    let response = '';

    if (itemURL === pageURL) {
      response = ' aria-current="page"';
    }

    if (itemURL.length > 1 && pageURL.indexOf(itemURL) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },
};
