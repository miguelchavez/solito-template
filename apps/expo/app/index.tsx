/**
 * Onboarding Screen will only be used on Mobile.
 */

import { useEffect, useContext } from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    Button,
    useWindowDimensions,
} from 'react-native'

import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated'

import { useParams, useRouter } from 'solito/navigation'
import { usePathname } from 'expo-router'

import { SettingsContext } from 'app/providers/settingsContextProvider'

import { useThemeColor } from '@hooks/useThemeColor'
import { BlurView } from 'expo-blur'

const IMG_HEIGHT = 500

export default function Home() {
    const router = useRouter()
    const pathname = usePathname()
    const { settings, updateSettings } = useContext(SettingsContext)
    const { height, width } = useWindowDimensions()
    const bgColor = useThemeColor('background')
    const bgSidebarColor = useThemeColor('sidebarBackground')
    const softWhite = useThemeColor('softWhite')
    const softBackground = useThemeColor('softBackground')
    const lightBackground = useThemeColor('lightBackground')
    const buttonColor = useThemeColor('buttonColor')
    const secondaryButtonColor = useThemeColor('secondaryButtonColor')
    const tintColor = useThemeColor('tint')
    const textColor = useThemeColor('text')
    const textButton = useThemeColor('textButton')
    const bgLightBackground = useThemeColor('lightBackground')
    const bgSoftWhiteColor = useThemeColor('softWhite')
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        view: {
            flex: 1,
            width: '100%',
        },
        logoContainer: {
            flex: 1,
            width: '40%',
            height: '100%',
        },
        blurContainer: {
            flex: 1,
            overflow: 'hidden',
            borderRadius: 10,
        },
        content: {
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'justify',
        },
        logo: {
            flex: 1,
            top: 0,
            alignSelf: 'center',
        },
        title: {
            height: 50,
            width: '100%',
            textAlign: 'center',
        },
    })

    const handleSettingsUpdate = (accepting: string) => {
        // This updates de context and saves it to AsyncStorage
        updateSettings({
            theme: settings.theme,
            bottomTabBarSize: settings.bottomTabBarSize,
            isAgreementAccepted: accepting, // update this value
        })
        router.replace('/(tabs)/dashboard')
    }

    useEffect(() => {
        if (settings && settings.isAgreementAccepted) {
            setTimeout(() => {
                // This is due to an error about navigation object not initializaed
                if (pathname != '/dashboard') {
                    router.replace('/(tabs)/dashboard')
                }
            }, 150)
        }
    }, [])

    useEffect(() => {
        if (settings && settings.isAgreementAccepted) {
            setTimeout(() => {
                // This is due to an error about navigation object not initializaed
                if (pathname != '/dashboard') {
                    router.replace('/(tabs)/dashboard')
                }
            }, 250)
        }
    }, [settings])

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1],
                    ),
                },
            ],
        }
    })

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [0, IMG_HEIGHT / 1.5],
                [0, 1],
            ),
        }
    })

    return (
        <View style={[styles.container, { backgroundColor: lightBackground }]}>
            {width > 900 && (
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@assets/images/icon.png')}
                        resizeMode="center" // contain cover stretch
                        style={[
                            styles.logo,
                            { height: height * 0.6, width: width * 0.7 },
                        ]}
                    />
                </View>
            )}
            <View
                style={[
                    styles.content,
                    {
                        padding: 20,
                        maxWidth: width > 900 ? '60%' : '100%',
                        backgroundColor:
                            width > 900 ? softBackground : lightBackground,
                    },
                ]}
            >
                {/* <Animated.Text style={[styles.title, {fontFamily: 'Inter',
            fontSize: 34,
            fontWeight: 'bold',color: tintColor}, headerAnimatedStyle]}> */}
                <Text
                    style={[
                        styles.title,
                        {
                            fontFamily: 'Inter',
                            fontSize: 34,
                            fontWeight: 'bold',
                            color: tintColor,
                        },
                    ]}
                >
                    Welcome
                </Text>
                {/* </Animated.Text> */}
                <View style={styles.view}>
                    <Animated.ScrollView
                        ref={scrollRef}
                        scrollEventThrottle={16}
                    >
                        {width < 900 && (
                            <Animated.Image
                                source={require('@assets/images/icon.png')}
                                style={[
                                    { width: width, height: IMG_HEIGHT },
                                    imageAnimatedStyle,
                                ]}
                            />
                        )}
                        <View style={{ flex: 1, paddingTop: 20 }}>
                            <BlurView
                                intensity={80}
                                tint="light"
                                style={[
                                    styles.blurContainer,
                                    {
                                        padding: 20,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Inter',
                                        color: textColor,
                                    }}
                                >
                                    By continuing, you are agree to the License
                                    Terms and conditions.
                                </Text>
                            </BlurView>
                            <View style={{ marginTop: 20 }}>
                                <Button
                                    title="Continue"
                                    onPress={() => handleSettingsUpdate('true')}
                                />
                            </View>
                        </View>
                    </Animated.ScrollView>
                </View>
            </View>
        </View>
    )
}
