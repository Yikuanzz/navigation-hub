import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import itemsRouter from './routes/items.js';
import categoriesRouter from './routes/categories.js';
import tagsRouter from './routes/tags.js';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/auth', authRouter);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, '../../dist');
  app.use(express.static(staticPath));

  // Fallback to index.html for SPA routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NavHub server running on http://0.0.0.0:${PORT}`);
});
