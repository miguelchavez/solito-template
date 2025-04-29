import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'

import { MoreScreen } from 'app/features/more/screen'
// import { useParams } from 'solito/navigation'

export default function Screen() {
    const insets = useSafeAreaInsets()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        view: {
            flex: 1,
            paddingTop: insets.top + 32,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            backgroundColor: '#DAB8FC',
        },
    })
    return (
        <View style={styles.view}>
            <MoreScreen />
        </View>
    )
}
