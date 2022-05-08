import React, {MouseEvent, useState} from 'react'
import {NotePreviewPopover} from './note-preview-popover'

interface Props {
  path: string
}

export const NotePreview: React.FC<Props> = ({children, path}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null)

  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <NotePreviewPopover referenceElement={referenceElement} path={path} />}

      <span
        ref={setReferenceElement}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </span>
    </>
  )
}
