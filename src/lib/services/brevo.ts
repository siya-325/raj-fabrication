export interface LeadSubmission {
  name: string
  phone: string
  email: string
  location?: string
  service: string
  message?: string
  submittedAt?: string
}

interface BrevoSendResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Sends lead inquiry notification email via Brevo v3 Transactional Email REST API
 */
export async function sendLeadNotificationEmail(lead: LeadSubmission): Promise<BrevoSendResult> {
  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.SENDER_EMAIL
  const recipientEmail = process.env.RECIPIENT_EMAIL

  if (!apiKey || !senderEmail || !recipientEmail) {
    console.warn('[Brevo] Missing environment variables. Skipping email dispatch.')
    return {
      success: false,
      error: 'Brevo email configuration missing in environment variables (BREVO_API_KEY, SENDER_EMAIL, or RECIPIENT_EMAIL).',
    }
  }

  // Format clean Indian phone number for WhatsApp
  const rawDigits = lead.phone.replace(/\D/g, '')
  const whatsappDigits = rawDigits.startsWith('91') && rawDigits.length === 12
    ? rawDigits
    : rawDigits.length === 10
      ? `91${rawDigits}`
      : rawDigits

  const submissionDate = lead.submittedAt || new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Inquiry - Raj Fabrication</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f5; margin: 0; padding: 24px; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .header { background: #18181b; padding: 28px 24px; text-align: center; border-bottom: 3px solid #c85a17; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background-color: #fff7ed; color: #c85a17; border: 1px solid #ffedd5; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px; }
    .table-container { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table-container tr { border-bottom: 1px solid #f3f4f6; }
    .table-container td { padding: 12px 6px; font-size: 14px; vertical-align: top; }
    .label { color: #6b7280; font-weight: 500; width: 34%; }
    .value { color: #111827; font-weight: 600; }
    .message-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
    .actions { margin-top: 28px; text-align: center; }
    .btn { display: inline-block; background-color: #c85a17; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-right: 8px; margin-bottom: 8px; }
    .btn-wa { display: inline-block; background-color: #25d366; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-bottom: 8px; }
    .footer { background: #fafafa; border-top: 1px solid #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Raj Fabrication</h1>
      <p>New Website Customer Inquiry</p>
    </div>

    <div class="content">
      <div class="badge">Immediate Follow-up Required</div>
      <p style="margin: 0 0 16px 0; font-size: 15px; color: #374151;">
        A potential client has requested an estimate or fabrication service via your website:
      </p>

      <table class="table-container">
        <tr>
          <td class="label">Customer Name</td>
          <td class="value">${escapeHtml(lead.name)}</td>
        </tr>
        <tr>
          <td class="label">Phone / Mobile</td>
          <td class="value">
            <a href="tel:${escapeHtml(lead.phone)}" style="color: #c85a17; text-decoration: none;">
              ${escapeHtml(lead.phone)}
            </a>
          </td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value">
            <a href="mailto:${escapeHtml(lead.email)}" style="color: #2563eb; text-decoration: none;">
              ${escapeHtml(lead.email)}
            </a>
          </td>
        </tr>
        <tr>
          <td class="label">Service Required</td>
          <td class="value" style="color: #c85a17;">${escapeHtml(lead.service)}</td>
        </tr>
        <tr>
          <td class="label">Project Location</td>
          <td class="value">${lead.location ? escapeHtml(lead.location) : '<span style="color:#9ca3af;font-weight:normal;">Not specified</span>'}</td>
        </tr>
        <tr>
          <td class="label">Received On</td>
          <td class="value" style="font-weight: 400; color: #4b5563;">${escapeHtml(submissionDate)}</td>
        </tr>
      </table>

      ${
        lead.message
          ? `
          <div style="margin-top: 20px;">
            <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280;">Requirement Details & Dimensions:</strong>
            <div class="message-box">${escapeHtml(lead.message)}</div>
          </div>
          `
          : ''
      }

      <div class="actions">
        <a href="tel:${escapeHtml(lead.phone)}" class="btn">
          📞 Call Customer
        </a>
        <a href="https://wa.me/${escapeHtml(whatsappDigits)}?text=Hello%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20contacting%20Raj%20Fabrication%20regarding%20${encodeURIComponent(lead.service)}." class="btn-wa" target="_blank">
          💬 Open WhatsApp
        </a>
      </div>
    </div>

    <div class="footer">
      This notification was automatically sent from the Raj Fabrication contact form.
      <br>Reply to this email directly to answer the customer.
    </div>
  </div>
</body>
</html>
  `.trim()

  const payload = {
    sender: {
      name: 'Raj Fabrication Lead Alert',
      email: senderEmail,
    },
    to: [
      {
        email: recipientEmail,
        name: 'Raj Fabrication Team',
      },
    ],
    replyTo: {
      email: lead.email,
      name: lead.name,
    },
    subject: `🔔 New Lead: ${lead.name} (${lead.service})`,
    htmlContent,
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('[Brevo] API Error Response:', data)
      return {
        success: false,
        error: data.message || `Brevo responded with status ${response.status}`,
      }
    }

    return {
      success: true,
      messageId: data.messageId,
    }
  } catch (err: any) {
    console.error('[Brevo] Network or dispatch exception:', err)
    return {
      success: false,
      error: err.message || 'Failed to communicate with Brevo API',
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
