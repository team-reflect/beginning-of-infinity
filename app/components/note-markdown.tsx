import {marked} from 'marked'
import React, {MouseEvent} from 'react'
import {markdownToTokens} from '~/helpers/markdown'
import {NoteBacklink} from './note-backlink'

interface Props {
  markdown: string
  onClickBacklink?: (event: MouseEvent, path: string) => void
}

export const NoteMarkdown: React.FC<Props> = ({markdown, onClickBacklink}) => {
  return (
    <div className="prose w-auto">{markdownToElements(markdown, {onClickBacklink})}</div>
  )
}

interface MarkdownOptions {
  onClickBacklink?: (event: MouseEvent, path: string) => void
}

const elementWithKey = (element: React.ReactElement, key: string | number) => (
  <React.Fragment key={key}>{element}</React.Fragment>
)

const tokensToElements = (tokens: marked.Tokens.Generic[], options: MarkdownOptions) => {
  return tokens.map((token, index) =>
    elementWithKey(tokenToElement(token, options), index),
  )
}

const tokenToElement = (token: marked.Tokens.Generic, options: MarkdownOptions) => {
  switch (token.type) {
    case 'heading':
      return React.createElement('h' + token.depth, {}, token.text)
    case 'text':
      return <span dangerouslySetInnerHTML={{__html: token.text}} />
    case 'paragraph':
      return <p>{tokensToElements(token.tokens || [], options)}</p>
    case 'backlink':
      return (
        <NoteBacklink
          path={token.path}
          onClick={(event) => options.onClickBacklink?.(event, token.path)}
        />
      )
    case 'em':
      return <em>{tokensToElements(token.tokens || [], options)}</em>
    case 'blockquote':
      return <blockquote>{tokensToElements(token.tokens || [], options)}</blockquote>
    case 'hr':
      return <hr />
    case 'list':
      return token.ordered ? (
        <ol>{tokensToElements(token.tokens || [], options)}</ol>
      ) : (
        <ul>{tokensToElements(token.tokens || [], options)}</ul>
      )
    case 'listitem':
      return <li>{tokensToElements(token.tokens || [], options)}</li>
    default:
      return <></>
  }
}

const markdownToElements = (markdown: string, options: MarkdownOptions = {}) => {
  const tokens = markdownToTokens(markdown)
  const elements = tokens.map((token) => tokenToElement(token, options))

  return elements.map((element, index) => elementWithKey(element, index))
}
