import { useRouter } from 'solito/navigation'
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    useWindowDimensions,
} from 'react-native'

export function MoreScreen() {
    const router = useRouter()
    const { width, height } = useWindowDimensions()
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            padding: 16,
            paddingTop: width > height ? 32 : 16, // fix para el stack header en horizontal
            gap: 32,
            backgroundColor: '#fff',
        },
        text: {
            color: '#000',
        },
    })

    return (
        <View style={styles.view}>
            <Text style={styles.text}>More Data</Text>
            <Pressable onPress={() => router.back()}>
                <Text>👈 Go Home</Text>
            </Pressable>
        </View>
    )
}
