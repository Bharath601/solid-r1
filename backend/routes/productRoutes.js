import express from 'express';
import multer from 'multer';
import Product from '../models/productSchema.js';

const router = express.Router();

// Set up multer for file storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/productsUp', upload.array('images', 100), async (req, res) => {
  try {
    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype
    }));
    const highlight = req.body.highlight === 'null' ? null : req.body.highlight;
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      images: images,
      price: req.body.price,
      status: req.body.status,
      type: req.body.type,
      highlight: highlight // Handle the highlight field properly
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error uploading product:', error); // Log the detailed error
    res.status(500).json({ error: error.message });
  }
});

// Get all featured products
router.get('/featured-products', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ highlight: 'featured' });
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get the highlighted product
router.get('/highlight', async (req, res) => {
  try {
    const highlight = await Product.findOne({ highlight: 'highlight' });
    res.json(highlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
