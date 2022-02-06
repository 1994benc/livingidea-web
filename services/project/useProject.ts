
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import ProjectModel from './ProjectModel';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';


export default function useProject(id: string) {
    const [data, setData] = useState<ProjectModel>();
    
    useEffect(() => {
        if (!id) {
            return;
        }
        const docRef = doc(getFirestore(), 'projects/' + id);
        const unsub = onSnapshot(docRef, (snapshot) => {
            const data = ProjectModel.fromJSON({
                ...snapshot.data(),
                id: snapshot.id,
            });

            setData(data);
           
        });

        return () => {
            unsub();
        };
    }, [id]);

    return data;

}


