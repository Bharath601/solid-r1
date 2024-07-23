import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import userMiddleware from '../middlewares/user.js';
import { sendVerificationEmail, sendResetEmail } from '../utils/emailService.js';

const router = express.Router();
const secretKey = process.env.SECRET || 'Bharath601';

// Helper functions for email verification and password reset
const verification_key = email => jwt.sign({ email }, secretKey, { expiresIn: '1d' });
const passwordResetToken = email => jwt.sign({ email }, secretKey, { expiresIn: '1d' });

// Signup route
router.post("/signup", async (req, res) => {
  const { username, email, password, cPassword } = req.body;

  if (!username || !email || !password || !cPassword) {
    return res.status(400).json("All fields are required.");
  }
  
  if (!email.includes('@')) {
    return res.status(400).json('Enter a correct email address.');
  }    
  if (password.length < 8) {
    return res.json("Password should contain at least 8 characters");
  }
  if (password !== cPassword) {
    return res.json("Password and Confirm password should be same");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  sendVerificationEmail(email, verification_key(email));
  await user.save();
  res.status(201).json({ msg: 'User created successfully' });
});

// Login route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ msg: 'Incorrect email and password' });
  }
  if (user.verified) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ msg: "Login successful", email: user.email });
    } else {
      return res.json({ msg: 'Incorrect email and password' });
    }
  } else {
    return res.json({ msg: 'Email not verified' });
  }
});

// Get user information
router.get('/user', userMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const boughtProducts = user.productsBought.map(product => {
      const { stripeSessionId, ...productDetails } = product;
      return productDetails;
    });

    res.json({
      username: user.username,
      email: user.email,
      productsBought: boughtProducts
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Forgot password
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(400).send('Please provide an accurate email');
  }

  const resetToken = passwordResetToken(user.email);
  user.verified = false;
  sendResetEmail(email, resetToken);
  res.status(201).send("Please check your email for password reset instructions");
});

// Reset password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (user.verified) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send('Password successfully updated');
  } else {
    res.status(400).send('Invalid or expired token.');
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;
    const payload = jwt.verify(token, secretKey);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    user.verified = true;
    await user.save();
    res.send('Email successfully verified!');
  } catch (error) {
    res.status(400).send('Invalid or expired token.');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
