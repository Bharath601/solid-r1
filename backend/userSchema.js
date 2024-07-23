import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    contactInfo: String,
    purchaseHistory: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }]
});

const User = mongoose.model('User', userSchema);

const productSchema = new Schema({
    artisan: { type: Schema.Types.ObjectId, ref: 'Artisan' },
    name: String,
    description: String,
    images: [String],
    price: Number,
    status: { type: String, enum: ['Available', 'Sold Out'] }
});

const Product = mongoose.model('Product', productSchema);


const purchaseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    purchaseDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'] }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
