import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PAGES, SOCIAL_LINKS } from "~constants";

const NavLinks = ({ className }: { className: string }) => (
  <div className={["flex items-center justify-center", className].join(" ")}>
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
);

export const Navbar = () => (
  <Fragment>
    <nav className="sticky top-0 z-10 bg-white bg-opacity-95 backdrop-blur-md backdrop-filter">
      <div className="flex items-center max-w-5xl px-12 py-5 mx-auto">
        <Link href="/">
          <a className="flex items-center gap-4 text-gray-900 group">
            <div className="transition-shadow duration-200 ease-in-out rounded-full group-hover:shadow-xl w-9 h-9 group-hover:shadow-mochi-200">
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
        <NavLinks className="hidden gap-12 ml-auto sm:flex" />
      </div>
    </nav>
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white sm:hidden bg-opacity-95 backdrop-blur-md backdrop-filter">
      <NavLinks className="gap-12 p-6 text-sm" />
    </div>
  </Fragment>
);
