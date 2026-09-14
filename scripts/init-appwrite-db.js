import { Client, Databases, Storage } from "node-appwrite";
import "dotenv/config";

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
const projectId = process.env.VITE_APPWRITE_PROJECT_ID || "6a931d3300098a4116bf";
const apiKey = process.env.APPWRITE_API_KEY;

if (!apiKey) {
  console.error("\n❌ ERROR: APPWRITE_API_KEY is missing in your .env file!");
  console.log("\nTo create an API Key in Appwrite Console:");
  console.log("1. Go to Appwrite Console -> Overview -> API Keys");
  console.log('2. Click "Add API Key", name it "DSC Platform Setup"');
  console.log("3. Select Scopes:");
  console.log(
    '   - Database: "databases.read", "databases.write", "collections.read", "collections.write", "attributes.read", "attributes.write", "indexes.read", "indexes.write", "documents.read", "documents.write"',
  );
  console.log('   - Storage: "buckets.read", "buckets.write", "files.read", "files.write"');
  console.log('   - Auth / Users: "users.read", "users.write"');
  console.log('4. Add APPWRITE_API_KEY="your_key_here" to your .env file and re-run: npm run setup:db\n');
  process.exit(1);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);
const storage = new Storage(client);

const DB_ID = process.env.VITE_APPWRITE_DATABASE_ID || "dscvitb_db";
const DB_NAME = "DSC VITB Database";
const BUCKET_ID = "dsc_attachments";

