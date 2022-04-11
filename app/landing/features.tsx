export const FeaturesSection = () => (
  <div className="max-w-5xl px-12 py-16 mx-auto" id="features">
    <h2 className="text-center text-3xl font-bold mb-12 font-serif">
      Mochi Features
    </h2>
    <div className="flex items-center mb-12">
      <div className="max-w-md w-full">
        <h3 className="text-2xl font-semibold font-serif">
          User&rsquo;s wallet verification
        </h3>
        <p className="my-5">
          Mochi can help verify newcomers wallet to start participate and earn
          on your server.
        </p>
      </div>
      <div className="flex-1 max-w-lg w-full ml-9 pointer-events-none">
        <img src="/assets/verify.png" alt="Verify user" className="block" />
      </div>
    </div>
    <div className="flex items-center mb-12">
      <div className="flex-1 max-w-lg w-full mr-9 pointer-events-none">
        <img src="/assets/tip.png" alt="Tip" className="block" />
      </div>
      <div className="max-w-md w-full">
        <h3 className="text-2xl font-semibold font-serif">
          Send crypto or tip to anyone
        </h3>
        <p className="my-5">
          Tip an user or role amount of tokens you want with a very simple and
          intuitive command. Engage your friends into cryptocurrency.
        </p>
      </div>
    </div>
    <div className="flex items-center mb-12">
      <div className="max-w-md w-full">
        <h3 className="text-2xl font-semibold font-serif">
          Cryptocurrency ticker
        </h3>
        <p className="my-5">
          Watch crypto price, track it and notify of any token that you
          favorite.
          <br />
          Including a price chart for a better tracker visualization experience.
        </p>
      </div>
      <div className="flex-1 max-w-lg w-full ml-9 pointer-events-none">
        <img src="/assets/ticker.png" alt="Verify user" className="block" />
      </div>
    </div>
    <div className="mb-12 text-center text-2xl font-semibold font-serif">
      And more...
    </div>
  </div>
);
