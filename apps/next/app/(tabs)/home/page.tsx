'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'app/auth/firebase'
// import { getCurrentUser } from 'app/auth/firebase'
import { HomeScreen } from 'app/features/home/screen'

const Home = () => {
    const { user } = useAuthState()
    const router = useRouter()

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */
    useEffect(() => {
        if (!user) {
            console.log('[ /(tabs)/home/page :: NOT AUTHENTICATED! ]')
            // router.replace('/login')
        } else {
            console.log('[ /(tabs)/home/page :: [currentUser] ]:', user)
        }
    }, [user])

    if (!user) {
        return null
    }

    return (
        <div className="m-2 p-4">
            <HomeScreen />
        </div>
    )
}

export default Home
