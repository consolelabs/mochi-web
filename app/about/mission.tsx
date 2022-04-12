import { CollectionIcon, HeartIcon } from "@heroicons/react/solid";

export const Mission = () => (
  <div className="relative flex mb-12 text-lg">
    <div className="absolute w-24 h-24 rounded-full shadow-xl bg-mochi-400 blur-3xl top-12 right-36 shadow-mochi-400" />
    <div className="flex-1 pr-12">
      <p className="mb-6">
        At our core we seek to foster human flourishing in the blockchain era,
        and endeavor to help people find more connections and meaning in the
        relationships they build. In order to do that, we operate by following
        core values to ensure we stay on the right path:
      </p>
      <ul className="pl-6">
        <li className="flex gap-2">
          <HeartIcon className="flex-shrink-0 w-5 h-5 mt-1 text-mochi" />
          <div className="flex-1">
            <span className="font-bold text-mochi">Build on trust</span> — All
            our products with care and love for our users, earn their trust,
            respect, and appreciation.
          </div>
        </li>
        <li className="flex gap-2">
          <CollectionIcon className="flex-shrink-0 w-5 h-5 mt-1 text-mochi" />
          <div className="flex-1">
            <span className="font-bold text-mochi">Service</span> — Act in users
            service, always start with their wellbeing.
          </div>
        </li>
      </ul>
    </div>
    <div
      className="relative w-48 h-48 overflow-hidden bg-center bg-cover rounded-lg"
      style={{ backgroundImage: "url(/logo.png)" }}
    />
  </div>
);
