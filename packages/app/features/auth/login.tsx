'use client'
import { useState, useEffect } from 'react'
import {
    StyleSheet,
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

export default function LoginScreen() {
    const auth = useFirebaseAuth()
    const router = useRouter()
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

    // console.log('gbColor:', bgColor)
    // console.log('bgSideBarColor:', bgSidebarColor)
    // console.log('ligthBackground:', lightBackground)
    // console.log('widht:', width)
    // console.log('widht < 900:', width < 900)
    // console.log('widht > 900:', width > 900)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: lightBackground ?? '#e0a9fb',
        },
        LogoContainer: {
            flex: 1,
            width: '50%',
            height: '100%',
        },
        InputsContainer: {
            flex: 1,
            maxWidth: width > 900 ? '50%' : '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: width > 900 ? softBackground : lightBackground,
            paddingHorizontal: 30,
        },
        logo: {
            flex: 1,
            height: height * 0.6,
            width: width * 0.7,
            top: 0,
            alignSelf: 'center',
        },
        logoSmall: {
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 20,
        },
        title: {
            fontFamily: 'Inter',
            fontSize: 34,
            color: tintColor,
            fontWeight: 'bold',
            marginBottom: 30,
        },
        input: {
            width: '100%',
            backgroundColor: softWhite,
            color: textColor,
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
        },
        button: {
            width: '100%',
            backgroundColor: secondaryButtonColor,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
        },
        buttonText: {
            color: textButton,
            fontSize: 16,
            fontWeight: 'bold',
        },
        secondaryButton: {
            width: '100%',
            marginTop: 20,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: buttonColor,
        },
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     * The listener is installed at the main _layout [apps/expo/app/_layout.tsx]
     */

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

    useEffect(() => {
        if (auth && auth?.email) {
            setTimeout(() => {
                // The timeot is due to an error about navigation object not initializaed
                console.log('[  AUTHENTICATED, GOING HOME ]')
                router.replace('/home')
            }, 500)
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

    if (!lightBackground) return null

    return (
        <View style={styles.container} className="MIGUEL">
            {/* Show left side with logo for wide screens, hide for phones */}
            {width > 900 && (
                <View style={styles.LogoContainer}>
                    <SolitoImage
                        src={logo}
                        // source={require('@assets/images/icon.png')}
                        // source={require('../../assets/images/icon.png')}
                        resizeMode="center" // contain cover stretch
                        style={styles.logo}
                    />
                </View>
            )}
            <KeyboardAvoidingView
                style={styles.InputsContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={20}
            >
                {/* Show logo for phones */}
                {width < 900 && (
                    <SolitoImage
                        src={logo}
                        resizeMode="cover"
                        style={styles.logoSmall}
                    />
                )}
                <Text style={styles.title}>Welcome Back</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.secondaryButton}>
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
