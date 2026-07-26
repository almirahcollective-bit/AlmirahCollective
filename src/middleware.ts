import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Protect admin UI and API routes
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
    // Exclude the login API and login page from this check
    if (
      req.nextUrl.pathname === '/admin/login' ||
      req.nextUrl.pathname === '/api/admin/login'
    ) {
      return res
    }

    const adminToken = req.cookies.get('admin_token')?.value
    if (adminToken !== 'authorized') {
      if (req.nextUrl.pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // Maintenance Mode Intercept - Block all non-admin routes
  if (!req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/api/admin')) {
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Site Under Maintenance</title>
          <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #0a0a0a; color: #fafafa; text-align: center; margin: 0; }
            h1 { font-weight: 300; letter-spacing: 0.2em; text-transform: uppercase; font-size: 24px; }
            p { color: #888; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div>
            <h1>Almirah Collective</h1>
            <p>Site Under Maintenance. We'll be back shortly.</p>
          </div>
        </body>
      </html>
    `, {
      status: 503,
      headers: { 'content-type': 'text/html' }
    });
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
