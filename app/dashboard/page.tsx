import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Page = async () => {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/sign-in");
	}

	return (
		<section className="container mx-auto max-w-5xl px-4 py-10">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<p className="mt-2 text-muted-foreground">Witaj, {user.name}</p>
		</section>
	);
};

export default Page; 