import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/layouts/MainLayout";
import ProjectModel from "../../../services/project/ProjectModel";
import setProject from "../../../services/project/setProject";
import useProject from "../../../services/project/useProject";
import relativeTime from "dayjs/plugin/relativeTime";
import { LastUpdatedComponent } from "../../../components/time/LastUpdatedComponent";
import { motion } from "framer-motion";
import { DocumentAddIcon, TrashIcon } from "@heroicons/react/solid";
import usePages from "../../../services/page/usePages";
import PageModel from "../../../services/page/PageModel";
import { v4 } from "uuid";
import setPage from "../../../services/page/setPage";
import Link from "next/link";
import deleteProject from "../../../services/project/deleteProject";

const debouncedSetProject = _.debounce(setProject, 1000);

function ProjectContent(props: { project: ProjectModel; pages: PageModel[] }) {
  const [projectState, setProjectState] = useState<ProjectModel>();
  const [waitingToBeSaved, setWaitingToBeSaved] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    console.log("ProjectContent: useEffect");
    setProjectState(props.project);
  }, [props.project]);

  const newPage = async () => {
    if (!props.project) {
      return;
    }
    const newPageId = v4();
    const newPage = new PageModel(newPageId, "Untitled");
    await setPage(newPage, props.project.id);
  };

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

      <div className="flex gap-2 justify-between items-center">
        <button onClick={newPage} className="primary-btn">
          <div>
            <DocumentAddIcon className="h-4 w-4" />
          </div>
          Add page
        </button>
        <button
          onClick={async () => {
            await deleteProject(props.project.id);
            router.replace("/")
          }}
          className="minimal-btn text-xs opacity-60 hover:opacity-100"
        >
          <div>
            <TrashIcon className="h-4 w-4" />
          </div>
          Delete project
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {props.pages.map((page) => {
          return (
            <Link
              key={page.id}
              href={`/projects/${props?.project?.id}/pages/${page.id}`}
            >
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
                    scale: 0.65,
                  }}
                >
                  {page.name}
                </motion.div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const project = useProject(projectId as string);
  const pages = usePages(projectId as string);

  return (
    <MainLayout withBackButton={true}>
      {project && (
        <ProjectContent project={project} pages={pages}></ProjectContent>
      )}
    </MainLayout>
  );
}
