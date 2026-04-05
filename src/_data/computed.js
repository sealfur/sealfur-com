module.exports = {
  tvCutoffDate() {
    const d = new Date();
    d.setMonth(d.getMonth() - 6);
    return d.toISOString().split("T")[0];
  },
};
