// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from "react";
import ProjectModel from "./ProjectModel";
import {
  collection,
  onSnapshot,
  getFirestore,
  query,
  where,
  Query,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export default function useProjects(
  type: "owned" | "collaboratable" | "viewable" | "public"
) {
  const [user] = useAuthState(getAuth());
  const [data, setData] = useState<ProjectModel[]>([]);

  useEffect(() => {
    const collectionRef = collection(getFirestore(), "projects");
    let q: Query;
    if (type === "owned" && user) {
      q = query(
        collectionRef,
        where("owner", "==", user?.uid),
        orderBy("createdAt", "asc")
      );
    } else if (type === "collaboratable" && user) {
      q = query(
        collectionRef,
        where("collaborators", "array-contains", user?.uid),
        orderBy("createdAt", "asc")
      );
    } else if (type === "viewable" && user) {
      q = query(
        collectionRef,
        where("viewers", "array-contains", user?.uid),
        orderBy("createdAt", "asc")
      );
    } else if (type === "public") {
      q = query(
        collectionRef,
        where("public", "==", true),
        orderBy("createdAt", "asc")
      );
    } else {
      return;
    }
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) =>
        ProjectModel.fromJSON({
          ...doc.data(),
          id: doc.id,
        })
      );

      setData(data);
    });

    return () => {
      unsub();
    };
  }, [user, type]);

  return data;
}
