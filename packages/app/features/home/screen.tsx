'use client'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti/app'
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native'

export function HomeScreen() {
    const { width, height } = useWindowDimensions()
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            padding: 16,
            paddingTop: width > height ? 32 : 16, // fix para el stack header en horizontal
            gap: 32,
            backgroundColor: '#fff', // #D4C4F4  #FF85FF #CFB8FC #DAB8FC
        },
    })

    return (
        <View style={styles.view}>
            <H1>Welcome to Solito Template</H1>
            <View style={{ maxWidth: 600, gap: 16 }}>
                <Text style={{ fontFamily: 'Inter', textAlign: 'center' }}>
                    Solito is made by{' '}
                    <MotiLink
                        href="https://twitter.com/fernandotherojo"
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
                        <Text
                            selectable={false}
                            style={{
                                fontFamily: 'Inter',
                                fontSize: 16,
                                color: 'blue',
                                fontWeight: 'bold',
                            }}
                        >
                            Fernando Rojo
                        </Text>
                    </MotiLink>
                    .
                </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 32 }}>
                <MotiLink
                    href="/user/fernando"
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
                    <Text
                        selectable={false}
                        style={{
                            fontFamily: 'Inter',
                            fontSize: 16,
                            color: 'blue',
                            fontWeight: 'bold',
                        }}
                    >
                        Get User Info
                    </Text>
                </MotiLink>

                <MotiLink
                    href="/more"
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
                    <Text
                        selectable={false}
                        style={{
                            fontFamily: 'Inter',
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        Moti Link
                    </Text>
                </MotiLink>
            </View>
        </View>
    )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
    return (
        <Text style={{ fontFamily: 'Inter', fontWeight: '800', fontSize: 24 }}>
            {children}
        </Text>
    )
}

const P = ({ children }: { children: React.ReactNode }) => {
    return (
        <Text style={{ fontFamily: 'Inter', textAlign: 'center' }}>
            {children}
        </Text>
    )
}
