import { ReactNode } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Toaster } from "sonner";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const AuthLayout = async ({
	children,
}: {
	children: ReactNode;
}) => {
	const user = await getCurrentUser();
	if (user) {
		redirect("/dashboard");
	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-background">
			<FlickeringGrid
				className="absolute inset-0"
				color="rgb(17, 24, 39)"
				squareSize={3}
				gridGap={6}
				maxOpacity={0.15}
			/>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" aria-hidden="true" />
			<main
				role="main"
				aria-label="Authentication layout"
				tabIndex={0}
				className="relative z-10 flex min-h-screen w-full items-center justify-center p-4"
			>
				{children}
				<Toaster />
			</main>
		</div>
	);
} 

export default AuthLayout;