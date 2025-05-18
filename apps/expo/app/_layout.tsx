/**
 * Entry point for the app.
 */
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useRouter } from 'solito/navigation'

import { useFirebaseAuth } from '@auth/firebase/hooks'
import { getCurrentUser, onAuthStateChanged } from '@auth/firebase'

import { SettingsProvider } from 'app/providers/settingsContextProvider'

export const unstable_settings = {
    // Ensure that reloading on `/user` keeps a back button present.
    initialRouteName: '(auth)', // '/(auth)/login'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
})

export default function App() {
    const auth = useFirebaseAuth()
    const [interLoaded, interError] = useFonts({
        Inter: require('@assets/fonts/Inter-VariableFont.ttf'),
        InterItalic: require('@assets/fonts/Inter-Italic-VariableFont.ttf'),
    })
    const router = useRouter()

    /**
     * When Authentication state changes, navigate to (tabs) home screen
     */
    useEffect(() => {
        if (auth) {
            setTimeout(() => {
                // This is due to an error about navigation object not initializaed
                router.replace('/(tabs)/home')
            }, 500)
        } else {
            router.replace('/(auth)/login')
        }
    }, [auth])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(() => {
            if (auth) {
                setTimeout(() => {
                    // This is due to an error about navigation object not initializaed
                    router.replace('/(tabs)/home')
                }, 500)
            } else {
                router.replace('/(auth)/login')
            }
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (interLoaded && !interError) {
            SplashScreen.hideAsync()
        } else {
        }
    }, [interLoaded, interError])

    return <RootLayout />
}

function RootLayout() {
    const colorScheme = useColorScheme()
    const auth = useFirebaseAuth()
    const isLogedIn = typeof auth !== 'undefined' && auth != null
    return (
        <SafeAreaProvider /* initialMetrics={initialWindowMetrics} */>
            {/* Optimization: If you can, use SafeAreaView. It's implemented natively so when rotating the device, 
            there is no delay from the asynchronous bridge. To speed up the initial render, you can import 
            initialWindowMetrics from this package and set as the initialMetrics prop on the provider as described in Web SSR.
            You cannot do this if your provider remounts, or you are using react-native-navigation. */}

            <SettingsProvider>
                <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                    <StatusBar style="auto" />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: false,
                        }}
                    >
                        {/* Tabs Stack */}
                        <Stack.Protected guard={isLogedIn}>
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false, // Disable swipe gestures for tab screens
                                    animation: 'slide_from_bottom',
                                }}
                            />
                        </Stack.Protected>
                        {/* Auth Stack */}
                        <Stack.Screen
                            name="(auth)"
                            options={{
                                headerShown: false,
                                animation: 'fade',
                                //gestureEnabled: false // Uncomment to disable swipe gestures for auth screens
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </SettingsProvider>
        </SafeAreaProvider>
    )
}
