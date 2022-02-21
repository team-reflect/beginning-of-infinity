import {Transition} from '@headlessui/react'
import {getNote} from 'app/client/notes-cache'
import {Note} from 'app/interfaces/note'
import {calculateBestPosition} from 'calculate-position'
import React, {useEffect, useState} from 'react'
import {NoteMarkdown} from './note-markdown'
import {PortalBody} from './portal-body'
import truncate from 'lodash/truncate'

export interface Props {
  path: string
  width?: number
  height?: number
  padding?: number
  coords: {
    left: number
    top: number
  }
}

export const NotePreviewPopover: React.FC<Props> = ({
  path,
  coords,
  width = 420,
  height = 200,
  padding = 15,
}) => {
  const [note, setNote] = useState<Note | undefined | null>()

  const anchor = {
    left: coords.left,
    top: coords.top,
    width: padding,
    height: padding,
  }

  const {left, top} = calculateBestPosition({
    anchor,
    dimensions: {
      width,
      height,
    },
  })

  const fetchNote = async () => {
    setNote(await getNote(path))
  }

  useEffect(() => {
    fetchNote()
  }, [path])

  return (
    <PortalBody>
      <Transition
        appear={true}
        show={!!note}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="absolute rounded-md shadow-lg ring-1 ring-gray-200 dark:ring-purple-700 ring-opacity-50 overflow-hidden bg-white px-5 py-4"
          style={{left, top, width, height}}
        >
          {note && (
            <>
              <NoteMarkdown markdown={truncate(note.snippet, {length: 390})} size="sm" />
            </>
          )}
        </div>
      </Transition>
    </PortalBody>
  )
}
