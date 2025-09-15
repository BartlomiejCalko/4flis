const AdminHomePage = () => {
	return (
		<div className="space-y-6">
			<section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div className="rounded-lg border bg-background p-4">
					<p className="text-xs text-muted-foreground">Total Projects</p>
					<p className="mt-2 text-2xl font-semibold">—</p>
				</div>
				<div className="rounded-lg border bg-background p-4">
					<p className="text-xs text-muted-foreground">Total Images</p>
					<p className="mt-2 text-2xl font-semibold">—</p>
				</div>
				<div className="rounded-lg border bg-background p-4">
					<p className="text-xs text-muted-foreground">Drafts</p>
					<p className="mt-2 text-2xl font-semibold">—</p>
				</div>
			</section>
			<section className="rounded-lg border bg-background p-4">
				<h2 className="text-base font-semibold">Quick actions</h2>
				<div className="mt-4 flex flex-wrap gap-3">
					<a
						href="/admin/projects/new"
						className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
						aria-label="Create a new project"
						>
						Create project
					</a>
					<a
						href="/admin/projects"
						className="rounded-md border px-4 py-2 text-sm"
						aria-label="Go to projects list"
						>
						Manage projects
					</a>
				</div>
			</section>
		</div>
	);
};

export default AdminHomePage; 