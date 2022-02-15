import React, {MouseEvent, useState} from 'react'
import {NotePreviewPopover} from './note-preview-popover'

export interface Coords {
  left: number
  top: number
}

interface Props {
  path: string
}

export const NotePreview: React.FC<Props> = ({children, path}) => {
  const [coords, setCoords] = useState<Coords | null>(null)

  const openPopover = (event: MouseEvent) => {
    setCoords({
      left: event.clientX,
      top: event.clientY,
    })
  }

  const closePopover = () => setCoords(null)

  return (
    <>
      {coords && <NotePreviewPopover coords={coords} path={path} />}

      <span onMouseMove={openPopover} onMouseLeave={closePopover}>
        {children}
      </span>
    </>
  )
}
