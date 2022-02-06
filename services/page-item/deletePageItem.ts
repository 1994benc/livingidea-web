
// add your imports here. Remove any imports you don't need.
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';

export default async function deletePageItem(id: string, projectId: string, pageId: string): Promise<boolean> {
    try {
        const path = `projects/${projectId}/pages/${pageId}/page-items/${id}`;
        const docRef = doc(getFirestore(), path);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


