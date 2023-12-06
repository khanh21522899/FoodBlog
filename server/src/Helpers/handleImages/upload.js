import multer, { diskStorage } from "multer";
import path from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(process.cwd());
    cb(null, path.join(rootDir, "Server/public/postImages"));
  },

  filename: function (req, file, cb) {
    req.savedStoryImage =
      "image_" +
      new Date().toISOString().replace(/:/g, "-") +
      file.originalname;

    cb(null, req.savedStoryImage);
  },
});

const imageUpload = multer({ storage });

export default imageUpload;
