import React from 'react'
import { Tab as HeadlessTab, TabGroupProps } from '@headlessui/react'
import { tab } from './styles'
import clsx from 'clsx'

type Props = {
  headings: string[]
  children?: React.ReactNode
}

export const Tab = ({
  children,
  headings,
  ...rest
}: Props & TabGroupProps<'div'>) => {
  return (
    <div className={tab({})}>
      <HeadlessTab.Group {...rest}>
        <HeadlessTab.List className="flex gap-x-8">
          {headings.map((h, i) => {
            return (
              <HeadlessTab className="outline-none" key={`tab-${h}-${i}`}>
                {({ selected }) => {
                  return (
                    <span
                      className={clsx(
                        'font-medium pb-1 border-b-2 transition-colors duration-100 ease-in',
                        {
                          'text-foreground border-b-foreground': selected,
                          'text-dashboard-gray-8 border-b-transparent':
                            !selected,
                        },
                      )}
                    >
                      {h}
                    </span>
                  )
                }}
              </HeadlessTab>
            )
          })}
        </HeadlessTab.List>
        <HeadlessTab.Panels>{children}</HeadlessTab.Panels>
      </HeadlessTab.Group>
    </div>
  )
}

Tab.Panel = HeadlessTab.Panel
