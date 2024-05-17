// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvoReh7zu8YRjfjCPimHtnYrwpa3ypAX4",
  authDomain: "km-revou-balikpapan-team-19.firebaseapp.com",
  projectId: "km-revou-balikpapan-team-19",
  storageBucket: "km-revou-balikpapan-team-19.appspot.com",
  messagingSenderId: "229636185862",
  appId: "1:229636185862:web:c62e7882f1a626b8618887",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    window.location.href = "login.html";
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      alert("Sign-out successful.");
    })
    .catch((error) => {
      alert(error);
    });
});
