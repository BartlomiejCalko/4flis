"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createProject, updateProject } from "@/lib/actions/projects.action";

const schema = z.object({
	name: z.string().min(3, "Minimum 3 characters"),
	description: z.string().min(10, "Minimum 10 characters"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
	defaultValues?: Partial<Project> & { id?: string };
	mode?: "create" | "edit";
};

const ProjectForm: React.FC<Props> = ({ defaultValues, mode = "create" }) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [images, setImages] = React.useState<Array<{ url: string; path: string }>>(
		defaultValues?.images?.map((i) => ({ url: i.url, path: i.path })) ?? []
	);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: defaultValues?.name ?? "",
			description: defaultValues?.description ?? "",
		},
	});

	const uploadViaApi = async (files: FileList) => {
		const formData = new FormData();
		Array.from(files).forEach((f) => formData.append("files", f));
		const res = await fetch("/api/upload", { method: "POST", body: formData });
		const data = await res.json().catch(() => ({}));
		if (!res.ok || !data?.success) {
			throw new Error(data?.message || `Upload failed (${res.status})`);
		}
		return data.files as Array<{ url: string; path: string }>; 
	};

	const handleUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
		const files = e.target.files;
		if (!files || !files.length) return;
		try {
			const uploaded = await uploadViaApi(files);
			setImages((prev) => [...prev, ...uploaded]);
			toast.success("Images uploaded");
		} catch (err) {
			console.error(err);
			toast.error("Failed to upload images");
		}
	};

	const handleRemoveImage = async (path: string) => {
		try {
			await fetch("/api/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path }) });
			setImages((prev) => prev.filter((i) => i.path !== path));
		} catch (_) {
			setImages((prev) => prev.filter((i) => i.path !== path));
		}
	};

	const handleSubmitForm = async (values: FormValues) => {
		setIsSubmitting(true);
		try {
			let imagesToUse = images;
			if (imagesToUse.length === 0 && fileInputRef.current?.files?.length) {
				imagesToUse = await uploadViaApi(fileInputRef.current.files);
				setImages(imagesToUse);
			}

			const res: { success: boolean; message?: string } = await (mode === "create"
				? Promise.race([
					createProject({ name: values.name, description: values.description, images: imagesToUse }) as Promise<{ success: boolean; message?: string }>,
					new Promise<{ success: false; message: string }>((resolve) =>
						setTimeout(() => resolve({ success: false, message: "Request timeout" }), 30000)
					),
				])
				: (updateProject({ id: defaultValues?.id as string, name: values.name, description: values.description, images: imagesToUse }) as Promise<{ success: boolean; message?: string }>));

			if (!res || !res.success) {
				toast.error(res?.message || "Failed to save project");
				return;
			}

			toast.success(mode === "create" ? "Project created" : "Project updated");
			if (mode === "create") {
				router.push("/dashboard/projects");
			} else {
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={form.handleSubmit(handleSubmitForm)}
			className="space-y-6"
			aria-label={mode === "create" ? "Create project" : "Edit project"}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Project name</Label>
					<Input
						id="name"
						placeholder="Amazing house renovation"
						{...form.register("name")}
						aria-invalid={!!form.formState.errors.name}
					/>
					{form.formState.errors.name && (
						<p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-2 md:col-span-2">
					<Label htmlFor="description">Description</Label>
					<textarea
						id="description"
						rows={5}
						placeholder="Short description of the project..."
						className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						{...form.register("description")}
						aria-invalid={!!form.formState.errors.description}
					/>
					{form.formState.errors.description && (
						<p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<Label htmlFor="images">Images</Label>
				<input
					id="images"
					type="file"
					accept="image/*"
					multiple
					onChange={handleUpload}
					ref={fileInputRef}
					className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
				/>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
					{images.map((img) => (
						<div key={img.path} className="group relative rounded-lg overflow-hidden border">
							<img src={img.url} alt="Project image" className="h-32 w-full object-cover" />
							<button
								type="button"
								className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md bg-background/80 hover:bg-background px-2 py-1 text-xs border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								onClick={() => handleRemoveImage(img.path)}
								aria-label="Remove image"
							>
								Remove
							</button>
						</div>
					))}
				</div>
			</div>

			<div>
				<Button type="submit" disabled={isSubmitting} className="w-full h-11 text-[15px]">
					{isSubmitting ? "Saving..." : mode === "create" ? "Create project" : "Save changes"}
				</Button>
			</div>
		</form>
	);
};

export default ProjectForm; 