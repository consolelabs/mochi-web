import { GetStaticProps } from 'next'
import { Client, isFullPage } from '@notionhq/client'
import {
  CHANGELOG_DATABASE_ID,
  CHANGELOG_FILTER_PROPERTY_NAME,
  CHANGELOG_FILTER_PROPERTY_VALUE,
  CHANGELOG_SORT_PROPERTY_NAME,
  NOTION_KEY,
} from '~envs'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { NotionRenderer } from '~components/NotionRenderer'

type Page = {
  name: string
  content: any
}

type Props = {
  data: Array<Page | null>
}

function toNotionPageId(id: string) {
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
    16,
    20,
  )}-${id.slice(20, 32)}`
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const property = CHANGELOG_FILTER_PROPERTY_NAME
  const propertyVal = CHANGELOG_FILTER_PROPERTY_VALUE

  const sortProperty = CHANGELOG_SORT_PROPERTY_NAME

  const notion = new Client({ auth: NOTION_KEY })
  const db = await notion.databases.query({
    database_id: toNotionPageId(CHANGELOG_DATABASE_ID),
    sorts: [{ property: sortProperty, direction: 'descending' }],
  })

  const pages = await Promise.all(
    db.results.map(async (p, i) => {
      if (!isFullPage(p)) return null
      const filterProp = p.properties[property]
      if (
        filterProp.type !== 'select' ||
        (filterProp.type === 'select' &&
          filterProp.select?.name !== propertyVal)
      )
        return null
      let name = `Changelog #${i + 1}`
      if (
        p.properties.Name.type === 'title' &&
        p.properties.Name.title[0].plain_text
      ) {
        name = p.properties.Name.title[0].plain_text
      }

      return notion.blocks.children
        .list({
          block_id: p.id,
        })
        .then((p) => ({ name, content: p }))
        .catch(() => null)
    }),
  )

  return {
    props: {
      data: pages.filter(Boolean),
    },
  }
}

const ChangelogItem = ({ name, content }: Page) => (
  <div className="mb-16 lg:flex gap-9">
    <div className="flex-shrink-0 mb-5 relative lg:pt-2 inline-block">
      <div className="lg:sticky top-36">
        <div className="border-gradient">
          <div className="bg-white border-gradient-entry" />
          <div className="relative px-4 font-semibold leading-9 text-center lg:px-5 text-mochi-500">
            {name}
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 pb-6 flex flex-col whitespace-pre-wrap max-w-prose">
      {content.results.map((d: any, i: number) => {
        return (
          <NotionRenderer key={`changelog-d-${d.id}`} d={d} first={i === 0} />
        )
      })}
    </div>
  </div>
)

export default function Changelog({ data }: Props) {
  return (
    <Layout>
      <SEO title={PAGES.CHANGE_LOG.title} tailTitle />
      <div className="flex flex-col max-w-7xl px-6 md:px-12 py-16 mx-auto">
        <p className="mb-12 text-3xl text-center md:text-4xl lg:text-5xl">
          Changelog
        </p>
        {data?.map(
          (d, i) => d && <ChangelogItem {...d} key={`changelog-${i}`} />,
        )}
      </div>
    </Layout>
  )
}
