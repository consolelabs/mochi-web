import Image from "next/image";
import Link from "next/link";
import { PAGES, SOCIAL_LINKS } from "~constants";

export const Navbar = () => (
  <nav className="sticky top-0 z-10 bg-white bg-opacity-95 backdrop-blur-md backdrop-filter">
    <div className="flex items-center max-w-5xl px-12 py-5 mx-auto">
      <Link href="/">
        <a className="text-gray-900 flex items-center gap-4 group">
          <div className="rounded-full group-hover:shadow-xl w-9 h-9 group-hover:shadow-mochi-200">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="block rounded-full"
            />
          </div>
          <span className="font-black uppercase">
            Mochi<span className="text-mochi">.</span>
          </span>
        </a>
      </Link>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-12 py-6 ml-auto sm:py-0 sm:relative">
        <Link href={PAGES.ABOUT.path}>
          <a className="font-semibold">{PAGES.ABOUT.title}</a>
        </Link>
        <Link href={PAGES.NFT.path}>
          <a className="font-semibold">{PAGES.NFT.title}</a>
        </Link>
        <a
          className="font-semibold"
          href={SOCIAL_LINKS.DISCORD}
          target="_blank"
          rel="noreferrer"
        >
          Support Server
        </a>
      </div>
    </div>
  </nav>
);
