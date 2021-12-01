const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
  {
    name: { type: String, require: true },
    group: { type: String, require: true },
    year: { type: String, require: true },
    songs: { type: String, require: true },
  },
  { timestamps: true }
);

const Album = mongoose.model("albums", AlbumSchema);
module.exports = Album;
