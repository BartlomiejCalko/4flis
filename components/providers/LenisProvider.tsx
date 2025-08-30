"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
	children: React.ReactNode;
};

const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
	const rafIdRef = useRef<number | null>(null);
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		lenisRef.current = new Lenis({
			// A gentle, elegant feel
			duration: prefersReducedMotion ? 0.6 : 1.2,
			easing: (t) => 1 - Math.pow(1 - t, 3),
			smoothWheel: true,
		});

		const raf = (time: number) => {
			lenisRef.current?.raf(time);
			rafIdRef.current = requestAnimationFrame(raf);
		};

		rafIdRef.current = requestAnimationFrame(raf);

		return () => {
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
			lenisRef.current?.destroy();
		};
	}, []);

	return <>{children}</>;
};

export default LenisProvider; 