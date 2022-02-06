// add your imports here. Remove any imports you don't need.
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

export default async function deletePage(
  id: string,
  projectId: string
): Promise<boolean> {
  try {
    const docRef = doc(
      getFirestore(),
      `projects/${projectId}/pages/${id}`
    );
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
