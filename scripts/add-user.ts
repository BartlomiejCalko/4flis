/**
 * Script to add authorized users to the dashboard
 * 
 * Usage:
 * npx tsx scripts/add-user.ts
 * 
 * Or add to package.json:
 * "scripts": {
 *   "add-user": "tsx scripts/add-user.ts"
 * }
 * 
 * Then run: npm run add-user
 */

import { addAuthorizedUser } from '../lib/actions/auth.action';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function main() {
  console.log('='.repeat(50));
  console.log('ADD AUTHORIZED USER TO DASHBOARD');
  console.log('='.repeat(50));
  console.log('');

  try {
    const name = await question('Imię i nazwisko: ');
    const email = await question('Email: ');
    const password = await question('Hasło: ');
    const adminKey = await question('Klucz administratora: ');

    console.log('\nDodawanie użytkownika...');

    const result = await addAuthorizedUser({
      name,
      email,
      password,
      adminKey
    });

    console.log('');
    if (result.success) {
      console.log('✅ SUCCESS:', result.message);
      console.log('');
      console.log('Użytkownik może się teraz zalogować:');
      console.log('Email:', email);
      console.log('Hasło:', password);
    } else {
      console.log('❌ ERROR:', result.message);
    }
    console.log('');

  } catch (error) {
    console.error('❌ Błąd:', error);
  } finally {
    rl.close();
  }
}

main();

