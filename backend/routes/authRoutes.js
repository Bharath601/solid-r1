// // /routes/authRoutes.js
// import express from 'express';
// import{User,InnovativeProduct} from '../models/userCredential.js';
// import { generateToken } from '../utils/jwtService.js';
// import { sendVerificationEmail ,sendResetEmail} from '../utils/emailService.js';  
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import multer from 'multer';
// import mongoose from 'mongoose';
// import Stripe from 'stripe';
// const verification_key = (user) => {
//   // use user._id , email for it to generate verification key 
// return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
// }
// const passwordResetToken = (user) => {
//   return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
// };

// const secretKey = 'Bharath601';
// const router = express.Router();

// router.get('/', async(req,res)=>{
//     console.log("GET / route hit");
//     res.send("Hello welcome")
// })

// router.post('/signup', async (req, res) => {
//   try {
//     console.log(req.body);
//     const { username, email, password } = req.body;
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     // checking for user existence 
//     if (existingUser) {
//       return res.status(400).send('Email already in use.');
//     }
//     const user = new User({ username, email, password, verified: false });
//     await user.save();
//     /* work left -> to generate a jwt token , for it 
//       const verify_token = verification_key(user);
//       use it for sendVerificationEmail(email,verify_token)
//     */ 
//     // verifying email 
//     await sendVerificationEmail(email, verification_key(user));
   
//     res.status(200).send('Signup successful! Please check your email to verify your account.');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email.toLowerCase() }); // Ensuring email is case insensitive
//     if (user && await user.comparePassword(password)) {
//         if (!user.verified) {
//             // If the user's email is not verified, don't allow login
//             res.status(403).json({message: 'Please verify your email first.'});
//         } else {
//             // If the user's email is verified, proceed with login
//             const token = generateToken(user);
//             res.status(200).json({ message: 'User logged in', token: token });
//         }
//     } else {
//       res.status(401).send('Invalid credentials');
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
// router.delete('/delete', async (req, res) => {
//   try {
//     const { email } = req.body; 
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(404).send('User not found.');
//     }

//     await user.remove(); 
//     res.status(200).send('User successfully deleted.');
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// router.post('/forgot_password',async(req,res)=>{
//   try {
//     console.log(req.body);
//     const {email} = req.body;
//     const exsist= await User.findOne({ email: email.toLowerCase() });
//     if (!exsist) {
//       return res.status(400).send('please give accurate email');
//     }
//     const resetToken = passwordResetToken(exsist);
    
//     await sendResetEmail(email,resetToken);
//     res.status(201).send("please check ur email we have sent you the mail , to correct the password")

//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// })
// router.post('/reset-password',async(req,res)=>{
//   try {
//     const { token, newPassword } = req.body;
//     const payload = jwt.verify(token, secretKey);
//     console.log(payload);
    
//     const user = await User.findById(payload.userId);
//     console.log("ujgjghv"+user._id);

//     if (!user) {
//       return res.status(404).send('User not found.');
//     }
    
//     // Ensure the token matches the user's email for additional security
//     if (user._id != payload.userId) {
//       return res.status(403).send('Invalid token.');
//     }
    
//     // Hash the new password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);
    
//     // Update the user's password with the hashed password
//     user.password = hashedPassword;
//     await user.save();
    
//     res.status(200).send('Password successfully updated.');
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       res.status(400).send('Invalid or expired token.');
//     } else {
//       res.status(500).send(error.message);
//     }
//   }
// })

// router.get('/verify-email', async (req, res) => {
//   try {
//     const token = req.query.token;
//     const payload = jwt.verify(token, secretKey);
//     const user = await User.findById(payload.userId);
//     const verification_Token = verification_key(user)
//     if (user) {
//       user.verified = true;
//       await user.save();
//       res.send('Email successfully verified!');
//       user.verificationToken=verification_Token
//       await user.save(verification_Token);
//       res.send();
//     } else {
//       res.status(404).send('User not found.');
//     }
//   } catch (error) {
//     res.status(400).send('Invalid or expired token.');
//   }
// });