// Collections schema definition
const COLLECTIONS = [
  {
    id: "events",
    name: "Club Events",
    attributes: [
      { key: "title", type: "string", size: 255, required: true },
      { key: "slug", type: "string", size: 100, required: true },
      { key: "tag", type: "string", size: 50, required: true },
      { key: "eventDate", type: "string", size: 100, required: true },
      { key: "venue", type: "string", size: 255, required: true },
      { key: "description", type: "string", size: 5000, required: true },
      { key: "bannerImage", type: "string", size: 1000, required: false },
      { key: "isRegistrationOpen", type: "boolean", required: true },
      { key: "registrationDeadline", type: "string", size: 100, required: true },
      { key: "maxCapacity", type: "integer", required: true },
      { key: "currentRegistrations", type: "integer", required: true },
      { key: "isPaidEvent", type: "boolean", required: true },
      { key: "registrationFee", type: "float", required: false },
      { key: "upiId", type: "string", size: 100, required: false },
      { key: "upiPayeeName", type: "string", size: 100, required: false },
    ],
  },
  {
    id: "registrations",
    name: "Event Registrations",
    attributes: [
      { key: "eventId", type: "string", size: 100, required: true },
      { key: "eventTitle", type: "string", size: 255, required: true },
      { key: "registrationId", type: "string", size: 100, required: true },
      { key: "regType", type: "string", size: 50, required: true },
      { key: "fullName", type: "string", size: 255, required: true },
      { key: "regNumber", type: "string", size: 50, required: true },
      { key: "email", type: "string", size: 255, required: true },
      { key: "phone", type: "string", size: 50, required: true },
      { key: "branch", type: "string", size: 100, required: true },
      { key: "yearSemester", type: "string", size: 50, required: true },
      { key: "department", type: "string", size: 100, required: false },
      { key: "residenceType", type: "string", size: 50, required: true },
      { key: "teamName", type: "string", size: 255, required: false },
      { key: "teamSize", type: "integer", required: false },
      { key: "teamMembersJson", type: "string", size: 10000, required: false },
      { key: "paymentStatus", type: "string", size: 50, required: true },
      { key: "paymentUtr", type: "string", size: 100, required: false },
      { key: "paymentReceiptUrl", type: "string", size: 1000, required: false },
      { key: "paymentAmount", type: "float", required: true },
      { key: "registrationStatus", type: "string", size: 50, required: true },
      { key: "registeredAt", type: "string", size: 100, required: true },
    ],
  },
  {
    id: "recruitment_applications",
    name: "Recruitment Applications",
    attributes: [
      { key: "fullName", type: "string", size: 255, required: true },
      { key: "registrationNumber", type: "string", size: 50, required: true },
      { key: "email", type: "string", size: 255, required: true },
      { key: "phone", type: "string", size: 50, required: false },
      { key: "branch", type: "string", size: 100, required: false },
      { key: "year", type: "string", size: 50, required: false },
      { key: "primaryTeam", type: "string", size: 100, required: true },
      { key: "secondaryTeam", type: "string", size: 100, required: false },
      { key: "preferredTeam", type: "string", size: 100, required: false }, // Backwards compatibility
      { key: "githubUrl", type: "string", size: 500, required: false },
      { key: "linkedinUrl", type: "string", size: 500, required: false },
      { key: "portfolioUrl", type: "string", size: 500, required: false },
      { key: "whyJoin", type: "string", size: 5000, required: true },
      { key: "experience", type: "string", size: 5000, required: false },
      { key: "domainAnswersJson", type: "string", size: 10000, required: false },
      { key: "resumeFileId", type: "string", size: 100, required: false },
      { key: "resumeFileUrl", type: "string", size: 1000, required: false },
      { key: "status", type: "string", size: 50, required: false, default: "applied" },
      { key: "reviewerNotes", type: "string", size: 5000, required: false },
      { key: "submittedAt", type: "string", size: 100, required: false },
    ],
  },
  {
    id: "hiring_domains",
    name: "Hiring Domains",
    attributes: [
      { key: "domainName", type: "string", size: 100, required: true },
      { key: "shortDescription", type: "string", size: 500, required: true },
      { key: "fullDescription", type: "string", size: 5000, required: true },
      { key: "skillsJson", type: "string", size: 2000, required: true },
      { key: "isOpen", type: "boolean", required: true },
      { key: "questionsJson", type: "string", size: 5000, required: true },
    ],
  },
  {
    id: "users_roles",
    name: "User Roles & RBAC",
    attributes: [
      { key: "userId", type: "string", size: 100, required: false },
      { key: "email", type: "string", size: 255, required: true },
      { key: "fullName", type: "string", size: 255, required: true },
      { key: "role", type: "string", size: 50, required: true }, // super_admin, faculty_coordinator, team_lead, member
      { key: "title", type: "string", size: 100, required: true },
      { key: "leadDomain", type: "string", size: 100, required: false },
      { key: "isActive", type: "boolean", required: true },
      { key: "createdAt", type: "string", size: 100, required: true },
    ],
  },
  {
    id: "finance_sheets",
    name: "Event Finance Sheets",
    attributes: [
      { key: "eventId", type: "string", size: 100, required: true },
      { key: "eventTitle", type: "string", size: 255, required: true },
      { key: "totalIncome", type: "float", required: true },
      { key: "totalExpense", type: "float", required: true },
      { key: "netBalance", type: "float", required: true },
      { key: "lastUpdated", type: "string", size: 100, required: true },
    ],
  },
  {
    id: "finance_transactions",
    name: "Finance Transactions",
    attributes: [
      { key: "sheetId", type: "string", size: 100, required: true },
      { key: "eventId", type: "string", size: 100, required: true },
      { key: "eventTitle", type: "string", size: 255, required: true },
      { key: "type", type: "string", size: 50, required: true }, // income | expense
      { key: "category", type: "string", size: 100, required: true },
      { key: "amount", type: "float", required: true },
      { key: "description", type: "string", size: 2000, required: true },
      { key: "billFileId", type: "string", size: 100, required: false },
      { key: "billFileUrl", type: "string", size: 1000, required: false },
      { key: "paymentMode", type: "string", size: 50, required: true },
      { key: "transactionRef", type: "string", size: 100, required: false },
      { key: "transactionDate", type: "string", size: 100, required: true },
      { key: "addedByEmail", type: "string", size: 255, required: true },
      { key: "createdAt", type: "string", size: 100, required: true },
    ],
  },
  {
    id: "activity_logs",
    name: "Activity & Audit Logs",
    attributes: [
      { key: "actorEmail", type: "string", size: 255, required: true },
      { key: "actorName", type: "string", size: 255, required: true },
      { key: "actorRole", type: "string", size: 50, required: true },
      { key: "actionType", type: "string", size: 100, required: true },
      { key: "targetModule", type: "string", size: 100, required: true },
      { key: "targetEntityId", type: "string", size: 100, required: false },
      { key: "details", type: "string", size: 5000, required: true },
      { key: "timestamp", type: "string", size: 100, required: true },
    ],
  },
  {
    id: "system_settings",
    name: "System Settings",
    attributes: [
      { key: "isHiringOpen", type: "boolean", required: true },
      { key: "hiringDeadline", type: "string", size: 100, required: true },
      { key: "announcementHeadline", type: "string", size: 1000, required: true },
      { key: "showAnnouncement", type: "boolean", required: true },
      { key: "defaultUpiId", type: "string", size: 100, required: true },
      { key: "defaultUpiPayeeName", type: "string", size: 100, required: true },
      { key: "contactEmail", type: "string", size: 255, required: true },
      { key: "lastBackupAt", type: "string", size: 100, required: false },
    ],
  },
];

