import mongoose, { Schema, Document, Model } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "cancelled" ;

export type PaymentStatus = "pending" | "paid" | "failed" ;

export interface IBookingSeat {
  row: string;
  number: number;
  price: number;
}

export interface IBooking extends Document {
  bookingReference: string;

  user: mongoose.Types.ObjectId;
  show: mongoose.Types.ObjectId;

  seats: IBookingSeat[];

  totalAmount: number;

  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;

  createdAt: Date;
  updatedAt: Date;
}

const bookingSeatSchema = new Schema<IBookingSeat>({
    row: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { _id: false });

const bookingSchema = new Schema<IBooking>({
    bookingReference: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true,
    },
    seats: {
        type: [bookingSeatSchema],
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
}, { timestamps: true });



const Booking: Model<IBooking> = mongoose.model<IBooking>("Booking", bookingSchema);