// const storage = multer.memoryStorage(); // This will store files in memory
// const upload = multer({ storage: storage });

// // POST endpoint to create a new innovative product with an image
// router.post('/create-innovative-product', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, materialsUsed, price, quantity } = req.body;
//     const image = {};

//     if (req.file) {
//       // Use a Buffer to store the image data and specify the correct content type
//       image.data = req.file.buffer;
//       image.contentType = req.file.mimetype;
//     } else {
//       return res.status(400).json({ message: 'No image file provided.' });
//     }

//     // Create a new innovative product instance
//     const newProduct = new InnovativeProduct({
//       title,
//       description,
//       materialsUsed: materialsUsed.split(','),
//       price,
//       quantity,
//       image // Make sure the image is structured correctly for your schema
//     });

//     // Save the new product to the database
//     await newProduct.save();

//     // Send a response back to the client with the ID of the created product
//     console.log(newProduct._id);
//     res.status(201).json({
//       message: 'Innovative product created successfully!',
//       productId: newProduct._id, // Include the product ID in the response
      
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// });

// // GET endpoint to retrieve an image by its product ID
// router.get('/get-image/:title', async (req, res) => {
//   try {
//     // Decode the title in case it contains spaces or special characters
//     const title = decodeURIComponent(req.params.title);
//     console.log(title)
//     // Query MongoDB to retrieve the product by title
//     // Replace spaces with regex to allow for partial matching if needed
//     const product = await InnovativeProduct.findOne({ title: { $regex: title, $options: 'i' } });
//     console.log(product)
//     if (!product || !product.image || !product.image.data) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     // Set the Content-Type for the response to be the image's content type
//     res.set('Content-Type', product.image.contentType);

//     // Send the image data as a response
//     res.send(product.image.data);
//   } catch (error) {
//     console.error(`Error retrieving image with title: ${req.params.title}`, error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// router.get('/get-all-images', async (req, res) => {
//   try {
//     // Fetch all documents from the InnovativeProduct collection
//     const products = await InnovativeProduct.find({}, 'image');

//     // Filter out products that don't have an image and map to the image data
//     const imagesData = products
//       .filter(product => product.image && product.image.data)
//       .map(product => product.image.data);

//     // Send the image data as a response
//     // Note: This assumes images are not too large and there aren't too many
//     res.json(imagesData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // stripe key 
// const stripe = new Stripe('sk_test_51OduLoSEuj58CJVxfj0JxednavltZr3C59KJx9Ik6b9ZhHw6AmMigGRBri6vNvJkvOp1GGaT0ZUElG21zUdPQer6005hR0RkBD');
// // router.post('/create-checkout-session', async (req, res) => {
// //   try {
// //     const { items } = req.body;
// //     // Convert items to Stripe's format or calculate the total price

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ['card'],
// //       line_items: [
// //         {
// //           // Define your product and pricing here
// //           price_data: {
// //             currency: 'inr',
// //             product_data: {
// //               name: 'Your Product Name',
// //               // ... other product details
// //             },
// //             unit_amount: 2000, // price in cents
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       mode: 'payment',
// //       success_url: 'http://localhost:5175/', // URL to redirect to after successful payment
// //       cancel_url: 'http://localhost:5175/cart', // URL to redirect to if the customer cancels
// //     });

// //     res.json({ id: session.id });
// //   } catch (error) {
// //     res.status(500).send("Error creating Stripe checkout session");
// //   }
// // });
// router.post('/create-checkout-session', async (req, res) => {
//   try {
//     const { items } = req.body;

//     const line_items = items.map(item => ({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: item.name,
//           // Include other product details if needed
//         },
//         unit_amount: item.unit_amount, // Ensure this is in cents
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: line_items,
//       mode: 'payment',
//       success_url: 'http://localhost:5175/', // URL to redirect to after successful payment
//       cancel_url: 'http://localhost:5175/cart', // URL to redirect to if the customer cancels
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating Stripe checkout session:', error);
//     res.status(500).send("Error creating Stripe checkout session");
//   }
// });




// export default router;
