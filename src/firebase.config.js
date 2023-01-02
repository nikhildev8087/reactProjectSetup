import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getMessaging} from "firebase/messaging"


const firebaseConfig = {
    // firebase configuration here 
};

const app = initializeApp(firebaseConfig);

export const db =  getFirestore(app);
export const messaging = getMessaging(app);

