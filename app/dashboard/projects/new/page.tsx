import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/dashboard/ProjectForm";

const NewProjectPage = async () => {
	const user = await getCurrentUser();
	if (!user) redirect("/sign-in");

	return (
		<section className="space-y-6">
			<div className="max-w-3xl">
				<h1 className="text-2xl font-semibold">Add new Project</h1>
				<p className="mt-1 text-sm text-muted-foreground">Create and manage portfolio projects</p>
			</div>
			<div className="max-w-3xl rounded-xl border bg-card text-card-foreground">
				<div className="p-6 md:p-8">
					<ProjectForm mode="create" />
				</div>
			</div>
		</section>
	);
};

export default NewProjectPage; 