
// add your imports here. Remove any imports you don't need.
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import ProjectModel from './ProjectModel';

export default async function setProject(data: ProjectModel): Promise<boolean> {
    try {
        const docRef = doc(getFirestore(), 'projects/' + data.id);
        await setDoc(docRef, data.toJSON(), { merge: true });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


