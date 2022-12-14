import React from 'react'
import cln from 'classnames'

type RichTextType = {
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
  }
  href: string | null
  plain_text: string
}

type ImageBlock = {
  id: string
  type: 'image'
  image: {
    file: {
      url: string
    }
  }
}

type ParagraphBlock = {
  id: string
  type: 'paragraph'
  paragraph: {
    rich_text: Array<RichTextType>
  }
}

type Heading1Block = {
  id: string
  type: 'heading_1'
  heading_1: {
    rich_text: Array<RichTextType>
  }
}

type Heading2Block = {
  id: string
  type: 'heading_2'
  heading_2: {
    rich_text: Array<RichTextType>
  }
}

type Heading3Block = {
  id: string
  type: 'heading_3'
  heading_3: {
    rich_text: Array<RichTextType>
  }
}

type BulletedListBlock = {
  id: string
  type: 'bulleted_list_item'
  bulleted_list_item: {
    rich_text: Array<RichTextType>
  }
}

type Props = {
  first: boolean
  d:
    | ImageBlock
    | ParagraphBlock
    | Heading1Block
    | Heading2Block
    | Heading3Block
    | BulletedListBlock
}

function RichText({
  plain_text,
  href,
  annotations,
  li = false,
}: RichTextType & { li?: boolean }) {
  const style = cln({
    underline: annotations.underline,
    'line-through': annotations.strikethrough,
    'font-bold': annotations.bold,
    italic: annotations.italic,
    'text-[#E36864] bg-mochi bg-opacity-[15%] px-1 rounded': annotations.code,
  })
  if (href)
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={href}
        className={cln(style, 'text-mochi underline')}
      >
        {plain_text}
      </a>
    )
  if (li) {
    return <li className={style}>{plain_text}</li>
  }
  return <span className={style}>{plain_text}</span>
}

function fallbackToZeroWidth(renderElements: Array<JSX.Element>) {
  if (renderElements.length === 0) return <>&#8203;</>
  return renderElements
}

export const NotionRenderer = ({ d, first }: Props) => {
  switch (d.type) {
    case 'image':
      return <img src={d.image.file.url} className="mt-2" alt="" />
    case 'paragraph':
      return (
        <span className={cln('text-base', { 'mt-1': !first })}>
          {fallbackToZeroWidth(
            d.paragraph.rich_text.map((rt, i) => (
              <RichText key={`${d.id}-${i}`} {...rt} />
            )),
          )}
        </span>
      )
    case 'heading_1':
      return (
        <p className={cln('text-3xl', { 'mt-5': !first })}>
          {fallbackToZeroWidth(
            d.heading_1.rich_text.map((rt, i) => (
              <RichText key={`${d.id}-${i}`} {...rt} />
            )),
          )}
        </p>
      )
    case 'heading_2':
      return (
        <p className={cln('text-2xl', { 'mt-5': !first })}>
          {fallbackToZeroWidth(
            d.heading_2.rich_text.map((rt, i) => (
              <RichText key={`${d.id}-${i}`} {...rt} />
            )),
          )}
        </p>
      )
    case 'heading_3':
      return (
        <p className={cln('text-xl', { 'mt-5': !first })}>
          {fallbackToZeroWidth(
            d.heading_3.rich_text.map((rt, i) => (
              <RichText key={`${d.id}-${i}`} {...rt} />
            )),
          )}
        </p>
      )
    case 'bulleted_list_item':
      return (
        <ul className={cln('list-disc list-inside', { 'mt-2': !first })}>
          {fallbackToZeroWidth(
            d.bulleted_list_item.rich_text.map((rt, i) => (
              <RichText key={`${d.id}-${i}`} {...rt} li />
            )),
          )}
        </ul>
      )
    default:
      return null
  }
}
