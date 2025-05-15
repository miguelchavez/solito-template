import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, View /*, SafeAreaView*/ } from 'react-native'
import { BlurView } from 'expo-blur'

import { HomeScreen } from 'app/features/home/screen'
import { useThemeColor } from '@hooks/useThemeColor'
// import { useParams } from 'solito/navigation'

export default function Home() {
    // const insets = useSafeAreaInsets()
    const bgColor = useThemeColor('background')
    const styles = StyleSheet.create({
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
    return (
        <SafeAreaView style={styles.view}>
            <HomeScreen />
        </SafeAreaView>
    )
}
