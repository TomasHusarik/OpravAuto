import mongoose from "mongoose";

export const orderItemSchema = new mongoose.Schema({
    serviceItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceItem',
        required: false
    },
    label: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
});

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Cancelled"],
        default: "Pending",
    },
    totalCost: {
        type: Number,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
    },
    items: [orderItemSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;