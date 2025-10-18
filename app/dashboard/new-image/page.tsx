"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";
import { Loader2, Upload as UploadIcon, CheckCircle2 } from "lucide-react";

const AddImage = () => {
	const router = useRouter();
	const htmlInputRef = useRef<HTMLInputElement>(null);
	const [progress, setProgress] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [uploadedCount, setUploadedCount] = useState(0);
	const [totalFiles, setTotalFiles] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const handleFileChange = () => {
		if (htmlInputRef.current?.files) {
			const filesArray = Array.from(htmlInputRef.current.files);
			setSelectedFiles(filesArray);
			setTotalFiles(filesArray.length);
		} else {
			setSelectedFiles([]);
			setTotalFiles(0);
		}
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setProgress(0);
		setUploading(true);
		setUploadedCount(0);

		if (!htmlInputRef.current?.files || htmlInputRef.current.files.length === 0) {
			toast.error("Select at least one file to continue!");
			setUploading(false);
			return;
		}

		const files = Array.from(htmlInputRef.current.files);

		try {
			// Upload all files
			const uploadPromises = files.map(async (file, index) => {
				const timestamp = Date.now();
				const randomStr = Math.random().toString(36).substring(2, 15);
				const fileName = `${timestamp}-${randomStr}-${file.name}`;

				const blob = await upload(fileName, file, {
					access: "public",
					handleUploadUrl: "/api/upload",
					onUploadProgress: (progressEvent) => {
						const fileProgress = progressEvent.percentage;
						const overallProgress = ((index + fileProgress / 100) / files.length) * 100;
						setProgress(overallProgress);
					},
				});

				setUploadedCount((prev) => prev + 1);
				return blob;
			});

			await Promise.all(uploadPromises);

			toast.success(`Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''}!`);
			
			// Reset form
			if (htmlInputRef.current) {
				htmlInputRef.current.value = "";
			}
			setSelectedFiles([]);
			setTotalFiles(0);
			setProgress(0);
			setUploadedCount(0);

			// Redirect to dashboard after a short delay
			setTimeout(() => {
				router.push("/dashboard");
			}, 1500);
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Failed to upload images. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
			<div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-950 rounded-xl shadow-lg">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
						Upload Images
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Select and upload your images to Vercel Blob storage
					</p>
				</div>

				<form onSubmit={handleFormSubmit} className="space-y-6">
					<div className="border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg p-8 text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors">
						<input
							name="files"
							ref={htmlInputRef}
							type="file"
							accept="image/jpeg, image/png, image/gif, image/webp"
							multiple
							required
							className="hidden"
							id="file-upload"
							disabled={uploading}
							onChange={handleFileChange}
						/>
						<label
							htmlFor="file-upload"
							className="cursor-pointer flex flex-col items-center"
						>
							<UploadIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
							<span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-lg">
								{selectedFiles.length > 0 
									? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected` 
									: "Choose files to upload"}
							</span>
							<span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
								JPG, PNG, GIF, WEBP (Multiple files supported)
							</span>
						</label>
					</div>

					{selectedFiles.length > 0 && (
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
							<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
								Selected Files:
							</h3>
							<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 max-h-40 overflow-y-auto">
								{selectedFiles.map((file, index) => (
									<li key={index} className="flex items-center gap-2">
										<CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
										<span className="truncate">{file.name}</span>
										<span className="text-xs text-gray-500 flex-shrink-0">
											({(file.size / 1024 / 1024).toFixed(2)} MB)
										</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{uploading && (
						<div className="space-y-2">
							<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
								<div
									className="bg-indigo-600 dark:bg-indigo-500 h-3 rounded-full transition-all duration-300"
									style={{ width: `${progress}%` }}
								></div>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
								Uploading: {uploadedCount} / {totalFiles} files ({Math.round(progress)}%)
							</p>
						</div>
					)}

					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push("/dashboard")}
							disabled={uploading}
							className="flex-1"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
							disabled={uploading || selectedFiles.length === 0}
						>
							{uploading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Uploading...
								</>
							) : (
								<>
									<UploadIcon className="mr-2 h-4 w-4" />
									Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
								</>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddImage;