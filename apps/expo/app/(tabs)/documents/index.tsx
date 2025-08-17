import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'

import { DocumentsScreen } from 'app/features/documents/screen'
import { useThemeColor } from '@hooks/useThemeColor'
// import { useParams } from 'solito/navigation'
import { Redirect } from 'expo-router'
import { getCurrentUser } from 'app/auth/firebase'

export default function Screen() {
    const user = getCurrentUser()
    const bgColor = useThemeColor('background')

    // if (typeof user === 'undefined' || user == null || !user) {
    //     return <Redirect href="/(auth)/login" />
    // }

    return (
        <View style={{ flex: 1, backgroundColor: bgColor, padding: 2 }}>
            <DocumentsScreen />
        </View>
    )
}
