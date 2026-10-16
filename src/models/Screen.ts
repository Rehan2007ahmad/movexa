import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISeat {
  row: string;
  number: number;
  type: "regular" | "premium";
}

export interface IScreen extends Document {
  cinema: mongoose.Types.ObjectId;
  name: string;
  seats: ISeat[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const seatSchema = new Schema<ISeat>({
    row: {
      type: String,
      required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["regular", "premium"],
        default: "regular",
    },
}, { _id: false });


const screenSchema = new Schema<IScreen>({
    cinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    seats: {
        type: [seatSchema],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

screenSchema.index({ cinema: 1, name: 1 }, { unique: true });

const Screen: Model<IScreen> = mongoose.model<IScreen>("Screen", screenSchema);

export default Screen;
