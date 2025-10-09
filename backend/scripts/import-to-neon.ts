import { Client } from 'pg';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function importToNeon() {
  // Use the environment variable from Vercel
  const connectionString = process.env.POSTGRES_DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!connectionString) {
    console.error('❌ No database connection string found!');
    console.error('Set POSTGRES_DATABASE_URL or POSTGRES_URL in your .env file');
    console.error('\nTo get your connection string:');
    console.error('1. Go to Vercel dashboard');
    console.error('2. Click on your project');
    console.error('3. Go to Settings > Environment Variables');
    console.error('4. Click on POSTGRES_DATABASE_URL to reveal the value');
    console.error('5. Copy the full connection string');
    return;
  }

  console.log('🔄 Connecting to Neon database...');
  console.log('Connection string starts with:', connectionString.substring(0, 20) + '...');

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon!');

    // Read the backup file
    console.log('📖 Reading backup file...');
    const sqlContent = fs.readFileSync('database_backup.sql', 'utf8');
    
    console.log('🔄 Executing SQL commands...');
    
    // Split the SQL content into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await client.query(statement);
          console.log(`✅ Executed statement ${i + 1}/${statements.length}`);
        } catch (error) {
          console.log(`⚠️  Statement ${i + 1} failed (might be expected):`, error.message);
          // Continue with other statements
        }
      }
    }
    
    console.log('✅ Database import completed!');
    console.log('\n📊 Verifying data...');
    
    // Verify tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Tables:', tables.rows.map(r => r.table_name).join(', '));
    
    // Count records in each table
    const tableCounts = [
      'products', 'reviews', 'users', 'orders', 'order_items', 'wishlists', 'faqs'
    ];
    
    for (const table of tableCounts) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`${table}: ${result.rows[0].count} records`);
      } catch (error) {
        console.log(`${table}: Table not found or empty`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure your Neon database is running');
    console.error('2. Check your connection string is correct');
    console.error('3. Ensure the database_backup.sql file exists');
  } finally {
    await client.end();
  }
}

importToNeon();

