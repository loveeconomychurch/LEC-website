import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCVtpouUSLNjM0yt76c06wOU6iFgccAlzc",
  authDomain: "le-church-app.firebaseapp.com",
  projectId: "le-church-app",
  storageBucket: "le-church-app.firebasestorage.app",
  messagingSenderId: "1033379351200",
  appId: "1:1033379351200:web:6a6ddbce9b1bd1293757c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Firestore, Auth, and Storage for CMS
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };




