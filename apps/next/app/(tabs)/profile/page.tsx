'use client'
import { View, StyleSheet } from 'react-native'
import { Redirect } from 'expo-router'
import { getCurrentUser } from 'app/auth/firebase'

import { ProfileScreen } from 'app/features/profile/screen'
import { useThemeColor } from '@hooks/useThemeColor'

export default function Profile() {
    const currentUser = getCurrentUser()
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

    if (!currentUser) {
        console.log('[ NOT AUTHENTICATED! ]')
        // return <Redirect href="/login" />
    }

    return (
        <View style={styles.view}>
            <ProfileScreen />
        </View>
    )
}
