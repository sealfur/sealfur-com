module.exports = {
  /**
   * Returns some attributes based on whether the
   * link is active or a parent of an active item.
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemURL, pageUrl) {
    let response = '';

    if (itemURL === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },
};
