import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const { branchName, contact, services, lat, lng } = await request.json()

    if (!branchName || lat === undefined || lng === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`
    const servicesHtml = (services as string | undefined)?.trim()
      ? (services as string).trim().replace(/\n/g, "<br>")
      : "Not provided"

    const data = await resend.emails.send({
      from: "Love Economy Church <onboarding@resend.dev>", // using resend's testing domain
      to: ["ohenegyanfamily@gmail.com"],
      subject: `New Branch Registration: ${branchName}`,
      html: `
        <h2>New Branch Registration</h2>
        <p><strong>Branch Name:</strong> ${branchName}</p>
        <p><strong>Contact:</strong> ${contact?.trim() || "Not provided"}</p>
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

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
