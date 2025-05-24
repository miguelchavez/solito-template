'use client'
import { memo, useEffect, useState } from 'react'
import { useFirebaseAuth } from '@auth/firebase/hooks'
import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
} from '@auth/firebase/index'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const auth = useFirebaseAuth()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(() => {
            if (auth) {
                setIsAuthenticated(true)
                setIsAuthenticating(false)
            } else {
                setIsAuthenticated(false)
                if (!isAuthenticating) setIsAuthenticating(false)
            }
        })

        return () => unsubscribe()
    }, [auth])

    if (!isAuthenticated) {
        if (!isAuthenticating) {
            setIsAuthenticating(true)
            signInAnonymously()
                .then((result) => {
                    // console.log('[ @layout :: SIGN IN RESULT ]:', result)
                })
                .catch((error) => {
                    // console.error('[ @layout :: SIGN IN ERROR ]:', error)
                })
        }
        return <>Autenticando...</>
    }
    return <>{children}</>
}

export default AuthLayout
