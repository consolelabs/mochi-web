import Button from "~components/button";
import { DiscordIcon } from "~components/icons/discord";

export const AddBotSection = () => (
  <div className="max-w-5xl px-12 py-16 mx-auto">
    <div
      className="rounded-lg overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("/assets/mochi.jpg")` }}
    >
      <div className="px-12 py-9 bg-mochi bg-opacity-90">
        <div className="text-center text-3xl font-bold text-white max-w-lg mx-auto mb-6">
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
