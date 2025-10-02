# 🔐 System Autoryzacji Użytkowników - Instrukcja

## Przegląd

System został skonfigurowany tak, aby **tylko wybrani użytkownicy** mogli logować się do dashboardu. Rejestracja publiczna (`/sign-up`) jest wyłączona.

## Jak Dodać Nowego Użytkownika

Masz **3 sposoby** na dodanie użytkownika:

### 1. 🌐 Przez Przeglądarkę (ZALECANE)

1. Przejdź do: `http://localhost:3000/admin/add-user`
2. Wypełnij formularz:
   - **Imię i Nazwisko**: pełna nazwa użytkownika
   - **Email**: adres email do logowania
   - **Hasło**: hasło (min. 6 znaków)
   - **Klucz Administratora**: tajny klucz (patrz poniżej)
3. Kliknij "Dodaj Użytkownika"

### 2. 📡 Przez API

Wyślij POST request do `/api/admin/add-user`:

```bash
curl -X POST http://localhost:3000/api/admin/add-user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jan Kowalski",
    "email": "jan@example.com",
    "password": "haslo123",
    "adminKey": "your-secret-admin-key"
  }'
```

### 3. 🖥️ Przez Terminal (Node Script)

```bash
# Zainstaluj tsx jeśli jeszcze nie masz
npm install -D tsx

# Uruchom skrypt
npx tsx scripts/add-user.ts

# LUB dodaj do package.json:
# "scripts": {
#   "add-user": "tsx scripts/add-user.ts"
# }
# A potem: npm run add-user
```

## 🔑 Klucz Administratora

**WAŻNE:** Musisz ustawić tajny klucz administratora w pliku `.env`:

```env
ADMIN_SECRET_KEY=twoj-bardzo-tajny-klucz-ktory-nikt-nie-zna
```

Jeśli nie ustawisz, domyślny klucz to: `your-secret-admin-key` (zmień to!)

## 📋 Jak Działa System

1. **Whitelist w Firestore**: Lista autoryzowanych użytkowników jest przechowywana w kolekcji `authorizedUsers`
2. **Sprawdzanie przy logowaniu**: Przy każdym logowaniu system sprawdza czy użytkownik jest na whiteliście
3. **Aktywacja/Dezaktywacja**: Możesz dezaktywować użytkowników bez ich usuwania

## 🚀 Pierwsze Uruchomienie

### Krok 1: Ustaw Klucz Administratora

Utwórz plik `.env.local` (jeśli nie istnieje):

```env
ADMIN_SECRET_KEY=super-tajny-klucz-2024
```

### Krok 2: Dodaj Pierwszego Użytkownika

Przejdź do `http://localhost:3000/admin/add-user` i dodaj siebie:

- **Imię i Nazwisko**: Twoje imię
- **Email**: twoj@email.com
- **Hasło**: bezpiecznehaslo123
- **Klucz Administratora**: super-tajny-klucz-2024

### Krok 3: Zaloguj się

Przejdź do `http://localhost:3000/sign-in` i zaloguj się używając swoich danych.

## 🛡️ Bezpieczeństwo

### Ważne Zasady:

1. **NIGDY** nie commituj klucza administratora do repozytorium
2. Dodaj `.env.local` do `.gitignore`
3. Zmień domyślny klucz administratora
4. Używaj silnych haseł dla użytkowników
5. Klucz administratora powinien być długi i losowy

### Generowanie Bezpiecznego Klucza:

```bash
# W Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Lub użyj online generator:
# https://randomkeygen.com/
```

## 📊 Struktura Bazy Danych (Firestore)

### Kolekcja: `authorizedUsers`

```
authorizedUsers/
  {email}/ (document ID = email użytkownika)
    - email: string
    - name: string
    - active: boolean
    - createdAt: string (ISO date)
    - deactivatedAt?: string (ISO date)
```

### Kolekcja: `users`

```
users/
  {uid}/ (document ID = Firebase Auth UID)
    - name: string
    - email: string
    - createdAt: string (ISO date)
```

## 🔧 Dezaktywacja Użytkownika

Aby dezaktywować użytkownika (aby nie mógł się zalogować):

```typescript
import { removeAuthorizedUser } from '@/lib/actions/auth.action';

await removeAuthorizedUser({
  email: 'user@example.com',
  adminKey: 'twoj-klucz'
});
```

## ❓ FAQ

**Q: Użytkownik próbuje się zalogować ale otrzymuje błąd "Nie masz uprawnień"?**  
A: Upewnij się, że użytkownik został dodany przez `/admin/add-user` i jest aktywny w kolekcji `authorizedUsers`.

**Q: Czy mogę zmienić klucz administratora?**  
A: Tak, zmień wartość `ADMIN_SECRET_KEY` w pliku `.env.local`.

**Q: Co jeśli zapomnę klucza administratora?**  
A: Możesz go odzyskać z pliku `.env.local` lub ustawić nowy.

**Q: Czy mogę mieć wielu administratorów?**  
A: Tak, każdy kto zna klucz administratora może dodawać użytkowników.

## 📞 Wsparcie

W razie problemów sprawdź:
1. Logi serwera (`console.log` w terminalu)
2. Firebase Console (https://console.firebase.google.com)
3. Czy Firebase Admin SDK jest poprawnie skonfigurowany

---

**Status**: ✅ System Gotowy do Użycia  
**Ostatnia aktualizacja**: 2025-10-02

