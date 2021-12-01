const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Album = require("../models/Album");

const albums = [
  {
    name: "Lily of the Valley",
    group: "Funeral Suits",
    year: "2012",
    songs: "11",
  },
  {
    name: "Here We Stand",
    group: "The Fratellis",
    year: "2008",
    songs: "12",
  },
  {
    name: "Urban Hymns",
    group: "The Verve",
    year: "1997",
    songs: "13",
  },
  {
    name: "The Mistress",
    group: "Yellow Ostrich",
    year: "2011",
    songs: "13",
  },
  {
    name: "Truth",
    group: "Jeff Beck",
    year: "2005",
    songs: "18",
  },
  {
    name: "The Colour And The Shape",
    group: "Foo Fighters",
    year: "1997",
    songs: "14",
  },
  {
    name: "The Dark Side Of The Moon",
    group: "Pink Floyd",
    year: "1973",
    songs: "10",
  },
];

mongoose
  .connect("mongodb+srv://nestor:album@cluster0.hguza.mongodb.net/Music-Albums?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allAlbums = await Album.find();

    if (allAlbums.length) {
      await Album.collection.drop();
      console.log("Drop database");
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Album.insertMany(albums);
    console.log("DatabaseCreated");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
