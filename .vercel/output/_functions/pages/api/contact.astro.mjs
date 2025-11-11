export { renderers } from '../../renderers.mjs';

const prerender = false;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
function validateFormData(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required (minimum 2 characters)");
  }
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Valid email is required");
  }
  if (data.phone && data.phone.trim().length > 0 && !phoneRegex.test(data.phone)) {
    errors.push("Invalid phone number format");
  }
  if (!data.subject || data.subject.trim().length === 0) {
    errors.push("Subject is required");
  }
  if (!data.message || data.message.trim().length < 20) {
    errors.push("Message is required (minimum 20 characters)");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
function generateEmailHTML(data) {
  const subjectLabels = {
    booking: "Contratación",
    collaboration: "Colaboración",
    press: "Prensa y Medios",
    general: "Consulta General",
    other: "Otro"
  };
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Consulta - Cuarteto Metanoia</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #fafafa;">
      
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #fafafa;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
              <tr>
                <td style="background: #ffffff; border-radius: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); overflow: hidden;">
                  
                  <!-- Header with Logo -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="background: linear-gradient(135deg, #8c541f 0%, #6D3410 100%); padding: 48px 40px; text-align: center;">
                        <img src="https://pub-0be16fcc10ef45d98540e0495dcdb86e.r2.dev/logos/Metanoia-10-BLANCO.png" alt="Cuarteto Metanoia" style="display: block; margin: 0 auto 20px; max-width: 220px; height: auto;" />
                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; font-family: 'Playfair Display', Georgia, serif;">Nueva Consulta</h1>
                      </td>
                    </tr>
                  </table>

                  <!-- Subject Badge -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 32px 0 0 0; text-align: center;">
                        <span style="display: inline-block; background: #ffffff; color: #8c541f; padding: 8px 20px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15); border: 1px solid rgba(139, 69, 19, 0.1); font-family: 'Playfair Display', Georgia, serif;">
                          ${subjectLabels[data.subject] || data.subject}
                        </span>
                      </td>
                    </tr>
                  </table>

                  <!-- Content Section -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 32px 40px 40px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          
                          <!-- Name Field -->
                          <tr>
                            <td style="padding: 0 0 20px 0;">
                              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif;">Nombre</p>
                              <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-family: 'Inter', sans-serif;">${data.name}</p>
                            </td>
                          </tr>

                          <tr><td style="padding: 0 0 20px 0;"><div style="height: 1px; background: #e8e8e8;"></div></td></tr>

                          <!-- Email Field -->
                          <tr>
                            <td style="padding: 0 0 20px 0;">
                              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif;">Email</p>
                              <p style="margin: 0;"><a href="mailto:${data.email}" style="font-size: 16px; color: #8c541f; text-decoration: none; font-family: 'Inter', sans-serif;">${data.email}</a></p>
                            </td>
                          </tr>

                          ${data.phone ? `
                          <tr><td style="padding: 0 0 20px 0;"><div style="height: 1px; background: #e8e8e8;"></div></td></tr>
                          <tr>
                            <td style="padding: 0 0 20px 0;">
                              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif;">Teléfono</p>
                              <p style="margin: 0;"><a href="tel:${data.phone}" style="font-size: 16px; color: #8c541f; text-decoration: none; font-family: 'Inter', sans-serif;">${data.phone}</a></p>
                            </td>
                          </tr>
                          ` : ""}

                          ${data.eventDate ? `
                          <tr><td style="padding: 0 0 20px 0;"><div style="height: 1px; background: #e8e8e8;"></div></td></tr>
                          <tr>
                            <td style="padding: 0 0 20px 0;">
                              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif;">Fecha Evento</p>
                              <p style="margin: 0; font-size: 16px; color: #1a1a1a; font-family: 'Inter', sans-serif;">${new Date(data.eventDate).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
                            </td>
                          </tr>
                          ` : ""}

                          <tr><td style="padding: 0 0 20px 0;"><div style="height: 1px; background: #e8e8e8;"></div></td></tr>

                          <!-- Message Field -->
                          <tr>
                            <td style="padding: 0;">
                              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif;">Mensaje</p>
                              <p style="margin: 0; font-size: 16px; color: #1a1a1a; line-height: 1.6; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${data.message}</p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Footer -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="background: #fafafa; padding: 28px 40px; text-align: center; border-top: 1px solid #e8e8e8;">
                        <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; font-family: 'Inter', sans-serif;">
                          <strong style="color: #8c541f;">cuartetometanoia.com</strong>
                        </p>
                        <p style="margin: 0; font-size: 11px; color: #999; font-family: 'Inter', sans-serif;">
                          Recibido el ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
}
const POST = async ({ request }) => {
  try {
    console.log("=== Contact API Called ===");
    console.log("Timestamp:", (/* @__PURE__ */ new Date()).toISOString());
    let data;
    try {
      const rawBody = await request.text();
      console.log("Raw body length:", rawBody.length);
      console.log("Raw body preview:", rawBody.substring(0, 200));
      data = JSON.parse(rawBody);
      console.log("✅ JSON parsed successfully");
      console.log("Data received:", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        hasPhone: !!data.phone,
        hasEventDate: !!data.eventDate,
        messageLength: data.message?.length || 0
      });
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid JSON data received"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const validation = validateFormData(data);
    if (!validation.valid) {
      console.log("❌ Validation failed:", validation.errors);
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.errors
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("✅ Validation passed");
    const apiKey = "re_H1dqu3tu_6yDWJdDPCMeBcCf289tX13Ku";
    console.log("API Key configured:", apiKey ? `${apiKey.substring(0, 10)}...` : "❌ NOT CONFIGURED");
    if (!apiKey) ;
    console.log("Importing Resend module...");
    let Resend;
    try {
      const resendModule = await import('resend');
      Resend = resendModule.Resend;
      console.log("✅ Resend module loaded successfully");
    } catch (importError) {
      console.error("❌ Failed to import Resend:", importError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service unavailable. Please try again later."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const resend = new Resend(apiKey);
    const subjectLabels = {
      booking: "Contratación",
      collaboration: "Colaboración",
      press: "Prensa y Medios",
      general: "Consulta General",
      other: "Otro"
    };
    console.log("Sending email to: juanguiloco3@gmail.com");
    const result = await resend.emails.send({
      from: "Cuarteto Metanoia <onboarding@resend.dev>",
      to: ["juanguiloco3@gmail.com"],
      replyTo: data.email,
      subject: `${subjectLabels[data.subject] || data.subject} - ${data.name}`,
      html: generateEmailHTML(data)
    });
    console.log("Resend API response:", result);
    if (result.error) {
      console.error("❌ Resend API error:", result.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Email service error: ${result.error.message || "Unknown error"}`
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("✅ Email sent successfully!");
    console.log("Email ID:", result.data?.id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("=== UNEXPECTED ERROR ===");
    console.error("Error:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
