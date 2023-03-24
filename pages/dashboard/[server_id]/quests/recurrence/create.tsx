import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { button } from '~components/Dashboard/Button'
import DashboardLayout from '~components/Dashboard/Layout'
import { Tabs } from '~components/Dashboard/Tabs'
import { ParticipateForm } from '~components/pages/dashboard/quests/recurrence/form/ParticipateForm'
import { RewardsForm } from '~components/pages/dashboard/quests/recurrence/form/RewardsForm'
import { SetupForm } from '~components/pages/dashboard/quests/recurrence/form/SetupForm'

enum TabType {
  SETUP = 0,
  PARTICIPATE = 1,
  REWARDS = 2,
}

const CreateRecurrenceQuest = () => {
  const { query, back } = useRouter()

  const [tab, setTab] = useState(TabType.SETUP)
  const [values, setValues] = useState<Record<string, any>[]>([
    {
      repeat: '1',
    },
    {
      participate: 'all',
    },
    {
      type: '1',
      num_of_rewards: 0,
      rewards: [
        {
          type: 'coin',
          value: 0,
        },
      ],
    },
  ])
  const formRefs = useRef<(HTMLFormElement | null)[]>([])
  const [progress, setProgress] = useState(TabType.SETUP)

  const onNext = () => {
    formRefs.current[tab]?.requestSubmit()
  }

  const onSubmit = (values: Record<string, any>) => {
    setValues((o) => {
      const nextO = JSON.parse(JSON.stringify(o))
      nextO[tab] = { ...values }

      return nextO
    })
    setTab((o) => {
      // Last page, wrap up
      if (o === TabType.REWARDS) {
        onSubmitFinal()
        return o
      }

      return o + 1
    })
    setProgress((p) => (p === TabType.REWARDS ? p : p + 1))
  }

  const onSubmitFinal = () => {
    console.log(values)
  }

  return (
    <DashboardLayout
      header={
        <div className="flex gap-2 items-center">
          <Link
            href={`/dashboard/${query.server_id}/quests/recurrence`}
            className="text-lg text-dashboard-gray-2"
          >
            Recurrence Quests /
          </Link>
          <div>Create a quest</div>
        </div>
      }
      footer={
        <div className="fixed left-0 bottom-0 w-full bg-white-pure px-5">
          <div className="flex justify-between py-4 mx-auto w-full max-w-5xl">
            <button
              type="button"
              className={button({ appearance: 'text' })}
              onClick={back}
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className={button({ appearance: 'tertiary' })}
                onClick={back}
              >
                Cancel
              </button>
              <button
                type="button"
                className={button({ appearance: 'secondary' })}
                onClick={onNext}
              >
                {tab !== TabType.REWARDS ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      }
    >
      <Tabs
        as="div"
        headings={[
          { label: 'Setup' },
          { label: 'Participate', disabled: progress < TabType.PARTICIPATE },
          { label: 'Rewards', disabled: progress < TabType.REWARDS },
        ]}
        onChange={(tabIndex) => setTab(tabIndex)}
        selectedIndex={tab}
      >
        <Tabs.Panel>
          {({ selected }) => {
            return (
              <Transition
                appear
                show={selected}
                enter="transition-all duration-100 ease-in-out"
                enterFrom="-translate-x-2 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition-all duration-100 ease-in-out"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-2 opacity-0"
              >
                <SetupForm
                  defaultValues={values[TabType.SETUP]}
                  ref={(ref) => (formRefs.current[TabType.SETUP] = ref)}
                  onSubmit={onSubmit}
                />
              </Transition>
            )
          }}
        </Tabs.Panel>
        <Tabs.Panel>
          {({ selected }) => {
            return (
              <Transition
                appear
                show={selected}
                enter="transition-all duration-100 ease-in-out"
                enterFrom="-translate-x-2 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition-all duration-100 ease-in-out"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-2 opacity-0"
              >
                <ParticipateForm
                  defaultValues={values[TabType.PARTICIPATE]}
                  ref={(ref) => (formRefs.current[TabType.PARTICIPATE] = ref)}
                  onSubmit={onSubmit}
                />
              </Transition>
            )
          }}
        </Tabs.Panel>
        <Tabs.Panel>
          {({ selected }) => {
            return (
              <Transition
                appear
                show={selected}
                enter="transition-all duration-100 ease-in-out"
                enterFrom="-translate-x-2 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition-all duration-100 ease-in-out"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-2 opacity-0"
              >
                <RewardsForm
                  defaultValues={values[TabType.REWARDS]}
                  ref={(ref) => (formRefs.current[TabType.REWARDS] = ref)}
                  onSubmit={onSubmit}
                />
              </Transition>
            )
          }}
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  )
}

export default CreateRecurrenceQuest
