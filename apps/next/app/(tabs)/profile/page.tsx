'use client'
import { View, StyleSheet } from 'react-native'
// import { Redirect } from 'expo-router'
// import { getCurrentUser } from 'app/auth/firebase'
import { useAuthState } from 'app/auth/firebase'
import { useRouter } from 'next/navigation'

import { ProfileScreen } from 'app/features/profile/screen'
import { useThemeColor } from '@hooks/useThemeColor'
import { useEffect } from 'react'

export default function Profile() {
    const router = useRouter()
    const { user } = useAuthState()
    const bgColor = useThemeColor('background')
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        view: {
            flex: 1,
            backgroundColor: bgColor, // Added background color
        },
    })

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */
    useEffect(() => {
        console.log('[ /(tabs)/home/page :: [bgColor] ]:', bgColor)
        if (!user) {
            console.log('[ /(tabs)/home/page :: NOT AUTHENTICATED! ]')
            router.replace('/login')
        } else {
            console.log('[ /(tabs)/home/page :: [currentUser] ]:', user)
        }
    }, [user])

    if (!user || !bgColor) {
        return null
    }

    return (
        <View style={styles.view}>
            <ProfileScreen />
        </View>
    )
}
