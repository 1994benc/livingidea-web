// add your imports here. Remove any imports you don't need.
import { doc, setDoc, getFirestore } from "firebase/firestore";
import PageModel from "./PageModel";

export default async function setPage(
  data: PageModel,
  projectId: string
): Promise<boolean> {
  try {
    const docRef = doc(
      getFirestore(),
      `projects/${projectId}/pages/${data.id}`
    );
    await setDoc(docRef, data.toJSON(), { merge: true });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
