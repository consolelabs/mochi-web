import { useCountdown } from "~hooks/useCountdown";
import { padding } from "~utils/string";

const PUBLIC_MINT_TIME = 1652547600000;

export const NFTMint = () => {
  const [days, hours, minutes, seconds] = useCountdown(PUBLIC_MINT_TIME);

  return (
    <div className="max-w-5xl px-12 py-16 mx-auto">
      <div className="border-gradient">
        <div className="bg-white border-gradient-entry" />
        <div className="relative p-9 lg:p-12">
          <h3 className="font-serif text-4xl font-bold text-center">
            <span className="text-mochi-gradient">Mint your pass</span>
          </h3>
          <div className="max-w-lg mx-auto">
            <p className="mb-6 text-center text-gray-500">Public mint in...</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold md:text-5xl lg:text-6xl text-mochi-500">
                  {padding(days)}
                </div>
                <p className="text-xs text-gray-500 uppercase md:text-base">
                  day{days > 1 && "s"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold md:text-5xl lg:text-6xl text-mochi-600">
                  {padding(hours)}
                </div>
                <p className="text-xs text-gray-500 uppercase md:text-base">
                  hour{hours > 1 && "s"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold md:text-5xl lg:text-6xl text-mochi-700">
                  {padding(minutes)}
                </div>
                <p className="text-xs text-gray-500 uppercase md:text-base">
                  minute{minutes > 1 && "s"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold md:text-5xl lg:text-6xl text-mochi-800">
                  {padding(seconds)}
                </div>
                <p className="text-xs text-gray-500 uppercase md:text-base">
                  second{seconds > 1 && "s"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
