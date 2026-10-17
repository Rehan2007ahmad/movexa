import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Movie from "@/models/Movie";
import { createMovieSchema } from "@/validators/movie.validator";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get("status");
        const query = searchParams.get("query");

        const filter: Record<string, unknown> = {};
        if (status && status !== "all") {
            filter.status = status;
        }
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { director: { $regex: query, $options: "i" } },
                { genre: { $in: [new RegExp(query, "i")] } },
            ];
        }

        const movies = await Movie.find(filter).sort({ createdAt: -1 }).lean();

        return NextResponse.json({
            success: true,
            count: movies.length,
            movies,
        });
    } catch (error) {
        console.error("GET_MOVIES_ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch movies",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const authError = requireAdmin(request);
        if (authError) {
            return authError;
        }

        const body = await request.json();
        const result = createMovieSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid movie data",
                    errors: result.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = result.data;

        await connectDB();

        const existingMovie = await Movie.findOne({
            slug: data.slug,
        });

        if (existingMovie) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A movie with this slug already exists. Please choose a different title or slug.",
                },
                { status: 409 }
            );
        }

        const movie = await Movie.create({
            ...data,
            releaseDate: new Date(data.releaseDate),
        });

        return NextResponse.json(
            {
                success: true,
                message: "Movie created successfully",
                movie,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE_MOVIE_ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Failed to create movie",
            },
            { status: 500 }
        );
    }
}