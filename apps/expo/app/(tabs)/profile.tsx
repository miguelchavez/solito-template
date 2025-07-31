// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
// import { useParams } from 'solito/navigation'
// import { Redirect } from 'expo-router'
// import { useAuthState } from 'app/auth/firebase'

import { ProfileScreen } from 'app/features/profile/screen'
import { useThemeColor } from '@hooks/useThemeColor'

export default function Profile() {
    // const { user, state } = useAuthState()
    const bgColor = useThemeColor('background')

    // if (user == null && state == 'unauthenticated') {
    //     console.log(
    //         '[ Home :: User is not authenticated Redirecting to Login screen ]',
    //     )
    //     return <Redirect href="/(auth)/login" />
    // }

    return (
        <View style={{ flex: 1, backgroundColor: bgColor }}>
            <ProfileScreen />
        </View>
    )
}
