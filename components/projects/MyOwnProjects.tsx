import Link from "next/link";
import React from "react";
import useProjects from "../../services/project/useProjects";

export default function MyOwnProjects() {
  const projects = useProjects("owned");
  return (
    <div>
      <h1 className="standard-header">💡 My projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <a>
              <div className="card">
                <div className="font-bold mb-2 text-living-blue">{project.name}</div>
                <div className="text-sm text-gray-400">{project.description || "✍️ No description"}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
