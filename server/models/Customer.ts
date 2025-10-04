import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle,"
    }],
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;