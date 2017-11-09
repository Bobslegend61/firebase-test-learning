(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPnpJu83cshEtfUXUaClqJrf3uW-CFHec",
    authDomain: "fir-test-5dfb9.firebaseapp.com",
    databaseURL: "https://fir-test-5dfb9.firebaseio.com",
    projectId: "fir-test-5dfb9",
    storageBucket: "fir-test-5dfb9.appspot.com",
    messagingSenderId: "766765399201"
  };
  firebase.initializeApp(config);

  // get all elements
  function getAllElements(id) {
    return document.getElementById(id);
  }

  let btnlogin = getAllElements("login"),
      btnlogout = getAllElements("logout"),
      btnsignup = getAllElements("signup"),
      auth = firebase.auth();

  btnlogin.addEventListener("click", e => {
    let email = getAllElements("email").value,
        pass = getAllElements("password").value;

    auth.signInWithEmailAndPassword(email, pass)
        .catch(err => {
          console.log(err);
        })


  });

  btnlogout.addEventListener("click", e => {
    auth.sendPasswordResetEmail("bobslegend795@gmail.com")
        .then(() => {
          console.log("Email sent");
        })
        .catch(err => {
          console.log(err);
        })
  });

  btnsignup.addEventListener("click", e => {
    let email = getAllElements("email").value,
        pass = getAllElements("password").value;

    auth.createUserWithEmailAndPassword(email, pass)
        .then(user => {
          user.updateProfile({
            displayName: "Alabi A. Emmnuel"
          }).then(() => {
            user.sendEmailVerification().then(() => {
              console.log("Verification Email sent");
            }).catch(err => {
              console.log("Failed to send Verification Email");
            })
          }).catch(err => {
            console.log("Cannot update user profile");
          })
        })
        .catch(err => {
          console.log(err);
        })
  });

  auth.onAuthStateChanged(user => {
    if(user) {
      if(user.providerData[0].providerId === "password" && user.emailVerified) {
          console.log(user);
      }else {
        auth.signOut().then(() => {
          console.log("Please verify your email");
        }).catch(err => {
          console.log(err);
        })
      }
    }else {
      console.log("No user");
    }
  })

}());
