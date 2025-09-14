import { Resend } from "resend";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
	try {
		const body = await request.json().catch(() => null);
		if (!body || typeof body !== "object") {
			return Response.json({ error: "Invalid JSON body" }, { status: 400 });
		}

		const name = String(body.name || "").trim();
		const email = String(body.email || "").trim();
		const phone = String(body.phone || "").trim();
		const message = String(body.message || "").trim();

		if (!name || !email || !message) {
			return Response.json({ error: "Missing required fields" }, { status: 400 });
		}

		const RESEND_API_KEY = process.env.RESEND_API_KEY;
		const MAIL_TO = process.env.MAIL_TO;
		const MAIL_FROM = process.env.MAIL_FROM || "Kontakt <onboarding@resend.dev>";

		if (!RESEND_API_KEY || !MAIL_TO) {
			return Response.json({ error: "Server email configuration missing" }, { status: 500 });
		}

		const resend = new Resend(RESEND_API_KEY);

		const subject = `Nowa wiadomość z formularza: ${name}`;
		const text = [
			`Imię i nazwisko: ${name}`,
			`Email: ${email}`,
			phone ? `Telefon: ${phone}` : null,
			"",
			"Wiadomość:",
			message,
		]
			.filter(Boolean)
			.join("\n");

		await resend.emails.send({
			from: MAIL_FROM,
			to: [MAIL_TO],
			subject,
			replyTo: email,
			text,
		});

		return Response.json({ success: true });
	} catch (error) {
		return Response.json({ error: "Failed to send message" }, { status: 500 });
	}
}; 