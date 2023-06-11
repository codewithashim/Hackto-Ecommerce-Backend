const {
  ProductModel,
  ReviewModel,
  AddCardFevModel,
} = require("../../Models/ProductModal/ProductModal");

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await ProductModel.find();
    res.status(200).json({
      message: "All Product",
      data: allProduct,
      status: 200,
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json({
      message: "Product fetched successfully",
      sucess: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(200).json({
      message: "Product added successfully",
      sucess: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Product added successfully",
      sucess: true,
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await ProductModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Product deleted successfully",
      sucess: true,
      data: deleteProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const giveReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { reviewerName, reviewerEmail, reviewerRating, reviewerComment } =
      req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const review = new ReviewModel({
      reviewerName,
      reviewerEmail,
      reviewerRating,
      reviewerComment,
    });

    product.productReviews.push(review);
    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      sucess: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      sucess: false,
      message: error,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userId = req.user.id;
    const user = await AddCardFevModel.findByIdAndUpdate(
      userId,
      { $push: { cart: product._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Product added to cart successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

const getCartByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await AddCardFevModel.findByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Cart retrieved successfully",
      success: true,
      data: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

const getFavoritesByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await AddCardFevModel.findByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Favorites retrieved successfully",
      success: true,
      data: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userId = req.user.id;
    const user = await AddCardFevModel.findByIdAndUpdate(
      userId,
      { $push: { favorites: product._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Product added to favorites successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userId = req.user.id;
    const user = await AddCardFevModel.findByIdAndUpdate(
      userId,
      { $pull: { cart: product._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Product removed from cart successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const userId = req.user.id;
    const user = await AddCardFevModel.findByIdAndUpdate(
      userId,
      { $pull: { favorites: product._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Product removed from favorites successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

module.exports = {
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
};
