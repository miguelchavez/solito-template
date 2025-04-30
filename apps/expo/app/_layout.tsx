/**
 * Entry point for the alfred app.
 */
import { memo, useEffect, useState } from 'react'
import { useColorScheme, StyleSheet, View } from 'react-native'
// import {
//     DarkTheme,
//     DefaultTheme,
//     ThemeProvider,
// } from '@react-navigation/native'
import { useFonts } from 'expo-font'
// import { SplashScreen } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router/stack'

// import { Provider } from 'app/provider'
import { useFirebaseAuth } from '@auth/firebase/hooks'
import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
} from '@auth/firebase/index.native' // esto es correcto?

import { SafeAreaProvider } from 'react-native-safe-area-context'

export const unstable_settings = {
    // Ensure that reloading on `/user` keeps a back button present.
    initialRouteName: 'index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
})

export default function App() {
    const [interLoaded, interError] = useFonts({
        Inter: require('../assets/fonts/Inter-VariableFont.ttf'),
        InterItalic: require('../assets/fonts/Inter-Italic-VariableFont.ttf'),
    })

    const auth = useFirebaseAuth()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    useEffect(() => {
        if (
            (interLoaded && interError) ||
            (isAuthenticated && !isAuthenticating)
        ) {
            SplashScreen.hideAsync()
        }
    }, [interLoaded, interError, isAuthenticated, isAuthenticating])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(() => {
            if (auth) {
                console.log('[ @layout :: AUTHENTICATED ]:', auth)
                setIsAuthenticated(true)
                setIsAuthenticating(false)
            } else {
                setIsAuthenticated(false)
                if (!isAuthenticating) setIsAuthenticating(false)
            }
        })

        return () => unsubscribe()
    }, [auth])

    if ((!interLoaded && !interError) || !isAuthenticated) {
        if (!isAuthenticating) {
            setIsAuthenticating(true)
            signInAnonymously()
                .then((result) => {
                    console.log('[ @layout :: SIGN IN RESULT ]:', result)
                })
                .catch((error) => {
                    console.error('[ @layout :: SIGN IN ERROR ]:', error)
                })
            // FIXME: signInWithGoogle() usa signInWithProvider que no funciona en native!
            // signInWithGoogle().then((result) => {
            //     console.log('[ @layout :: SIGN IN RESULT ]:', result)
            // })
        }
        return null
    }

    return <RootLayout />
}

function RootLayout() {
    const colorScheme = useColorScheme() ?? 'light'
    return (
        <SafeAreaProvider /* initialMetrics={initialWindowMetrics} */>
            {/* Optimization: If you can, use SafeAreaView. It's implemented natively so when rotating the device, 
            there is no delay from the asynchronous bridge. To speed up the initial render, you can import 
            initialWindowMetrics from this package and set as the initialMetrics prop on the provider as described in Web SSR.
            You cannot do this if your provider remounts, or you are using react-native-navigation. */}

            {/* <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            > */}

            <Stack
                screenOptions={{
                    // headerStyle: {
                    // backgroundColor: '#D4C4F4',
                    // },
                    // headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTransparent: true,
                    headerBlurEffect: colorScheme, // <-- puede ser 'dark' o 'light', controlado por el sistema
                    headerShadowVisible: true, // <-- added to control shadow visibility
                    // animation: 'simple_push', // <-- added to control animation
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Inicio',
                        headerShown: true, // esto no esta incluido en el padding del safe area!
                        // headerStyle: {
                        //     backgroundColor: '#D4CDF4',
                        // },
                        // headerTintColor: '#000',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // },
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name="user/[id]"
                    options={{
                        title: 'Usuario',
                        presentation: 'modal',
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                />
                <Stack.Screen
                    name="more"
                    options={{
                        title: 'More',
                        // headerShown: true,
                        // headerStyle: {
                        //     backgroundColor: '#D4CDF4',
                        // },
                        // headerTintColor: '#fff',
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',
                        // },
                        // headerTitleAlign: 'center',
                    }}
                />
            </Stack>
            {/* </ThemeProvider> */}
        </SafeAreaProvider>
    )
}
