import express from 'express';

import {createTemplate, getTemplates, getTemplate, getTemplateBySlug} from '../controllers/templateController.js';
const router = express.Router();

router.post("/create", createTemplate);
router.get("/all", getTemplates);
router.get("/", getTemplate);
router.get("/:slug", getTemplateBySlug);

export default router;  