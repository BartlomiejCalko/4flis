import Link from "next/link";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { listProjects, deleteProject } from "@/lib/actions/projects.action";

const ProjectsPage = async () => {
	const user = await getCurrentUser();
	if (!user) redirect("/sign-in");
	const projects = await listProjects();

	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Projects</h1>
				<Link
					href="/dashboard/projects/new"
					className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					Create project
				</Link>
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				{projects.map((p) => (
					<article key={p.id} className="rounded-xl border bg-card p-4">
						<div className="aspect-video w-full overflow-hidden rounded-lg mb-3 bg-muted">
							{p.images?.[0] && (
								<img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
							)}
						</div>
						<h3 className="font-semibold truncate" title={p.name}>{p.name}</h3>
						<p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
						<div className="flex items-center gap-2 mt-4">
							<Link href={`/dashboard/projects/${p.id}/edit`} className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Edit</Link>
							<form action={async () => { "use server"; await deleteProject(p.id); }}>
								<button className="px-3 py-1.5 text-xs rounded-md border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 text-destructive" aria-label={`Delete ${p.name}`}>Delete</button>
							</form>
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default ProjectsPage; 