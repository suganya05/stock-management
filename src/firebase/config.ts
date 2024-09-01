import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3a9WrpPQxulzdjzf_gbS1ALvN92dQhCA",
  authDomain: "smm-enterprice.firebaseapp.com",
  projectId: "smm-enterprice",
  storageBucket: "smm-enterprice.appspot.com",
  messagingSenderId: "651643615914",
  appId: "1:651643615914:web:0bc98f5abcbdee61e12ed3",
  measurementId: "G-74V4F9JLJ8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
