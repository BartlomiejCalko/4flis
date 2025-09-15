import { getApps, initializeApp, applicationDefault, cert, AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const createAdminApp = () => {
	if (!getApps().length) {
		const projectId = process.env.FIREBASE_PROJECT_ID;
		const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
		const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

		const hasServiceAccount = projectId && clientEmail && privateKey;

		const options: AppOptions | undefined = hasServiceAccount
			? {
				credential: cert({
					projectId,
					clientEmail,
					privateKey: privateKey as string,
				}),
			}
			: { credential: applicationDefault() };

		initializeApp(options);
	}
};

createAdminApp();

export const adminAuth = getAuth();
export const adminDb = getFirestore();