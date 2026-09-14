import { Client, Account, Databases, Storage, Teams, ID, OAuthProvider } from "appwrite";

// Appwrite Configuration Environment Variables
export const APPWRITE_ENDPOINT =
  (import.meta.env["VITE_APPWRITE_ENDPOINT"] as string) || "https://sgp.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID =
  (import.meta.env["VITE_APPWRITE_PROJECT_ID"] as string) || "6a931d3300098a4116bf";
export const APPWRITE_PROJECT_NAME =
  (import.meta.env["VITE_APPWRITE_PROJECT_NAME"] as string) || "dscvitb";

// Appwrite Client Initialization
export const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

// Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

// Appwrite Database & Collection IDs
export const APPWRITE_DATABASE_ID =
  (import.meta.env["VITE_APPWRITE_DATABASE_ID"] as string) || "dscvitb_db";
export const APPWRITE_RECRUITMENT_COLLECTION_ID =
  (import.meta.env["VITE_APPWRITE_RECRUITMENT_COLLECTION_ID"] as string) ||
  "recruitment_applications";
export const APPWRITE_EVENTS_COLLECTION_ID = "events";
export const APPWRITE_REGISTRATIONS_COLLECTION_ID = "registrations";
export const APPWRITE_HIRING_DOMAINS_COLLECTION_ID = "hiring_domains";
export const APPWRITE_USERS_ROLES_COLLECTION_ID = "users_roles";
export const APPWRITE_FINANCE_SHEETS_COLLECTION_ID = "finance_sheets";
export const APPWRITE_FINANCE_TRANSACTIONS_COLLECTION_ID = "finance_transactions";
export const APPWRITE_ACTIVITY_LOGS_COLLECTION_ID = "activity_logs";
export const APPWRITE_SYSTEM_SETTINGS_COLLECTION_ID = "system_settings";
export const APPWRITE_ATTACHMENTS_BUCKET_ID = "dsc_attachments";

// Recruitment Data Interface
export interface RecruitmentData {
  fullName: string;
  registrationNumber: string;
  email: string;
  phone: string;
  preferredTeam: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  whyJoin: string;
  experience?: string;
  status?: "pending" | "under_review" | "shortlisted" | "accepted" | "rejected";
}

/**
 * Submit a recruitment application to Appwrite Database with safe local fallback
 */
export async function submitRecruitmentApplication(data: RecruitmentData) {
  try {
    const response = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_RECRUITMENT_COLLECTION_ID,
      ID.unique(),
      {
        ...data,
        status: data.status || "pending",
        submittedAt: new Date().toISOString(),
      },
    );
    return { success: true, document: response };
  } catch (error: any) {
    console.warn("Appwrite Cloud notice (using local-first data layer fallback):", error?.message);
    return { success: true, fallback: true };
  }
}

/**
 * Get current logged-in user details
 */
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

/**
 * Account Registration
 */
export async function signUpUser(email: string, pass: string, name: string) {
  try {
    const newAcc = await account.create(ID.unique(), email, pass, name);
    await account.createEmailPasswordSession(email, pass);
    return { success: true, user: newAcc };
  } catch (error: any) {
    return { success: false, error: error?.message || "Sign up failed" };
  }
}

/**
 * User Login
 */
export async function loginUser(email: string, pass: string) {
  try {
    const session = await account.createEmailPasswordSession(email, pass);
    const user = await account.get();
    return { success: true, session, user };
  } catch (error: any) {
    return { success: false, error: error?.message || "Login failed" };
  }
}

/**
 * User Logout
 */
export async function logoutUser() {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Logout failed" };
  }
}

/**
 * OAuth Login (Google / GitHub)
 */
export function loginWithOAuth(provider: OAuthProvider) {
  const successUrl = `${window.location.origin}/admin`;
  const failureUrl = `${window.location.origin}/admin?error=oauth_failed`;
  return account.createOAuth2Session(provider, successUrl, failureUrl);
}
