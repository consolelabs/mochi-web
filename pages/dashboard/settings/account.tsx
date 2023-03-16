import React from 'react'
import type { ReactElement } from 'react'
import DashboardLayout from '~components/Dashboard/Layout'
import { NextPageWithLayout } from '~pages/_app'
import { heading } from '~components/Dashboard/Heading'
import { Input } from '~components/Dashboard/Input'
import { button } from '~components/Dashboard/Button'
import { Icon } from '@iconify/react'

const Field = ({
  label,
  children,
  description,
}: {
  label: string
  children: React.ReactNode
  description?: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col">
        <label className={heading({ size: 'xs' })}>{label}</label>
        {description}
      </div>
      <div>{children}</div>
    </div>
  )
}

const Account: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      <p className={heading({ size: 'sm' })}>Account</p>
      <div className="flex flex-col gap-y-10 mt-10 max-w-sm">
        <Field label="Email">
          <Input className="max-w-[280px]" />
        </Field>
        <Field label="Username">
          <div className="flex gap-x-1">
            <Input prefix="mochi.gg/" />
            <button className={button({ appearance: 'secondary' })}>
              Update
            </button>
          </div>
        </Field>
      </div>
      <hr className="my-10 w-full h-[1.5px] bg-[#DFDFDF]" />
      <div className="flex flex-col gap-y-10">
        <Field label="Password">
          <button
            className={button({ appearance: 'secondary', className: 'px-2' })}
          >
            <Icon icon="material-symbols:lock" className="w-5 h-5" />
            <span className="font-medium text-white">Change password</span>
          </button>
        </Field>
        <Field
          label="Two-Factor Authentication"
          description={
            <span className="mb-4 text-sm text-dashboard-gray-2">
              Protect your account by setting up two-factor authentication
            </span>
          }
        >
          <button
            className={button({ appearance: 'secondary', className: 'px-2' })}
          >
            <Icon icon="mdi:shield-key" className="w-5 h-5" />
            <span className="font-medium text-white">
              Enable Two-Factor Authentication
            </span>
          </button>
        </Field>
      </div>
      <hr className="my-10 w-full h-[1.5px] bg-[#DFDFDF]" />
      <div className="flex flex-col gap-y-10">
        <Field
          label="Delete Account"
          description={
            <span className="mb-4 text-sm text-dashboard-gray-2">
              If you&apos;d like to delete your mochi.gg account, please click
              the &ldquo;Delete My Account&rdquo; button below.
            </span>
          }
        >
          <button
            className={button({ appearance: 'secondary', className: 'px-2' })}
          >
            <Icon icon="tabler:trash-filled" className="w-5 h-5" />
            <span className="font-medium text-white">Delete My Account</span>
          </button>
        </Field>
      </div>
    </div>
  )
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout showSidebar>{page}</DashboardLayout>
}

export default Account
