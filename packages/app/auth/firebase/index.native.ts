// import auth from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'solito/navigation'
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

const useAuthState = () => {
    const [initializing, setInitializing] = useState<boolean>(true)
    const [authState, setAuthState] = useState<any>({
        user: null,
        state: 'initializing',
    })
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChangedFirebase(
            auth,
            (authUser: any) => {
                if (typeof authUser === 'undefined' || authUser === null) return
                if (initializing && authUser) {
                    const valid =
                        authUser?.email &&
                        authUser?.uid &&
                        !authUser?.isAnonymous
                    setInitializing(false)
                    setAuthState({
                        user: authUser,
                        state: valid ? 'authenticated' : 'unauthenticated',
                    })
                    console.log(
                        '[ useAuthState :: OnAuthStateChanged :: user: ]',
                        authUser,
                    )
                }
            },
        )

        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState])

    return authState
}

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
    useAuthState,
}
