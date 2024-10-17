import { NextResponse } from 'next/server'
import { getToken } from './services/commercelayer'

export async function middleware(request) {
  let response = NextResponse.next()

  const existingEcommerceToken = request.cookies.get('ecommerce-token')

  if (!existingEcommerceToken) {
    const { token, expires } = await getToken()
    response.cookies.set('ecommerce-token', token, { expires })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
