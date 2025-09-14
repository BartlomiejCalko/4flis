"use client";
import React, { useState } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Menu as MenuIcon, X as CloseIcon, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Bodoni_Moda } from "next/font/google";
import Image from "next/image";
import { useTheme } from "next-themes";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["900"] });

export const SiteNavbar = ({ className }: { className?: string }) => {
	const [active, setActive] = useState<string | null>(null);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	const handleToggleMobile = () => {
		setIsMobileOpen((prev) => !prev);
	};

	const handleCloseMobile = () => {
		setIsMobileOpen(false);
	};

	const handleToggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className={cn("fixed inset-x-0 top-0 z-50", className)}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex h-16 items-center justify-between">
                    
                    
					<Link
						href="/"
						className={cn(
							"text-lg font-extrabold tracking-tight text-black dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2",
							bodoni.className
						)}
						aria-label="Hjem"
					>
							<div className="flex flex-col items-center ">
							<Image src="/logo_flis.png" alt="4FLIS" width={60} height={60} />
							<p className="mt-[-4px] font-{bodoni.className}">4FLIS</p>
							</div>
					</Link>
                    
					{/* Desktop nav */}
					<div className="hidden md:flex items-center gap-4">
						<Menu setActive={setActive}>
							<MenuItem setActive={setActive} active={active} item="Om oss" href="/om-oss">
								<div className="flex flex-col space-y-4 text-sm">
									<HoveredLink href="/om-oss">Vår historie</HoveredLink>
									<HoveredLink href="/om-oss">Team</HoveredLink>
									<HoveredLink href="/om-oss">Verdier</HoveredLink>
								</div>
							</MenuItem>
							<MenuItem setActive={setActive} active={active} item="Tjenester" href="/tjenester">
								<div className="flex flex-col space-y-4 text-sm">
									<HoveredLink href="/tjenester">Flislegging</HoveredLink>
									<HoveredLink href="/tjenester">Betonglegging</HoveredLink>
								</div>
							</MenuItem>
							<MenuItem setActive={setActive} active={active} item="Prosjekter" href="/prosjekter">
								<div className="text-sm grid grid-cols-2 gap-6 p-2">
									<ProductItem
										title="Bad"
										href="https://algochurn.com"
										src="https://assets.aceternity.com/demos/algochurn.webp"
										description="Prepare for tech interviews like never before."
									/>
									<ProductItem
										title="Hall"
										href="https://tailwindmasterkit.com"
										src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
										description="Production ready Tailwind css components for your next project"
									/>
									<ProductItem
										title="Kjøkken"
										href="https://gomoonbeam.com"
										src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
										description="Never write from scratch again. Go from idea to blog in minutes."
									/>
									<ProductItem
										title="Gulv"
										href="https://userogue.com"
										src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
										description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
									/>
								</div>
							</MenuItem>
							<MenuItem setActive={setActive} active={active} item="Kontakt" href="/kontakt">
								<div className="flex flex-col space-y-4 text-sm">
									<HoveredLink href="/kontakt">Kontakt oss</HoveredLink>
									<HoveredLink href="/kontakt">Forespørsel</HoveredLink>
								</div>
							</MenuItem>
						</Menu>
						<button
							aria-label="Toggle theme"
							onClick={handleToggleTheme}
							onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggleTheme(); }}
							tabIndex={0}
							className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden />
							<span className="sr-only">Toggle theme</span>
						</button>
					</div>

					{/* Mobile toggle */}
					<button
						tabIndex={0}
						aria-expanded={isMobileOpen}
						aria-controls="mobile-menu"
						aria-label={isMobileOpen ? "Lukk meny" : "Åpne meny"}
						className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						onClick={handleToggleMobile}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") handleToggleMobile();
						}}
					>
						{isMobileOpen ? <CloseIcon className="h-6 w-6" aria-hidden /> : <MenuIcon className="h-6 w-6" aria-hidden />}
					</button>
				</div>
			</div>

			{/* Mobile menu Drawer */}
			<div
				id="mobile-menu"
				className={cn(
					"md:hidden fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 transition-all duration-200 ease-out",
					isMobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
				)}
				aria-hidden={!isMobileOpen}
				role="dialog"
			>
				<nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
					<ul className="flex flex-col gap-2">
						<li>
							<HoveredLink href="/" onClick={handleCloseMobile} className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">Hjem</HoveredLink>
						</li>
						<li>
							<HoveredLink href="/om-oss" onClick={handleCloseMobile} className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">Om oss</HoveredLink>
						</li>
						<li>
							<HoveredLink href="/tjenester" onClick={handleCloseMobile} className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">Tjenester</HoveredLink>
						</li>
						<li>
							<HoveredLink href="/prosjekter" onClick={handleCloseMobile} className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">Prosjekter</HoveredLink>
						</li>
						<li>
							<HoveredLink href="/kontakt" onClick={handleCloseMobile} className="block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">Kontakt</HoveredLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default SiteNavbar; 