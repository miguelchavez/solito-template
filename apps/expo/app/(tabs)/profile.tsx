// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
// import { useParams } from 'solito/navigation'
// import { Redirect } from 'expo-router'
// import { getCurrentUser } from 'app/auth/firebase'

import { ProfileScreen } from 'app/features/profile/screen'
import { useThemeColor } from '@hooks/useThemeColor'

export default function Profile() {
    // const user = getCurrentUser()
    const bgColor = useThemeColor('background')

    // if (typeof user === 'undefined' || user == null || !user) {
    //     return <Redirect href="/(auth)/login" />
    // }

    return (
        <View style={{ flex: 1, backgroundColor: bgColor }}>
            <ProfileScreen />
        </View>
    )
}
