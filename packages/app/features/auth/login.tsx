'use client'
import { useState, useEffect } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    useWindowDimensions,
    KeyboardAvoidingView,
    Button,
} from 'react-native'

import { SolitoImage } from 'solito/image'

import { useFirebaseAuth } from '@auth/firebase/hooks'
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from '@auth/firebase/'

import { useRouter } from 'solito/navigation'
import { useThemeColor } from '@hooks/useThemeColor'

import logo from '@assets/images/icon.png'
import Test from '@components/test'
// import Test from '../../../../apps/next/lib/components/test'

export default function LoginScreen() {
    const auth = useFirebaseAuth()
    const router = useRouter()
    const { height, width } = useWindowDimensions()
    // const bgColor = useThemeColor('background')
    // const bgSidebarColor = useThemeColor('sidebarBackground')
    // const bgLightBackground = useThemeColor('lightBackground')
    // const bgSoftWhiteColor = useThemeColor('softWhite')
    const softWhite = useThemeColor('softWhite')
    const softBackground = useThemeColor('softBackground')
    const lightBackground = useThemeColor('lightBackground')
    const buttonColor = useThemeColor('buttonColor')
    const secondaryButtonColor = useThemeColor('secondaryButtonColor')
    const tintColor = useThemeColor('tint')
    const textColor = useThemeColor('text')
    const textButton = useThemeColor('textButton')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (email && password) {
            // Autenticar con firebase
            signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // const { token, user } = userCredential
                })
                .catch((error) => {
                    // const errorCode = error.code
                    const errorMessage = error.message
                    alert(`Error signing in: ${errorMessage}`)
                })
        } else {
            alert('Please enter email and password')
        }
    }

    const handleSendPasswordReset = (email: string) => {
        if (email) {
            sendPasswordResetEmail(email)
                .then(() => {
                    alert(`The password reset link was sent, check your email.`)
                })
                .catch((e) => {
                    const errorMessage = e.message
                    alert(`Error sending password reset email: ${errorMessage}`)
                })
        } else {
            alert(
                'Please enter email address for sending the reset password link',
            )
        }
    }

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     * The listener is installed at the main _layout [apps/expo/app/_layout.tsx]
     */

    useEffect(() => {
        if (auth && auth?.email) {
            setTimeout(() => {
                // The timeot is due to an error about navigation object not initializaed
                console.log('[  AUTHENTICATED, GOING HOME ]')
                router.replace('/home')
            }, 150)
        }
    }, [])

    useEffect(() => {
        if (auth && auth?.email) {
            setTimeout(() => {
                // The timeot is due to an error about navigation object not initializaed
                console.log('[ * AUTHENTICATED, GOING HOME ]')
                router.replace('/home')
            }, 500)
        }
    }, [auth])

    // if (finished)
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                flexDirection: 'row',
                backgroundColor: lightBackground,
            }}
        >
            {/* Show left side with logo for wide screens, hide for phones */}
            {width > 900 && (
                <View
                    style={{
                        // Logo Container
                        width: '50%',
                        height: '100%',
                    }}
                >
                    <SolitoImage
                        src={logo}
                        unoptimized
                        resizeMode="center" // contain cover stretch
                        style={{
                            alignSelf: 'center',
                            height: height, // * 0.6,
                            width: width, // * 0.7,
                        }}
                    />
                </View>
            )}
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    gap: 15,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 30,
                    backgroundColor:
                        width > 900 ? softBackground : lightBackground,
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={20}
            >
                {/* Show logo for phones */}
                {width < 900 && (
                    <SolitoImage
                        src={logo}
                        unoptimized
                        resizeMode="cover"
                        style={{
                            // Logo for phones
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            marginBottom: 20,
                        }}
                    />
                )}
                <Test />
                <Text className="text-6xl text-white underline bg-orange-400 font-bold">
                    Otra cosa
                </Text>
                <div className=" bg-orange-400 font-bold">
                    <p className="text-6xl text-white underline bg-orange-400 font-bold">
                        Otra cosa WEB
                    </p>
                </div>
                <Text
                    // className="text-6xl text-white underline bg-orange-400 font-bold"
                    // https://docs.expo.dev/guides/tailwind/
                    // style={{
                    //     color: tintColor,
                    //     $$css: true,
                    //     _: 'font-bold text-6xl underline mb-8 bg-orange-400',
                    // }}
                    style={{
                        // Title style
                        // fontFamily: 'Inter',
                        $$css: true,
                        fontSize: 'text-6xl',
                        fontWeight: 'font-bold',
                        textDecoration: 'underline',
                        margin: 'mb-8',
                        backgroundColor: 'bg-orange-400',
                        color: 'text-blue-600',
                    }}
                    // style={{
                    //     // Title style
                    //     // fontFamily: 'Inter',
                    //     fontSize: 34,
                    //     fontWeight: 'bold',
                    //     marginBottom: 30,
                    //     color: tintColor,
                    // }}
                >
                    Welcome Back
                </Text>
                <TextInput
                    style={{
                        // input style
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 20,
                        backgroundColor: softWhite,
                        color: textColor,
                    }}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={{
                        // input style
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 20,
                        backgroundColor: softWhite,
                        color: textColor,
                    }}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={{
                        // input style
                        width: '100%',
                        padding: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: secondaryButtonColor,
                    }}
                    onPress={handleLogin}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: textButton,
                        }}
                    >
                        Log In
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{
                    // input Secondary/PasswordReset style
            width: '100%',
            marginTop: 20,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor:buttonColor,
        }}>
                    <Text style={styles.buttonText}>Forgot Password ?</Text>
                </TouchableOpacity> */}
                <Button
                    title="Forgot Password ?"
                    onPress={() => handleSendPasswordReset(email)}
                />
            </KeyboardAvoidingView>
        </View>
    )
}
