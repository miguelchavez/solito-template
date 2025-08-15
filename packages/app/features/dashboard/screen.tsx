'use client'

import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti/app'
import { Text, View, Platform, useWindowDimensions } from 'react-native'

import { MyButton } from 'app/components/buttons'

import { useState, useEffect } from 'react'
import { useAuthState } from 'app/auth/firebase'
import { useRouter } from 'solito/navigation'

import { useThemeColor } from '@hooks/useThemeColor'

import { enUS, es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

export function HomeScreen() {
    const { user, state } = useAuthState()
    const router = useRouter()
    const { width, height } = useWindowDimensions()
    const bgColor = useThemeColor('background')
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
                // paddingTop: width > height ? 32 : 16, // fix para el stack header en horizontal
                width: '100%', // '100dvw', //'100vw',
                height: '100%', // '100dvh', //'100vh',
                flexDirection: 'column',
                backgroundColor: bgColor,
            }}
            className="w-3/4 h-3/4"
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

const H1 = ({ children }: { children: React.ReactNode }) => {
    const textColor = useThemeColor('text')
    return (
        <Text
            style={{
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
                fontWeight: 'bold',
                color: textColor,
                textAlign: 'center',
                fontSize: 26,
            }}
        >
            {children}
        </Text>
    )
}

const P = ({
    children,
    style,
    selectable,
    props,
}: {
    children: React.ReactNode
    props?: any
    style?: any
    selectable?: boolean
}) => {
    const textColor = useThemeColor('text') // default text color
    console.log(`Style for ${children} :`, style, 'themeColor TEXT:', textColor)
    return (
        <Text
            selectable={selectable}
            style={{
                color: textColor,
                fontSize: 18,
                fontFamily: Platform.OS === 'web' ? 'SilkaRegular' : 'Inter',
                textAlign: 'justify',
                // ...style, // override style passed in props
            }}
            {...props}
        >
            {children}
        </Text>
    )
}
