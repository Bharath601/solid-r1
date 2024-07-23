import express from 'express';
import userMiddleware from '../middleware/user.js';
import User from '../models/user.js';

const router = express.Router();

// Add to cart
router.post("/addToCart", userMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.cart.push(req.body);
    await user.save();
    res.status(201).json({ msg: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error adding item to cart" });
  }
});

// Buy cart
router.post("/buyCart", userMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.productsBought.push(...user.cart);
    user.cart = [];
    await user.save();
    res.status(201).json({ msg: "Cart bought successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error buying cart" });
  }
});

// Clear cart
router.delete("/clearCart", userMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.cart = [];
    await user.save();
    res.send('Cart cleared successfully');
  } catch (error) {
    res.status(500).send('Error clearing cart');
  }
});

// Get cart by email
router.get("/getCartByEmail", userMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (user && user.cart.length > 0) {
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ msg: "No cart items found for this email" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Remove item from cart
router.post("/removeFromCart", userMiddleware, async (req, res) => {
  const { itemIndex } = req.body;
  const email = req.user.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (itemIndex >= 0 && itemIndex < user.cart.length) {
      user.cart.splice(itemIndex, 1);
      await user.save();
      res.status(200).json({ msg: "Item removed from cart" });
    } else {
      res.status(400).json({ msg: "Invalid item index" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default router;
