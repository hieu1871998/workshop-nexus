import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const headers = { 'accept-language': 'en,vi;q=0.5' }
const languages = new Negotiator({ headers }).languages()
const locales = ['en', 'vi']
const defaultLocale = 'en'

match(languages, locales, defaultLocale)

const getLocale = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const isVi = pathname.includes('vi-VN')

  if (isVi) {
    return 'vi'
  } else {
    return defaultLocale
  }
}

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    '/',
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
