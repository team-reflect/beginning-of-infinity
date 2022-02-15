import {Note} from 'app/models/note'
import {getNote as uncachedGetNote} from './notes'

interface PathNotes {
  [path: string]: Note
}

const notes: PathNotes = {}

export const getNote = async (path: string): Promise<Note> => {
  if (!notes[path]) {
    notes[path] = await uncachedGetNote(path)
  }

  return notes[path]
}

export const populateCache = async (newNotes: Note[]) => {
  for (const note of newNotes) {
    notes[note.path] = note
  }
}
