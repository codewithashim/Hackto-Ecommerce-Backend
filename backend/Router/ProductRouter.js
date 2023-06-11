const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  giveReview,
  addToCart,
  addToFavorites,
  removeFromCart,
  removeFromFavorites,
  getCartByEmail,
  getFavoritesByEmail,
} = require("../Controllers/ProductController/ProductController");

router.get("/product", getAllProduct);
router.get("/product/:id", getProductById);
router.post("/add-product", addProduct);
router.put("/update-product/:id", updateProductById);
router.delete("/delete-product/:id", deleteProductById);
router.post("/product/:id/revews", giveReview);
router.post("/product/:id/add-to-cart", addToCart);
router.post("/product/:id/add-to-favorites", addToFavorites);
router.get("/cart/:email", getCartByEmail);
router.get("/favorites/:email", getFavoritesByEmail);
router.delete("/product/:id/remove-from-cart", removeFromCart);
router.delete("/product/:id/remove-from-favorites", removeFromFavorites);

module.exports = router;