async function setupAppwriteDB() {
  console.log(`\n======================================================`);
  console.log(`🚀 Starting DSC VITB Cloud Schema Provisioning`);
  console.log(`   Project ID: ${projectId}`);
  console.log(`   Endpoint:   ${endpoint}`);
  console.log(`======================================================\n`);

  // 1. Create or verify Database
  try {
    console.log(`📦 Verifying Database "${DB_NAME}" (${DB_ID})...`);
    await databases.create(DB_ID, DB_NAME);
    console.log("   ✅ Database created successfully!");
  } catch (err) {
    if (err.code === 409) {
      console.log("   ℹ️ Database already exists.");
    } else {
      console.error("   ❌ Database status warning:", err.message);
      if (err.message.includes("paused")) {
        console.log("\n💡 Note: Appwrite Cloud project is paused due to inactivity.");
        console.log("   Log in to https://cloud.appwrite.io and click 'Restore' on your project.");
        console.log("   The local fallback Data Engine will maintain 100% operation in the meantime.\n");
        return;
      }
    }
  }

  // 2. Storage Bucket for bills and resumes
  try {
    console.log(`📁 Verifying Storage Bucket "${BUCKET_ID}"...`);
    await storage.createBucket(BUCKET_ID, "DSC Attachments & Bills", ["*"], false, true);
    console.log("   ✅ Storage bucket created successfully!");
  } catch (err) {
    if (err.code === 409) {
      console.log("   ℹ️ Storage bucket already exists.");
    } else {
      console.warn("   ⚠️ Bucket notice:", err.message);
    }
  }

  // 3. Create Collections & Attributes
  for (const col of COLLECTIONS) {
    console.log(`\n📋 Processing Collection: ${col.name} (${col.id})...`);
    try {
      await databases.createCollection(DB_ID, col.id, col.name);
      console.log(`   ✅ Collection "${col.name}" created.`);
    } catch (err) {
      if (err.code === 409) {
        console.log(`   ℹ️ Collection "${col.name}" already exists.`);
      } else {
        console.error(`   ❌ Failed to create collection "${col.id}":`, err.message);
        continue;
      }
    }

    // Attributes creation
    for (const attr of col.attributes) {
      try {
        if (attr.type === "string") {
          await databases.createStringAttribute(
            DB_ID,
            col.id,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
          );
        } else if (attr.type === "boolean") {
          await databases.createBooleanAttribute(
            DB_ID,
            col.id,
            attr.key,
            attr.required,
            attr.default,
          );
        } else if (attr.type === "integer") {
          await databases.createIntegerAttribute(
            DB_ID,
            col.id,
            attr.key,
            attr.required,
            undefined,
            undefined,
            attr.default,
          );
        } else if (attr.type === "float") {
          await databases.createFloatAttribute(
            DB_ID,
            col.id,
            attr.key,
            attr.required,
            undefined,
            undefined,
            attr.default,
          );
        }
        console.log(`      + Attribute created: ${attr.key} (${attr.type})`);
      } catch (err) {
        if (err.code === 409) {
          // Attribute already exists, normal
        } else {
          console.warn(`      ! Notice for "${attr.key}":`, err.message);
        }
      }
    }
  }

  console.log(`\n🎉 Cloud Schema Provisioning Finished!`);
}

setupAppwriteDB();
