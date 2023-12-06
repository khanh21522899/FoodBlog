const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const rootDir = path.dirname(process.cwd());
    cb(null, path.join(rootDir, "Server/public/postImages"));
  },

  filename: function(req, file, cb) {
    req.savedStoryImage =
      "image_" +
      new Date().toISOString().replace(/:/g, "-") +
      file.originalname;

    cb(null, req.savedStoryImage);
  },
});

const imageUpload = multer({ storage });

module.exports = imageUpload;
