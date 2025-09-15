import express from 'express';
import { 
  getAllComponents, 
  createComponent, 
  getComponent, 
  updateComponent, 
  deleteComponent 
} from '../controllers/componentController';

const router = express.Router({ mergeParams: true });

// Get all components for a page
router.get('/', getAllComponents);

// Create a new component
router.post('/', createComponent);

// Get a specific component
router.get('/:id', getComponent);

// Update a component
router.put('/:id', updateComponent);

// Delete a component
router.delete('/:id', deleteComponent);

export default router;