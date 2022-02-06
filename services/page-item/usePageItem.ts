
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import PageItemModel from './PageItemModel';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';


export default function usePageItem(id: string, projectId: string, pageId: string) {
    const [data, setData] = useState<PageItemModel>();
    
    useEffect(() => {
        if (!id || !projectId || !pageId) {
            return;
        }
        const path = `projects/${projectId}/pages/${pageId}/page-items/${id}`;
        const docRef = doc(getFirestore(), path);
        const unsub = onSnapshot(docRef, (snapshot) => {
            const data = PageItemModel.fromJSON({
                ...snapshot.data(),
                id: snapshot.id,
            });

            setData(data);
            
        });

        return () => {
            unsub();
        };
    }, [id, pageId, projectId]);

    return data;

}


