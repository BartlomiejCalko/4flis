"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import SiteNavbar from "@/components/ui/SiteNavbar";
import SiteFooter from "@/components/ui/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

const RootShell = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const isDashboard = pathname?.startsWith("/dashboard");

	return (
		<>
			{!isDashboard && <SiteNavbar />}
			<div className={`relative z-10 ${!isDashboard ? "pt-16" : ""}`}>{children}</div>
			{!isDashboard && <SiteFooter />}
			<Toaster />
		</>
	);
};

export default RootShell; 