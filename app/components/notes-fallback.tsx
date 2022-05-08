import React from 'react'
import {Note} from 'app/interfaces/note'
import {NoteMarkdown} from './note-markdown'
import {NoteLinks} from './note-links'
import {useRouter} from 'next/router'

interface Props {
  initialNotes?: Note[]
}

export const NotesFallback: React.FC<Props> = ({initialNotes = []}) => {
  const router = useRouter()

  const [note] = initialNotes

  if (!note) return null

  const onClickBacklink = (event: React.MouseEvent, path: string) => {
    event.preventDefault()
    router.push(path)
  }

  return (
    <div className="fallback flex-1 flex-col md:p-8 p-5 space-y-8 overflow-y-auto">
      <NoteMarkdown markdown={note.markdown} onClickBacklink={onClickBacklink} />
      <NoteLinks note={note} />
    </div>
  )
}
