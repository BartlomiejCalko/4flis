"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, PlusSquare, ChevronsRight, ChevronDown } from "lucide-react";

type SidebarProps = {
	userName: string;
	userEmail: string;
};

const navItems = [
	{ title: "Dashboard", href: "/dashboard", icon: Home },
	{ title: "Projects", href: "/dashboard/projects", icon: FolderKanban },
	{ title: "Create", href: "/dashboard/projects/new", icon: PlusSquare },
];

const Sidebar: React.FC<SidebarProps> = ({ userName, userEmail }) => {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(true);

	return (
		<nav
			className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
				open ? "w-64" : "w-16"
			} border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm`}
			aria-label="Sidebar"
		>
			<div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
				<div className="flex items-center justify-between rounded-md p-2">
					<div className="flex items-center gap-3">
						<div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm overflow-hidden" aria-hidden>
							<img src="/logo_flis.png" alt="4FLIS" className="w-8 h-8 object-contain" />
						</div>
						{open && (
							<div className={`transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>
								<div>
									<span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">{userName}</span>
									<span className="block text-xs text-gray-500 dark:text-gray-400">{userEmail}</span>
								</div>
							</div>
						)}
					</div>
					{open && <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />}
				</div>
			</div>

			<div className="space-y-1 mb-8">
				{navItems.map(({ title, href, icon: Icon }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-0 ${
								isActive
									? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500"
									: "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
							}`}
							aria-current={isActive ? "page" : undefined}
						>
							<div className="grid h-full w-12 place-content-center">
								<Icon className="h-4 w-4" />
							</div>
							{open && (
								<span className={`text-sm font-medium transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>{title}</span>
							)}
						</Link>
					);
				})}
			</div>

			<button
				onClick={() => setOpen((v) => !v)}
				className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
				aria-label={open ? "Hide sidebar" : "Show sidebar"}
			>
				<div className="flex items-center p-3">
					<div className="grid size-10 place-content-center">
						<ChevronsRight className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${open ? "rotate-180" : ""}`} />
					</div>
					{open && <span className={`text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>Hide</span>}
				</div>
			</button>
		</nav>
	);
};

export default Sidebar; 