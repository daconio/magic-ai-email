import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const body = await request.json();
    const { recipients, subject, content } = body;

    console.log(`[Mock Email Service] Sending to ${recipients.length} recipients`);
    console.log(`[Mock Email Service] Subject: ${subject}`);

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you would configure the transporter here
    // const transporter = nodemailer.createTransport({ ... });

    // Mock success
    return NextResponse.json({
        success: true,
        message: `Successfully sent to ${recipients.length} contacts.`
    });
}
