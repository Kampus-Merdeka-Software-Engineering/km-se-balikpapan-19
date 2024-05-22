// Import Firebase App and Auth modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase configuration
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

// Add event listener to the submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  
  // Get email and password input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Login Sukses",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to dashboard
          window.location.href = "dashboard.html";
        }
      });
    })
    .catch((error) => {
      // Handle errors
      const errorMessage = error.message;
      Swal.fire({
        title: 'Error!',
        text: 'Cek Email dan Password!',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
});
