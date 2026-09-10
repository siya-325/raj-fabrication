import type { LeadSubmission } from './brevo'

interface SheetsAppendResult {
  success: boolean
  error?: string
}

/**
 * Appends lead inquiry row into Google Sheets via Google Apps Script Webhook
 */
export async function appendLeadToGoogleSheets(lead: LeadSubmission): Promise<SheetsAppendResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('[Google Sheets] Missing GOOGLE_SHEETS_WEBHOOK_URL. Skipping sheet append.')
    return {
      success: false,
      error: 'Google Sheets webhook URL is not configured in GOOGLE_SHEETS_WEBHOOK_URL.',
    }
  }

  const timestampIST = lead.submittedAt || new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  })

  // Format data payload matching sheet columns
  const payload = {
    timestamp: timestampIST,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    location: lead.location || 'Not specified',
    service: lead.service,
    message: lead.message || 'No additional notes',
    status: 'New Inquiry',
  }

  try {
    // Note: Google Apps Script Web Apps often issue 302 redirects to script.googleusercontent.com
    // Using text/plain;charset=utf-8 bypasses Google proxy inspection delay while delivering exact JSON to doPost(e)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      // Allow up to 15s for Google Apps Script cold start execution
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok && response.status !== 302 && response.status !== 200) {
      const errorText = await response.text().catch(() => '')
      console.error('[Google Sheets] Webhook responded with status:', response.status, errorText)
      return {
        success: false,
        error: `Google Sheets webhook returned status ${response.status}`,
      }
    }

    return {
      success: true,
    }
  } catch (err: any) {
    console.error('[Google Sheets] Webhook error:', err)
    return {
      success: false,
      error: err.message || 'Failed to append row to Google Sheets webhook',
    }
  }
}
