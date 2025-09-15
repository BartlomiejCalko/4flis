export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-muted/30">
			<header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
					<h1 className="text-lg font-semibold">Admin dashboard</h1>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span className="hidden sm:inline">4FLIS CMS</span>
					</div>
				</div>
			</header>
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-[220px_1fr] sm:px-6 lg:px-8">
				<aside className="hidden sm:block">
					<nav aria-label="Dashboard navigation" className="space-y-1">
						<a href="/admin" className="block rounded-md px-3 py-2 text-sm hover:bg-accent" aria-label="Go to dashboard">
							Dashboard
						</a>
						<a href="/admin/projects" className="block rounded-md px-3 py-2 text-sm hover:bg-accent" aria-label="Manage projects">
							Projects
						</a>
					</nav>
				</aside>
				<main>{children}</main>
			</div>
		</div>
	);
} 