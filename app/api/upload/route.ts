import { adminStorageBucket as bucket } from "@/firebase/admin";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
	const user = await getCurrentUser();
	if (!user) return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });

	const form = await req.formData();
	const files = form.getAll("files");
	if (!files.length) return Response.json({ success: false, message: "No files" }, { status: 400 });

	try {
		const uploads = await Promise.all(
			files.map(async (f) => {
				if (!(f instanceof File)) return null;
				const arrayBuffer = await f.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				const path = `projects/${Date.now()}_${f.name}`;
				const token = randomUUID();

				await bucket.file(path).save(buffer, {
					metadata: {
						contentType: f.type || "application/octet-stream",
						metadata: { firebaseStorageDownloadTokens: token },
					},
					public: false,
					validation: false,
				});

				const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
					path
				)}?alt=media&token=${token}`;
				return { url, path };
			})
		);

		return Response.json({ success: true, files: uploads.filter(Boolean) });
	} catch (error: unknown) {
		console.error("upload error", error);
		const message = error && typeof error === "object" && "message" in error ? String((error as any).message) : "Upload failed";
		return Response.json({ success: false, message }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	const user = await getCurrentUser();
	if (!user) return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
	const { path } = await req.json().catch(() => ({ path: null }));
	if (!path) return Response.json({ success: false, message: "Bad request" }, { status: 400 });
	try {
		await bucket.file(path).delete({ ignoreNotFound: true });
		return Response.json({ success: true });
	} catch (error: unknown) {
		console.error("delete upload error", error);
		const message = error && typeof error === "object" && "message" in error ? String((error as any).message) : "Delete failed";
		return Response.json({ success: false, message }, { status: 500 });
	}
} 