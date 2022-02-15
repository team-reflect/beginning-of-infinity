import React, {useMemo, useRef, useState} from 'react'
import {Note} from 'app/models/note'
import {
  NoteBrowserItemWidthWithoutCollapsed,
  NotesBrowserItem,
} from './notes-browser-item'

interface Props {
  initialPath?: string
  initialNotes?: Note[]
}

export const NotesBrowser: React.FC<Props> = ({initialPath, initialNotes = []}) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const initialNote = useMemo(
    () => initialNotes.find((note) => note.path === initialPath),
    [initialPath, initialNotes],
  )

  if (!initialNote) {
    throw new Error(`No note found for path: ${initialPath}`)
  }

  const [viewNotes, setViewNotes] = useState([initialNote])

  const onClickBacklink = (event: React.MouseEvent, path: string, index: number) => {
    event.preventDefault()

    const appendNote = notes.find((note) => note.path === path)

    // TODO search cache

    if (appendNote && !viewNotes.includes(appendNote)) {
      const newNotes = [...viewNotes.slice(0, index + 1), appendNote]
      setViewNotes(newNotes)
      setTimeout(() => scrollToIndex(index), 1)
    }
  }

  const onScroll = () => {
    setScrollLeft(ref.current?.scrollLeft || 0)
  }

  const scrollToIndex = (index: number) => {
    ref.current?.children[index].scrollIntoView?.({
      block: 'start',
      inline: 'start',
      behavior: 'smooth',
    })
  }

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
