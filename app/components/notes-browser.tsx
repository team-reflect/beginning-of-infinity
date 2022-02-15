import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Note} from 'app/interfaces/note'
import {
  NoteBrowserItemWidthWithoutCollapsed,
  NotesBrowserItem,
} from './notes-browser-item'
import {getNote} from 'app/client/notes-cache'
import {useRouter} from 'next/router'

interface Props {
  initialNotes?: Note[]
}

export const NotesBrowser: React.FC<Props> = ({initialNotes = []}) => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)

  const [viewNotes, setViewNotes] = useState<Note[]>(initialNotes)

  const setStackedQuery = (notePaths: string[]) => {
    const [firstPath, ...stackedPaths] = notePaths

    const newUrl = new URL(location.origin + `/${firstPath}`)

    for (const stackedPath of stackedPaths) {
      newUrl.searchParams.append('stacked', stackedPath)
    }

    history.replaceState({}, '', newUrl)
  }

  const onClickBacklink = async (
    event: React.MouseEvent,
    path: string,
    index: number,
  ) => {
    event.preventDefault()

    const appendNote = await getNote(path)

    // Note doesn't exist
    if (!appendNote) return

    // We're already displaying this note
    if (viewNotes.map((n) => n.path).includes(appendNote.path)) return

    // Find all notes that are stacked on top of this new index
    const newNotes = [...viewNotes.slice(0, index + 1), appendNote]
    setViewNotes(newNotes)

    // Set the stacked query (excluding the initial note - usually index)
    setStackedQuery(newNotes.map((note) => note.path))
  }

  const onScroll = () => {
    setScrollLeft(ref.current?.scrollLeft || 0)
  }

  const scrollToIndex = (index: number) => {
    ref.current?.children[index]?.scrollIntoView?.({
      block: 'start',
      inline: 'start',
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollToIndex(viewNotes.length - 1)
  }, [viewNotes])

  return (
    <div
      ref={ref}
      className="flex-1 flex overflow-x-auto overflow-y-hidden"
      onScroll={onScroll}
    >
      {viewNotes.map((note, index) => (
        <NotesBrowserItem
          key={index + note.title}
          index={index}
          note={note}
          collapsed={scrollLeft > (index + 1) * NoteBrowserItemWidthWithoutCollapsed - 60}
          overlay={scrollLeft > (index - 1) * NoteBrowserItemWidthWithoutCollapsed}
          onClickBacklink={(event, path) => onClickBacklink(event, path, index)}
        />
      ))}
    </div>
  )
}
