import {NotesBrowser} from 'app/components/notes-browser'
import {Note} from 'app/models/note'
import type {GetStaticProps, NextPage} from 'next'
import {getNote} from 'server/helpers/notes'

const NotesShow: NextPage = () => {
  // return <NotesBrowser initialNotes={notes} initialPath="index" />
  return <h1>todo</h1>
}

export default NotesShow
