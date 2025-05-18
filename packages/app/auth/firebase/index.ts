// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import {
    initializeAuth,
    browserPopupRedirectResolver,
    // browserLocalPersistence,
    // setPersistence,
    browserSessionPersistence,
    signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    signInWithPopup,
    signInAnonymously as signInAnonymouslyFirebase,
    onAuthStateChanged as onAuthStateChangedFirebase,
    GoogleAuthProvider,
    OAuthProvider,
    sendPasswordResetEmail as sendPasswordResetEmailFirebase,
} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let auth: ReturnType<typeof initializeAuth>
if (typeof window !== 'undefined') {
    const firebaseApp = initializeApp(firebaseConfig)
    auth = initializeAuth(firebaseApp, {
        persistence: browserSessionPersistence, //browserLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
    })
    auth.languageCode = 'es_419' // Latin america
    // setPersistence(auth, browserSessionPersistence)
    // const analytics = getAnalytics(app)
}

const getIsSignedIn = () => Boolean(auth?.currentUser)

const signOut = () => auth.signOut()

const googleProvider = new GoogleAuthProvider()
const microsoftProvider = new OAuthProvider('microsoft.com')
// microsoftProvider.setCustomParameters({
//     // https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow
//     // Optional "tenant" parameter in case you are using an Azure AD tenant.
//     // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
//     // or "common" for tenant-independent tokens.
//     // The default value is "common".
//     tenant: 'TENANT_ID',
// })

const signInAnonymously = async () => {
    const { user } = await signInAnonymouslyFirebase(auth)

    return user
}

const signInWithGoogle = () => {
    return _signInWithPopup(googleProvider)
}

const signInWithMicrosoft = () => {
    return _signInWithPopup(microsoftProvider)
}

const _signInWithPopup = (provider: OAuthProvider | GoogleAuthProvider) => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            // The signed-in user info.
            const user = result?.user
            // IdP data available using getAdditionalUserInfo(result)
            console.log('[ @lib/auth/auth :: signInWithPopup] result:', {
                token: token,
                user: user,
                credential: credential,
            })
            return { token: token, user: user }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error?.code
            const errorMessage = error?.message
            // The email of the user's account used.
            const email = error?.customData?.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            console.log('[ @lib/auth/auth :: signInWithPopup] error:', {
                errorCode: errorCode,
                errorMessage: errorMessage,
                email: email,
                credential: credential,
            })
            return {
                token: null,
                user: null,
                errorCode: errorCode,
                errorMessage: errorMessage,
                email: email,
                credential: credential,
            }
        })
}

const signInWithEmailAndPassword = (email: string, password: string) => {
    // Hacer validaciones de username y password!
    if (!email || !password) {
        console.log('[ @lib/auth/auth :: Email and password are required. ]')
        throw new Error('Se requiere email y contraseña.')
        // return { error: 'Se requiere email y contraseña.' }
    }
    return signInWithEmailAndPasswordFirebase(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const token = userCredential.user.getIdToken()
            return { token: token, user: user }
        })
        .catch((error) => {
            let msg = ''
            if (error.code === 'auth/email-already-in-use') {
                msg = 'That email address is already in use!'
            }

            if (error.code === 'auth/invalid-email') {
                msg = 'That email address is invalid!'
            }
            // const errorCode = error.code
            const errorMessage = error.message ?? msg
            throw new Error(errorMessage)
        })
}

const createUserWithEmailAndPassword = (email: string, password: string) => {
    if (!email || !password) {
        console.log('[ @lib/auth/auth :: Email and password are required. ]')
        throw new Error('Se requiere email y contraseña.')
        // return { error: 'Se requiere email y contraseña.' }
    }
    return createUserWithEmailAndPasswordFirebase(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const token = userCredential.user.getIdToken()
            return { token: token, user: user }
        })
        .catch((error) => {
            let errorMessage = ''
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!')
                errorMessage = 'Este email ya está en uso.'
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!')
                errorMessage = 'Este email no es válido.'
            }
            throw new Error(errorMessage)
        })
}

const onAuthStateChanged = (callback) => {
    return onAuthStateChangedFirebase(auth, callback)
}

const getCurrentUser = () => auth?.currentUser

const sendPasswordResetEmail = (userEmail: string) => {
    return sendPasswordResetEmailFirebase(auth, userEmail)
}

export {
    getIsSignedIn,
    signInAnonymously,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getCurrentUser,
    sendPasswordResetEmail,
}
