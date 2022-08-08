import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email } = req.body

  try {
    const updated = await prisma.user.update({
      where: {
        email,
      },
      data: {
        firstName,
        lastName,
      },
    })
    res.json(updated)
  } catch (e) {
    res.status(401)
    res.json({ error: 'Update failed' })
  }
}
