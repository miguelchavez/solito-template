'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { getCurrentUser } from 'app/auth/firebase'
// import { View } from 'react-native'
// import { MotiLink } from 'solito/moti/app'
import { HomeScreen } from 'app/features/home/screen'

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
        <div className="m-8 p-8 flex-1 text-2xl bg-rose-100 rounded-lg">
            <HomeScreen />
        </div>
    )
    // return (
    //     <View className="m-10 p-10 flex-1 text-2xl underline bg-rose-300 rounded-sm">
    //         <p className="text-2xl font-bold underline bg-rose-300 rounded-sm">
    //             This is A Solito Template App.
    //         </p>
    //         <MotiLink
    //             href="/(tabs)/profile"
    //             from={{
    //                 scale: 0,
    //                 rotateZ: '0deg',
    //             }}
    //             animate={({ hovered, pressed }) => {
    //                 'worklet'

    //                 return {
    //                     scale: pressed ? 0.95 : hovered ? 1.1 : 1,
    //                     rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
    //                 }
    //             }}
    //             transition={{
    //                 type: 'timing',
    //                 duration: 150,
    //             }}
    //         >
    //             <p>View Profile</p>
    //         </MotiLink>
    //     </View>
    // )
}

export default Home
