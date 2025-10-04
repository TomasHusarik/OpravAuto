import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    vin: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: false,
    },
    mileage: {
        type: Number,
    },
    engineType: {
        type: String,
        enum: ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"],
    },
    transmission: {
        type: String,
        enum: ["Manual", "Automatic", "CVT", "Other"],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true, // This automatically handles createdAt and updatedAt
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;