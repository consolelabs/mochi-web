export const FeaturesSection = () => (
  <div className="max-w-5xl px-12 py-16 mx-auto" id="features">
    <h2 className="mb-12 font-serif text-3xl text-center">Mochi Features</h2>
    <div className="flex items-center mb-12">
      <div className="w-full max-w-md">
        <h3 className="font-serif text-2xl">
          User&rsquo;s wallet verification
        </h3>
        <p className="my-5">
          Mochi can help verify newcomers wallet to start participate and earn
          on your server.
        </p>
      </div>
      <div className="flex-1 w-full max-w-lg pointer-events-none ml-9">
        <img src="/assets/verify.png" alt="Verify user" className="block" />
      </div>
    </div>
    <div className="flex items-center mb-12">
      <div className="flex-1 w-full max-w-lg pointer-events-none mr-9">
        <img src="/assets/tip.png" alt="Tip" className="block" />
      </div>
      <div className="w-full max-w-md">
        <h3 className="font-serif text-2xl">Send crypto or tip to anyone</h3>
        <p className="my-5">
          Tip an user or role amount of tokens you want with a very simple and
          intuitive command. Engage your friends into cryptocurrency.
        </p>
      </div>
    </div>
    <div className="flex items-center mb-12">
      <div className="w-full max-w-md">
        <h3 className="font-serif text-2xl">Cryptocurrency ticker</h3>
        <p className="my-5">
          Watch crypto price, track it and notify of any token that you
          favorite.
          <br />
          Including a price chart for a better tracker visualization experience.
        </p>
      </div>
      <div className="flex-1 w-full max-w-lg pointer-events-none ml-9">
        <img src="/assets/ticker.png" alt="Verify user" className="block" />
      </div>
    </div>
    <div className="mb-12 font-serif text-2xl text-center">And more...</div>
  </div>
);
