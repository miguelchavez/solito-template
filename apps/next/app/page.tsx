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
        if (user == null && state === 'unauthenticated') {
            // If not authenticated, redirect to login.
            router.push('/login')
        } else if (user != null && state === 'authenticated') {
            router.push('/dashboard')
        }
    }, [user, state])

    return (
        <div className="flex h-full w-full self-center items-center justify-center bg-purple-400 animate-pulse">
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
}

export default Main
