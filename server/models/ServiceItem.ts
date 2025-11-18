import mongoose from "mongoose";

const serviceItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    defaultPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

const ServiceItem = mongoose.model("ServiceItem", serviceItemSchema);
export default ServiceItem;
