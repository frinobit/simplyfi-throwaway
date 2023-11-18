import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileDeletePolicy = (req, res, next) => {
  const { fileName } = req.body;
  const user_id = req.user.user_id;
  const filePath = path.join(
    __dirname,
    "../assets_policy",
    `${user_id}_${fileName}`
  );

  // Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Handle error (file not found, permission issue, etc.)
      console.error("File not found:", err);
      res.status(404).send("File not found");
    } else {
      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          // Handle error while deleting
          console.error("Error deleting file:", err);
          res.status(500).send("Error deleting file");
        } else {
          next();
        }
      });
    }
  });
};
