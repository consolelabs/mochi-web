import classNames from 'classnames'
import React from 'react'

type StepData = {
  text: string
}

type Props = {
  activeIndex: number
  steps: Array<StepData>
}

export default function Stepper({ steps, activeIndex }: Props) {
  return (
    <div className="flex py-4 items-center gap-x-8">
      {steps.map((s, i) => {
        return (
          <div key={`stepper-${i}`} className="flex items-center gap-x-3">
            {i !== 0 ? (
              <div
                className={classNames('h-0.5 rounded w-16', {
                  'bg-mochi-400': i <= activeIndex,
                  'bg-gray-300': i > activeIndex,
                })}
              ></div>
            ) : null}
            <div className="flex gap-x-2 items-center">
              <div
                className={classNames(
                  'text-xs rounded-full text-white h-6 w-6 flex items-center justify-center',
                  {
                    'bg-mochi-500': i <= activeIndex,
                    'bg-gray-300': i > activeIndex,
                  },
                )}
              >
                {i + 1}
              </div>
              <p
                className={classNames('font-medium text-sm', {
                  'text-gray-600': i <= activeIndex,
                  'text-gray-300': i > activeIndex,
                })}
              >
                {s.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
