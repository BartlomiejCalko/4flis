"use server";

import { db } from "@/firebase/client";
import { adminDb } from "@/firebase/admin";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type CreateProjectInput = {
	title: string;
	description?: string;
	category?: string;
	images: File[];
};

export const createProject = async (input: CreateProjectInput) => {
	if (!input.title) throw new Error("Title is required");

	const storage = getStorage();
	const uploaded: { path: string; url: string }[] = [];

	for (const file of input.images) {
		const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, file);
		const url = await getDownloadURL(storageRef);
		uploaded.push({ path, url });
	}

	const docRef = await addDoc(collection(db, "projects"), {
		title: input.title,
		description: input.description || "",
		category: input.category || null,
		images: uploaded,
		createdAt: serverTimestamp(),
	});

	return { id: docRef.id };
}; 