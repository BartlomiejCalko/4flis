import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	// Get session cookie
	const session = request.cookies.get("session")?.value;

	// Protected routes - require authentication (exclude /admin/add-user - it's public but requires admin key)
	const isProtectedRoute = pathname.startsWith("/dashboard");

	// Auth routes - redirect to dashboard if already logged in
	const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

	// If trying to access protected route without session
	if (isProtectedRoute && !session) {
		const signInUrl = new URL("/sign-in", request.url);
		// Add redirect parameter to return to original page after login
		signInUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(signInUrl);
	}

	// If trying to access auth routes while logged in
	if (isAuthRoute && session) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
	],
};

