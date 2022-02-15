import fs from 'fs/promises'
import path from 'path'
import parseFrontMatter from 'front-matter'
import {Note} from 'app/interfaces/note'

const notesPath = path.join(process.cwd(), 'notes')

export const getNotes = async () => {
  const dir = await fs.readdir(notesPath)

  const noteNames = dir
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace('.md', ''))

  return Promise.all(noteNames.map((name) => getNote(name)))
}

export const getNote = async (name: string) => {
  // TODO - insecure
  const file = await fs.readFile(path.join(notesPath, name + '.md'), 'utf8')

  const {attributes, body} = parseFrontMatter<{title: string | undefined}>(
    file.toString(),
  )

  return {
    path: name,
    title: attributes?.title || name,
    markdown: body,
    linkedFromPaths: [],
  } as Note
}

export const safeGetNote = async (name: string) => {
  try {
    return await getNote(name)
  } catch (error) {
    console.error(error)
    return null
  }
}
