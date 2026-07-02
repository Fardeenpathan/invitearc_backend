import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Template from "./models/Template.js";
import templateRoutes from "./routes/templateRoutes.js";
import clientTemplateRoutes from "./routes/clienttemplateRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import hitchedDefaultData from "./templateData/hitchedDefaultData.js";
const app = express();
import uploadRoutes from  "./routes/uploadRoutes.js";

dotenv.config();

const seedTemplates = async () => {
  try {
    const slug = "hitched";
    const existing = await Template.findOne({ slug });
    if (existing) {
      return;
    }

    await Template.create({
      title: "Hitched",
      slug,
      indprice: 2999,
      usaprice: 39,
      category: "Wedding",
      previewImage: "/assets/preview-images/hitched.png",
      componentKey: "hitched",
      defaultData: hitchedDefaultData,
    });
  } catch (error) {}
};

const startServer = async () => {
  await connectDB();
  await seedTemplates();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/template", templateRoutes);
  app.use("/api/client-templates", clientTemplateRoutes);
  app.use("/api/auth", authRouter);
  app.use("/api/upload", uploadRoutes);

  app.get("/", (req, res) => {
    res.send("api running");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  });
};

startServer();
