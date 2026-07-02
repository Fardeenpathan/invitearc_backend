// import multer from "multer";
// import cloudinary from "../config/cloudinary.js";

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB
//   },
// });

// export const uploadBufferToCloudinary = (
//   buffer,
//   folder = "invitearc/events"
// ) =>
//   new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         resource_type: "image",
//       },
//       (error, result) => {
//         if (error) {
//           return reject(error);
//         }

//         resolve(result);
//       }
//     );

//     stream.end(buffer);
//   });

// export default upload;

import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

export const uploadBufferToCloudinary = (
  buffer,
  folder = "invitearc/events",
  resourceType = "image"
) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });

export default upload;