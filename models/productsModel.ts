const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
    default:
      "Neque porro quisquam est, qui dolore ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non incidunt lores ta porro ame. numquam eius modi tempora incidunt lores ta porro ame.",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 3,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const productsModel = mongoose.models.products||  mongoose.model("products", productsSchema);
