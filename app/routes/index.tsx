import React from 'react'
import {useLoaderData} from 'remix'
import {Header} from '~/components/header'
import {NotesBrowser} from '~/components/notes-browser'
import {getNotes, Note} from '~/note'

export const loader = async () => {
  return getNotes()
}

export default function Index() {
  const notes = useLoaderData<Note[]>()

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />

      <NotesBrowser notes={notes} initialPath="index" />
    </div>
  )
}
