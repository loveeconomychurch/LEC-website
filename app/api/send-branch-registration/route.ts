import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const registrationSchema = z.object({
  branchName: z.string().trim().min(2).max(120).refine((value) => !/[\r\n]/.test(value)),
  contact: z.string().trim().max(120).optional().default(""),
  services: z.string().trim().max(2_000).optional().default(""),
  lat: z.number().finite().min(-90).max(90),
  lng: z.number().finite().min(-180).max(180),
  website: z.string().max(200).optional().default(""),
})

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const requestsByIp = new Map<string, { count: number; resetAt: number }>()

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character)
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown"
}

function isRateLimited(ip: string) {
  const now = Date.now()
  if (requestsByIp.size > 10_000) {
    for (const [key, value] of requestsByIp) {
      if (value.resetAt <= now) requestsByIp.delete(key)
    }
    if (requestsByIp.size > 10_000) requestsByIp.clear()
  }
  const current = requestsByIp.get(ip)
  if (!current || current.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > RATE_LIMIT
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0)
    if (contentLength > 10_000) {
      return NextResponse.json({ error: "Request is too large" }, { status: 413 })
    }

    if (isRateLimited(clientIp(request))) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429, headers: { "Retry-After": "3600" } }
      )
    }

    const parsed = registrationSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration details" }, { status: 400 })
    }

    // Bots commonly fill hidden fields. Return a normal success response so
    // they cannot tune around the honeypot.
    if (parsed.data.website) {
      return NextResponse.json({ success: true })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }
    const resend = new Resend(apiKey)
    const { branchName, contact, services, lat, lng } = parsed.data

    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`
    const servicesHtml = services
      ? escapeHtml(services).replace(/\n/g, "<br>")
      : "Not provided"

    const data = await resend.emails.send({
      from: "Love Economy Church <onboarding@resend.dev>", // using resend's testing domain
      to: ["ohenegyanfamily@gmail.com"],
      subject: `New Branch Registration: ${branchName}`,
      html: `
        <h2>New Branch Registration</h2>
        <p><strong>Branch Name:</strong> ${escapeHtml(branchName)}</p>
        <p><strong>Contact:</strong> ${contact ? escapeHtml(contact) : "Not provided"}</p>
        <p><strong>Services:</strong><br>${servicesHtml}</p>
        <p><strong>Location Coordinates:</strong> ${lat}, ${lng}</p>
        <p>
          <a href="${mapsUrl}" target="_blank" style="display:inline-block;padding:10px 20px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:5px;">
            View Location on Google Maps
          </a>
        </p>
      `,
    })

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
