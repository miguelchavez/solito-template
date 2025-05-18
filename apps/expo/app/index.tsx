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
            backgroundColor: lightBackground,
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
            padding: 20,
            textAlign: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 10,
        },
        texto: {
            fontSize: 16,
            fontFamily: 'Inter',
            color: textColor,
        },
        content: {
            flex: 1,
            maxWidth: width > 900 ? '60%' : '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'justify',
            backgroundColor: width > 900 ? softBackground : lightBackground,
            padding: 20,
        },
        innerContent: {
            flex: 1,
            paddingTop: 20,
        },
        button: {
            marginTop: 20,
        },
        logo: {
            flex: 1,
            height: height * 0.6,
            width: width * 0.7,
            top: 0,
            alignSelf: 'center',
        },
        logoSmall: {
            width: width,
            height: IMG_HEIGHT,
        },
        title: {
            fontFamily: 'Inter',
            fontSize: 34,
            color: tintColor,
            fontWeight: 'bold',
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
        router.replace('/(tabs)/home')
    }

    useEffect(() => {
        if (settings && settings.isAgreementAccepted) {
            setTimeout(() => {
                // This is due to an error about navigation object not initializaed
                if (pathname != '/home') {
                    router.replace('/(tabs)/home')
                }
            }, 150)
        }
    }, [])

    useEffect(() => {
        if (settings && settings.isAgreementAccepted) {
            setTimeout(() => {
                // This is due to an error about navigation object not initializaed
                if (pathname != '/home') {
                    router.replace('/(tabs)/home')
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
        <View style={styles.container}>
            {width > 900 && (
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@assets/images/icon.png')}
                        resizeMode="center" // contain cover stretch
                        style={styles.logo}
                    />
                </View>
            )}
            <View style={styles.content}>
                {/* <Animated.Text style={[styles.title, headerAnimatedStyle]}> */}
                <Text style={styles.title}>Welcome</Text>
                {/* </Animated.Text> */}
                <View style={styles.view}>
                    <Animated.ScrollView
                        ref={scrollRef}
                        scrollEventThrottle={16}
                    >
                        {width < 900 && (
                            <Animated.Image
                                source={require('@assets/images/icon.png')}
                                style={[styles.logoSmall, imageAnimatedStyle]}
                            />
                        )}
                        <View style={styles.innerContent}>
                            <BlurView
                                intensity={80}
                                tint="light"
                                style={styles.blurContainer}
                            >
                                <Text style={styles.texto}>
                                    By continuing, you are agree to the License
                                    Terms and conditions.
                                </Text>
                            </BlurView>
                            <View style={styles.button}>
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
