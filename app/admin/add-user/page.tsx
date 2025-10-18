'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminKey: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setFormData({
          name: '',
          email: '',
          password: '',
          adminKey: ''
        });
      } else {
        // Specjalny komunikat dla braku konfiguracji
        if (result.message === 'Admin key not configured on server') {
          toast.error('❌ Brak konfiguracji zmiennych środowiskowych', {
            description: 'Zobacz instrukcje w pliku ENV_SETUP.md',
            duration: 5000,
          });
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas dodawania użytkownika');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Dodaj Użytkownika
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Panel administracyjny - dodaj nowego użytkownika do dashboardu
          </p>
          
          {/* Info Alert */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Pierwsza konfiguracja?</strong> Upewnij się, że skonfigurowałeś zmienne środowiskowe w pliku <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env.local</code>
                </p>
                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                  Szczegóły w: <code>ENV_SETUP.md</code> lub <code>README.md</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="name">Imię i Nazwisko</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jan Kowalski"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jan@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 znaków"
                className="mt-1"
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="adminKey">Klucz Administratora</Label>
              <Input
                id="adminKey"
                name="adminKey"
                type="password"
                required
                value={formData.adminKey}
                onChange={handleChange}
                placeholder="Tajny klucz administratora"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Wymagany klucz administratora ustawiony w zmiennych środowiskowych
              </p>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Dodawanie...' : 'Dodaj Użytkownika'}
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/sign-in" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Powrót do logowania
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;

