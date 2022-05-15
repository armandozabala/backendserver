const { getCategoryById } = require("../services/services");

const getCategories = (filter) => {
  let categories = [];
  if (filter.length > 0) {
    if (filter[0].id == "category") {
      categories = filter[0].values[0].path_from_root.map((item) => item.name);
    }
  }

  return categories;
};

const getCategoriesById = async (id) => {
  let categories = [];
  const resp = await getCategoryById(id);
  if (resp.data.path_from_root.length > 0) {
    categories = resp.data.path_from_root.map((item) => item.name);
  }
  return categories;
};

module.exports = {
  getCategories,
  getCategoriesById,
};
