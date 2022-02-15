import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Note} from 'app/models/note'
import {
  NoteBrowserItemWidthWithoutCollapsed,
  NotesBrowserItem,
} from './notes-browser-item'
import {getNote} from 'app/client/notes-cache'

interface Props {
  initialPath?: string
  initialNotes?: Note[]
}

export const NotesBrowser: React.FC<Props> = ({
  initialPath = 'index',
  initialNotes = [],
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const initialNote = useMemo(
    () => initialNotes.find((note) => note.path === initialPath),
    [initialPath, initialNotes],
  )

  if (!initialNote) {
    throw new Error(`No note found for path: ${initialPath}`)
  }

  const [viewNotes, setViewNotes] = useState<Note[]>([initialNote])

  const onClickBacklink = async (
    event: React.MouseEvent,
    path: string,
    index: number,
  ) => {
    event.preventDefault()

    const appendNote = await getNote(path)

    if (appendNote && !viewNotes.includes(appendNote)) {
      const newNotes = [...viewNotes.slice(0, index + 1), appendNote]
      setViewNotes(newNotes)
    }
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
