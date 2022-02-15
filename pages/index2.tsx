import {Header} from 'app/components/header'
import {Layout} from 'app/components/layout'
import {NotesBrowser} from 'app/components/notes-browser'
import {Note} from 'app/interfaces/note'
import type {GetStaticProps, NextPage} from 'next'
import {getNote} from 'server/helpers/notes'

export const getStaticProps: GetStaticProps = async (context) => {
  const notes = [await getNote('index')]

  return {
    props: {notes},
  }
}

const IndexPage2: NextPage<{notes: Note[]}> = ({notes}) => {
  console.log('index page2')

  return (
    <Layout>
      <Header />
      <NotesBrowser initialNotes={notes} />
    </Layout>
  )
}

export default IndexPage2
