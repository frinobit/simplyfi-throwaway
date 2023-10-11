import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr3-AlGFMWajEfN3vxMZy8OptvAjUIo0A",
  authDomain: "testing-simplyask-npfp.firebaseapp.com",
  projectId: "testing-simplyask-npfp",
  storageBucket: "testing-simplyask-npfp.appspot.com",
  messagingSenderId: "611546653745",
  appId: "1:611546653745:web:5514d8269f1ffc122ce110",
  // measurementId: "G-CQ04N9T7D6",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     const email = user.email;
//     const uid = user.uid;
//     const token = await user.getIdToken();

//     const response = await fetch("/api/user/loginGoogle", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, uid, token }),
//     });
//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// };
