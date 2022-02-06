import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import LoadingSpinner from "../loader/LoadingSpinner";

export function LastUpdatedComponent(props: {
  lastUpdatedDate: Date;
  /** Set this to true when user starts typing. 
   * It will be set to false by this component everytime a new lastUpdatedDate comes in. */
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  useEffect(() => {
    console.log(
      "Clearing loading state because a new lastUpdatedDate is coming in"
    );
    props.setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lastUpdatedDate]);

  return (
    <div className="flex text-sm mb-2 text-gray-400 justify-end">
      {!props.loading && props.lastUpdatedDate
        ? "Last updated " + dayjs(props.lastUpdatedDate.toString()).fromNow()
        : <LoadingSpinner text="Saving..." />}
    </div>
  );
}
