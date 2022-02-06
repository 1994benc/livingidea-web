import React from "react";
import { PlusCircleIcon, PlusIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { AccountDropdown } from "./AccountDropdown";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="flex w-full items-center relative justify-between bg-black text-white px-3 pb-2 pt-3">
      <Link href="/">
        <a>
          <div className="mt-1">
            <Image src="/logo-light.svg" alt="logo" width={100} height={28} />
          </div>
        </a>
      </Link>
      <div className="flex items-center gap-3">
        <button className="icon-btn">
          <PlusCircleIcon className="h-6 w-6" />
          <div>New project</div>
        </button>
        <AccountDropdown />
      </div>
    </div>
  );
}
