import { Icon } from '@iconify/react'

export const NFTHeading = () => (
  <div className="relative pt-24 -mt-20">
    <div className="absolute top-64 left-1/3 w-32 h-32 bg-mochi blur-4xl" />
    <div className="absolute top-80 right-1/3 w-28 h-28 bg-amber-500 blur-4xl" />
    <div className="py-24 px-12 mx-auto max-w-7xl">
      <h2 className="mb-12 text-5xl text-center">
        <span className="font-black uppercase text-mochi-gradient">
          {' '}
          Exclusive Web3 Community
        </span>
      </h2>
      <div className="flex flex-col gap-4 mx-auto max-w-md">
        <div className="flex gap-4">
          <Icon
            icon="heroicons:check-badge-solid"
            className="flex-shrink-0 w-6 h-6 text-mochi"
          />
          <p className="flex-1 font-medium">
            Share experiences, set up groundbreaking partnerships, win together.
          </p>
        </div>
        <div className="flex gap-4">
          <Icon
            icon="heroicons:check-badge-solid"
            className="flex-shrink-0 w-6 h-6 text-mochi"
          />
          <p className="flex-1 font-medium">
            10,000 unique, beautifully crafted NFT avatars
          </p>
        </div>
      </div>
    </div>
  </div>
)
