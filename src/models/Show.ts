import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShowSeat extends Document {
  row: string;
  number: number;
  type: "regular" | "premium";
  price: number;

  status: "available" | "booked";
}

export interface IShow extends Document {
  movie: mongoose.Types.ObjectId;
  cinema: mongoose.Types.ObjectId;
  screen: mongoose.Types.ObjectId;

  date: Date;

  startTime: string;
  endTime: string;

  seats: IShowSeat[];

  createdAt: Date;
  updatedAt: Date;
}

const showSeatSchema = new Schema<IShowSeat>(
  {
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
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { _id: false },
);

const showSchema = new Schema<IShow>(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    cinema: {
      type: mongoose.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    screen: {
      type: mongoose.Types.ObjectId,
      ref: "Screen",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    seats: {
      type: [showSeatSchema],
      required: true,
    },
  },
  { timestamps: true },
);

showSchema.index(
  { movie: 1, cinema: 1, date: 1, startTime: 1 },
  { unique: true },
);

const Show: Model<IShow> =
  mongoose.models.Show || mongoose.model<IShow>("Show", showSchema);

export default Show;
