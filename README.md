This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Konfiguracja zmiennych środowiskowych

### Firebase Admin SDK - Autoryzacja użytkowników

Aby dodawać nowych użytkowników do systemu, musisz skonfigurować Firebase Admin SDK:

1. Skopiuj plik `env.example` do `.env.local`
2. Wygeneruj klucz Firebase Admin SDK:
   - Wejdź na [Firebase Console](https://console.firebase.google.com/)
   - Wybierz projekt: **flis-3e60f**
   - Project Settings → Service Accounts → Generate New Private Key
3. Wypełnij zmienne w `.env.local`:
   - `ADMIN_KEY` – własny tajny klucz (minimum 20 znaków)
   - `FIREBASE_PROJECT_ID` – ID projektu Firebase
   - `FIREBASE_CLIENT_EMAIL` – email z pobranego JSON
   - `FIREBASE_PRIVATE_KEY` – klucz prywatny z JSON (w cudzysłowie, z `\n`)

**Sprawdź konfigurację:**
```bash
npx tsx scripts/check-env.ts
```

📖 **Szczegółowe instrukcje:** Zobacz `ENV_SETUP.md`

### Kontakt – konfiguracja wysyłki e-mail

Aby formularz kontaktowy mógł wysyłać e‑maile przez Resend:

1. Dodaj do pliku `.env.local` dodatkowe wartości:
   - `RESEND_API_KEY` – klucz API z Resend
   - `MAIL_FROM` – adres nadawcy (np. `4FLIS Kontakt <onboarding@resend.dev>`) 
   - `MAIL_TO` – adres odbiorcy (np. Twój e‑mail firmowy)
2. Zainstaluj zależność:

```bash
npm install resend
```

3. Uruchom aplikację:

```bash
npm run dev
```

Formularz wysyła POST na `/api/contact` i zwraca komunikaty o powodzeniu/błędzie.
