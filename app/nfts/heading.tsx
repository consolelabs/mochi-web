import { CheckBadgeIcon } from '@heroicons/react/24/solid'

export const NFTHeading = () => (
  <div className="relative pt-24 -mt-20">
    <div className="absolute w-32 h-32 top-64 left-1/3 bg-mochi blur-4xl" />
    <div className="absolute w-28 h-28 top-80 right-1/3 bg-amber-500 blur-4xl" />
    <div className="max-w-7xl px-12 py-24 mx-auto">
      <h2 className="mb-12 text-5xl text-center">
        <span className="font-black uppercase text-mochi-gradient">
          {' '}
          Exclusive Web3 Community
        </span>
      </h2>
      <div className="flex flex-col max-w-md gap-4 mx-auto">
        <div className="flex gap-4">
          <CheckBadgeIcon className="flex-shrink-0 w-6 h-6 text-mochi" />
          <p className="flex-1 font-medium">
            Share experiences, set up groundbreaking partnerships, win together.
          </p>
        </div>
        <div className="flex gap-4">
          <CheckBadgeIcon className="flex-shrink-0 w-6 h-6 text-mochi" />
          <p className="flex-1 font-medium">
            10,000 unique, beautifully crafted NFT avatars
          </p>
        </div>
      </div>
    </div>
  </div>
)
