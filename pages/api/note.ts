import {Note} from 'app/interfaces/note'
import type {NextApiRequest, NextApiResponse} from 'next'
import {safeGetNote as getNote} from 'server/helpers/notes'

interface ErrorResponse {
  error: {
    message: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note | ErrorResponse>,
) {
  const path = req.query.path as string | undefined

  if (!path) {
    return res.status(404).json({error: {message: 'path not supplied'}})
  }

  const note = await getNote(path)

  if (note) {
    res.setHeader('Cache-Control', `s-maxage=${86400 * 29}`)

    res.status(200).json(note)
  } else {
    res.status(404).json({error: {message: 'unknown note'}})
  }
}
