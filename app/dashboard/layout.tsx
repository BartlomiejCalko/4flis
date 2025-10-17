import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { Toaster } from "sonner";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await getCurrentUser();
	if (!user) redirect("/sign-in");

	return (
		<div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-[auto_1fr]">
			<Sidebar userName="Użytkownik" userEmail="email@example.com" />
			<main className="w-full bg-gray-50 dark:bg-gray-950 p-4 md:p-6">{children}</main>
			<Toaster />
		</div>
	);
};

export default DashboardLayout; 