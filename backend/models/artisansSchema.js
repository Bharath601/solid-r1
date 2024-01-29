import mongoose from 'mongoose';

const { Schema } = mongoose;

const artisanSchema = new Schema({
    name: String,
    contactInfo: String,
    bio: String,
    productListing: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    materialRequirements: [{ type: Schema.Types.ObjectId, ref: 'MaterialRequirement' }]
});

const Artisan = mongoose.model('Artisan', artisanSchema);
const contributorSchema = new Schema({
    name: String,
    contactInfo: String,
    contributionHistory: [{ type: Schema.Types.ObjectId, ref: 'Contribution' }]
});

const Contributor = mongoose.model('Contributor', contributorSchema);

const productSchema = new Schema({
    artisan: { type: Schema.Types.ObjectId, ref: 'Artisan' },
    name: String,
    description: String,
    images: [String],
    price: Number,
    status: String
});

const Product = mongoose.model('Product', productSchema);

const materialRequirementSchema = new Schema({
    artisan: { type: Schema.Types.ObjectId, ref: 'Artisan' },
    description: String,
    quantityNeeded: Number,
    contributionsReceived: [{ type: Schema.Types.ObjectId, ref: 'Contribution' }]
});

const MaterialRequirement = mongoose.model('MaterialRequirement', materialRequirementSchema);

const contributionSchema = new Schema({
    contributor: { type: Schema.Types.ObjectId, ref: 'Contributor' },
    requirement: { type: Schema.Types.ObjectId, ref: 'MaterialRequirement' },
    quantityContributed: Number,
    date: Date
});

const Contribution = mongoose.model('Contribution', contributionSchema);
const userSchema = new Schema({
    name: String,
    contactInfo: String,
    purchaseHistory: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }]
});

const User = mongoose.model('User', userSchema);
const purchaseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    purchaseDate: Date,
    status: String
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
