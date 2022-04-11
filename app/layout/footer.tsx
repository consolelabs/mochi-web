import Image from "next/image";
import { DiscordIcon } from "~components/icons/discord";
import { TwitterIcon } from "~components/icons/twitter";
import { SOCIAL_LINKS } from "~constants";
import s from "./footer.module.css";

export const Footer = () => (
  <footer className="pt-16 pb-32 mt-auto">
    <div className="max-w-5xl px-12 mx-auto">
      <div className="flex flex-wrap">
        <div className="text-sm text-gray-500 w-full md:w-2/5">
          <div className="flex items-center gap-4">
            <div className={s.logoGrow}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="block rounded-full"
              />
            </div>
            <span className="text-lg font-black uppercase text-gray-900">
              Mochi<span className="text-mochi">.</span>
            </span>
          </div>
          <p className="text-xs my-6">
            Our mission is to bring and connect communities, users, and
            blockchain together closer and building the best grow tool for your
            Discord server.
          </p>
          <div className="flex items-center gap-4">
            <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noreferrer">
              <TwitterIcon className="w-4 h-4 text-gray-500" />
            </a>
            <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">
              <DiscordIcon className="w-4 h-4 text-gray-500" />
            </a>
          </div>
        </div>
        <div className="flex gap-6 w-full md:w-3/5"></div>
      </div>
      <div className="pt-6 text-xs text-gray-500">
        Copyright &copy; 2022+ MochiBot, All rights reserved
      </div>
    </div>
  </footer>
);
