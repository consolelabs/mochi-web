export const FeaturesSection = () => (
  <div className="max-w-5xl px-12 py-16 mx-auto" id="features">
    <h2 className="mb-12 font-serif text-3xl text-center md:text-4xl lg:text-5xl">
      Mochi Features
    </h2>
    <div className="flex flex-wrap items-center mb-12 md:flex-nowrap">
      <div className="w-full max-w-md mx-auto text-center md:text-left">
        <h3 className="font-serif text-2xl">Mochi website copywrite</h3>
        <p className="my-5">
          Mochi helps to verify wallets of newcomers to let them enjoy the best
          of Discord and start earning on your server.
        </p>
      </div>
      <div className="relative w-full mx-auto -mt-12 pointer-events-none md:mt-0 md:max-w-lg md:flex-1 md:ml-9">
        <div className="absolute w-24 h-24 rounded-full shadow-xl blur-3xl bg-sky-500 right-16 top-12 shadow-sky-500" />
        <img
          src="/assets/verify.png"
          alt="Verify user"
          className="relative block"
        />
      </div>
    </div>
    <div className="flex flex-wrap-reverse items-center mb-12 md:flex-nowrap">
      <div className="relative w-full mx-auto -mt-12 pointer-events-none md:max-w-lg md:mt-0 md:flex-1 md:mr-9">
        <div className="absolute w-24 h-24 rounded-full shadow-xl blur-3xl bg-violet-500 left-12 top-16 shadow-violet-500" />
        <img src="/assets/tip.png" alt="Tip" className="relative block" />
      </div>
      <div className="w-full max-w-md mx-auto text-center md:text-left">
        <h3 className="font-serif text-2xl">Instant Crypto Transfer</h3>
        <p className="my-5">
          Send any amount of any token to an user or users with specific role,
          using only a simple one-line command, even a 5-year-old could do it.
          Engage your friends into cryptocurrency.
        </p>
      </div>
    </div>
    <div className="flex flex-wrap items-center mb-12 md:flex-nowrap">
      <div className="w-full max-w-md mx-auto text-center md:text-left">
        <h3 className="font-serif text-2xl">
          Comprehensive Cryptocurrency Ticker
        </h3>
        <p className="my-5">
          Watch and track crypto prices with intelligible visuals, get
          notifications of your favored tokens. Keep up with the market right on
          your server.
        </p>
      </div>
      <div className="relative w-full mx-auto -mt-12 pointer-events-none md:mt-0 md:max-w-lg md:flex-1 md:ml-9">
        <div className="absolute w-24 h-24 bg-teal-400 rounded-full shadow-xl blur-3xl bottom-12 right-16 shadow-teal-400" />
        <img
          src="/assets/ticker.png"
          alt="Verify user"
          className="relative block"
        />
      </div>
    </div>
    <div className="mb-12 font-serif text-2xl text-center md:text-3xl lg:text-4xl">
      And more...
    </div>
  </div>
);
