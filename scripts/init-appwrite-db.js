import { Client, Databases } from 'node-appwrite';
import 'dotenv/config';

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const projectId = process.env.VITE_APPWRITE_PROJECT_ID || '6a931d3300098a4116bf';
const apiKey = process.env.APPWRITE_API_KEY;

if (!apiKey) {
  console.error('\n❌ ERROR: APPWRITE_API_KEY is missing in your .env file!');
  console.log('\nTo create an API Key in Appwrite Console:');
  console.log('1. Go to Appwrite Console -> Overview -> API Keys');
  console.log('2. Click "Add API Key", name it "Setup Script"');
  console.log('3. Select Scopes:');
  console.log('   - Database: "databases.read", "databases.write", "documents.read", "documents.write"');
  console.log('   - Auth / Users: "users.read", "users.write"');
  console.log('4. Add APPWRITE_API_KEY="your_key_here" to your .env file and re-run: npm run setup:db\n');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);

const DB_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'dscvitb_db';
const DB_NAME = 'DSC VITB Database';
const COLLECTION_ID = process.env.VITE_APPWRITE_RECRUITMENT_COLLECTION_ID || 'recruitment_applications';
const COLLECTION_NAME = 'Recruitment Applications';

async function setupAppwriteDB() {
  console.log(`🚀 Starting Appwrite Database setup for Project [${projectId}]...`);

  // 1. Create Database
  try {
    console.log(`📦 Creating Database "${DB_NAME}" (${DB_ID})...`);
    await databases.create(DB_ID, DB_NAME);
    console.log('✅ Database created successfully!');
  } catch (err) {
    if (err.code === 409) {
      console.log('ℹ️ Database already exists.');
    } else {
      console.error('❌ Error creating database:', err.message);
    }
  }

  // 2. Create Recruitment Applications Collection
  try {
    console.log(`📋 Creating Collection "${COLLECTION_NAME}" (${COLLECTION_ID})...`);
    await databases.createCollection(DB_ID, COLLECTION_ID, COLLECTION_NAME);
    console.log('✅ Collection created successfully!');
  } catch (err) {
    if (err.code === 409) {
      console.log('ℹ️ Collection already exists.');
    } else {
      console.error('❌ Error creating collection:', err.message);
    }
  }

  // 3. Create Attributes
  const attributes = [
    { key: 'fullName', type: 'string', size: 255, required: true },
    { key: 'registrationNumber', type: 'string', size: 50, required: true },
    { key: 'email', type: 'string', size: 255, required: true },
    { key: 'phone', type: 'string', size: 50, required: false },
    { key: 'preferredTeam', type: 'string', size: 100, required: true },
    { key: 'githubUrl', type: 'string', size: 500, required: false },
    { key: 'linkedinUrl', type: 'string', size: 500, required: false },
    { key: 'portfolioUrl', type: 'string', size: 500, required: false },
    { key: 'whyJoin', type: 'string', size: 5000, required: true },
    { key: 'experience', type: 'string', size: 5000, required: false },
    { key: 'status', type: 'string', size: 50, required: false, default: 'pending' },
    { key: 'submittedAt', type: 'string', size: 100, required: false }
  ];

  console.log('⚡ Creating attributes for Recruitment Applications...');
  for (const attr of attributes) {
    try {
      if (attr.type === 'string') {
        await databases.createStringAttribute(
          DB_ID,
          COLLECTION_ID,
          attr.key,
          attr.size,
          attr.required,
          attr.default
        );
        console.log(`   + Attribute created: ${attr.key}`);
      }
    } catch (err) {
      if (err.code === 409) {
        console.log(`   ~ Attribute "${attr.key}" already exists.`);
      } else {
        console.error(`   ! Failed to create attribute "${attr.key}":`, err.message);
      }
    }
  }

  console.log('\n🎉 Appwrite Database & Collection Setup Complete!');
}

setupAppwriteDB();
