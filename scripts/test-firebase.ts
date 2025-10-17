/**
 * Skrypt testowy do weryfikacji konfiguracji Firebase Admin SDK
 * 
 * Uruchom: npx tsx scripts/test-firebase.ts
 */

import { adminAuth, adminDb } from "../firebase/admin";

const testFirebaseConnection = async () => {
	console.log("\n🔧 Testing Firebase Admin SDK Configuration...\n");

	try {
		// Test 1: Check Firebase Auth
		console.log("1️⃣ Testing Firebase Authentication...");
		const usersList = await adminAuth.listUsers(1);
		console.log(`✅ Firebase Auth is working! Found ${usersList.users.length} user(s)`);

		// Test 2: Check Firestore
		console.log("\n2️⃣ Testing Firestore Database...");
		const usersCollection = await adminDb.collection("users").limit(1).get();
		console.log(`✅ Firestore is working! Found ${usersCollection.size} document(s) in 'users' collection`);

		// Test 3: Check authorized users collection
		console.log("\n3️⃣ Checking authorized users...");
		const authorizedUsers = await adminDb.collection("authorizedUsers").get();
		console.log(`✅ Found ${authorizedUsers.size} authorized user(s)`);

		if (authorizedUsers.size === 0) {
			console.log("\n⚠️ WARNING: No authorized users found!");
			console.log("💡 Add a user using: http://localhost:3000/admin/add-user");
		} else {
			console.log("\n📋 Authorized users:");
			authorizedUsers.forEach((doc) => {
				const data = doc.data();
				console.log(`   - ${data.email} (${data.name}) - Active: ${data.active}`);
			});
		}

		console.log("\n✅ All Firebase Admin SDK tests passed!\n");
		process.exit(0);
	} catch (error) {
		console.error("\n❌ Firebase Admin SDK test failed:");
		console.error(error);
		console.log("\n💡 Make sure you have set up your .env.local file correctly.");
		console.log("📖 See LOGOWANIE_INSTRUKCJA.md for setup instructions.\n");
		process.exit(1);
	}
};

testFirebaseConnection();

