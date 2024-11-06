const firebaseConfig = {
    apiKey: "AIzaSyA5F3CAVf7CFD6oGOASP4pRdtjsgtOmRJo",
    authDomain: "projetotcc-2f8ea.firebaseapp.com",
    projectId: "projetotcc-2f8ea",
    storageBucket: "projetotcc-2f8ea.appspot.com",
    messagingSenderId: "670271437904",
    appId: "1:670271437904:web:69e6764146612b9456a555",
    measurementId: "G-QR7V58H5FN"
  };
  firebase.initializeApp(firebaseConfig);
  firestore = firebase.firestore();

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
