import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlG0oZOyxyDRYlSvvEn0kKUr1tEEAiMlg",
  authDomain: "pizzeria-f0725.firebaseapp.com",
  projectId: "pizzeria-f0725",
  storageBucket: "pizzeria-f0725.appspot.com",
  messagingSenderId: "639740222414",
  appId: "1:639740222414:web:edecee9c7df072c400a99f",
  measurementId: "G-D9XJSW4RCL",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
