import express from 'express';
import Highlight from '../models/highlightSchema.js';

const router = express.Router();

router.get('/api/highlight', async (req, res) => {
  try {
    const highlight = await Highlight.findOne();
    res.json(highlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
