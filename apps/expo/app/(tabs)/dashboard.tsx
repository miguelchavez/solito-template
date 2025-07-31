import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, View /*, SafeAreaView*/ } from 'react-native'
import { BlurView } from 'expo-blur'

import { HomeScreen } from 'app/features/dashboard/screen'
import { useThemeColor } from '@hooks/useThemeColor'
// import { useParams } from 'solito/navigation'
// import { Redirect } from 'expo-router'
// import { useAuthState } from 'app/auth/firebase'

export default function Home() {
    // const { user, state } = useAuthState()
    const bgColor = useThemeColor('background')
    // const styles = StyleSheet.create({
    //     view: {
    //         flex: 1,
    //         backgroundColor: bgColor, // Added background color
    //         // paddingTop: insets.top + 32,
    //         // paddingBottom: insets.bottom,
    //         // paddingLeft: insets.left,
    //         // paddingRight: insets.right,
    //         // backgroundColor: '#DAB8FC', //'#4f46' #9a0da0,
    //         // fontFamily: 'Inter',
    //     },
    // })

    // if (user == null && state == 'unauthenticated') {
    //     console.log(
    //         '[ Home :: User is not authenticated Redirecting to Login screen ]',
    //     )
    //     return <Redirect href="/(auth)/login" />
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <HomeScreen />
        </SafeAreaView>
    )
}
