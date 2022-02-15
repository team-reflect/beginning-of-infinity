import {NotesBrowser} from 'app/components/notes-browser'
import {Note} from 'app/models/note'
import type {GetStaticProps, NextPage} from 'next'
import {getNote} from 'server/helpers/notes'

export const getStaticProps: GetStaticProps = async (context) => {
  const notes = [await getNote('index')]

  return {
    props: {notes},
  }
}

const IndexPage: NextPage<{notes: Note[]}> = ({notes}) => {
  return <NotesBrowser initialNotes={notes} initialPath="index" />
}

export default IndexPage
