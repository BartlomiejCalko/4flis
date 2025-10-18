/**
 * Skrypt do sprawdzania poprawności zmiennych środowiskowych
 * Uruchom: npx tsx scripts/check-env.ts
 */

const requiredEnvVars = [
  'ADMIN_KEY',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY',
];

console.log('🔍 Sprawdzanie zmiennych środowiskowych...\n');

let allValid = true;

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`❌ ${varName}: BRAK`);
    allValid = false;
  } else if (value.includes('your-') || value.includes('xxxxx') || value.includes('Your')) {
    console.log(`⚠️  ${varName}: Placeholder - wymagana zmiana`);
    allValid = false;
  } else if (varName === 'ADMIN_KEY' && value.length < 10) {
    console.log(`⚠️  ${varName}: Za krótki (minimum 10 znaków)`);
    allValid = false;
  } else {
    const preview = value.length > 50 ? `${value.substring(0, 47)}...` : value;
    console.log(`✅ ${varName}: OK (${preview})`);
  }
});

console.log('\n' + '='.repeat(60));

if (allValid) {
  console.log('✅ Wszystkie zmienne środowiskowe są poprawnie skonfigurowane!');
  console.log('✅ Możesz teraz dodawać użytkowników.');
} else {
  console.log('❌ Niektóre zmienne wymagają konfiguracji.');
  console.log('📖 Zobacz instrukcje w pliku: ENV_SETUP.md');
}

console.log('='.repeat(60));

