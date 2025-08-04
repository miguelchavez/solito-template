'use client'

import Animated from 'react-native-reanimated'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
            {children}
        </Animated.View>
    )
}
