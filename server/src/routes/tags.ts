import { Router } from 'express';
import { getTags, deleteTag, renameTag } from '../data-store.js';

const router = Router();

router.get('/', async (_req, res) => {
  const tags = await getTags();
  res.json(tags);
});

router.delete('/:tag', async (req, res) => {
  await deleteTag(req.params.tag);
  res.json({ success: true });
});

router.put('/rename', async (req, res) => {
  const { oldName, newName } = req.body;
  if (!oldName || !newName) {
    res.status(400).json({ error: 'oldName and newName are required' });
    return;
  }
  await renameTag(oldName, newName);
  res.json({ success: true });
});

export default router;
