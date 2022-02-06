
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import ProjectModel from './ProjectModel';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';


export default function useProjects() {
    const [data, setData] = useState<ProjectModel[]>([]);
    
    useEffect(() => {
        const collectionRef = collection(getFirestore(), 'projects');
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ProjectModel.fromJSON({
                ...doc.data(),
                id: doc.id,
            }));

            setData(data);
            return () => {
                unsub();
            };
        });
    }, []);

    return data;

}


