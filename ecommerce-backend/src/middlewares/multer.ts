// multer: Handles file uploads in Express applications.
import multer from "multer";
// uuid: Generates unique identifiers, ensuring file names are unique to avoid overwriting.
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads"); // Save files in the "uploads" directory
    },
    filename(req, file, callback) {
      const id = uuid(); // Generate a unique ID for the file
      const extName = file.originalname.split(".").pop(); // Extract the file extension
      callback(null, `${id}.${extName}`); // Set the file name as "<uuid>.<extension>"
    },
  });

export const singleUpload = multer({ storage }).single("photo");
// multer({ storage }): Configures multer to use the defined storage for handling file uploads.
// .single("photo"): Specifies that the middleware will handle a single file upload. The field name in the form must be "photo".

/*
export const singleUpload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith("image/")) {
            return callback(new Error("Only image files are allowed!"));
        }
        callback(null, true);
    },
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
}).single("photo");


Example:
{
  "fieldname": "photo",
  "originalname": "example.jpg",
  "encoding": "7bit",
  "mimetype": "image/jpeg",
  "destination": "uploads",
  "filename": "123e4567-e89b-12d3-a456-426614174000.jpg",
  "path": "uploads/123e4567-e89b-12d3-a456-426614174000.jpg",
  "size": 204800
}
*/