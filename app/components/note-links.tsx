import {Note} from 'app/interfaces/note'
import React from 'react'
import {NoteMarkdown} from './note-markdown'

interface Props {
  note: Note
  onClickBacklink?: (event: React.MouseEvent, path: string) => void
}

export const NoteLinks: React.FC<Props> = ({note, onClickBacklink}) => {
  if (!note.linkedFromNotes?.length) return null

  return (
    <div className="bg-gray-100 rounded-md px-6 py-5">
      <h3 className="text-gray-600 text-lg font-medium">Links to this note</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-3">
        {note.linkedFromNotes.map((note) => (
          <div
            key={note.path}
            onClick={(event) => onClickBacklink?.(event, note.path)}
            className="text-gray-600 cursor-pointer block space-y-2"
          >
            <h3 className="text-sm font-medium">{note.title}</h3>

            <NoteMarkdown
              onClickBacklink={onClickBacklink}
              markdown={note.snippet}
              size="sm"
              style={{
                display: 'box',
                lineClamp: 3,
                boxOrient: 'vertical',
                overflow: 'hidden',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
