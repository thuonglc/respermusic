import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('ACCESS_TOKEN', null, {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )
  res.json('log out')
  res.status(204) // nothing
}
