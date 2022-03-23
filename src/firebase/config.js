
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDCWKTLA1t5YMzbW6FK_NFkZek_PdYGIOA",
    authDomain: "animabooks-49cf1.firebaseapp.com",
    projectId: "animabooks-49cf1",
    storageBucket: "animabooks-49cf1.appspot.com",
    messagingSenderId: "761814457119",
    appId: "1:761814457119:web:bcf26ebc8f84eb42556e2a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
auth.languageCode = 'es';
export default function getFirestoreApp() {
    return app;
} 