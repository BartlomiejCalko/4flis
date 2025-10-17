import { getApps, initializeApp, applicationDefault, cert, AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { readFileSync } from "fs";
import path from "path";

let ADMIN_BUCKET_NAME: string | undefined;

const createAdminApp = () => {
	if (!getApps().length) {
		const projectId = process.env.FIREBASE_PROJECT_ID;
		const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
		const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
		const envBucket = process.env.FIREBASE_STORAGE_BUCKET;

		// Derive bucket if not explicitly provided
		ADMIN_BUCKET_NAME = envBucket || (projectId ? `${projectId}.appspot.com` : "flis-3e60f.appspot.com");

		let options: AppOptions | undefined;
		
		// Try environment variables first
		if (projectId && clientEmail && privateKey) {
			console.log("✅ Firebase Admin: Using environment variables");
			options = {
				credential: cert({ projectId, clientEmail, privateKey: privateKey as string }),
				storageBucket: ADMIN_BUCKET_NAME,
			};
		} else {
			// Try service account JSON file
			try {
				const jsonPath = path.join(process.cwd(), "flis-3e60f-firebase-adminsdk-fbsvc-8193358633.json");
				const content = readFileSync(jsonPath, "utf8");
				const sa = JSON.parse(content);
				console.log("✅ Firebase Admin: Using service account JSON file");
				options = { credential: cert(sa), storageBucket: ADMIN_BUCKET_NAME } as AppOptions;
			} catch (fileError) {
				// Fall back to application default credentials
				console.log("⚠️ Firebase Admin: Using application default credentials (może nie działać w development)");
				console.log("💡 Tip: Utwórz plik .env.local z konfiguracją Firebase Admin");
				options = { credential: applicationDefault(), storageBucket: ADMIN_BUCKET_NAME } as AppOptions;
			}
		}

		try {
			initializeApp(options);
			console.log("✅ Firebase Admin SDK initialized successfully");
		} catch (error) {
			console.error("❌ Firebase Admin SDK initialization failed:", error);
			throw error;
		}
	}
};

createAdminApp();

export const adminAuth = getAuth();
export const adminDb = getFirestore();
export const adminStorageBucket = getStorage().bucket(ADMIN_BUCKET_NAME || "flis-3e60f.appspot.com");