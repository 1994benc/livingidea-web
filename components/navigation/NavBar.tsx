import React from "react";
import { PlusCircleIcon, PlusIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { AccountDropdown } from "./AccountDropdown";
import Image from "next/image";
import setProject from "../../services/project/setProject";
import ProjectModel from "../../services/project/ProjectModel";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export default function NavBar() {
  const [user] = useAuthState(getAuth());
  const addNewProject = async () => {
    if (!user) return;
    await setProject(new ProjectModel(v4(), "Untitled", user.uid,[], [], false, new Date(), new Date(), ""));
  };
  return (
    <div className="flex w-full items-center relative justify-between bg-black text-white px-3 pb-2 pt-3">
      <Link href="/">
        <a>
          <div className="mt-2">
            <Image src="/logo-light.svg" alt="logo" width={90} height={28} />
          </div>
        </a>
      </Link>
      <div className="flex items-center gap-3">
        <button onClick={addNewProject} className="icon-btn">
          <PlusCircleIcon className="h-6 w-6" />
          <div>New project</div>
        </button>
        <AccountDropdown />
      </div>
    </div>
  );
}
