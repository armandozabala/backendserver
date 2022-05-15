const { getCurrency } = require("./getCurrencies");
/**
 * Build Item Object
 * @param {*} item
 * @param {*} author
 * @param {*} categories
 * @param {*} currency
 * @param {*} description
 * @returns
 */
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

/**
 *
 * @param {*} items
 * @returns
 */
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
  arrayItems,
  buildItem,
};
