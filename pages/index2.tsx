import {Header} from 'app/components/header'
import {Layout} from 'app/components/layout'
import {NotesBrowser} from 'app/components/notes-browser'
import {castArray} from 'app/helpers/array'
import {Note} from 'app/interfaces/note'
import type {GetServerSideProps, GetStaticProps, NextPage} from 'next'
import {getNote} from 'server/helpers/notes'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = 'index'
  const stackedPaths = castArray(context.query.stacked || [])
  const notes = await Promise.all([path, ...stackedPaths].map(getNote))

  return {
    props: {initialNotes: notes},
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
