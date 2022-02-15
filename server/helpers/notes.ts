import fs from 'fs/promises'
import path from 'path'
import parseFrontMatter from 'front-matter'
import {Note} from 'app/models/note'

const notesPath = path.join(__dirname, '..', 'notes')

export const getNotes = async () => {
  const dir = await fs.readdir(notesPath)

  const noteNames = dir
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace('.md', ''))

  return Promise.all(noteNames.map((name) => getNote(name)))
}

export const getNote = async (name: string) => {
  const file = await fs.readFile(path.join(notesPath, name + '.md'), 'utf8')

  const {attributes, body} = parseFrontMatter<{title: string | undefined}>(
    file.toString(),
  )

  return {
    path: name,
    title: attributes?.title || name,
    markdown: body,
  } as Note
}
