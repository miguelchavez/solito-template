'use client'

import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti/app'
import { Text, View, Platform, useWindowDimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { useAuthState } from 'app/auth/firebase'
import { useRouter } from 'solito/navigation'
import { enUS, es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { useThemeColor } from '@hooks/useThemeColor'
import { MyButton } from 'app/components/buttons'
import { P, H1, H2 } from 'app/components/typography'

export function HomeScreen() {
    const { user, state } = useAuthState()
    const router = useRouter()
    const { width, height } = useWindowDimensions()
    const linkColor = useThemeColor('primary')
    const textColor = useThemeColor('text')

    const [timeAgo, setTimeAgo] = useState('')

    /**
     * When Authentication state changes, get user login time
     */
    useEffect(() => {
        if (user != null && state === 'authenticated') {
            const f = formatDistanceToNow(
                new Date(user?.metadata?.lastSignInTime ?? ''),
                {
                    addSuffix: true,
                    locale: enUS, // es
                },
            )
            setTimeAgo(f)
        }
    }, [user, state])

    if (user == null && state === 'unauthenticated') {
        return null
    }

    return (
        <View
            style={{
                flex: 1,
                gap: 32,
                flexDirection: 'column',
            }}
        >
            <H1>Welcome {user?.isAnonymous ? 'Guest' : user?.displayName}</H1>
            <View>
                <Text style={{ color: textColor }}>
                    Your last session is from {timeAgo}
                </Text>
                <Text style={{ color: textColor }}>
                    Solito is made by{' '}
                    <TextLink
                        href="https://twitter.com/fernandotherojo"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: linkColor }}
                    >
                        Fernando Rojo
                    </TextLink>
                </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 16 }}>
                <MotiLink
                    href="/profile"
                    from={{
                        scale: 0,
                        rotateZ: '0deg',
                    }}
                    animate={({ hovered, pressed }) => {
                        'worklet'

                        return {
                            scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                            rotateZ: pressed
                                ? '0deg'
                                : hovered
                                ? '-3deg'
                                : '0deg',
                        }
                    }}
                    transition={{
                        type: 'timing',
                        duration: 150,
                    }}
                >
                    <Text selectable={false} style={{ color: linkColor }}>
                        View Profile
                    </Text>
                </MotiLink>
                <MyButton
                    title="Open Modal"
                    onPress={() => {
                        router.push('/exampleModal')
                    }}
                />
            </View>
        </View>
    )
}
