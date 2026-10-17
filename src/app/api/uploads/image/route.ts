import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";
import { UploadApiResponse } from "cloudinary";

export async function POST(request: NextRequest) {
    try {
        const authError = requireAdmin(request);
        if (authError) {
            return authError;
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No image file provided" },
                { status: 400 }
            );
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid file type. Only JPEG, PNG, WEBP, and AVIF are allowed.",
                },
                { status: 400 }
            );
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const folder = (formData.get("folder") as string) || "movexa/movies";

        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: "image",
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error || new Error("Failed to upload image to Cloudinary"));
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(buffer);
        });

        return NextResponse.json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                width: uploadResult.width,
                height: uploadResult.height,
                format: uploadResult.format,
            },
        });
    } catch (error) {
        console.error("IMAGE_UPLOAD_ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Failed to upload image",
            },
            { status: 500 }
        );
    }
}
