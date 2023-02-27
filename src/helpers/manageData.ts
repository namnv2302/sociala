import {
    doc,
    setDoc,
    query,
    collection,
    getDocs,
    where,
    updateDoc,
    deleteField,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from 'store/firebase';
import moment from 'moment';

export const addDocument = async (collectionName: string, payload: any) => {
    try {
        await setDoc(doc(db, collectionName, payload.uid || payload.id), {
            ...payload,
            timestamp: serverTimestamp(),
            createdAt: moment().format('DD/MM/YYYY hh:mm'),
        });
    } catch (err: any) {
        throw new Error(err);
    }
};

export const getMultiDoc = async (collectionName: string, condition: any) => {
    try {
        const data: any = [];
        const q = query(
            collection(db, collectionName),
            where(condition.fieldName, condition.operator, condition.compareValue),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updateDocument = async (collectionName: string, id: string, fieldsData: any) => {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, fieldsData);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteFieldsDoc = async (collectionName: string, id: string, fieldsName: string) => {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, {
            [fieldsName]: deleteField(),
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
