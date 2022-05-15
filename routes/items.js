const express = require("express");
const router = express.Router();
const author = require("../middleware/author");
const ItemController = require("../controllers/item.controller");

/**
 *  Search all Items
 *  @route GET /api/items?q=search
 *  @param {string} q
 */
router.get("/", author, ItemController.getItemsBySearch);
/**
 * Serach Item by Id
 * @route GET /api/items/:id
 * @param {string} id
 */
router.get("/:id", author, ItemController.getItemsByIdAndDescription);

module.exports = router;
