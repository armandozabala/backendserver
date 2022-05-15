const author = (req, res, next) => {
  res.author = {
    name: process.env.AUTHOR_NAME,
    lastname: process.env.AUTHOR_LASTNAME,
  };
  next();
};

module.exports = author;
