import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvoReh7zu8YRjfjCPimHtnYrwpa3ypAX4",
  authDomain: "km-revou-balikpapan-team-19.firebaseapp.com",
  projectId: "km-revou-balikpapan-team-19",
  storageBucket: "km-revou-balikpapan-team-19.appspot.com",
  messagingSenderId: "229636185862",
  appId: "1:229636185862:web:c62e7882f1a626b8618887",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById("submit");
submit.addEventListener("click", function () {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Register Sukses",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to dashboard
          window.location.href = "dashboard.html";
        }
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: errorMessage,
        showConfirmButton: true,
      });
    });
});
