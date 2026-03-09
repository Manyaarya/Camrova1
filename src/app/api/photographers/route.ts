import { NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

interface Photographer {
  id: string;
  name: string;
  email: string;
  city: string;
  photography_type: string;
  instagram: string;
  portfolio_link: string;
  bio: string;
  experience_level: string;
  profile_image_url: string;
  referral_code: string;
  referred_by: string;
  availability?: string;
  price_per_hour?: string;
  preferred_shoot_type?: string;
  reel_creator?: string;
  phone_number?: string;
}

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n",
);

// Initialize Google Sheets API
const getSheets = (): sheets_v4.Sheets | null => {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

export async function GET() {
  try {
    const sheets = getSheets();

    if (!sheets || !SPREADSHEET_ID) {
      // Return sample data for development/demo
      const samplePhotographers: Photographer[] = [
        {
          id: "1",
          name: "Rahul Sharma",
          email: "rahul@example.com",
          city: "Delhi",
          photography_type: "Event",
          instagram: "@rahul_photos",
          portfolio_link: "https://instagram.com/rahul_photos",
          bio: "Professional event photographer with 5 years of experience. Specializing in weddings, concerts, and corporate events.",
          experience_level: "Professional",
          profile_image_url: "",
          referral_code: "RAHUL01",
          referred_by: "",
          phone_number: "9876543210",
        },
        {
          id: "2",
          name: "Priya Singh",
          email: "priya@example.com",
          city: "Mumbai",
          photography_type: "Fashion",
          instagram: "@priya_captures",
          portfolio_link: "https://instagram.com/priya_captures",
          bio: "Fashion and portrait photographer based in Mumbai. Works with brands and models for lookbooks and campaigns.",
          experience_level: "Professional",
          profile_image_url: "",
          referral_code: "PRIYA02",
          referred_by: "",
          phone_number: "9876543211",
        },
        {
          id: "3",
          name: "Akash Verma",
          email: "akash@example.com",
          city: "Delhi",
          photography_type: "Product",
          instagram: "@akash_clicks",
          portfolio_link: "https://instagram.com/akash_clicks",
          bio: "Product photographer specializing in e-commerce. Fast turnaround and professional editing.",
          experience_level: "Intermediate",
          profile_image_url: "",
          referral_code: "AKASH03",
          referred_by: "",
          phone_number: "9876543212",
        },
      ];
      return NextResponse.json(
        { photographers: samplePhotographers },
        { status: 200 },
      );
    }

    // Fetch photographers from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Photographers!A:Z",
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      return NextResponse.json({ photographers: [] }, { status: 200 });
    }

    // First row is headers
    const headers = rows[0].map((h) => h.toLowerCase().trim());

    // Map rows to objects
    const photographers: Photographer[] = rows.slice(1).map((row, index) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = row[i] || "";
      });
      return {
        id: String(index + 1),
        name: obj.name || "",
        email: obj.email || "",
        city: obj.city || "",
        photography_type: obj.photography_type || "",
        instagram: obj.instagram || "",
        portfolio_link: obj.portfolio_link || "",
        bio: obj.bio || "",
        experience_level: obj.experience_level || "",
        profile_image_url: obj.profile_image_url || "",
        referral_code: obj.referral_code || "",
        referred_by: obj.referred_by || "",
        availability: obj.availability,
        price_per_hour: obj.price_per_hour,
        preferred_shoot_type: obj.preferred_shoot_type,
        reel_creator: obj.reel_creator,
        phone_number: obj.phone_number || "",
      };
    });

    return NextResponse.json({ photographers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching photographers:", error);
    return NextResponse.json(
      { error: "Failed to fetch photographers" },
      { status: 500 },
    );
  }
}
