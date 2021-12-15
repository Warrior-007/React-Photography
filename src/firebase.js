// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLE6k0sY-L7TgAelfb-Jtmc6tf2dXLJN8",
  authDomain: "react-photography.firebaseapp.com",
  databaseURL:
    "https://react-photography-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-photography",
  storageBucket: "react-photography.appspot.com",
  messagingSenderId: "1082731078801",
  appId: "1:1082731078801:web:441f72cf636b041cbccb30",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
