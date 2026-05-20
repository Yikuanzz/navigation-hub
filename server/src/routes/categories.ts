import { Router } from 'express';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../data-store.js';

const router = Router();

router.get('/', async (_req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

router.post('/', async (req, res) => {
  const { name, icon } = req.body;
  if (!name || !icon) {
    res.status(400).json({ error: 'name and icon are required' });
    return;
  }
  const cat = await addCategory({ name, icon, builtin: false });
  res.status(201).json(cat);
});

router.put('/:id', async (req, res) => {
  const cat = await updateCategory(req.params.id, req.body);
  if (!cat) {
    res.status(404).json({ error: 'category not found' });
    return;
  }
  res.json(cat);
});

router.delete('/:id', async (req, res) => {
  const ok = await deleteCategory(req.params.id);
  if (!ok) {
    res.status(404).json({ error: 'category not found' });
    return;
  }
  res.json({ success: true });
});

export default router;
