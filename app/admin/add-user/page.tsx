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
        toast.error(result.message);
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

