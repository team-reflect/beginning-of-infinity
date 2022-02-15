import {Note} from 'app/models/note'

export const getNote = async (path: string): Promise<Note> => {
  const request = await fetch('/api/notes/' + path)
  return await request.json()
}
