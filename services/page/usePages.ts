
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import PageModel from './PageModel';
import { collection, onSnapshot, getFirestore, query, orderBy } from 'firebase/firestore';


export default function usePages(projectId: string) {
    const [data, setData] = useState<PageModel[]>([]);
    
    useEffect(() => {

        if (!projectId) { return };
        const collectionRef = collection(getFirestore(), `projects/${projectId}/pages`);
        const q = query(collectionRef, orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => PageModel.fromJSON({
                ...doc.data(),
                id: doc.id,
            }));

            setData(data);
           
        });

        return () => {
            unsub();
        };
    }, [projectId]);

    return data;

}


