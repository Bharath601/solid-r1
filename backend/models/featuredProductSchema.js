import mongoose from 'mongoose';

const { Schema } = mongoose;

const featuredProductSchema = new Schema({
  name: String,
  image: String
});

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredProductSchema);

export default FeaturedProduct;
