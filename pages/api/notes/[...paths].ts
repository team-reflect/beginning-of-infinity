import {Note} from 'app/interfaces/note'
import type {NextApiRequest, NextApiResponse} from 'next'
import {getNote} from 'server/helpers/notes'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Note>) {
  const paths = Array.from(req.query.paths)
  const note = await getNote(paths.join('/'))

  res.status(200).json(note)
}
