const { Pool } = require('pg');

// Voer het wachtwoord in dat je wilt testen
const testPassword = 'wachtwoord_hier'; // VERVANG DIT MET HET WACHTWOORD DAT JE WILT TESTEN

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medusa',
  password: testPassword,
  port: 5433,
});

async function testConnection() {
  try {
    // Probeer een eenvoudige query uit te voeren
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Verbinding succesvol!');
    console.log('Database tijdstempel:', result.rows[0].now);
    console.log(`Het wachtwoord "${testPassword}" is correct.`);
    return true;
  } catch (error) {
    console.error('❌ Verbinding mislukt!');
    console.error(`Het wachtwoord "${testPassword}" lijkt niet correct.`);
    console.error('Foutmelding:', error.message);
    return false;
  } finally {
    // Sluit de pool
    pool.end();
  }
}

// Voer de test uit
testConnection(); 