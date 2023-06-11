const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewerName: {
    type: String,
  },
  reviewerEmail: {
    type: String,
  },
  reviewerRating: {
    type: Number,
  },
  reviewerComment: {
    type: String,
  },
});

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productSeller: {
    type: String,
    required: true,
  },
  productReviews: [reviewSchema],

  inCart: {
    type: Boolean,
    default: false,
  },
  inFavorites: {
    type: Boolean,
    default: false,
  },
});

const addCardFevSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

addCardFevSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).populate("cart").populate("favorites").exec();
};

module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema),
  ReviewModel: mongoose.model("Review", reviewSchema),
  AddCardFevModel: mongoose.model("AddCardFev", addCardFevSchema),
};
