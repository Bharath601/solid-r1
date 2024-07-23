import express from 'express';
import FeaturedProduct from '../models/featuredProductSchema.js';

const router = express.Router();

router.get('/api/featured-products', async (req, res) => {
  try {
    const featuredProducts = await FeaturedProduct.find();
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
