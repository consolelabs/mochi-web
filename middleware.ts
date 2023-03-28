import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/:path*'],
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (
    !process.env.NEXT_PUBLIC_BETA_PAGE ||
    process.env.NODE_ENV !== 'production'
  )
    return NextResponse.next()

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (
      user === process.env.NEXT_BETA_USER &&
      pwd === process.env.NEXT_BETA_PW
    ) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
