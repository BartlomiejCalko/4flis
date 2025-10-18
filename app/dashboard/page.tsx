import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { list } from "@vercel/blob";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ImageIcon } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Page = async () => {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/sign-in");
	}

	// Fetch all images from Vercel Blob
	let blobs: Awaited<ReturnType<typeof list>>["blobs"] = [];
	let error: string | null = null;

	try {
		// Get the blob token - Vercel now uses BLOB_VERCEL_READ_WRITE_TOKEN
		const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_VERCEL_READ_WRITE_TOKEN;
		
		if (!blobToken) {
			throw new Error("Blob token not found");
		}

		const result = await list({ token: blobToken });
		blobs = result.blobs;
	} catch (err) {
		console.error("Error fetching images from Vercel Blob:", err);
		error = "Unable to load images. Please make sure Vercel Blob Storage is configured.";
	}

	return (
		<section className="container mx-auto max-w-7xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
						Dashboard
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Witaj, {user.name}! Zarządzaj swoimi zdjęciami
					</p>
				</div>
				<div className="flex gap-3">
					<Link href="/dashboard/new-image">
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Upload Images
						</Button>
					</Link>
					<Link href="/gallery">
						<Button variant="outline">
							<ImageIcon className="mr-2 h-4 w-4" />
							View Gallery
						</Button>
					</Link>
				</div>
			</div>

			{/* Error State */}
			{error && (
				<div className="flex flex-col items-center justify-center rounded-lg border-2 border-red-300 bg-red-50 py-16 dark:border-red-700 dark:bg-red-900/20">
					<div className="text-center">
						<div className="text-red-600 dark:text-red-400 text-xl font-semibold mb-2">⚠️ Configuration Required</div>
						<p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
						<p className="text-sm text-red-600 dark:text-red-400">
							Please set up Vercel Blob Storage in your Vercel Dashboard → Storage tab
						</p>
					</div>
				</div>
			)}

			{/* Images Grid */}
			{!error && blobs.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-900">
					<div className="text-center">
						<ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
						<h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
							No images yet
						</h3>
						<p className="mb-6 text-gray-600 dark:text-gray-400">
							Get started by uploading your first images
						</p>
						<Link href="/dashboard/new-image">
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Upload Images
							</Button>
						</Link>
					</div>
				</div>
			) : !error ? (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{blobs.map((blob) => (
						<div
							key={blob.url}
							className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
						>
							{/* Image Preview */}
							<div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
								<Image
									src={blob.url}
									alt={blob.pathname.split("/").pop() || "Image"}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
									className="object-cover transition-transform group-hover:scale-105"
								/>
							</div>

							{/* Image Info */}
							<div className="p-4">
								<p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
									{blob.pathname.split("/").pop() || "Image"}
								</p>
								<div className="mt-2 flex items-center justify-between">
									<span className="text-xs text-gray-500 dark:text-gray-500">
										{new Date(blob.uploadedAt).toLocaleDateString("pl-PL")}
									</span>
									<a
										href={blob.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
									>
										View
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			) : null}

			{!error && blobs.length > 0 && (
				<div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
					Total images: {blobs.length}
				</div>
			)}
		</section>
	);
};

export default Page; 