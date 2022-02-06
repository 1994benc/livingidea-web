import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import useProjects from "../../services/project/useProjects";

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
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="card"
                whileTap={{
                  scale: 0.8,
                }}
              >
                <div className="font-bold mb-2 text-living-blue">
                  {project.name}
                </div>
                <div className="text-sm text-gray-400">
                  {project.description || "✍️ No description"}
                </div>
              </motion.div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
