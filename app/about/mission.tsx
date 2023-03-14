import { Icon } from '@iconify/react'

export const Mission = () => (
  <div className="flex relative flex-wrap-reverse mb-12 text-lg md:flex-nowrap">
    <div className="absolute top-12 right-36 w-24 h-24 rounded-full shadow-xl bg-mochi-400 blur-3xl shadow-mochi-400" />
    <div className="md:flex-1 md:pr-12">
      <p className="mb-4">
        At Mochi, we seek to foster human development, and endeavor to help you
        find more meaningful connections during the blockchain era.
      </p>
      <p className="mb-4">
        To do that, we ensure our operation stays on the right path by following
        these core values:
      </p>
      <ul className="pl-6">
        <li className="flex gap-2">
          <Icon
            icon="heroicons-heart-solid"
            className="flex-shrink-0 mt-1 w-5 h-5 text-mochi"
          />
          <div className="flex-1">
            <span className="font-bold text-mochi">Built on trust</span> — We
            build our products with care and love for our users, to earn their
            trust, respect, and appreciation.
          </div>
        </li>
        <li className="flex gap-2">
          <Icon
            icon="heroicons:rectangle-stack-solid"
            className="flex-shrink-0 mt-1 w-5 h-5 text-mochi"
          />
          <div className="flex-1">
            <span className="font-bold text-mochi">Altruistic service</span> —
            We act with the best interest and well-being of our users in mind.
            Everything for our users.
          </div>
        </li>
      </ul>
    </div>
    <div
      className="overflow-hidden relative mx-auto mt-4 mb-9 w-48 h-48 bg-center bg-cover rounded-lg"
      style={{ backgroundImage: 'url(/logo.png)' }}
    />
  </div>
)
