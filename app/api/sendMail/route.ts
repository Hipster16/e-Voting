import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { pin, name, email } = await req.json();
        if (!pin) {
            return NextResponse.json({ message: "Missing authentication pin" }, { status: 400 });
        }
        else if (!name) {
            return NextResponse.json({ message: "Missing name" }, { status: 400 });
        }
        else if (!email) {
            return NextResponse.json({ message: "Missing email" }, { status: 400 });
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or any other email service
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL, // generated ethereal user
                pass: process.env.NEXT_EMAIL_PASSWORD, // Use an app password for Gmail
            },
        });

        // Email content
        const text = `
=============================
      🔐 AUTHENTICATION PIN      
=============================

Dear **${name}**,

Your secure authentication PIN is: **${pin}**

Use this PIN to complete your verification.

⚠️ Do not share this PIN with anyone.

Best regards,  
**Voting App**
`;
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject: "Your Authentication PIN",
            text,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Mail sent successfully" }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Error sending mail" }, { status: 500 });
    }
}