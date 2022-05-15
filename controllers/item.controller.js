const axios = require("axios");
const { response } = require("express");

const {
  getProductSearch,
  getProductById,
  getProductByDescription,
} = require("../services/services");

const { getCategories, getCategoriesById } = require("../utils/getCategories");
const { arrayItems, buildItem } = require("../utils/utils");
const { getCurrency } = require("../utils/getCurrencies");

/***
 * getItemsBySearch
 */
const getItemsBySearch = async (req, res = response, next) => {
  const search = req.query.q;
  const { author } = req.res;

  try {
    const { data } = await getProductSearch(search);
    const categories = getCategories(data.filters);
    const items = await arrayItems(data.results);
    const results = Object.assign(
      {},
      {
        author,
        categories,
        items,
      }
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send({
      error: "Ingrese una busqueda valida " + error,
    });
  }
};

/**
 * getItemsByIdAndDescription
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getItemsByIdAndDescription = async (req, res, next) => {
  const id = req.params.id;
  const { author } = req.res;

  try {
    axios
      .all([getProductById(id), getProductByDescription(id)])
      .then(
        axios.spread(async (...response) => {
          let categories = await getCategoriesById(
            response[0].data.category_id
          );
          let currency = await getCurrency(response[0].data.currency_id);

          const results = buildItem(
            response[0],
            author,
            categories,
            currency,
            response[1]
          );
          res.status(200).json(results);
        })
      )
      .catch(() => {
        res.status(200).json({
          categories: null,
          item: null,
        });
      });
  } catch (error) {
    res.status(200).json({
      error: "Ingrese una busqueda valida ",
    });
  }
};

module.exports = {
  getItemsByIdAndDescription,
  getItemsBySearch,
};
