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
import laavanDefaultData from "./templateData/laavanDefaultData.js";
import mayraDefaultData from "./templateData/mayraDefaultData.js";
const app = express();
import uploadRoutes from "./routes/uploadRoutes.js";
import kalyanamDefaultData from "./templateData/kalyanamDefaultData.js";

dotenv.config();

const seedTemplates = async () => {
  try {
    const templates = [
      {
        title: "Hitched",
        slug: "hitched",
        indprice: 2999,
        usaprice: 39,
        category: "Hindu Weddings",
        previewImage: "/assets/preview-images/hitched.png",
        componentKey: "hitched",
        defaultData: hitchedDefaultData,
      },
      {
        title: "Laavan",
        slug: "laavan",
        indprice: 3999,
        usaprice: 69,
        category: "Sikh Weddings",
        previewImage: "/assets/preview-images/laavan.png",
        componentKey: "laavan",
        defaultData: laavanDefaultData,
      },
      {
        title: "Mayra",
        slug: "mayra",
        indprice: 4999,
        usaprice: 59,
        category: "Hindu Weddings",
        previewImage: "/assets/preview-images/mayra.png",
        componentKey: "mayra",
        defaultData: mayraDefaultData,
      },
       {
        title: "Kalyanam",
        slug: "kalyanam",
        indprice: 5999,
        usaprice: 49,
        category: "South-Indian Weddings",
        previewImage: "/assets/preview-images/kalyanam.jpg",
        componentKey: "kalyanam",
        defaultData: kalyanamDefaultData,
      },
    ];

    for (const template of templates) {
      const existing = await Template.findOne({ slug: template.slug });

      if (!existing) {
        await Template.create(template);
        console.log(`✅ ${template.title} template seeded`);
      }
    }
  } catch (error) {
    console.error("Seed templates error:", error);
  }
};

const startServer = async () => {
  await connectDB();
  await seedTemplates();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
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
