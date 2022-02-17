import {Header} from 'app/components/header'
import {Layout} from 'app/components/layout'
import {Notes} from 'app/components/notes'
import {Note} from 'app/interfaces/note'
import type {GetStaticProps, NextPage} from 'next'
import {getNote} from 'server/helpers/notes'

export const getStaticProps: GetStaticProps = async (context) => {
  const notes = [await getNote('Preface')]

  return {
    props: {notes},
  }
}

const IndexPage: NextPage<{notes: Note[]}> = ({notes}) => {
  return (
    <Layout>
      <Header />
      <Notes initialNotes={notes} />
    </Layout>
  )
}

export default IndexPage
