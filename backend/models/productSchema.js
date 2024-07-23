import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    description: String,
    images: [{ data: Buffer, contentType: String }],
    price: Number,
    status: { type: String, enum: ['Available', 'Sold Out'] },
    type: { type: String, enum: ['hoodie', 't-shirt'] },
    highlight: { type: String, enum: ['featured', 'highlight', 'null'], default: 'null' } // Add 'null' to the enum
});

const Product = mongoose.model('Product', productSchema);

export default Product;
