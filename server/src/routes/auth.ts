import { Router } from 'express';

const SECRET_KEY = 'navhub2024';
const router = Router();

router.post('/', (req, res) => {
  const { key } = req.body;
  if (key === SECRET_KEY) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false, error: 'invalid key' });
  }
});

export default router;
