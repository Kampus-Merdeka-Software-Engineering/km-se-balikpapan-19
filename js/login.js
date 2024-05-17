// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

const submit = document.getElementById("submit");
submit.addEventListener("click", function () {
  event.preventDefault();
  //input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Loggin in ....");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
