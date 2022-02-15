import {Note} from 'app/interfaces/note'
import {getNote as uncachedGetNote} from './notes'

interface PathNotes {
  [path: string]: Note | null
}

const notes: PathNotes = {}

export const getNote = async (path: string): Promise<Note | null> => {
  if (!(path in notes)) {
    notes[path] = await uncachedGetNote(path)
  }

  return notes[path]
}

export const populateCache = async (newNotes: Note[]) => {
  for (const note of newNotes) {
    notes[note.path] = note
  }
}
