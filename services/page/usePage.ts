
// add your imports here. Remove any imports you don't need.
import { useState, useEffect } from 'react';
import PageModel from './PageModel';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';


export default function usePage(id: string, projectId: string) {
    const [data, setData] = useState<PageModel>();
    
    useEffect(() => {
        if (!id) {
            return;
        }
        const docRef = doc(getFirestore(), `projects/${projectId}/pages/${id}`);
        const unsub = onSnapshot(docRef, (snapshot) => {
            const data = PageModel.fromJSON({
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


