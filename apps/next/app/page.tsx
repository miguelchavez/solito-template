'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'app/auth/firebase'

import { SolitoImage } from 'solito/image'
import logo from '@assets/images/icon.png'

const Main = () => {
    const { user, state } = useAuthState()
    const router = useRouter()

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */

    useEffect(() => {
        console.log('[ / :: User:', user, ' State:', state, ']')
        if (user == null && state === 'unauthenticated') {
            // If not authenticated and initializing, redirect to login.
            router.push('/login')
        } else router.push('/dashboard')
    }, [user, state])

    // if (user == null && state === 'initializing') {
    return (
        <div className="flex h-full w-full self-center items-center justify-center bg-purple-400">
            <SolitoImage
                alt="Logo"
                src={logo}
                unoptimized
                contentPosition="center"
                contentFit="cover"
                style={{
                    alignSelf: 'center',
                    height: '100dvh', // '100vh',
                    width: '100dvw', // '100vw',
                }}
            />
        </div>
    )
    // }
}

export default Main
