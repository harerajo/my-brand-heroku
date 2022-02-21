// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB63EFI2-095uL9wsxjBudNQzP8vJ0F2h8",
	authDomain: "authentication-page-ff659.firebaseapp.com",
	databaseURL: "https://authentication-page-ff659-default-rtdb.firebaseio.com",
	projectId: "authentication-page-ff659",
	storageBucket: "authentication-page-ff659.appspot.com",
	messagingSenderId: "1031237360243",
	appId: "1:1031237360243:web:f96cd13bc8027b7ff4e806",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
// enable firebase firestore service
const db = firebase.firestore();
//   db.settings({timeStampInShots: true});
