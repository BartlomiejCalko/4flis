"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ContactFormData = {
	name: string;
	email: string;
	phone?: string;
	message: string;
};

export const ContactForm = () => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = React.useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitting) return;

		setIsSubmitting(true);
		setStatus("idle");
		setErrorMessage("");

		const formData = new FormData(event.currentTarget);
		const payload: ContactFormData = {
			name: String(formData.get("name") || "").trim(),
			email: String(formData.get("email") || "").trim(),
			phone: String(formData.get("phone") || "").trim() || undefined,
			message: String(formData.get("message") || "").trim(),
		};

		if (!payload.name || !payload.email || !payload.message) {
			setIsSubmitting(false);
			setStatus("error");
			setErrorMessage("Wypełnij wszystkie wymagane pola.");
			return;
		}

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				throw new Error(data?.error || "Nie udało się wysłać wiadomości.");
			}

			setStatus("success");
			(event.currentTarget as HTMLFormElement).reset();
		} catch (error: unknown) {
			setStatus("error");
			setErrorMessage(error instanceof Error ? error.message : "Wystąpił błąd.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			aria-describedby="contact-form-status"
			className="space-y-4"
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="name" className="text-sm font-medium">Imię i nazwisko</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						placeholder="Jan Kowalski"
						className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-sm font-medium">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						placeholder="adres@email.com"
						className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="phone" className="text-sm font-medium">Telefon (opcjonalnie)</label>
				<input
					id="phone"
					name="phone"
					type="tel"
					placeholder="+48 123 456 789"
					className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="message" className="text-sm font-medium">Wiadomość</label>
				<textarea
					id="message"
					name="message"
					required
					rows={6}
					placeholder="Opisz krótko swój projekt..."
					className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
				/>
			</div>
			<div className="flex items-center justify-between gap-4">
				<p
					id="contact-form-status"
					role="status"
					aria-live="polite"
					className={cn(
						"text-sm",
						status === "success" && "text-emerald-600",
						status === "error" && "text-destructive",
					)}
				>
					{status === "success" && "Dziękujemy! Wiadomość została wysłana."}
					{status === "error" && (errorMessage || "Wystąpił błąd. Spróbuj ponownie.")}
				</p>
				<Button type="submit" aria-disabled={isSubmitting} disabled={isSubmitting}>
					{isSubmitting ? "Wysyłanie..." : "Wyślij"}
				</Button>
			</div>
		</form>
	);
}; 