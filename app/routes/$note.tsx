import React from 'react'
import {LoaderFunction, useLoaderData} from 'remix'
import {Header} from '~/components/header'
import {NotesBrowser} from '~/components/notes-browser'
import {getNotes, Note} from '~/note'

interface LoaderProps {
  initialPath?: string
  notes: Note[]
}

export const loader: LoaderFunction = async ({params}) => {
  return {
    notes: await getNotes(),
    initialPath: params.note,
  } as LoaderProps
}

export default function Index() {
  const {notes, initialPath} = useLoaderData<LoaderProps>()

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <NotesBrowser notes={notes} initialPath={initialPath} />
    </div>
  )
}
