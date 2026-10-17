import { z } from "zod";

export const movieStatusSchema = z.enum([
    "now_showing",
    "coming_soon",
    "ended",
]);

export const createMovieSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required"),

    slug: z
        .string()
        .trim()
        .min(1, "Slug is required")
        .toLowerCase(),

    shortDescription: z
        .string()
        .trim()
        .min(20, "Short description must be at least 20 characters")
        .max(200, "Short description cannot exceed 200 characters"),

    longDescription: z
        .string()
        .trim()
        .min(50, "Long description must be at least 50 characters")
        .max(1000, "Long description cannot exceed 1000 characters"),

    thumbnail: z.object({
        url: z.string().url("Invalid thumbnail URL"),
        publicId: z.string().min(1, "Cloudinary public ID is required"),
    }),

    trailerUrl: z
        .string()
        .url("Invalid trailer URL")
        .optional(),

    genre: z
        .array(z.string().trim().min(1))
        .min(1, "At least one genre is required"),

    language: z
        .string()
        .trim()
        .min(1, "Language is required"),

    duration: z
        .number()
        .int("Duration must be a whole number")
        .positive("Duration must be greater than 0"),

    releaseDate: z
        .string()
        .datetime({
            offset: true,
        }),

    director: z
        .string()
        .trim()
        .optional(),

    cast: z
        .array(z.string().trim().min(1))
        .min(1, "At least one cast member is required"),

    rating: z
        .number()
        .min(0)
        .max(10)
        .optional(),

    status: movieStatusSchema.optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;