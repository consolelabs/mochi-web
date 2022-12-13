// Notion
// required
export const NOTION_KEY = process.env.NOTION_KEY as string
export const CHANGELOG_DATABASE_ID = process.env.CHANGELOG_DATABASE_ID as string
export const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN as string

// optional
export const CHANGELOG_FILTER_PROPERTY_NAME = (process.env
  .CHANGELOG_FILTER_PROPERTY_NAME || 'Type') as string
export const CHANGELOG_FILTER_PROPERTY_VALUE = (process.env
  .CHANGELOG_FILTER_PROPERTY_VALUE || 'Public') as string
export const CHANGELOG_SORT_PROPERTY_NAME = (process.env
  .CHANGELOG_SORT_PROPERTY_NAME || 'Date') as string

// links
export const DISCORD_LINK =
  (process.env.DISCORD_LINK as string) || 'https://discord.gg/3d2FdBG2My'
export const TWITTER_LINK =
  (process.env.TWITTER_LINK as string) || 'https://twitter.com/getmochi_bot'
export const GITBOOK_LINK =
  (process.env.GITBOOK_LINK as string) ||
  'https://mochibot.gitbook.io/mochi-bot/introduction/about-mochi-bot'
export const INVITE_LINK =
  (process.env.INVITE_LINK as string) ||
  'https://discord.com/oauth2/authorize?client_id=963123183131709480&permissions=8&scope=bot'
