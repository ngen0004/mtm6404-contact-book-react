import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAGjg0HqS9jJ1XlQ5MtZvQjyguJv5oQHtM",
    authDomain: "mtm6404-contact-book-c6f96.firebaseapp.com",
    projectId: "mtm6404-contact-book-c6f96",
    storageBucket: "mtm6404-contact-book-c6f96.appspot.com",
    messagingSenderId: "158559629086",
    appId: "1:158559629086:web:4656297e5d287bc0f2230f"
  };

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
