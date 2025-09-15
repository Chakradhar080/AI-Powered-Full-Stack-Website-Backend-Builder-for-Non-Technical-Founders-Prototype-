import express from 'express';
import { deployWebsite, getDeploymentStatus } from '../controllers/deploymentController';

const router = express.Router();

// Deploy website
router.post('/deploy', deployWebsite);

// Get deployment status
router.get('/status/:deploymentId', getDeploymentStatus);

export default router;