import express from 'express';
import { 
  getAllWebsites, 
  createWebsite, 
  getWebsite, 
  updateWebsite, 
  deleteWebsite 
} from '../controllers/websiteController';

const router = express.Router();

// Get all websites
router.get('/', getAllWebsites);

// Create a new website
router.post('/', createWebsite);

// Get a specific website
router.get('/:id', getWebsite);

// Update a website
router.put('/:id', updateWebsite);

// Delete a website
router.delete('/:id', deleteWebsite);

export default router;