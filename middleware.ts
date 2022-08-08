import { NextResponse } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']
const tokenCheckedPages = ['/signin', '/signup']

export default function middleware(req: any) {
  const token = req.cookies.get('ACCESS_TOKEN')
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    if (!token) {
      const loginUrl = new URL('/signin', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  if (tokenCheckedPages.find((p) => p === req.nextUrl.pathname) && token) {
    const home = new URL('/', req.url)
    return NextResponse.redirect(home)
  }
}
