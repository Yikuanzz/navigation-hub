import { Router } from 'express';
import { getItems, addItem, updateItem, deleteItem } from '../data-store.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await getItems();
  res.json(items);
});

router.post('/', async (req, res) => {
  const { name, url, description, category, tags, color } = req.body;
  if (!name || !url) {
    res.status(400).json({ error: 'name and url are required' });
    return;
  }
  const item = await addItem({ name, url, description: description || '', category: category || 'dev', tags: tags || [], color });
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const item = await updateItem(req.params.id, req.body);
  if (!item) {
    res.status(404).json({ error: 'item not found' });
    return;
  }
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const ok = await deleteItem(req.params.id);
  if (!ok) {
    res.status(404).json({ error: 'item not found' });
    return;
  }
  res.json({ success: true });
});

export default router;
