
// add your imports here. Remove any imports you don't need.
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';

export default async function deleteProject(id: string): Promise<boolean> {
    try {
        const docRef = doc(getFirestore(), 'projects/' + id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


