import { TOKEN_NAME } from "~constants";

export const NFTWhy = () => (
  <div className="max-w-7xl px-12 py-16 mx-auto">
    <h3 className="font-serif text-4xl font-bold text-center mb-9">
      <span className="text-mochi-gradient">Why mint Mochi NFT?</span>
    </h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
      <div className="px-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 border-gradient">
          <div className="bg-white border-gradient-entry" />
        </div>
        <p className="text-gray-500 px-9">Access to Mochi private channels</p>
      </div>
      <div className="px-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 border-gradient">
          <div className="bg-white border-gradient-entry" />
        </div>
        <p className="text-gray-500 px-9">
          Free access to premium Web3 fetures
        </p>
      </div>
      <div className="px-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 border-gradient">
          <div className="bg-white border-gradient-entry" />
        </div>
        <p className="text-gray-500 px-9">Early join airdrop {TOKEN_NAME}</p>
      </div>
    </div>
  </div>
);
