import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Resend } from "resend";
import { google, sheets_v4 } from "googleapis";

interface FormData {
  type: string;
  fullName: string;
  email: string;
  typeOfShoot?: string;
  budgetRange?: string;
  phoneNumber: string;
  experienceLevel?: string;
  portfolioLink?: string;
  interestedInPaidGigs?: string;
  availability?: string;
  pricePerHour?: string;
  preferredShootType?: string;
  reelCreator?: string;
  timestamp: string;
}

// Path to store form submissions (backup)
const dataFilePath = path.join(process.cwd(), "submissions.json");

// Initialize Resend - Get your API key from https://resend.com
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Your email address to receive notifications
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "your-email@example.com";

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

// Append row to Google Sheets
async function appendToSheet(sheets: sheets_v4.Sheets, submission: FormData) {
  if (!SPREADSHEET_ID) {
    console.log("Google Sheets spreadsheet ID not configured");
    return false;
  }

  try {
    const isStudent = submission.type === "student";

    // Prepare row data based on form type
    // For Photographers: Timestamp, Name, Email, Instagram Handle / Portfolio Link, Availability, Price_per_hour, Preferred_shoot_type, Reel_creator
    // For Clients: Name, Email, Type of Shoot, Budget Range, Phone Number
    const row = isStudent
      ? [
          submission.timestamp,
          submission.fullName,
          submission.email,
          submission.typeOfShoot || "",
          submission.budgetRange || "",
          submission.phoneNumber,
        ]
      : [
          submission.timestamp,
          submission.fullName,
          submission.email,
          submission.portfolioLink || "",
          submission.availability || "",
          submission.pricePerHour || "",
          submission.preferredShootType || "",
          submission.reelCreator || "",
        ];

    // Determine range based on form type
    const sheetName = isStudent ? "Clients" : "Photographers";
    const range = `${sheetName}!A:A`;

    // Check if we need to add header row first
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1:Z1`,
    });

    const hasData =
      getResponse.data.values && getResponse.data.values.length > 0;

    // Add header if sheet is empty
    if (!hasData) {
      const headers = isStudent
        ? [
            "Timestamp",
            "Name",
            "Email",
            "Type of Shoot",
            "Budget Range",
            "Phone Number",
          ]
        : [
            "Timestamp",
            "Name",
            "Email",
            "Instagram Handle / Portfolio Link",
            "Availability",
            "Price_per_hour",
            "Preferred_shoot_type",
            "Reel_creator",
          ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1:Z1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    console.log("Data added to Google Sheets successfully");
    return true;
  } catch (error) {
    console.error("Error adding to Google Sheets:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    // Add timestamp
    const submission = {
      ...body,
      timestamp: new Date().toISOString(),
    };

    // Log to console
    console.log("Form Submission:", submission);

    // Read existing data or initialize empty array (backup)
    let existingData: FormData[] = [];
    try {
      if (fs.existsSync(dataFilePath)) {
        const fileContent = fs.readFileSync(dataFilePath, "utf-8");
        existingData = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }

    // Add new submission
    existingData.push(submission);

    // Write to file (backup)
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
    } catch (error) {
      console.error("Error writing file:", error);
    }

    // Try to add to Google Sheets
    const sheets = getSheets();
    if (sheets) {
      const sheetsSuccess = await appendToSheet(sheets, submission);
      if (sheetsSuccess) {
        console.log("✅ Data saved to Google Sheets");
      }
    } else {
      console.log("Google Sheets not configured. To enable:");
      console.log(
        "1. Create a Google Cloud project at https://console.cloud.google.com",
      );
      console.log("2. Enable Google Sheets API");
      console.log("3. Create a service account and download JSON credentials");
      console.log("4. Share your spreadsheet with the service account email");
      console.log("5. Add these to .env.local:");
      console.log("   GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id");
      console.log(
        "   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com",
      );
      console.log('   GOOGLE_PRIVATE_KEY="your_private_key"');
    }

    // Send email notification if Resend is configured
    if (resend) {
      try {
        const isStudent = body.type === "student";
        const subject = isStudent
          ? `📸 New Client Request - ${body.fullName}`
          : `📷 New Photographer Signup - ${body.fullName}`;

        const htmlContent = isStudent
          ? `
            <h2>New Client Request</h2>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Type of Shoot:</strong> ${body.typeOfShoot}</p>
            <p><strong>Budget:</strong> ${body.budgetRange}</p>
            <p><strong>Phone:</strong> ${body.phoneNumber}</p>
            <p><strong>Submitted:</strong> ${submission.timestamp}</p>
          `
          : `
            <h2>New Photographer Signup</h2>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Portfolio:</strong> ${body.portfolioLink}</p>
            <p><strong>Availability:</strong> ${body.availability || "Not specified"}</p>
            <p><strong>Price per Hour:</strong> ${body.pricePerHour || "Not specified"}</p>
            <p><strong>Preferred Shoot Type:</strong> ${body.preferredShootType || "Not specified"}</p>
            <p><strong>Reel Creator:</strong> ${body.reelCreator || "Not specified"}</p>
            <p><strong>Submitted:</strong> ${submission.timestamp}</p>
          `;

        await resend.emails.send({
          from: "Camrova <onboarding@resend.dev>",
          to: NOTIFICATION_EMAIL,
          subject: subject,
          html: htmlContent,
        });

        console.log("Email notification sent successfully");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { success: false, message: "Error submitting form" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message:
        "Camrova API is running. Configure GOOGLE_SHEETS_* for Google Sheets integration.",
    },
    { status: 200 },
  );
}
