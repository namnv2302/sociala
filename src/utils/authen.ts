import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db, auth } from 'store/firebase';
import { v4 } from 'uuid';
import { addDocument } from '@helpers/manageData';
import { updateInfo } from '@utils/upload';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDocument('users', {
                id: v4(),
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });
        }
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const registerWithEmailAndPassword = async (email: string, password: string, name: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
        }
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDocument('users', {
                id: v4(),
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });
        }
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user;
    } catch (error) {
        console.error(error);
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
};
