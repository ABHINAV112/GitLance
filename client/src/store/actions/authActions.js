export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();


        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCESS" });
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err })
        });
    }
}

export const signInWithGithub = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        var provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            // ...
        }).catch(function (error) {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" });
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

// .then((resp) => {
//     return (
//         firestore.collection('users').doc(resp.user.uid).set({
//             firstName: newUser.firstName,
//             lastName: newUser.lastName
//         })
//     )
// })

