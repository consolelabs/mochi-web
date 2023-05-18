import { NextApiRequest, NextApiResponse } from 'next'
import { HOME_URL } from '~envs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username = '', error = '', token } = req.query
  return res.redirect(
    `${HOME_URL}/connect-telegram?token=${token}&done=true${
      error ? `&error=${error}` : ''
    }${username ? `&username=${username}` : ''}`,
  )
}
