import {Note} from 'app/interfaces/note'

export const getNote = async (path: string): Promise<Note | null> => {
  const request = await fetch(`/api/note?path=${path}`)

  switch (request.status) {
    case 200:
      return await request.json()
    case 404:
      return null
    default:
      throw new Error(`Unknown status code: ${request.status}`)
  }
}
