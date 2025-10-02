# 🚀 Szybki Start - System Autoryzacji

## ⚡ 3 Kroki do Uruchomienia

### 1️⃣ Utwórz plik `.env.local` w głównym katalogu projektu:

```env
ADMIN_SECRET_KEY=super-tajny-klucz-2024
```

**WAŻNE:** Zmień `super-tajny-klucz-2024` na swój własny bezpieczny klucz!

### 2️⃣ Dodaj pierwszego użytkownika:

Otwórz w przeglądarce:
```
http://localhost:3000/admin/add-user
```

Wypełnij formularz:
- **Imię i Nazwisko**: Twoje imię
- **Email**: twoj@email.com
- **Hasło**: bezpiecznehaslo123
- **Klucz Administratora**: super-tajny-klucz-2024 (ten sam co w .env.local)

### 3️⃣ Zaloguj się:

```
http://localhost:3000/sign-in
```

Użyj danych z kroku 2.

---

## 🎯 To wszystko!

Teraz tylko TY i użytkownicy, których dodasz, mogą logować się do dashboardu.

📖 Szczegółowa dokumentacja: [AUTH_SETUP.md](./AUTH_SETUP.md)

