import Button from "~components/button";
import { DiscordIcon } from "~components/icons/discord";

export const AddBotSection = () => (
  <div className="max-w-5xl px-12 py-16 mx-auto">
    <div
      className="overflow-hidden bg-center bg-cover rounded-lg"
      style={{ backgroundImage: `url("/assets/mochi.png")` }}
    >
      <div className="px-12 py-9 bg-mochi bg-opacity-90">
        <div className="max-w-lg mx-auto mb-6 text-3xl font-bold text-center text-white">
          Let&apos;s start to level up your Discord server for free!
        </div>
        <Button color="white" className="flex items-center gap-4 mx-auto">
          <DiscordIcon className="w-5 h-5" />
          <span>Add to Discord</span>
        </Button>
      </div>
    </div>
  </div>
);
