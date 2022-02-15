import {Note} from 'app/models/note'
import {getNotes as uncachedGetNotes} from 'server/helpers/notes'

let notes: Note[] = []

export const getNotes = async () => {
  if (!notes.length) {
    notes = await uncachedGetNotes()
  }

  return notes
}

export const getNote = async (path: string) => {
  const notes = await getNotes()

  return notes.find((note) => note.path === path)
}
