import Template from "../models/Template.js";
import generateSlug from "../utils/generateslug.js";

export const createTemplate = async(req, res) => {
  try {
    const { title, indprice, usaprice, previewImage, category, componentKey, defaultData } = req.body;
    const slug = generateSlug(title);
    const template =await Template.create({
      title,
      slug,
      indprice,
      usaprice,
      previewImage,
      category,
      componentKey,
      defaultData,
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTemplate = async (req, res) => {
  try {
    const template = await Template.findOne().sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTemplateBySlug = async (req, res) => {
  try {
    const template = await Template.findOne({ slug: req.params.slug });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};