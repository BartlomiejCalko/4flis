/**
 * Skrypt testowy do weryfikacji konfiguracji Firebase Admin SDK
 * 
 * Uruchom: npx tsx scripts/test-firebase.ts
 */

import { adminAuth } from "../firebase/admin";

const testFirebaseConnection = async () => {
	console.log("\n🔧 Testing Firebase Admin SDK Configuration...\n");

	try {
		// Test Firebase Auth
		console.log("1️⃣ Testing Firebase Authentication...");
		const usersList = await adminAuth.listUsers(10);
		console.log(`✅ Firebase Auth is working! Found ${usersList.users.length} user(s)`);

		if (usersList.users.length > 0) {
			console.log("\n📋 Registered users:");
			usersList.users.forEach((user) => {
				console.log(`   - ${user.email} (${user.displayName || 'No name'}) - Created: ${user.metadata.creationTime}`);
			});
		} else {
			console.log("\n⚠️ No users found!");
			console.log("💡 Create a user by signing up at: http://localhost:3000/sign-up");
		}

		console.log("\n✅ All Firebase Admin SDK tests passed!\n");
		process.exit(0);
	} catch (error) {
		console.error("\n❌ Firebase Admin SDK test failed:");
		console.error(error);
		console.log("\n💡 Make sure you have set up your .env.local file correctly.");
		console.log("📖 Check your Firebase credentials in .env.local\n");
		process.exit(1);
	}
};

testFirebaseConnection();

