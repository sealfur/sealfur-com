/**
 * Takes a collection and returns it back in rating order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */

module.exports = (collection) =>
  collection.sort((a, b) =>
    Number(a.data.rating) > Number(b.data.rating) ? 1 : -1
  );
