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
// .single("photo"): Specifies that the middleware will handle a single file upload. The field name in the form 
// must be "photo".