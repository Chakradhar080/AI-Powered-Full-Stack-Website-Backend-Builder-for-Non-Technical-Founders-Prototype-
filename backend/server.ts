import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import websitesRouter from './routes/websites';
import pagesRouter from './routes/pages';
import componentsRouter from './routes/components';
import usersRouter from './routes/users';
import aiRouter from './routes/ai';
import deploymentRouter from './routes/deployment';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-website-builder')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('AI Website Builder API is running...');
});

app.use('/api/websites', websitesRouter);
app.use('/api/websites/:websiteId/pages', pagesRouter);
app.use('/api/pages/:pageId/components', componentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/ai', aiRouter);
app.use('/api/deployment', deploymentRouter);

export default app;