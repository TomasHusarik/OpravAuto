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
    note: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true
});

// // Virtual to get customer's vehicles
// customerSchema.virtual('vehicles', {
//     ref: 'Vehicle',
//     localField: '_id',
//     foreignField: 'customerId'
// });

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;