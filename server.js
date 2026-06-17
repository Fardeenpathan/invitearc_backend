import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Template from "./models/Template.js";
import templateRoutes from "./routes/templateRoutes.js";
import clientTemplateRoutes from "./routes/clienttemplateRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();

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
      defaultData: {
        description:
          "Love, laughter, and a lifetime together",
      },
    });
    console.log("Seeded Hitched template into the database.");
  } catch (error) {
    console.error("Failed to seed templates:", error);
  }
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
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/template", templateRoutes);
  app.use("/api/client-templates", clientTemplateRoutes);
  app.use("/api/auth", authRouter);

  app.get("/", (req, res) => {
    res.send("api running");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  });
};

startServer();
