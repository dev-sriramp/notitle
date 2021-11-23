import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCuZ1ctwIHpp353zCJHyQ3m_5_ZtVqg0cQ",
  authDomain: "notitle-b8e49.firebaseapp.com",
  projectId: "notitle-b8e49",
  storageBucket: "notitle-b8e49.appspot.com",
  messagingSenderId: "851343607280",
  appId: "1:851343607280:web:c2b2db79ebd1efac290935"
};
const fireBase = initializeApp(firebaseConfig);

const Auth = getAuth();
export {Auth};
export default fireBase;
