import Button from "~components/button";
import { DiscordIcon } from "~components/icons/discord";
import { INVITE_LINK } from "~constants";

export const AddBotSection = () => (
  <div className="max-w-7xl px-12 py-16 mx-auto">
    <div
      className="overflow-hidden bg-center bg-cover rounded-lg"
      style={{ backgroundImage: `url("/assets/mochi.png")` }}
    >
      <div className="px-12 py-9 bg-mochi bg-opacity-90">
        <div className="max-w-lg mx-auto mb-6 text-3xl font-bold text-center text-white">
          Level up your Discord server now!
          <br />
          No strings attached!
        </div>
        <div className="flex justify-center">
          <Button
            href={INVITE_LINK}
            color="white"
            className="flex items-center gap-4 mx-auto"
          >
            <DiscordIcon className="w-5 h-5" />
            <span>Invite to Discord</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
