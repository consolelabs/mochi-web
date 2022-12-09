export const NOTION_KEY = process.env.NOTION_KEY as string
export const CHANGELOG_DATABASE_ID = process.env.CHANGELOG_DATABASE_ID as string
export const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN as string

export const CHANGELOG_FILTER_PROPERTY_NAME = (process.env
  .CHANGELOG_FILTER_PROPERTY_NAME || 'Type') as string
export const CHANGELOG_FILTER_PROPERTY_VALUE = (process.env
  .CHANGELOG_FILTER_PROPERTY_VALUE || 'Public') as string
export const CHANGELOG_SORT_PROPERTY_NAME = (process.env
  .CHANGELOG_SORT_PROPERTY_NAME || 'Date') as string
