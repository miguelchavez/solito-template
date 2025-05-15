import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'

import { DocumentsScreen } from 'app/features/documents/screen'
import { useThemeColor } from '@hooks/useThemeColor'
// import { useParams } from 'solito/navigation'

export default function Screen() {
    const insets = useSafeAreaInsets()
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
            // backgroundColor: '#DAB8FC',
        },
    })
    return (
        <View style={styles.view}>
            <DocumentsScreen />
        </View>
    )
}
