import { dirname, join } from "path";
import { unlink } from "fs";

const imageDelete = (req, image) => {
  const rootDir = dirname(require.main.filename);

  filePath = join(rootDir, `public/postImages/${image}`);

  unlink(filePath, (err) => {
    if (err) throw err;
    console.log("Image deleted");
  });
};

export default imageDelete;
