import { UserDetailScreen } from 'app/features/user/detail-screen'
import { useParams } from 'solito/navigation'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'

export default function Screen() {
    const { id } = useParams()
    const insets = useSafeAreaInsets()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        view: {
            flex: 1,
            paddingTop: insets.top, // + 32, // en modal no hace falta
            // paddingBottom: insets.bottom, // en modal no hace falta
            // paddingLeft: insets.left,
            // paddingRight: insets.right,
            // backgroundColor: '#fff', //'#4f46',
        },
        text: {
            color: '#eee',
        },
    })
    return (
        // <SafeAreaView style={styles.container}>
        <View style={styles.view}>
            <UserDetailScreen id={id as string} />
        </View>
        // </SafeAreaView>
    )
}
