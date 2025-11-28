const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read .env manually since we are running a standalone script
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const client = new Client({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to database');

        // 1. Create bucket
        console.log('Creating "products" bucket...');
        await client.query(`
            INSERT INTO storage.buckets (id, name, public)
            VALUES ('products', 'products', true)
            ON CONFLICT (id) DO NOTHING;
        `);
        console.log('Bucket created (or already exists)');

        // 2. Create policies
        console.log('Creating policies...');
        
        // We need to enable RLS on storage.objects if not enabled, but it usually is.
        
        const policies = [
            {
                name: 'Public Access',
                command: `CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'products' );`
            },
            {
                name: 'Public Upload',
                command: `CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'products' );`
            },
            {
                name: 'Public Update',
                command: `CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'products' );`
            },
            {
                name: 'Public Delete',
                command: `CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'products' );`
            }
        ];

        for (const policy of policies) {
            try {
                await client.query(policy.command);
                console.log(`Policy "${policy.name}" created.`);
            } catch (err) {
                if (err.code === '42710') { // duplicate_object
                    console.log(`Policy "${policy.name}" already exists.`);
                } else {
                    console.error(`Error creating policy "${policy.name}":`, err.message);
                }
            }
        }

        console.log('Setup complete!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

run();
