import { TrashIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import useProjects from "../../services/project/useProjects";

function Card(props: {
  title: string;
  description: string;
  onDelete: (e: any) => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="card relative"
      whileTap={{
        scale: 0.8,
      }}
    >
      <div className="font-bold mb-2 text-living-blue">{props.title}</div>
      {props.description && (
        <div className="text-sm text-gray-400">{props.description}</div>
      )}
    </motion.div>
  );
}

export default function MyOwnProjects() {
  const projects = useProjects("owned");
  return (
    <div>
      <motion.h1
        animate={{
          opacity: 1,
          transform: "translateX(0px)",
        }}
        initial={{
          opacity: 0,
          transform: "translateX(-100px)",
        }}
        className="standard-header"
      >
        💡 My projects
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <a>
              <Card
                title={project.name}
                description={project.description || "✍️ No description"}
                onDelete={() => {
                  console.log("delete");
                }}
              ></Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
