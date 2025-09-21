"use server";

import { adminDb as db, adminStorageBucket as bucket } from "@/firebase/admin";
import { getCurrentUser } from "./auth.action";
import { revalidatePath } from "next/cache";

const COLLECTION = "projects";

export const createProject = async (input: CreateProjectInput) => {
	const user = await getCurrentUser();
	if (!user) return { success: false, message: "Unauthorized" } as const;

	try {
		const now = new Date().toISOString();
		const ref = db.collection(COLLECTION).doc();
		const data: Project = {
			id: ref.id,
			name: input.name,
			description: input.description,
			images: (input.images || []).map((img) => ({
				id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
				url: img.url,
				path: img.path,
				createdAt: now,
			})),
			createdAt: now,
			updatedAt: now,
			userId: user.id,
		};

		await ref.set(data);
		revalidatePath("/dashboard/projects");
		return { success: true, data } as const;
	} catch (error) {
		console.error("createProject error", error);
		return { success: false, message: "Failed to create project" } as const;
	}
};

export const listProjects = async () => {
	const user = await getCurrentUser();
	if (!user) return [] as Project[];
	const snap = await db
		.collection(COLLECTION)
		.where("userId", "==", user.id)
		.get();
	const items = snap.docs.map((d) => d.data() as Project);
	return items.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
};

export const getProjectById = async (id: string) => {
	try {
		const doc = await db.collection(COLLECTION).doc(id).get();
		if (!doc.exists) return null;
		return doc.data() as Project;
	} catch (error) {
		console.error("getProjectById error", error);
		return null;
	}
};

export const updateProject = async (input: UpdateProjectInput) => {
	const user = await getCurrentUser();
	if (!user) return { success: false, message: "Unauthorized" } as const;
	try {
		const docRef = db.collection(COLLECTION).doc(input.id);
		const existing = await docRef.get();
		if (!existing.exists) return { success: false, message: "Not found" } as const;
		const prev = existing.data() as Project;
		if (prev.userId !== user.id) return { success: false, message: "Forbidden" } as const;

		const updated: Partial<Project> = {
			name: input.name ?? prev.name,
			description: input.description ?? prev.description,
			images: input.images
				? input.images.map((img) => ({
					id: img.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
					url: img.url,
					path: img.path,
					createdAt: new Date().toISOString(),
				}))
				: prev.images,
			updatedAt: new Date().toISOString(),
		};

		await docRef.update(updated);
		revalidatePath(`/dashboard/projects/${input.id}/edit`);
		revalidatePath("/dashboard/projects");
		return { success: true } as const;
	} catch (error) {
		console.error("updateProject error", error);
		return { success: false, message: "Failed to update project" } as const;
	}
};

export const deleteProject = async (id: string) => {
	const user = await getCurrentUser();
	if (!user) return { success: false, message: "Unauthorized" } as const;
	try {
		const docRef = db.collection(COLLECTION).doc(id);
		const existing = await docRef.get();
		if (!existing.exists) return { success: false, message: "Not found" } as const;
		const data = existing.data() as Project;
		if (data.userId !== user.id) return { success: false, message: "Forbidden" } as const;

		await Promise.all(
			(data.images || []).map(async (img) => {
				try {
					if (img.path) await bucket.file(img.path).delete({ ignoreNotFound: true });
				} catch (err) {
					console.warn("delete image failed", err);
				}
			})
		);

		await docRef.delete();
		revalidatePath("/dashboard/projects");
		return { success: true } as const;
	} catch (error) {
		console.error("deleteProject error", error);
		return { success: false, message: "Failed to delete project" } as const;
	}
}; 