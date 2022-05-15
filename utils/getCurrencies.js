const { getCurrencyById } = require("../services/services");

const getCurrency = async (id) => {
  const { data } = await getCurrencyById(id);
  return data;
};

module.exports = {
  getCurrency,
};
