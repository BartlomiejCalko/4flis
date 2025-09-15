"use client";

import React from "react";
import { db, storage } from "@/firebase/client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

const categories = [
	"Bad",
	"Kjøkken",
	"Gulv",
	"Annet",
] as const;

const NewProjectPage = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [images, setImages] = React.useState<File[]>([]);
	const [error, setError] = React.useState<string>("");
	const [success, setSuccess] = React.useState<string>("");

	const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		if (!files.length) return;
		setImages((prev) => [...prev, ...files]);
	};

	const handleRemoveImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitting) return;
		setIsSubmitting(true);
		setError("");
		setSuccess("");

		const formData = new FormData(event.currentTarget);
		const title = String(formData.get("title") || "").trim();
		const description = String(formData.get("description") || "").trim();
		const category = String(formData.get("category") || "").trim() || undefined;

		if (!title) {
			setIsSubmitting(false);
			setError("Nazwa projektu jest wymagana.");
			return;
		}

		try {
			const uploads = await Promise.all(
				images.map(async (file) => {
					const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
					const storageRef = ref(storage, path);
					await uploadBytes(storageRef, file);
					const url = await getDownloadURL(storageRef);
					return { path, url, name: file.name, size: file.size, type: file.type };
				})
			);

			const docRef = await addDoc(collection(db, "projects"), {
				title,
				description,
				category: category || null,
				images: uploads,
				createdAt: serverTimestamp(),
			});

			setSuccess("Projekt został zapisany.");
			(event.currentTarget as HTMLFormElement).reset();
			setImages([]);
			setTimeout(() => router.push("/admin/projects"), 500);
		} catch (e) {
			setError("Wystąpił błąd podczas zapisu.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-6">
			<header>
				<h1 className="text-xl font-semibold">Nowy projekt</h1>
				<p className="text-sm text-muted-foreground">Utwórz projekt z nazwą, opisem i zdjęciami.</p>
			</header>
			<form onSubmit={handleSubmit} className="space-y-6" aria-describedby="new-project-status">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="title" className="text-sm font-medium">Nazwa projektu</label>
						<input id="title" name="title" type="text" required placeholder="Np. Remont łazienki"
							className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
					</div>
					<div className="space-y-2">
						<label htmlFor="category" className="text-sm font-medium">Kategoria (opcjonalnie)</label>
						<select id="category" name="category" defaultValue="" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
							<option value="">Brak</option>
							{categories.map((c) => (
								<option key={c} value={c}>{c}</option>
							))}
						</select>
					</div>
				</div>

				<div className="space-y-2">
					<label htmlFor="description" className="text-sm font-medium">Opis</label>
					<textarea id="description" name="description" rows={6} placeholder="Krótki opis projektu"
						className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Zdjęcia</label>
					<input id="images" name="images" type="file" accept="image/*" multiple onChange={handleFilesChange}
						className="block w-full cursor-pointer rounded-md border bg-background px-3 py-2 text-sm file:mr-3 file:rounded-md file:border file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-accent/80" />
					{images.length > 0 && (
						<ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Wybrane zdjęcia">
							{images.map((file, index) => (
								<li key={`${file.name}-${index}`} className="group relative rounded-md border p-2">
									<p className="truncate text-xs" title={file.name}>{file.name}</p>
									<button type="button" onClick={() => handleRemoveImage(index)}
										className="absolute right-1 top-1 rounded bg-destructive px-2 py-0.5 text-[10px] text-destructive-foreground opacity-0 group-hover:opacity-100"
										aria-label="Usuń zdjęcie">
										Usuń
									</button>
								</li>
							))}
						</ul>
					)}
				</div>

				<p id="new-project-status" role="status" aria-live="polite" className="text-sm">
					{error && <span className="text-destructive">{error}</span>}
					{success && <span className="text-emerald-600">{success}</span>}
				</p>

				<div className="flex gap-3">
					<button type="submit" disabled={isSubmitting} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground" aria-disabled={isSubmitting} aria-label="Zapisz projekt">
						{isSubmitting ? "Zapisywanie..." : "Zapisz projekt"}
					</button>
					<a href="/admin/projects" className="rounded-md border px-4 py-2 text-sm" aria-label="Anuluj i wróć">Anuluj</a>
				</div>
			</form>
		</div>
	);
};

export default NewProjectPage; 