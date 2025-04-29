import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
// import { useParams } from 'solito/navigation'

import { HomeScreen } from 'app/features/home/screen'

export default function Home() {
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
            backgroundColor: '#DAB8FC', //'#4f46' #9a0da0,
            // fontFamily: 'Inter',
        },
    })
    return (
        <View style={styles.view}>
            <HomeScreen />
        </View>
    )
}
