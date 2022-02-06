import React from "react";
import NavBar from "../navigation/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <div className="mx-auto p-16">{children}</div>
    </div>
  );
}
