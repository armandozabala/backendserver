const axios = require("axios");
const { response } = require("express");

const {
  getProductSearch,
  getProductById,
  getProductByDescription,
} = require("../services/services");

const { getCategories, getCategoriesById } = require("../utils/getCategories");
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

const buildItem = (item, author, categories, currency, description = "") => {
  return Object.assign(
    {},
    {
      author,
      categories,
      item: {
        id: item.data.id,
        title: item.data.title,
        price: {
          currency: currency.symbol,
          amount: item.data.price,
          decimals: currency.decimal_places,
        },
        picture: item.data.pictures[0].url,
        condition: item.data.condition,
        free_shipping: item.data.shipping.free_shipping,
        sold_quantity: item.data.sold_quantity,
        description: description.data.plain_text,
      },
    }
  );
};

const arrayItems = async (items) => {
  return await Promise.all(
    items.map(async (item) => {
      let currencies = await getCurrency(item.currency_id);
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: currencies.symbol,
          amount: item.price,
          decimals: currencies.decimal_places,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    })
  );
};

module.exports = {
  getItemsByIdAndDescription,
  getItemsBySearch,
};
