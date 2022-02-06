// add your imports here. Remove any imports you don't need.
import { doc, setDoc, getFirestore } from "firebase/firestore";
import PageItemModel from "./PageItemModel";

export default async function setPageItem(
  data: PageItemModel,
  projectId: string,
  pageId: string
): Promise<boolean> {
  try {
    const path = `projects/${projectId}/pages/${pageId}/page-items/${data.id}`;
    const docRef = doc(getFirestore(), path);
    await setDoc(docRef, data.toJSON(), { merge: true });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
