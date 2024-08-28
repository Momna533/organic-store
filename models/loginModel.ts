const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },

  password: {
    type: String,
    required: true,
  },
});

export const loginModel =mongoose.models.login ||  mongoose.model("login", loginSchema);
