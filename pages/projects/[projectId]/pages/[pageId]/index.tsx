import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MainLayout from "../../../../../components/layouts/MainLayout";
import { LastUpdatedComponent } from "../../../../../components/time/LastUpdatedComponent";
import PageModel from "../../../../../services/page/PageModel";
import setPage from "../../../../../services/page/setPage";
import usePage from "../../../../../services/page/usePage";

const debouncedSetPage = _.debounce(setPage, 1000);

function PageContent(props: { page: PageModel; projectId: string }) {
  const [pageState, setPageState] = useState<PageModel>();
  const [waitingToBeSaved, setWaitingToBeSaved] = useState<boolean>(false);

  useEffect(() => {
    console.log("PageContent: useEffect");
    setPageState(props.page);
  }, [props.page]);
  return (
    <div>
      <LastUpdatedComponent
        loading={waitingToBeSaved}
        setLoading={setWaitingToBeSaved}
        lastUpdatedDate={props.page?.updatedAt}
      />
      <input
        type="text"
        className="font-bold minimal-input"
        value={pageState?.name || ""}
        onChange={async (e) => {
          
          const newPage = pageState?.clone();
          if (!newPage) return;
          setWaitingToBeSaved(true);
          newPage.name = e.target.value;
          setPageState(newPage);
          // TODO: debounce
          await debouncedSetPage(newPage, props.projectId);
        }}
      ></input>
    </div>
  );
}

export default function PageInProject() {
  const router = useRouter();
  const { projectId, pageId } = router.query;
  const page = usePage(pageId as string, projectId as string);

  return (
    <MainLayout withBackButton={true}>
      {projectId && pageId && page && (
        <PageContent page={page} projectId={projectId as string}></PageContent>
      )}
    </MainLayout>
  );
}
