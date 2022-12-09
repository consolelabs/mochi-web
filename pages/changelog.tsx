import { GetStaticProps } from 'next'
import { Client, isFullPage } from '@notionhq/client'
import { CHANGELOG_DATABASE_ID, NOTION_KEY } from '~envs'
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

export const getServerSideProps: GetStaticProps<Props> = async () => {
  const notion = new Client({ auth: NOTION_KEY })
  const db = await notion.databases.query({
    database_id: toNotionPageId(CHANGELOG_DATABASE_ID),
  })

  const pages = await Promise.all(
    db.results.map(async (p, i) => {
      if (!isFullPage(p)) return null
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
        .catch(() => ({ name, content: null }))
    }),
  )

  return {
    props: {
      data: pages,
    },
  }
}

const ChangelogItem = ({ name, content }: Page) => (
  <div className="mb-12 lg:flex gap-9 mx-auto">
    <div className="flex-shrink-0 max-w-[192px] mb-9 relative lg:pt-2">
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
