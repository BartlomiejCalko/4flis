"use server";

import { auth } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name } = params;

  try {
    // Update user display name in Firebase Auth
    await auth.updateUser(uid, {
      displayName: name,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: unknown) {
    console.error("Error updating user in Firebase Auth:", error);

    return {
      success: false,
      message: "Failed to save user data. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookie(idToken);
  } catch (error: unknown) {
    console.error("Error signing in:", error);

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Get user info from Firebase Auth
    const userRecord = await auth.getUser(decodedClaims.uid);
    if (!userRecord) return null;

    return {
      id: userRecord.uid,
      name: userRecord.displayName || userRecord.email?.split('@')[0] || 'User',
      email: userRecord.email || '',
      createdAt: userRecord.metadata.creationTime || new Date().toISOString(),
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

// Add authorized user (admin function)
export async function addAuthorizedUser(params: {
  name: string;
  email: string;
  password: string;
  adminKey: string;
}) {
  const { name, email, password, adminKey } = params;

  try {
    // Verify admin key
    const ADMIN_KEY = process.env.ADMIN_KEY;
    if (!ADMIN_KEY) {
      return {
        success: false,
        message: "Admin key not configured on server",
      };
    }

    if (adminKey !== ADMIN_KEY) {
      return {
        success: false,
        message: "Invalid admin key",
      };
    }

    // Validate password length
    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    // Check if user already exists
    try {
      const existingUser = await auth.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      }
    } catch (error: unknown) {
      // User doesn't exist, which is what we want
      const firebaseError = error as { code?: string };
      if (firebaseError.code !== "auth/user-not-found") {
        throw error;
      }
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      emailVerified: true, // Auto-verify for admin-created users
    });

    return {
      success: true,
      message: `User ${email} created successfully with ID: ${userRecord.uid}`,
    };
  } catch (error: unknown) {
    console.error("Error adding authorized user:", error);

    let errorMessage = "Failed to create user. Please try again.";
    
    const firebaseError = error as { code?: string };
    if (firebaseError.code === "auth/email-already-exists") {
      errorMessage = "User with this email already exists";
    } else if (firebaseError.code === "auth/invalid-email") {
      errorMessage = "Invalid email address";
    } else if (firebaseError.code === "auth/weak-password") {
      errorMessage = "Password is too weak";
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}