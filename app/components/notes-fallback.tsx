import React from 'react'
import {Note} from 'app/interfaces/note'
import {NoteMarkdown} from './note-markdown'
import {NoteLinks} from './note-links'

interface Props {
  initialNotes?: Note[]
}

export const NotesFallback: React.FC<Props> = ({initialNotes = []}) => {
  const [note] = initialNotes

  if (!note) return null

  return (
    <div className="fallback flex-1 flex-col md:p-8 p-5 space-y-8 overflow-y-auto">
      <NoteMarkdown markdown={note.markdown} />
      <NoteLinks note={note} />
    </div>
  )
}
