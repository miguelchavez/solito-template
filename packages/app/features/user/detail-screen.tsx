'use client'
import { useRouter } from 'solito/navigation'
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    useWindowDimensions,
} from 'react-native'

export function UserDetailScreen({ id }: { id: string }) {
    const router = useRouter()
    const { width, height } = useWindowDimensions()
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            padding: 16,
            paddingTop: width > height ? 52 : 0, // fix para el stack header en horizontal
            gap: 32,
            // backgroundColor: '#fff',
        },
        text: {
            color: '#000',
        },
    })
    if (!id) {
        return null
    }
    return (
        <View style={styles.view}>
            <Text>{`User ID: ${id}`}</Text>
            <Pressable onPress={() => router.back()}>
                <Text>👈 Go Home</Text>
            </Pressable>
        </View>
    )
}
