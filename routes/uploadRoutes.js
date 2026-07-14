
import express from "express";
import upload, {
  uploadBufferToCloudinary,
} from "../middleware/upload.js";

const router = express.Router();

router.post("/event-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const folder = req.body.folder || "invitearc/events";
    const resourceType = req.body.resourceType || "image";

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      folder,
      resourceType
    );

    return res.status(200).json({
      success: true,
      image: result.secure_url,
      url: result.secure_url,
      secureUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;