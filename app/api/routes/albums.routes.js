const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();

const { getAllAlbums, getAlbumById } = require("../controllers/album.controller");
router.get("/", getAllAlbums); // Shows all Albums in DB
router.get("/:albumId", getAlbumById);

module.exports = router;
