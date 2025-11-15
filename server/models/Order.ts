import mongoose from "mongoose";

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
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;