import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/layouts/MainLayout";
import ProjectModel from "../../../services/project/ProjectModel";
import useProject from "../../../services/project/useProject";

function ProjectContent(props: { project: ProjectModel }) {
  const [projectState, setProjectState] = useState<ProjectModel>();

  useEffect(() => {
    console.log("ProjectContent: useEffect");
    setProjectState(props.project);
  }, [props.project]);

  return (
    <div className="flex flex-col gap-4">
      <div className="standard-header">
        <input
          className="font-bold minimal-input"
          type="text"
          placeholder="Title"
          value={projectState?.name || ""}
          onChange={(e) => {
            if (!projectState) {
              return;
            }
            const newProject = projectState.clone();
            newProject.name = e.target.value;
            setProjectState(newProject);
          }}
        />
      </div>

      <div>
        <textarea
          className="minimal-input"
          placeholder="Description"
          value={projectState?.description || ""}
          onChange={(e) => {
            if (!projectState) {
              return;
            }
            const newProject = projectState.clone();
            newProject.description = e.target.value;
            setProjectState(newProject);
          }}
        />
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const project = useProject(projectId as string);

  return (
    <MainLayout withBackButton={true}>
      {project && <ProjectContent project={project}></ProjectContent>}
    </MainLayout>
  );
}
