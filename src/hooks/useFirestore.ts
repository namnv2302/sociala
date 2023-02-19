import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from 'store/firebase';

export const useFirestore = (collectionName: string, condition: any) => {
    const [value, setValue] = useState([]);

    useEffect(() => {
        let colRef: any = collection(db, collectionName);
        if (condition) {
            colRef = query(colRef, where(condition.fieldName, condition.operator, condition.compareValue));
        }
        const unsubscribe = onSnapshot(colRef, (querySnapshot: any) => {
            const documents: any = [];
            querySnapshot.forEach((doc: any) => {
                documents.push(doc.data());
            });
            setValue(documents);
        });

        return unsubscribe;
    }, [collectionName, condition]);

    return value ? value : [];
};
