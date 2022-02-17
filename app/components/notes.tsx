import React, {useEffect, useMemo, useState} from 'react'
import {Note} from 'app/interfaces/note'
import {screenIs} from 'app/helpers/screen-size'
import {NotesFallback} from './notes-fallback'
import {NotesBrowser} from './notes-browser'

interface Props {
  initialNotes?: Note[]
}

export const Notes: React.FC<Props> = ({initialNotes = []}) => {
  const [mode, setMode] = useState<'browser' | 'fallback'>('browser')

  useEffect(() => {
    setMode(screenIs('md') ? 'browser' : 'fallback')
  }, [])

  return mode === 'browser' ? (
    <NotesBrowser initialNotes={initialNotes} />
  ) : (
    <NotesFallback initialNotes={initialNotes} />
  )
}
