import express from 'express';
import { 
  getAllPages, 
  createPage, 
  getPage, 
  updatePage, 
  deletePage 
} from '../controllers/pageController';

const router = express.Router({ mergeParams: true });

// Get all pages for a website
router.get('/', getAllPages);

// Create a new page
router.post('/', createPage);

// Get a specific page
router.get('/:id', getPage);

// Update a page
router.put('/:id', updatePage);

// Delete a page
router.delete('/:id', deletePage);

export default router;