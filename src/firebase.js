import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA9dqjVaQXI3d9XGvUZrElbmslv0skHfS4",
  authDomain: "doctor-e-clinics.firebaseapp.com",
  projectId: "doctor-e-clinics",
  storageBucket: "doctor-e-clinics.appspot.com",
  messagingSenderId: "177199668218",
  appId: "1:177199668218:web:b242677e4463c5f3e92243",
  measurementId: "G-Y9V50VFGP0"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
