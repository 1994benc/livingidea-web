
import React from "react";
import { CircularProgress } from "@mui/material";

export default function LoadingSpinner({
    text,
}: {
    text?: string;
}) {
  return (
    <span className="flex gap-2 items-center text-sm text-gray-400">
        <CircularProgress sx={{
            color:"rgb(156 163 175)"
        }} size={15} />
        {text && <span className="ml-1">{text}</span>}
    </span>
  );
}
