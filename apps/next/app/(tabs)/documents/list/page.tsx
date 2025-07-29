'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'app/auth/firebase'
import { HomeScreen } from 'app/features/dashboard/screen'

const Documents = () => {
    const { user, state } = useAuthState()
    const router = useRouter()

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */
    useEffect(() => {
        if (user == null && state === 'unauthenticated') {
            // If not authenticated, redirect to login.
            router.push('/login')
        } else if (user != null && state === 'authenticated') {
            router.refresh()
        }
    }, [user, state])

    if (user != null && state == 'authenticated') {
        return <HomeScreen />
    } else if (user == null && state == 'initializing') {
        return null
    }
}

export default Documents
