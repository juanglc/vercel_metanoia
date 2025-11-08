/**
 * Contact Form API Endpoint
 * Handles form submission and sends email via Resend
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  eventDate?: string;
  message: string;
}

function validateFormData(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required (minimum 2 characters)');
  }

  // Email validation
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email is required');
  }

  // Phone validation (optional but if provided, must be valid)
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  // Subject validation
  if (!data.subject) {
    errors.push('Subject is required');
  }

  // Message validation
  if (!data.message || data.message.trim().length < 20) {
    errors.push('Message is required (minimum 20 characters)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function generateEmailHTML(data: ContactFormData): string {
  const subjectLabels: Record<string, string> = {
    booking: 'Booking Inquiry',
    collaboration: 'Collaboration Opportunity',
    press: 'Press & Media',
    general: 'General Question',
    other: 'Other',
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%);
          color: white;
          padding: 30px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #ddd;
          border-top: none;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #8B4513;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          background: white;
          padding: 12px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .message-box {
          background: white;
          padding: 15px;
          border-radius: 4px;
          border-left: 4px solid #8B4513;
          white-space: pre-wrap;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
        .badge {
          display: inline-block;
          background: #D4AF37;
          color: #1A1A1A;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎻 New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Cuarteto Metanoia</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="field-label">Subject</div>
          <div class="field-value">
            <span class="badge">${subjectLabels[data.subject] || data.subject}</span>
          </div>
        </div>

        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${data.name}</div>
        </div>

        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value">
            <a href="mailto:${data.email}" style="color: #8B4513; text-decoration: none;">
              ${data.email}
            </a>
          </div>
        </div>

        ${data.phone ? `
        <div class="field">
          <div class="field-label">Phone</div>
          <div class="field-value">
            <a href="tel:${data.phone}" style="color: #8B4513; text-decoration: none;">
              ${data.phone}
            </a>
          </div>
        </div>
        ` : ''}

        ${data.eventDate ? `
        <div class="field">
          <div class="field-label">Event Date</div>
          <div class="field-value">${new Date(data.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        ` : ''}

        <div class="field">
          <div class="field-label">Message</div>
          <div class="message-box">${data.message}</div>
        </div>

        <div class="footer">
          <p>This message was sent via the contact form at <strong>cuartetometanoia.com</strong></p>
          <p style="margin-top: 10px; color: #999;">
            Received on ${new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: ContactFormData = await request.json();

    // Validate form data
    const validation = validateFormData(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.errors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'Cuarteto Metanoia <onboarding@resend.dev>',
      to: ['juanguiloco3@gmail.com'], // Replace with your actual email
      replyTo: data.email,
      subject: `[Website Contact] ${data.subject} - ${data.name}`,
      html: generateEmailHTML(data),
    });

    // Check if email was sent successfully
    if (result.error) {
      console.error('Resend API error:', result.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send email. Please try again.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('Email sent successfully:', result.data);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
