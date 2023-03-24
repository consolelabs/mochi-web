import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useMemo } from 'react'
import { pagination } from '~utils/pagination'
import { button } from '../Button'

type Props = {
  page: number
  totalPage: number
  onChange: (page: number) => void
}

export const Pagination = (props: Props) => {
  const { page, totalPage, onChange } = props

  const paginationArray = useMemo(() => {
    return pagination(page, totalPage)
  }, [page, totalPage])

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={button({ appearance: 'tertiary', size: 'icon' })}
      >
        <Icon className="w-4 h-4" icon="heroicons:chevron-left" />
      </button>
      <div className="flex items-center px-4 py-2 gap-2 text-sm bg-dashboard-gray-6 rounded-lg">
        {paginationArray.map((i: any, index: number) => {
          return (
            <button
              type="button"
              key={index}
              disabled={i === '...'}
              className={clsx('w-4', {
                'opacity-40': i !== page,
                'opacity-100': i === page,
              })}
              onClick={() => onChange(i)}
            >
              {i}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPage}
        className={button({ appearance: 'tertiary', size: 'icon' })}
      >
        <Icon className="w-4 h-4" icon="heroicons:chevron-right" />
      </button>
    </div>
  )
}
