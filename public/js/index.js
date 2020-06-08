



function login() {
  var email = $("#email_field").val();
  var password = $("#password_field").val();
  // console.log(email);

  // if(email !="" && password !=""){
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    $(".info").text("Error: " + errorMessage);
  });
  // } else {
  // window.alert("Form is incomplete. Please fill out all fields.")
  // }
};

function logup() {
  var email = $("#email_field").val();
  var password = $("#password_field").val();
  var cPassword = $("#cPassword_field").val();
  // console.log(email);

  if (email != "" && password != "" && cPassword != "") {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      $(".info").text("Error: " + errorMessage);
    });
    // } else {
    // window.alert("Form is incomplete. Please fill out all fields.")
    // }
  };
}


const statusRef = firebase.database().ref('status');
statusRef.on('value', function (snapshot) {
  var currentUser = snapshot.child("currentUser").val();
  if (currentUser == firebase.auth().currentUser.uid) {
    $("#start_btn").removeClass("button--disable");
    $("#start_btn").html("Продолжить");
  } else if (currentUser == "null") {
    $("#start_btn").removeClass("button--disable");
    $("#start_btn").html("Начать");
  } else {
    $("#start_btn").addClass("button--disable");
    $("#start_btn").html("Работа занята");
  }
});

$("#logout_btn").click(function () {
  console.log("@##");
  firebase.auth().signOut();
  // window.location.href = "login.html";
});

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     window.location.href = "login.html";
//   }
// });

var menuShow = false;
var submitStatus = false;
// console.log(menuShow);
$(".button-burger").click(function () {
  menuShow = !menuShow;
  // console.log(menuShow);
  if (menuShow === true) {
    $('.button-burger').addClass('active');
    $('.navbar-list__wrapper').addClass('active');
  } else {
    $('.button-burger').removeClass('active');
    $('.navbar-list__wrapper').removeClass('active');
  }
})
$('navbar-item').click(function (menuShow) {
  menuShow = false;
})

$("#start_btn").click(function (user) {
  var currentUser = "";
  var chartId = "" + new Date().getTime();
  const statusRef = firebase.database().ref('status');
  statusRef.child("currentUser").on("value", function (snapshot) {
    currentUser = snapshot.val();
    // console.log(currentUser);
    const user = firebase.auth().currentUser.uid;
    if (currentUser == "null") {
      statusRef.update({
        currentUser: user,
        chartId: chartId
      })
      window.location.href = "lab.html";
    } else if (currentUser === user) {
      window.location.href = "lab.html";
    }
  }, function (errorObject) {
    console.log("the read failed: " + errorObject.code);
  });
});

function reset() {
  var auth = firebase.auth();
  var email = $("#email_field").val();

  if (email != "") {
    auth.sendPasswordResetEmail(email).then(function () {
        $(".info-reset").text("Email has been  sent to you. Please check and verify.");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        $(".info").text("Error: " + errorMessage);
      });
  }

}