'use client'
import { useRouter } from 'solito/navigation'
import { View, Text, Pressable, useWindowDimensions } from 'react-native'

export function UserDetailScreen({ id }: { id: string }) {
    const router = useRouter()
    const { width, height } = useWindowDimensions()

    if (!id) {
        return null
    }
    return (
        <View
            style={{
                flex: 1,
                padding: 16,
                paddingTop: width > height ? 52 : 0, // fix para el stack header en horizontal
                gap: 32,
            }}
        >
            <Text>{`User ID: ${id}`}</Text>
            <Pressable onPress={() => router.back()}>
                <Text>👈 Go Home</Text>
            </Pressable>
        </View>
    )
}
