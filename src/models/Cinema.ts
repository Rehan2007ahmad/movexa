import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICinema extends Document {
  name: string;
  location: string;
  address: string;
  description?: string;


  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const cinemaSchema = new Schema<ICinema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cinema: Model<ICinema> =
  mongoose.models.Cinema ||
  mongoose.model<ICinema>("Cinema", cinemaSchema);

export default Cinema;