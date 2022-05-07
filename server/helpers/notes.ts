import fs from 'fs/promises'
import path from 'path'
import parseFrontMatter from 'front-matter'
import {Note, NotePreview, NOTE_INDEX_NAME} from 'app/interfaces/note'

const notesPath = path.join(process.cwd(), 'notes')

export const getNotes = async () => {
  const dir = await fs.readdir(notesPath)

  const noteNames = dir
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace('.md', ''))

  return Promise.all(noteNames.map((name) => readNote(name)))
}

const readNote = async (name: string): Promise<Note> => {
  const escapedName = name.replace(/[^A-Za-z0-9\s_\-/]/g, '')

  const file = await fs.readFile(path.join(notesPath, escapedName + '.md'), 'utf8')

  const {attributes, body} = parseFrontMatter<{
    title: string | undefined
    snippet: string | undefined
  }>(file.toString())

  return {
    path: name,
    title: attributes?.title || name,
    snippet: attributes?.snippet || markdownToSnippet(body),
    markdown: body,
    linkedFromNotes: [],
  }
}

const markdownToSnippet = (markdown: string): string => {
  return markdown
    .replace(/^#.+/g, '')
    .split('\n')
    .filter((l) => l.trim())
    .slice(0, 2)
    .join(' ')
}

const noteToNotePreview = (note: Note): NotePreview => {
  return {
    path: note.path,
    title: note.title,
    snippet: markdownToSnippet(note.markdown),
  }
}

export const getHydratedNote = async (name: string): Promise<Note | null> => {
  const allNotes = await getNotes()
  const note = allNotes.find((n) => n.path === name)

  if (!note) return null

  const linkedFromNotes = allNotes
    .filter((n) => n != note && n.path != NOTE_INDEX_NAME)
    .filter((n) => n.markdown.includes(`[[${name}]]`))
    .map(noteToNotePreview)

  return {
    ...note,
    linkedFromNotes,
  }
}

export const getNote = async (name: string): Promise<Note | null> => {
  try {
    return await readNote(name)
  } catch (error) {
    console.error(error)
    return null
  }
}
