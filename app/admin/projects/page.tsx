const ProjectsPage = () => {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Projekty</h1>
				<a href="/admin/projects/new" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground" aria-label="Dodaj nowy projekt">Dodaj projekt</a>
			</div>
			<div className="rounded-md border bg-background p-6 text-sm text-muted-foreground">Brak danych. Dodaj pierwszy projekt.</div>
		</div>
	);
};

export default ProjectsPage; 