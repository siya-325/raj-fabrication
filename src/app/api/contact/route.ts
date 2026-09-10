import { NextResponse } from 'next/server'
import {
  validateName,
  validatePhone,
  validateEmail,
  validateLocation,
  validateService,
  validateMessage,
} from '@/lib/validation'
import { sendLeadNotificationEmail, type LeadSubmission } from '@/lib/services/brevo'
import { appendLeadToGoogleSheets } from '@/lib/services/sheets'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // 1. Anti-spam Honeypot Check
    // If the hidden honeypot field is filled, it is an automated bot submission.
    // Return 200 immediately to deceive the bot without executing downstream services.
    if (body.website_honey && typeof body.website_honey === 'string' && body.website_honey.trim() !== '') {
      console.warn('[Contact API] Spam submission intercepted via honeypot field.')
      return NextResponse.json({ success: true, message: 'Inquiry received' })
    }

    // 2. Extract and Sanitize Fields
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const location = typeof body.location === 'string' ? body.location.trim() : ''
    const service = typeof body.service === 'string' ? body.service.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    // 3. Server-side Validation
    const errors: Record<string, string> = {}

    const nameError = validateName(name)
    if (nameError) errors.name = nameError

    const phoneError = validatePhone(phone)
    if (phoneError) errors.phone = phoneError

    const emailError = validateEmail(email)
    if (emailError) errors.email = emailError

    const locationError = validateLocation(location)
    if (locationError) errors.location = locationError

    const serviceError = validateService(service)
    if (serviceError) errors.service = serviceError

    const messageError = validateMessage(message)
    if (messageError) errors.message = messageError

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please verify the submitted information.',
          errors,
        },
        { status: 400 }
      )
    }

    const lead: LeadSubmission = {
      name,
      phone,
      email,
      location: location || undefined,
      service,
      message: message || undefined,
      submittedAt: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium',
      }),
    }

    // 4. Parallel Dispatch with Fault Tolerance
    // Use Promise.allSettled so that a slowdown or failure in one service does not crash the other
    const [brevoResult, sheetsResult] = await Promise.allSettled([
      sendLeadNotificationEmail(lead),
      appendLeadToGoogleSheets(lead),
    ])

    const isEmailSent =
      brevoResult.status === 'fulfilled' && brevoResult.value.success
    const isSheetAppended =
      sheetsResult.status === 'fulfilled' && sheetsResult.value.success

    // Log diagnostic information on server console
    if (brevoResult.status === 'rejected') {
      console.error('[Contact API] Brevo promise rejected:', brevoResult.reason)
    } else if (!brevoResult.value.success) {
      console.warn('[Contact API] Brevo warning:', brevoResult.value.error)
    }

    if (sheetsResult.status === 'rejected') {
      console.error('[Contact API] Google Sheets promise rejected:', sheetsResult.reason)
    } else if (!sheetsResult.value.success) {
      console.warn('[Contact API] Google Sheets warning:', sheetsResult.value.error)
    }

    // 5. Successful Response
    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      meta: {
        emailDispatched: isEmailSent,
        sheetRecorded: isSheetAppended,
      },
    })
  } catch (error: any) {
    console.error('[Contact API] Unexpected handler error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your inquiry. Please try calling directly.',
      },
      { status: 500 }
    )
  }
}
