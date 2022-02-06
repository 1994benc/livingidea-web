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
import { useRouter } from "next/router";

export default function NavBar() {
  const [user] = useAuthState(getAuth());
  const router = useRouter();
  const addNewProject = async () => {
    if (!user) return;
    const newProjectId = v4();
    await setProject(
      new ProjectModel(
        newProjectId,
        "Untitled",
        user.uid,
        [],
        [],
        false,
        new Date(),
        new Date(),
        ""
      )
    );
    router.push(`/projects/${newProjectId}`);
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
