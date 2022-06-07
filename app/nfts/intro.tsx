import { TOKEN_NAME } from "~constants";

export const NFTIntro = () => (
  <div className="max-w-5xl px-12 py-16 mx-auto">
    <div className="flex flex-col items-center justify-between lg:flex-row">
      <div className="flex flex-col mr-0 lg:mr-24 lg:max-w-xl">
        <div className="max-w-xs mx-auto">
          <div className="block lg:hidden mb-9">
            <div className="flex justify-center w-full gap-2 mb-2">
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
            </div>
            <div className="flex justify-center w-full gap-2 mb-2">
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
            </div>
            <div className="flex justify-center w-full gap-2">
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
              <img src="/logo.png" alt="nft" className="block w-1/4 rounded" />
            </div>
          </div>
        </div>
        <h3 className="font-serif text-4xl font-bold mb-9">
          <span className="text-mochi-gradient">
            Get an exclusive Mochi NFT avatar with different rarity and traits
          </span>
        </h3>
        <p className="mb-9">
          Mochi NFT is a collection of 10,000 unique avatars, randomly-generated
          on the blockchain. Each one has a unique set of traits and rarity. By
          owning an Avatar, holders will have access to the Mochi World’s
          private channels &amp; exclusive crypto features and a free airdrop of{" "}
          {TOKEN_NAME} tokens, the ERC-20 token that will power the upcoming
          Mochi Community Token Platform.
        </p>
      </div>
      <div className="w-full max-w-xl px-6">
        <div className="flex-row items-center hidden gap-2 lg:flex">
          <div className="flex flex-col gap-2">
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
            <img src="/logo.png" alt="nft" className="block w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
