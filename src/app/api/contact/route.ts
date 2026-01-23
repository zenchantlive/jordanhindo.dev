import { Resend } from 'resend';
import { NextResponse } from 'next/server';

/**
 * Contact form submission request body type
 */
interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

/**
 * POST /api/contact
 * Handles contact form submissions by sending an email via Resend
 */
export async function POST(request: Request) {
    try {
        // Parse the incoming JSON body
        const body = await request.json() as ContactFormData;
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, and message are required' },
                { status: 400 }
            );
        }

        // Initialize Resend lazily to avoid build-time errors when API key is missing
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send the email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <contact@jordanhindo.dev>', // Verified custom domain
            to: 'jordanlive121@gmail.com', // Your email address
            replyTo: email, // Allow replying directly to the sender
            subject: `[jordanhindo.dev] New message from ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #9333ea;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: 1px solid #e5e5e5; margin: 20px 0;" />
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        // Handle Resend API errors
        if (error) {
            console.error('Resend API error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // Return success response with the email ID
        return NextResponse.json(
            { success: true, id: data?.id },
            { status: 200 }
        );
    } catch (error) {
        // Handle unexpected errors
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
