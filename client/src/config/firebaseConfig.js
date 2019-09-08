import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDK3SCSl_LpVx5Fcac4PliMRIZA46E4zBs",
    authDomain: "git-lance.firebaseapp.com",
    projectId: "git-lance"
};

firebase.initializeApp(firebaseConfig);

export default firebase