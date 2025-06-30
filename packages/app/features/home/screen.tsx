'use client'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti/app'
import {
    Text,
    Button,
    View,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'

import { useState, useEffect } from 'react'
import { getCurrentUser } from 'app/auth/firebase'
import { useRouter } from 'solito/navigation'

import { useThemeColor } from '@hooks/useThemeColor'

import { es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

// import Test from '@components/test'
import Test from '../../../../apps/next/lib/components/test'

export function HomeScreen() {
    const router = useRouter()
    const { width, height } = useWindowDimensions()
    const bgColor = useThemeColor('background')
    const textColor = useThemeColor('text')
    const linkColor = useThemeColor('tertiary')
    const [timeAgo, setTimeAgo] = useState('')

    const styles = StyleSheet.create({
        view: {
            flex: 1,
            padding: 16,
            // paddingTop: width > height ? 32 : 16, // fix para el stack header en horizontal
            gap: 32,
            backgroundColor: bgColor,
            color: textColor,
        },
    })

    const user = getCurrentUser()

    /**
     * When Authentication state changes, get user login time
     */
    useEffect(() => {
        if (user) {
            const f = formatDistanceToNow(
                new Date(user.metadata.lastSignInTime ?? ''),
                {
                    addSuffix: true,
                    locale: es,
                },
            )
            setTimeAgo(f)
        }
    }, [user])

    return (
        <View style={styles.view}>
            <Test />
            <H1>Welcome {user?.isAnonymous ? 'Guest' : user?.displayName}</H1>
            <View className="underline bg-orange-400">
                <P style={{ color: '#000' }}>
                    Your last session is from {timeAgo}
                </P>
                <P>
                    Solito is made by{' '}
                    <TextLink
                        href="https://twitter.com/fernandotherojo"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: linkColor }}
                    >
                        Fernando Rojo
                    </TextLink>
                </P>
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
                    <P selectable={false}>View Profile</P>
                </MotiLink>
                <Button
                    title="Open Modal"
                    onPress={() => router.push('/exampleModal')}
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
                color: textColor,
                textAlign: 'center',
                fontFamily: 'Inter',
                fontWeight: '800',
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
    const linkColor = useThemeColor('secondary')
    return (
        <Text
            selectable={selectable}
            style={{
                fontFamily: 'Inter',
                textAlign: 'justify',
                color: linkColor,
                fontSize: 18,
                ...style,
            }}
            {...props}
        >
            {children}
        </Text>
    )
}
