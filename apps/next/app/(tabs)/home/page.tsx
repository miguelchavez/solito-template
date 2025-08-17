'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { getCurrentUser } from 'app/auth/firebase'
// import { View } from 'react-native'
// import { MotiLink } from 'solito/moti/app'
import { HomeScreen } from 'app/features/dashboard/screen'

const Home = () => {
    const user = getCurrentUser()
    const router = useRouter()
    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */
    useEffect(() => {
        if (user) {
            console.log('[ auth :: user ]:', user)
        } else {
            console.log('[ NOT AUTHENTICATED! ]')
            router.replace('/login')
        }
    }, [])

    if (!user) {
        return null
    }

    return (
        <div className="p-2 flex-1 text-2xl bg-rose-100 rounded-lg">
            <HomeScreen />
        </div>
    )
}

export default Home
