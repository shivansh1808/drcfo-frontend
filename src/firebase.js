import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBe1gc7eGbmPd4KpwVmC5BJYmUZBTa4VdU",
  authDomain: "drcfo-36402.firebaseapp.com",
  projectId: "drcfo-36402",
  storageBucket: "drcfo-36402.appspot.com",
  messagingSenderId: "240660215721",
  appId: "1:240660215721:web:c1ec134063e8cb5a0836b8",
  measurementId: "G-X5JQE4XY9D",
});

export const authentication = app.auth();
export default app;
