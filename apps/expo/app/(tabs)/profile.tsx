import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
// import { useParams } from 'solito/navigation'
import { Redirect } from 'expo-router'
import { getCurrentUser } from 'app/auth/firebase'

import { ProfileScreen } from 'app/features/profile/screen'
import { useThemeColor } from '@hooks/useThemeColor'

export default function Profile() {
    const insets = useSafeAreaInsets()
    const currentUser = getCurrentUser()
    const bgColor = useThemeColor('background')
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        view: {
            flex: 1,
            backgroundColor: bgColor, // Added background color
            // paddingTop: insets.top + 32,
            // paddingBottom: insets.bottom,
            // paddingLeft: insets.left,
            // paddingRight: insets.right,
            // backgroundColor: '#DAB8FC', //'#4f46' #9a0da0,
            // fontFamily: 'Inter',
        },
    })

    if (!currentUser) {
        return <Redirect href="/(auth)/login" />
    }

    return (
        <View style={styles.view}>
            <ProfileScreen />
        </View>
    )
}
