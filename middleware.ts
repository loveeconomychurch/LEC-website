import { NextResponse, type NextRequest } from "next/server"

const GONE_PATHS = [
  /^\/(?:\.env(?:\..*)?|wp-login\.php|xmlrpc\.php)$/i,
  /\.php(?:\/|$)/i,
  /^\/(?:cgi-bin|vendor\/phpunit|\.git)(?:\/|$)/i,
]

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (GONE_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=86400",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex",
      },
    })
  }

  if (/^\/feed\/?$/i.test(pathname) || /^\/wp-content(?:\/|$)/i.test(pathname)) {
    return NextResponse.redirect(new URL("/", request.url), 301)
  }

  if (/^\/category(?:\/|$)/i.test(pathname)) {
    return NextResponse.redirect(new URL("/events/", request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
