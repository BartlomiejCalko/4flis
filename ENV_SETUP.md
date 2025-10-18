# Instrukcja konfiguracji zmiennych środowiskowych

## Problem
Jeśli widzisz błąd **"Admin key not configured on server"**, oznacza to, że nie skonfigurowałeś zmiennych środowiskowych.

## Rozwiązanie

### Krok 1: Utwórz plik `.env.local`

W głównym katalogu projektu (obok `package.json`) utwórz nowy plik o nazwie `.env.local`

### Krok 2: Dodaj wymagane zmienne

Skopiuj poniższą zawartość do pliku `.env.local` i wypełnij wartości:

```env
# ==============================================
# ADMIN KEY - Klucz do dodawania użytkowników
# ==============================================
# Ustaw własny tajny klucz (np. losowy string minimum 20 znaków)
# Przykład: ADMIN_KEY=moj-super-tajny-klucz-admin-2024
ADMIN_KEY=

# ==============================================
# FIREBASE ADMIN SDK - Dane autoryzacyjne
# ==============================================
# Project ID
FIREBASE_PROJECT_ID=flis-3e60f

# Client Email (pobierz z Firebase Console)
FIREBASE_CLIENT_EMAIL=

# Private Key (pobierz z Firebase Console - WAŻNE: zachowaj \n)
FIREBASE_PRIVATE_KEY=
```

### Krok 3: Pobierz dane Firebase Admin SDK

1. Wejdź na: https://console.firebase.google.com/
2. Wybierz projekt: **flis-3e60f**
3. Kliknij ikonę **⚙️ (koła zębatego)** > **Project Settings**
4. Przejdź do zakładki: **Service Accounts**
5. Kliknij przycisk: **Generate New Private Key**
6. Pobierze się plik JSON z następującą strukturą:

```json
{
  "type": "service_account",
  "project_id": "flis-3e60f",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@flis-3e60f.iam.gserviceaccount.com",
  ...
}
```

### Krok 4: Wypełnij zmienne

Z pobranego pliku JSON skopiuj:
- `project_id` → `FIREBASE_PROJECT_ID`
- `client_email` → `FIREBASE_CLIENT_EMAIL`
- `private_key` → `FIREBASE_PRIVATE_KEY` (WAŻNE: całość w cudzysłowie, zachowaj `\n`)

**Przykład wypełnionego pliku `.env.local`:**

```env
ADMIN_KEY=moj-tajny-klucz-admin-123456

FIREBASE_PROJECT_ID=flis-3e60f
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc12@flis-3e60f.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### Krok 5: Zrestartuj serwer

Po zapisaniu pliku `.env.local`, zrestartuj serwer deweloperski:

```bash
# Zatrzymaj aktualny serwer (Ctrl+C)
# Uruchom ponownie:
npm run dev
```

## Testowanie

1. Otwórz stronę: `/admin/add-user`
2. Wypełnij formularz:
   - **Imię i Nazwisko**: np. Jan Kowalski
   - **Email**: np. jan@example.com  
   - **Hasło**: minimum 6 znaków
   - **Klucz Administratora**: wartość z `ADMIN_KEY` w `.env.local`
3. Kliknij "Dodaj Użytkownika"

Jeśli wszystko jest poprawnie skonfigurowane, zobaczysz komunikat: ✅ "User created successfully"

## Bezpieczeństwo

⚠️ **WAŻNE:**
- Plik `.env.local` jest automatycznie ignorowany przez Git (znajduje się w `.gitignore`)
- **NIGDY** nie commituj pliku `.env.local` do repozytorium
- **NIGDY** nie udostępniaj publicznie klucza `FIREBASE_PRIVATE_KEY`
- Klucz `ADMIN_KEY` powinien być znany tylko tobie

## Problemy?

Jeśli nadal widzisz błędy:
1. Sprawdź, czy plik nazywa się dokładnie `.env.local` (z kropką na początku)
2. Sprawdź, czy nie ma spacji przed/po `=` w zmiennych
3. Sprawdź, czy `FIREBASE_PRIVATE_KEY` jest w cudzysłowie i zawiera `\n`
4. Sprawdź konsolę serwera pod kątem dodatkowych błędów

