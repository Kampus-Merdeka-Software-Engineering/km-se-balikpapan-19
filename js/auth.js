import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
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
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
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
