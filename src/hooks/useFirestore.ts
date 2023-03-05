import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from 'store/firebase';

export const useFirestore = (collectionName: string, order: string, condition?: any) => {
    const [value, setValue] = useState([]);

    useEffect(() => {
        let colRef: any = collection(db, collectionName);
        if (condition) {
            colRef = query(
                colRef,
                where(condition.fieldName, condition.operator, condition.compareValue),
                orderBy(`${order}`),
            );
        }
        const unsubscribe = onSnapshot(colRef, (querySnapshot: any) => {
            const documents: any = [];
            querySnapshot.forEach((doc: any) => {
                documents.push(doc.data());
            });
            setValue(documents);
        });

        return unsubscribe;
    }, [collectionName, condition, order]);

    return value ? value : [];
};
