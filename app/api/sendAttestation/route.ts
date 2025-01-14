import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import {
    EAS,
    NO_EXPIRATION,
    SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email, name, yearOfPassing, recipient_wallet_id } = await req.json();
        if (!email) {
            return NextResponse.json({ message: "Missing email" }, { status: 400 });
        }
        if (!name) {
            return NextResponse.json({ message: "Missing name" }, { status: 400 });
        }
        if (!yearOfPassing) {
            return NextResponse.json({ message: "Missing year of passing" }, { status: 400 });
        }
        if (!recipient_wallet_id) {
            return NextResponse.json({ message: "Missing wallet id" }, { status: 400 });
        }
        const rpcUrl = "https://polygon-amoy-bor-rpc.publicnode.com";
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) return
        const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);

        const easContractAddress = "0xb101275a60d8bfb14529C421899aD7CA1Ae5B5Fc";
        const eas = new EAS(easContractAddress);
        eas.connect(signer);

        console.log("Signer address:", signer.address);

        const offchain = await eas.getOffchain();

        const schemaEncoder = new SchemaEncoder(
            "string studentName,uint16 yearOfPassing"
        );
        const encodedData = schemaEncoder.encodeData([
            { name: "studentName", value: name, type: "string" },
            { name: "yearOfPassing", value: yearOfPassing, type: "uint16" },
        ]);

        const offchainAttestation = await offchain.signOffchainAttestation({
            recipient: recipient_wallet_id,
            expirationTime: NO_EXPIRATION,
            time: Math.floor(Date.now() / 1000), // Current time
            revocable: true,
            version: 1,
            nonce: 0,
            schema: "0x6fbabf02fa268b7b48f5febef2398a2635193efa753c47ecbd33cb9ee58b9922",
            refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
            data: encodedData,
        }, signer);
        const attestation = JSON.stringify(offchainAttestation, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, 2)
        // fs.writeFile('user.json', attestation, err => {
        //     if (err) {
        //         throw err
        //     }
        // })
        const transaction = await eas.timestamp(offchainAttestation.uid);
        await transaction.wait()
        console.log(attestation)
        console.log("New attestation UID:", offchainAttestation);
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Or any other email service
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL, // generated ethereal user
                pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD, // Use an app password for Gmail
            },
        });

        const text = "Dear " + name + ",\n I trust this message finds you well.\nPlease find attached the attesttion file in JSON format for your review.Kindly examine the document at your earliest convenience, and do not hesitate to inform me if any adjustments or additional details are required.\nShould you have any questions or experience any difficulties with the file, I remain at your disposal for assistance.\nThank you for your attention to this matter.I look forward to your feedback.\nYours sincerely, \n XYZ"
        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending a new attestation",
            text,
            attachments: [
                {
                    filename: 'attestation.json', // Name of the file
                    content: JSON.stringify(JSON.parse(attestation), null, 2), // JSON content formatted as a string
                    contentType: 'application/json', // MIME type
                },
            ],
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Mail sent successfully" }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: "Error sending mail" }, { status: 500 });
    }
}