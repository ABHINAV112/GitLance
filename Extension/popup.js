var firebaseConfig = {
  apiKey: "AIzaSyDK3SCSl_LpVx5Fcac4PliMRIZA46E4zBs",
  authDomain: "git-lance.firebaseapp.com",
  projectId: "git-lance"
};
// 'localStorage.setItem("gitLanceUser",'+JSON.stringify(authResult)+')'
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// console.log(chrome.tabs);

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      localStorage.setItem("gitLanceUser", JSON.stringify(authResult));
      chrome.tabs.executeScript(null, { code: 'localStorage.setItem("gitLanceUser",JSON.stringify(' + JSON.stringify(authResult) + '))' });
      chrome.tabs.executeScript(null, { code: 'console.log("successfully logged in")' });
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: "popup.html",
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};
function logout() {
  localStorage.removeItem("gitLanceUser");
  $(".logged").addClass("hide");
  $("#firebaseui-auth-container").removeClass("hide");
  chrome.tabs.executeScript(null, { code: 'console.log("logout working");localStorage.removeItem("gitLanceUser");window.location.reload(true)' });
}
$(document).ready(function () {
  document.getElementById("logoutButton").addEventListener("click", logout);
  var userInfo = localStorage.getItem("gitLanceUser");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    $("#firebaseui-auth-container").addClass("hide");
    $("#loader").addClass("hide");
    $(".logged").removeClass("hide");
    var name = userInfo["user"]["displayName"];
    var photo = userInfo["user"]["photoURL"];
    if (photo) {
      document.getElementById("userImage").src = photo;
    }

    document.getElementById("loggedIn").innerText = "You are ready to use GitLance " + name
  }
  ui.start('#firebaseui-auth-container', uiConfig);
  console.log("Running")
})
