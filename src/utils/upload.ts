import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'store/firebase';
import { updateProfile } from 'firebase/auth';
import { auth } from 'store/firebase';

export const upload = async (file: any) => {
    try {
        const storageRef = ref(storage, `${file.uid}.png`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error(error);
    }
};

export const updateInfo = async (data: any) => {
    try {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                ...data,
            });
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
    }
};
