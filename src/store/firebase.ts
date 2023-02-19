import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAaFXdqrSejQc-duzsiFEfqqS06kJQCumk',
    authDomain: 'sociala-591d1.firebaseapp.com',
    projectId: 'sociala-591d1',
    storageBucket: 'sociala-591d1.appspot.com',
    messagingSenderId: '899679143416',
    appId: '1:899679143416:web:fd192c779fc64b82e9820d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
