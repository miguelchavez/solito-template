'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'app/auth/firebase'
import { ProfileScreen } from 'app/features/profile/screen'
import { useThemeColor } from '@hooks/useThemeColor'

export default function Profile() {
    const bgColor = useThemeColor('background')
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
        return <ProfileScreen />
    } else if (user == null && state == 'initializing') {
        return null
    }
}
