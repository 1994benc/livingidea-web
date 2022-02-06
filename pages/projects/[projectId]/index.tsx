import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/layouts/MainLayout";
import ProjectModel from "../../../services/project/ProjectModel";
import setProject from "../../../services/project/setProject";
import useProject from "../../../services/project/useProject";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LastUpdatedComponent } from "../../../components/time/LastUpdatedComponent";
import { motion } from "framer-motion";
dayjs.extend(relativeTime);

const debouncedSetProject = _.debounce(setProject, 1000);

function ProjectContent(props: { project: ProjectModel }) {
  const [projectState, setProjectState] = useState<ProjectModel>();
  const [waitingToBeSaved, setWaitingToBeSaved] = useState<boolean>(false);

  useEffect(() => {
    console.log("ProjectContent: useEffect");
    setProjectState(props.project);
  }, [props.project]);

  const lastUpdatedDate = props.project?.updatedAt;
  return (
    <div className="flex flex-col gap-4">
      <LastUpdatedComponent
        loading={waitingToBeSaved}
        lastUpdatedDate={lastUpdatedDate}
        setLoading={setWaitingToBeSaved}
      ></LastUpdatedComponent>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="standard-header"
      >
        <input
          className="font-bold minimal-input"
          type="text"
          placeholder="Title"
          value={projectState?.name || ""}
          onChange={async (e) => {
            if (!projectState) {
              return;
            }
            setWaitingToBeSaved(true);
            const newProject = projectState.clone();
            newProject.name = e.target.value;
            setProjectState(newProject);
            await debouncedSetProject(newProject);
          }}
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <textarea
          className="minimal-input"
          placeholder="Description"
          value={projectState?.description || ""}
          onChange={async (e) => {
            if (!projectState) {
              return;
            }
            setWaitingToBeSaved(true);
            const newProject = projectState.clone();
            newProject.description = e.target.value;
            setProjectState(newProject);
            await debouncedSetProject(newProject);
          }}
        />
      </motion.div>
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
