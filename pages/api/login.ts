// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  authType: string,
  token: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response: Data = {
    name: "Linh",
    authType: "admin",
    token: "Bearer im1just2testing3this4shit_haha"
  }
  res.status(200).json(response);
}
