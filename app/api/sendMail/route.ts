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
        
        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or any other email service
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_EMAIL_PASSWORD,
            },
        });

        const currentYear = new Date().getFullYear();
        
        const text = `
=================================================
           🔐 AUTHENTICATION PIN
=================================================

Hello ${name},

You requested a secure login to your account.
Please use the following PIN to complete your authentication:

${pin}

SECURITY NOTICE:
Never share this PIN with anyone, including Voting App staff.
This PIN expires in 10 minutes.

--------------------------------------------------
Best regards,
Voting App Team

© ${currentYear} Voting App. All rights reserved.
`;

        const html = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <div style="text-align: center; margin-bottom: 20px;">
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
            <h2 style="color: #333; margin: 0; font-size: 22px;">
                <span style="display: inline-block; background-color: #4285f4; color: white; width: 30px; height: 30px; line-height: 30px; border-radius: 50%; margin-right: 8px;">🔐</span>
                Authentication PIN
            </h2>
        </div>
    </div>
    
    <div style="padding: 0 15px;">
        <p style="color: #555; font-size: 16px;">Hello <strong>${name}</strong>,</p>
        
        <p style="color: #555; font-size: 16px;">You requested a secure login to your account. Please use the following PIN to complete your authentication:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0; border-left: 4px solid #4285f4;">
            <p style="font-size: 28px; letter-spacing: 4px; margin: 0; font-weight: bold; color: #333;">${pin}</p>
        </div>
        
        <div style="background-color: #fef6f6; padding: 12px; border-radius: 6px; border-left: 4px solid #ea4335; margin-bottom: 20px;">
            <p style="color: #ea4335; margin: 0; display: flex; align-items: center; font-size: 14px;">
                <span style="margin-right: 8px; font-size: 20px;">⚠️</span>
                <span><strong>Security Notice:</strong> Never share this PIN with anyone, including Voting App staff. This PIN expires in 10 minutes.</span>
            </p>
        </div>
        
        <p style="color: #555; font-size: 14px;">If you didn't request this PIN, please secure your account by changing your password immediately.</p>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #757575; font-size: 14px;">
        <p style="margin: 5px 0;">Best regards,</p>
        <p style="margin: 5px 0; font-weight: bold;">Voting App Team</p>
        <div style="margin-top: 15px; font-size: 12px;">
            <p>© ${currentYear} Voting App. All rights reserved.</p>
        </div>
    </div>
</div>`;

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject: "Your Authentication PIN",
            text,
            html
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Mail sent successfully" }, { status: 200 });
    }
    catch (err) {
        console.error("Email sending error:", err);
        return NextResponse.json({ message: "Error sending mail" }, { status: 500 });
    }
}