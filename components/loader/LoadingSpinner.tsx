import React from "react";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function LoadingSpinner({ text }: { text?: string }) {
  return (
    <span className="flex gap-2 items-center text-sm text-gray-400">
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <CircularProgress
          sx={{
            color: "rgb(156 163 175)",
          }}
          size={15}
        />
      </motion.span>
      {text && (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="ml-1"
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}
