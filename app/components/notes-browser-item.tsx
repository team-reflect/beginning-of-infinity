import clsx from 'clsx'
import React from 'react'
import {Note} from 'app/models/note'
import {NoteMarkdown} from './note-markdown'
import {Transition} from '@headlessui/react'

interface Props {
  note: Note
  index: number
  onClickBacklink?: (event: React.MouseEvent, path: string) => void
  collapsed?: boolean
  overlay?: boolean
}

export const NoteBrowserItemWidth = 625
export const NoteBrowserItemCollapsedWidth = 40
export const NoteBrowserItemWidthWithoutCollapsed =
  NoteBrowserItemWidth - NoteBrowserItemCollapsedWidth

export const NotesBrowserItem: React.FC<Props> = ({
  note,
  onClickBacklink,
  index,
  collapsed = false,
  overlay = false,
}) => {
  return (
    <div
      className={clsx(
        'flex-none flex flex-col sticky bg-white border-r border-gray-100 overflow-y-auto',
        overlay && 'shadow-left-xl',
      )}
      style={{
        left: index * 40,
        width: NoteBrowserItemWidth,
        right: -1 * NoteBrowserItemWidth - NoteBrowserItemCollapsedWidth,
      }}
    >
      <Transition
        appear={true}
        show={collapsed}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-0 right-auto font-medium text-gray-600 text-md w-[40px] flex items-center py-10 writing-vertical">
          {note.title}
        </div>
      </Transition>

      <Transition
        appear={true}
        show={!collapsed}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex-1 flex-col px-8 py-8 ">
          <h2 className="font-medium text-2xl mb-5 hidden">{note.title}</h2>
          <NoteMarkdown markdown={note.markdown} onClickBacklink={onClickBacklink} />
        </div>
      </Transition>
    </div>
  )
}
