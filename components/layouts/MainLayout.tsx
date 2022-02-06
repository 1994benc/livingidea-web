import { BackspaceIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import NavBar from "../navigation/NavBar";

export default function MainLayout({
  children,
  withBackButton = false,
}: {
  children: React.ReactNode;
  withBackButton?: boolean;
}) {
  const router=useRouter();
  return (
    <div>
      <NavBar />

      <div className="mx-auto p-12 max-w-5xl">
        {withBackButton && (
          <div className="flex mb-6 justify-start items-center">
            <button onClick={() => {
              router.back();
            }} className="minimal-btn text-xs"><ChevronLeftIcon className="h-4 -ml-2 w-4" />Back</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
