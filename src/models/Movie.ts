import mongoose, {Schema, Model, Document} from "mongoose";

export type MovieStatus = "now_showing" | "coming_soon" | "ended";

export interface IMovie extends Document {
    title: string;
    slug: string;
    shortDescription: string;
    longdescription: string;

    thumbnail:{
        url: string;
        publicId: string;
    }
    trailerUrl?: string;

    genre: string[];
    language: string;
    duration: number;

    releaseDate: Date;

    director?: string;
    cast: string[];

    rating?: number;
    status: MovieStatus;

    createdAt: Date;
    updatedAt: Date;
}

const movieSchema = new Schema<IMovie>({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    shortDescription: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 200,
        trim: true
    },
    longDescription: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 1000,
        trim: true
    },
    thumbnail: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        }
    },
    trailerUrl: {
        type: String,
        required: false,
    },
    genre: {
        type: [String],
        required: true,
        validate: {
            validator: function (value: string[]) {
                return value.length > 0;
            },
            message: "At least one genre is required."
        }
    },
    language: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    director: {
        type: String,
        required: false,
    },
    cast: {
        type: [String],
        required: true,
        validate: {
            validator: function (value: string[]) {
                return value.length > 0;
            },
            message: "At least one cast member is required."
        }
    },

    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 10,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ["now_showing", "coming_soon", "ended"],
        default: "coming_soon"
    }

},{timestamps: true});

const Movie: Model<IMovie> =
  mongoose.models.Movie || mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;