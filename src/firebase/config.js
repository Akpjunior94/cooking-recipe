import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCR0_TzjClP77hC69ae3gJM1jVKEwvFbq0",
  authDomain: "chi-kitchen-site.firebaseapp.com",
  projectId: "chi-kitchen-site",
  storageBucket: "chi-kitchen-site.appspot.com",
  messagingSenderId: "6379596924",
  appId: "1:6379596924:web:fc178c1efa274624512df9"
};

// initialize firebase
const db = initializeApp(firebaseConfig);

export default getFirestore(db)