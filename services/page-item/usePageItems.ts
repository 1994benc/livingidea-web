
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import PageItemModel from './PageItemModel';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';


export default function usePageItems(projectId: string, pageId: string) {
    const [data, setData] = useState<PageItemModel[]>([]);
    
    useEffect(() => {
        if (!projectId || !pageId) {
            return;
        }

        const path = `projects/${projectId}/pages/${pageId}/page-items`;
        const collectionRef = collection(getFirestore(), path);
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => PageItemModel.fromJSON({
                ...doc.data(),
                id: doc.id,
            }));

            setData(data);
           
        });

        return () => {
            unsub();
        };

    }, [pageId, projectId]);

    return data;

}


