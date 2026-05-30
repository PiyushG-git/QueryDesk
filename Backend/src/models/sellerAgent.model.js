import mongoose from 'mongoose';

const sellerAgentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    minAcceptablePrice: {
        type: Number,
        required: true
    },
    originalPurchasePrice: {
        type: Number
    },
    productCondition: {
        type: String,
        enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
        required: true
    },
    purchaseDate: {
        type: Date
    },
    accessoriesIncluded: {
        type: String
    },
    reasonForSelling: {
        type: String
    },
    knownIssues: {
        type: String
    },
    warrantyStatus: {
        type: String
    },
    negotiationStyle: {
        type: String,
        enum: ['Aggressive', 'Balanced', 'Flexible'],
        required: true
    },
    maxDiscountAllowed: {
        type: Number,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String
    },
    specialNegotiationRules: {
        type: String
    },
    generatedPrompt: {
        type: String,
        required: true
    }
}, { timestamps: true });

const sellerAgentModel = mongoose.model('SellerAgent', sellerAgentSchema);

export default sellerAgentModel;
