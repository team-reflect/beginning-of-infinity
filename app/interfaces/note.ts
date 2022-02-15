export interface NotePreview {
  path: string
  title: string
  snippet: string
}
export interface Note {
  path: string
  title: string
  snippet: string
  markdown: string
  linkedFromNotes: NotePreview[]
}
