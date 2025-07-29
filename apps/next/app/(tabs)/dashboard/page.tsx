'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'app/auth/firebase'
import { HomeScreen } from 'app/features/dashboard/screen'

import { SolitoImage } from 'solito/image'
import logo from '@assets/images/icon.png'

const Home = () => {
    const { user, state } = useAuthState()
    const router = useRouter()

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */
    useEffect(() => {
        if (
            (user == null && state == 'unauthenticated') ||
            state == 'initializing'
        ) {
            router.push('/login')
        }
    }, [user, state])

    if (user != null && state == 'authenticated') {
        return <HomeScreen />
    } else if (user == null && state == 'initializing') {
        return null
    }
}

export default Home
