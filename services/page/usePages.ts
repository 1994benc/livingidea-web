
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import PageModel from './PageModel';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';


export default function usePages(projectId: string) {
    const [data, setData] = useState<PageModel[]>([]);
    
    useEffect(() => {
        const collectionRef = collection(getFirestore(), `projects/${projectId}/pages`);
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => PageModel.fromJSON({
                ...doc.data(),
                id: doc.id,
            }));

            setData(data);
           
        });

        return () => {
            unsub();
        };
    }, []);

    return data;

}


