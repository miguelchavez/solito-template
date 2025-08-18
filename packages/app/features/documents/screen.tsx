'use client'
import { useRouter } from 'solito/navigation'
import { View, Text, Platform, useWindowDimensions } from 'react-native'

import { useThemeColor } from '@hooks/useThemeColor'
import { P, H1, H2 } from 'app/components/typography'

export function DocumentsScreen() {
    const router = useRouter()
    const bgColor = useThemeColor('background')
    const textColor = useThemeColor('text')
    const { width, height } = useWindowDimensions()

    return (
        <View
            style={{
                flex: 1,
                width: '100dvw', //'100vw',
                height: '100dvh', //'100vh',
                gap: 32,
            }}
        >
            <H1>Documents</H1>
        </View>
    )
}
