import {Header} from 'app/components/header'
import {Layout} from 'app/components/layout'
import {NotesBrowser} from 'app/components/notes-browser'
import {castArray} from 'app/helpers/array'
import {Note} from 'app/interfaces/note'
import type {GetServerSideProps, NextPage} from 'next'
import {getHydratedNote as getNote} from 'server/helpers/notes'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = castArray(context.query.paths || []).join('/')
  const stackedPaths = castArray(context.query.stacked || [])
  const notes = await Promise.all([path, ...stackedPaths].map(getNote))
  const initialNotes = notes.filter((note) => note)

  return {
    props: {initialNotes},
  }
}

const NotesShow: NextPage<{initialNotes: Note[]}> = ({initialNotes}) => {
  return (
    <Layout>
      <Header />
      <NotesBrowser initialNotes={initialNotes} />
    </Layout>
  )
}

export default NotesShow
