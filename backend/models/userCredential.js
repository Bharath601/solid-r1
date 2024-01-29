import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String,  unique: true },
  email: { type: String,  unique: true, lowercase: true },
  password: { type: String,},
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  innovativeProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InnovativeProduct'
  }]
});

const innovativeProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  materialsUsed: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  }
});

const InnovativeProduct = mongoose.model('InnovativeProduct', innovativeProductsSchema);

userSchema.pre('save', async function (next) {
  // Hash the password before saving
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Clear the verification token once the email is verified
  if (this.isModified('verified') && this.verified) {
    this.verificationToken = '';
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export { User, InnovativeProduct }; // Export the models directly
