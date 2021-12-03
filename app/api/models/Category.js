const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    albums: [{ type: Schema.Types.ObjectId, ref: "albums", required: true }],
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
