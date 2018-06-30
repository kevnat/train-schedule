  // Initialize Firebase
  try {
    var config = {
        apiKey: "AIzaSyBi56Jlf08-LOQ2Nxfa1YvaMUeygeh2axY",
        authDomain: "trainschedule-2e9f2.firebaseapp.com",
        databaseURL: "https://trainschedule-2e9f2.firebaseio.com",
        projectId: "trainschedule-2e9f2",
        storageBucket: "trainschedule-2e9f2.appspot.com",
        messagingSenderId: "1085987146813"
  };
  firebase.initializeApp(config);
  console.log('Firebase successfully initialized');
}catch {
    console.log('Failed to initialize database');
}

