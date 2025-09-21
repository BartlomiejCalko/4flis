import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/dashboard/ProjectForm";
import { getProjectById } from "@/lib/actions/projects.action";

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
	const user = await getCurrentUser();
	if (!user) redirect("/sign-in");
	const project = await getProjectById(params.id);
	if (!project) redirect("/dashboard/projects");

	return (
		<section className="space-y-6">
			<h1 className="text-2xl font-semibold">Edit project</h1>
			<ProjectForm mode="edit" defaultValues={project} />
		</section>
	);
};

export default EditProjectPage; 