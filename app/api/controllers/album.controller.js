const Color = require("../models/Album");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const getAllAlbums = async (req, res, next) => {
  try {
    if (req.query.page) {
      //Se le añade paginación
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const albums = await Album.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { albums: albums },
      });
    } else {
      const albums = await Color.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { albums: albums },
      });
    }
  } catch (err) {
    return next(err);
  }
};

const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const albumById = await Album.findById(albumId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { albums: albumById },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
};
