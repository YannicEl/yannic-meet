import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAVwiTESNC9aBuWSv-UC5QRWbL2k_RPBCo',
	authDomain: 'yannic-meet-dev.firebaseapp.com',
	projectId: 'yannic-meet-dev',
	storageBucket: 'yannic-meet-dev.appspot.com',
	messagingSenderId: '313035672883',
	appId: '1:313035672883:web:fa574c031aba976296c246',
});

export const db = firebase.firestore();
