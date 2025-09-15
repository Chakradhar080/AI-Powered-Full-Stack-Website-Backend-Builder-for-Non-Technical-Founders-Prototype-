import express from 'express';
import { generateContent, generateImage, chat, generateCode, optimizeLayout, generateApi } from '../controllers/aiController';

const router = express.Router();

// Generate content using AI
router.post('/generate-content', generateContent);

// Generate image using AI
router.post('/generate-image', generateImage);

// Chat with AI assistant
router.post('/chat', chat);

// Generate code for components
router.post('/generate-code', generateCode);

// Optimize layout
router.post('/optimize-layout', optimizeLayout);

// Generate API
router.post('/generate-api', generateApi);

export default router;