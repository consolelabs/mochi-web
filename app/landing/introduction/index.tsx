import { CONFIG } from "~app/layout/seo";
import Button from "~components/button";
import { DiscordIcon } from "~components/icons/discord";
import { INVITE_LINK, JP_NAME } from "~constants";
import s from "./introduction.module.css";

export const IntroductionSection = () => (
  <div className={s.container}>
    <div className={s.illustration}>
      <div className={s.circle}>
        <div className={[s.textMochi, s.aft, s.textMochiOutline].join(" ")}>
          {JP_NAME}
        </div>
        <div
          className={[s.textMochi, s.aft, s.textMochiOutline, s.next].join(" ")}
        >
          {JP_NAME}
        </div>
        <div className={s.textMochi}>{JP_NAME}</div>
        <div className={[s.textMochi, s.textMochiOutline, s.bef].join(" ")}>
          {JP_NAME}
        </div>
        <div
          className={[s.textMochi, s.textMochiOutline, s.bef, s.next].join(" ")}
        >
          {JP_NAME}
        </div>
      </div>
      <div className={s.image} />
    </div>
    <div className={s.entry}>
      <h2 className="mb-4 font-serif text-3xl">{CONFIG.description}</h2>
      <p className="mb-8 text-lg text-gray-600">
        Easy leveling, moderation, tips, and much more fun in yourd Discord
        server!
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button href={INVITE_LINK} className="flex items-center gap-4">
          <DiscordIcon className="w-5 h-5" />
          <span>Get Mochi</span>
        </Button>
        <Button
          color="white"
          onClick={() => {
            const feature = document.getElementById("features");
            if (!feature) return;
            window?.scrollTo({
              top: feature.offsetTop - 36,
              behavior: "smooth",
            });
          }}
        >
          Features
        </Button>
      </div>
    </div>
  </div>
);
