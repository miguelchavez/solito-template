// import auth from '@react-native-firebase/auth'
import {
    getAuth,
    OAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    signInAnonymously as signInAnonymouslyFirebase,
    signInWithPopup,
    onAuthStateChanged as onAuthStateChangedFirebase,
    sendPasswordResetEmail as sendPasswordResetEmailFirebase,
} from '@react-native-firebase/auth'

const auth = getAuth()
const getIsSignedIn = () => Boolean(auth?.currentUser)

const signOut = () => auth?.signOut()

const signInAnonymously = async () => {
    const { user } = await signInAnonymouslyFirebase(auth)

    return user
}

const signInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPasswordFirebase(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const token = userCredential.user.getIdToken()
            return { token: token, user: user }
        })
        .catch((error) => {
            const errorCode = error.code
            let errorMessage = error.message
            throw new Error(errorMessage)
        })
}

const createUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPasswordFirebase(auth, email, password)
        .then((userCredential) => {
            console.log('User account created & signed in!')
            const user = userCredential.user
            const token = userCredential.user.getIdToken()
            return { token: token, user: user }
        })
        .catch((error) => {
            let msg = ''
            if (error.code === 'auth/email-already-in-use') {
                msg = 'That email address is already in use!'
                // msg = 'Este email ya está en uso.'
            }

            if (error.code === 'auth/invalid-email') {
                msg = 'That email address is invalid!'
                // msg = 'Este email no es válido.'
            }
            // const errorCode = error.code
            const errorMessage = error.message ?? msg

            console.error(error)
        })
}

// const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider()
//     return signInWithPopup(auth, provider)
// }

// const signInWithMicrosoft = () => {
//     const provider = new OAuthProvider('microsoft.com')
//     return signInWithPopup(auth, provider)
// }

const onAuthStateChanged = (callback) =>
    onAuthStateChangedFirebase(auth, callback)

const getCurrentUser = () => auth?.currentUser

const sendPasswordResetEmail = (userEmail: string) => {
    return sendPasswordResetEmailFirebase(auth, userEmail)
}

export {
    getIsSignedIn,
    signOut,
    // signInWithGoogle,
    signInAnonymously,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    // signInWithMicrosoft,
    onAuthStateChanged,
    getCurrentUser,
    sendPasswordResetEmail,
}
