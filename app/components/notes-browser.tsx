import React, {useMemo, useRef, useState} from 'react'
import {Note} from '~/note'
import {
  NoteBrowserItemWidthWithoutCollapsed,
  NotesBrowserItem,
} from './notes-browser-item'

interface Props {
  initialPath?: string
  notes: Note[]
}

export const NotesBrowser: React.FC<Props> = ({initialPath, notes}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const initialNote = useMemo(
    () => notes.find((note) => note.path === initialPath),
    [initialPath],
  )

  if (!initialNote) {
    throw new Error(`No note found for path: ${initialPath}`)
  }

  const [viewNotes, setViewNotes] = useState([initialNote])

  const onClickBacklink = (event: React.MouseEvent, path: string, index: number) => {
    event.preventDefault()

    const appendNote = notes.find((note) => note.title === path)!

    // if (viewNotes.includes(appendNote)) return

    if (appendNote) {
      const newNotes = [...viewNotes.slice(0, index + 1), appendNote]
      setViewNotes(newNotes)
    }

    setTimeout(() => scrollToIndex(index), 1)
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
