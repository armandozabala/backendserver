const axios = require("axios");
const apiUrl = process.env.URL_MELI;
const apiRegion = process.env.API_REGION;

const limit = 4;

/**
 * @param {string} search
 * @returns
 */
const getProductSearch = async (search) => {
  return await axios.get(
    `${apiUrl}/${apiRegion}/search?q=${search}&limit=${limit}`
  );
};

/**
 *
 * @param {*} id
 * @returns
 */
const getProductById = async (id) => {
  return await axios.get(`${apiUrl}/items/${id}`);
};

/**
 *
 * @param {*} id
 * @returns
 */
const getProductByDescription = async (id) => {
  return await axios.get(`${apiUrl}/items/${id}/description`);
};

/**
 *
 * @param {*} id
 * @returns
 */
const getCategoryById = async (id) => {
  return await axios.get(`${apiUrl}/categories/${id}`);
};

/**
 *
 * @param {*} id
 * @returns
 */
const getCurrencyById = async (id) => {
  return await axios.get(`${apiUrl}/currencies/${id}`);
};

module.exports = {
  getProductSearch,
  getProductById,
  getProductByDescription,
  getCategoryById,
  getCurrencyById,
};
