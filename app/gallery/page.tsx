import Image from "next/image";
import Link from "next/link";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export default async function Gallery() {
	let images: Awaited<ReturnType<typeof list>>["blobs"] = [];
	let error: string | null = null;

	try {
		// Get the blob token - Vercel now uses BLOB_VERCEL_READ_WRITE_TOKEN
		const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_VERCEL_READ_WRITE_TOKEN;
		
		if (!blobToken) {
			throw new Error("Blob token not found");
		}

		// Fetch images from Vercel Blob storage
		const { blobs } = await list({ token: blobToken });
		images = blobs;
	} catch (err) {
		console.error("Error fetching images from Vercel Blob:", err);
		error = "Unable to load images. Please make sure Vercel Blob Storage is configured.";
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-indigo-700">Image Gallery</h1>
					<Link
						href="/"
						className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors"
					>
						Back to Home
					</Link>
				</div>

				{error && (
					<div className="text-center py-12 bg-red-50 border border-red-200 rounded-xl shadow-lg">
						<div className="text-red-600 text-xl font-semibold mb-2">⚠️ Configuration Required</div>
						<p className="text-red-700 mb-4">{error}</p>
						<p className="text-sm text-red-600">
							Please set up Vercel Blob Storage in your Vercel Dashboard → Storage tab
						</p>
					</div>
				)}

				{!error && images.length === 0 && (
					<div className="text-center py-12 bg-white rounded-xl shadow-lg">
						<p className="text-xl text-gray-600">
							No images found. Upload some images to get started!
						</p>
					</div>
				)}

				{!error && images.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{images.map((image, index) => (
						<div
							key={image.url}
							className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
						>
							<div className="relative h-48 w-full">
								<Image
									src={image.url}
									alt={image.pathname.split("/").pop() || `Image ${index + 1}`}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-gray-700 text-sm truncate">
									{image.pathname.split("/").pop() || `Image ${index + 1}`}
								</p>
								<a
									href={image.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-indigo-600 text-xs hover:underline mt-1 block"
								>
									View full size
								</a>
							</div>
						</div>
					))}
					</div>
				)}
			</div>
		</div>
	);
}